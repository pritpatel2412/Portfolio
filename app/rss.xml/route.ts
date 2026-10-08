import { NextResponse } from 'next/server';

export async function GET() {
  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Prit Patel — Field Notes</title>
    <link>https://pritpatel.dev</link>
    <description>Field notes on autonomous agent architectures, parser design, and systems engineering.</description>
    <item>
      <title>Why Regex Backtracking Fails in Vulnerability Scanners (and ASTs Don’t)</title>
      <link>https://pritpatel.dev/writing</link>
      <description>A deep dive into parsing payloads as structural AST tokens versus regular expressions.</description>
      <pubDate>Mon, 15 Feb 2026 00:00:00 GMT</pubDate>
    </item>
    <item>
      <title>Sub-200ms RAG: Semantic Query Caching for Autonomous Browser Agents</title>
      <link>https://pritpatel.dev/writing</link>
      <description>Designing locality-sensitive embedding hashes in Redis to reduce redundant vector queries.</description>
      <pubDate>Thu, 15 Jan 2026 00:00:00 GMT</pubDate>
    </item>
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
