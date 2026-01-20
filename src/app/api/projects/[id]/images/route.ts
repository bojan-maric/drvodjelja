// src/app/api/projects/[id]/images/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// POST - dodaj sliku projektu
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    // Provjeri postoji li projekt
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) {
      return NextResponse.json(
        { error: 'Projekt nije pronađen' },
        { status: 404 }
      );
    }

    // Validacija
    if (!body.filename || !body.path) {
      return NextResponse.json(
        { error: 'Filename i path su obavezni' },
        { status: 400 }
      );
    }

    // Ako je nova slika cover, makni cover sa svih ostalih
    if (body.isCover) {
      await prisma.projectImage.updateMany({
        where: { projectId: id },
        data: { isCover: false },
      });
    }

    // Dohvati max order
    const maxOrder = await prisma.projectImage.aggregate({
      where: { projectId: id },
      _max: { order: true },
    });

    const image = await prisma.projectImage.create({
      data: {
        projectId: id,
        filename: body.filename,
        path: body.path,
        alt: body.alt || null,
        isCover: body.isCover || false,
        order: body.order ?? (maxOrder._max.order ?? -1) + 1,
      },
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error('Add image error:', error);
    return NextResponse.json(
      { error: 'Greška pri dodavanju slike' },
      { status: 500 }
    );
  }
}

// PUT - ažuriraj redoslijed slika
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    // body.images = [{ id: 'xxx', order: 0, isCover: true }, ...]
    if (!Array.isArray(body.images)) {
      return NextResponse.json(
        { error: 'images array je obavezan' },
        { status: 400 }
      );
    }

    // Update each image
    for (const img of body.images) {
      await prisma.projectImage.update({
        where: { id: img.id },
        data: {
          order: img.order,
          isCover: img.isCover || false,
        },
      });
    }

    // Dohvati ažurirane slike
    const images = await prisma.projectImage.findMany({
      where: { projectId: id },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error('Update images error:', error);
    return NextResponse.json(
      { error: 'Greška pri ažuriranju slika' },
      { status: 500 }
    );
  }
}
