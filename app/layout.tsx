import type { Metadata, Viewport } from 'next';
import './globals.css';
import { archivo, geist, geistMono, newsreader, playfair, syne } from '@/lib/fonts';
import { ClientLayout } from '@/components/system/ClientLayout';
import { UniverseProvider } from '@/lib/universe';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: `${site.name} — ${site.roleLine}`,
  description: `${site.positioning.lead} ${site.positioning.italicPhrase} ${site.positioning.trail}`,
  keywords: [
    'Prit Patel',
    'Full-Stack Developer',
    'AI Systems Engineer',
    'Autonomous Agents',
    'FastAPI',
    'React',
    'Next.js',
    'Compiler Design',
    'Vadodara',
  ],
  authors: [{ name: site.name, url: site.links.github }],
  creator: site.name,
  metadataBase: new URL('https://pritpatel.dev'),
  openGraph: {
    title: `${site.name} — ${site.roleLine}`,
    description: `${site.positioning.lead} ${site.positioning.italicPhrase} ${site.positioning.trail}`,
    url: 'https://pritpatel.dev',
    siteName: `${site.name} Portfolio`,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.roleLine}`,
    description: `${site.positioning.lead} ${site.positioning.italicPhrase} ${site.positioning.trail}`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0A0908' },
    { media: '(prefers-color-scheme: light)', color: '#F1EDE4' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${geist.variable} ${geistMono.variable} ${newsreader.variable} ${playfair.variable} ${syne.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* No-flash inline theme and universe script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              try {
                var universe = localStorage.getItem('prit_portfolio_universe') || 'editorial';
                document.documentElement.setAttribute('data-universe', universe);
                var theme = localStorage.getItem('theme');
                if (!theme) {
                  theme = (universe === 'noir' || universe === 'archive') ? 'dark' : 'light';
                }
                document.documentElement.setAttribute('data-theme', theme);
              } catch(e) {}
            })();`,
          }}
        />
      </head>
      <body className="antialiased selection:bg-[var(--safelight)] selection:text-[var(--bg)] transition-colors duration-300">
        <UniverseProvider>
          <ClientLayout>{children}</ClientLayout>
        </UniverseProvider>
      </body>
    </html>
  );
}
