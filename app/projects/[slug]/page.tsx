import React from 'react';
import { notFound } from 'next/navigation';
import {
  ALL_PROJECTS,
  getProjectBySlug,
  getNextProject,
} from '@/lib/projects';
import { UniverseProjectDetailView } from '@/components/projects/UniverseProjectDetailView';

export function generateStaticParams() {
  return ALL_PROJECTS.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject = getNextProject(slug);

  return <UniverseProjectDetailView project={project} nextProject={nextProject} />;
}
