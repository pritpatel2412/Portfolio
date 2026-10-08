import React from 'react';
import { notFound } from 'next/navigation';
import {
  ARTICLES,
  getArticleBySlug,
} from '@/content/articles';
import { UniverseArticleDetailView } from '@/components/writing/UniverseArticleDetailView';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return ARTICLES.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} — Prit Patel`,
    description: article.summary,
    openGraph: {
      title: `${article.title} — Prit Patel`,
      description: article.summary,
      url: `https://pritpatel.dev/writing/${article.slug}`,
      type: 'article',
      publishedTime: article.date,
      modifiedTime: article.updated,
      authors: ['Prit Patel'],
      tags: article.tags,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <UniverseArticleDetailView article={article} />;
}
