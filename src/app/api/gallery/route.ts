// src/app/api/gallery/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET - dohvati sve slike iz svih projekata
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const images = await prisma.projectImage.findMany({
      include: {
        project: {
          select: {
            id: true,
            title: true,
            slug: true,
            category: true,
          },
        },
      },
      orderBy: [
        { project: { category: 'asc' } },
        { project: { title: 'asc' } },
        { order: 'asc' },
      ],
    });

    // Transform to flat structure with project info
    const galleryImages = images.map((img) => ({
      id: img.id,
      path: img.path,
      alt: img.alt,
      isCover: img.isCover,
      projectId: img.project.id,
      projectTitle: img.project.title,
      projectSlug: img.project.slug,
      category: img.project.category,
    }));

    return NextResponse.json(galleryImages);
  } catch (error) {
    console.error('Get gallery error:', error);
    return NextResponse.json(
      { error: 'Greška pri dohvaćanju galerije' },
      { status: 500 }
    );
  }
}