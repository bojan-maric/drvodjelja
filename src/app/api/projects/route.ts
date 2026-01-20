// src/app/api/projects/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET - dohvati sve projekte
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    const projects = await prisma.project.findMany({
      where: {
        ...(category && { category }),
        ...(featured === 'true' && { featured: true }),
      },
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Get projects error:', error);
    return NextResponse.json(
      { error: 'Greška pri dohvaćanju projekata' },
      { status: 500 }
    );
  }
}

// POST - kreiraj novi projekt
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Validacija
    if (!body.title?.trim()) {
      return NextResponse.json(
        { error: 'Naslov je obavezan' },
        { status: 400 }
      );
    }

    if (!body.category) {
      return NextResponse.json(
        { error: 'Kategorija je obavezna' },
        { status: 400 }
      );
    }

    // Generiraj slug
    const baseSlug = body.title
      .toLowerCase()
      .replace(/č/g, 'c')
      .replace(/ć/g, 'c')
      .replace(/đ/g, 'd')
      .replace(/š/g, 's')
      .replace(/ž/g, 'z')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Provjeri jedinstvenost sluga
    let slug = baseSlug;
    let counter = 1;
    while (await prisma.project.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const project = await prisma.project.create({
      data: {
        title: body.title.trim(),
        slug,
        description: body.description?.trim() || null,
        category: body.category,
        featured: body.featured || false,
        order: body.order || 0,
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json(
      { error: 'Greška pri kreiranju projekta' },
      { status: 500 }
    );
  }
}
