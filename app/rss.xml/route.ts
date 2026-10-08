import { NextResponse } from 'next/server';
import { ARTICLES } from '@/content/articles';

export async function GET() {
  const siteUrl = 'https://pritpatel.dev';

  const parseDate = (dateStr: string): string => {
    // converts 'February 2026' or 'January 2026' into RFC 822 GMT date
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? new Date().toUTCString() : d.toUTCString();
  };

  const itemsXml = ARTICLES.map((article) => {
    const itemUrl = `${siteUrl}/writing/${article.slug}`;
    const pubDate = parseDate(article.date);

    return `    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${itemUrl}</link>
      <guid isPermaLink="true">${itemUrl}</guid>
      <description><![CDATA[${article.summary}]]></description>
      <category>${article.category}</category>
      <pubDate>${pubDate}</pubDate>
    </item>`;
  }).join('\n');

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Prit Patel — Technical Writing &amp; Field Notes</title>
    <link>${siteUrl}/writing</link>
    <description>Reflections on compiler architecture, AST tokenization, autonomous agent swarms, and high-concurrency systems engineering.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
