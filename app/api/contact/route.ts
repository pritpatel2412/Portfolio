import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().trim().email('Valid email address is required').max(120),
  topic: z.enum([
    'Build a product',
    'AI/agent work',
    'Join a team',
    'Just saying hi',
  ]),
  budget: z.string().optional().default(''),
  timeline: z.string().optional().default(''),
  message: z.string().trim().min(5, 'Message must be at least 5 characters').max(5000),
  picks: z.array(z.string()).optional().default([]),
  website: z.string().optional().default(''), // Honeypot field
});

// Simple sliding window rate limiter (max 5 submissions per 10m per IP)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      '127.0.0.1';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Rate limit exceeded. Please wait a few minutes or email directly.',
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const firstError = result.error.errors[0]?.message || 'Invalid form input';
      return NextResponse.json(
        { ok: false, error: firstError },
        { status: 400 }
      );
    }

    const data = result.data;

    // Honeypot check: If bot filled the hidden website field, return fake 200
    if (data.website && data.website.trim().length > 0) {
      return NextResponse.json({
        ok: true,
        message: 'Message received and queued.',
      });
    }

    // Email dispatch (Resend API if configured, otherwise development fallback)
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const picksList = data.picks.length > 0 ? `\nBookmarked Picks: ${data.picks.join(', ')}` : '';
        const emailContent = `
New enquiry from: ${data.name} <${data.email}>
Topic: ${data.topic}
Budget: ${data.budget || 'Not specified'}
Timeline: ${data.timeline || 'Not specified'}
${picksList}

Message:
${data.message}
        `.trim();

        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: ['pritpatel2412@gmail.com'],
            reply_to: data.email,
            subject: `[Portfolio Enquiry] ${data.name} — ${data.topic}`,
            text: emailContent,
          }),
        });

        if (!resendRes.ok) {
          console.warn('[Contact API] Resend returned non-200 status', await resendRes.text());
        }
      } catch (err) {
        console.error('[Contact API] Failed to dispatch via Resend:', err);
      }
    } else {
      // In dev or preview environments without mail credentials
      console.info('[Contact Dispatch Simulated]', {
        sender: `${data.name} <${data.email}>`,
        topic: data.topic,
        budget: data.budget,
        timeline: data.timeline,
        picks: data.picks,
        messagePreview: data.message.substring(0, 100),
      });
    }

    return NextResponse.json({
      ok: true,
      message: 'Negative received and queued. I reply within 24 hours — check your inbox shortly.',
    });
  } catch (error) {
    console.error('[Contact API Error]', error);
    return NextResponse.json(
      {
        ok: false,
        error: 'Internal server error. Please email pritpatel2412@gmail.com directly.',
      },
      { status: 500 }
    );
  }
}
