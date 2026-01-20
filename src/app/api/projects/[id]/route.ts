// src/app/api/projects/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET - dohvati pojedinačni projekt
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: 'Projekt nije pronađen' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Get project error:', error);
    return NextResponse.json(
      { error: 'Greška pri dohvaćanju projekta' },
      { status: 500 }
    );
  }
}

// PUT - ažuriraj projekt
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    // Provjeri postoji li projekt
    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: 'Projekt nije pronađen' },
        { status: 404 }
      );
    }

    // Validacija
    if (!body.title?.trim()) {
      return NextResponse.json(
        { error: 'Naslov je obavezan' },
        { status: 400 }
      );
    }

    // Ako se naslov promijenio, generiraj novi slug
    let slug = existing.slug;
    if (body.title.trim() !== existing.title) {
      const baseSlug = body.title
        .toLowerCase()
        .replace(/č/g, 'c')
        .replace(/ć/g, 'c')
        .replace(/đ/g, 'd')
        .replace(/š/g, 's')
        .replace(/ž/g, 'z')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      slug = baseSlug;
      let counter = 1;
      while (true) {
        const found = await prisma.project.findUnique({ where: { slug } });
        if (!found || found.id === id) break;
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        title: body.title.trim(),
        slug,
        description: body.description?.trim() || null,
        category: body.category || existing.category,
        featured: body.featured ?? existing.featured,
        order: body.order ?? existing.order,
      },
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Update project error:', error);
    return NextResponse.json(
      { error: 'Greška pri ažuriranju projekta' },
      { status: 500 }
    );
  }
}

// DELETE - obriši projekt
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Provjeri postoji li projekt
    const existing = await prisma.project.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!existing) {
      return NextResponse.json(
        { error: 'Projekt nije pronađen' },
        { status: 404 }
      );
    }

    // TODO: Obriši fizičke slike s diska
    // for (const image of existing.images) {
    //   await deleteFile(image.path);
    // }

    // Brisanje projekta (cascade će obrisati i slike iz baze)
    await prisma.project.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Projekt obrisan' });
  } catch (error) {
    console.error('Delete project error:', error);
    return NextResponse.json(
      { error: 'Greška pri brisanju projekta' },
      { status: 500 }
    );
  }
}
