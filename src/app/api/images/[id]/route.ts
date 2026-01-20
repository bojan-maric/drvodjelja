// src/app/api/images/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { unlink } from 'fs/promises';
import path from 'path';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// DELETE - obriši sliku
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const image = await prisma.projectImage.findUnique({ where: { id } });
    if (!image) {
      return NextResponse.json(
        { error: 'Slika nije pronađena' },
        { status: 404 }
      );
    }

    // Obriši fizičku datoteku
    try {
      const filePath = path.join(process.cwd(), 'public', image.path);
      await unlink(filePath);
    } catch (err) {
      console.warn('Could not delete file:', err);
      // Nastavi s brisanjem iz baze čak i ako file ne postoji
    }

    // Obriši iz baze
    await prisma.projectImage.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Slika obrisana' });
  } catch (error) {
    console.error('Delete image error:', error);
    return NextResponse.json(
      { error: 'Greška pri brisanju slike' },
      { status: 500 }
    );
  }
}

// PUT - ažuriraj sliku (alt text, cover status)
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const image = await prisma.projectImage.findUnique({ where: { id } });
    if (!image) {
      return NextResponse.json(
        { error: 'Slika nije pronađena' },
        { status: 404 }
      );
    }

    // Ako postavljamo kao cover, makni cover sa ostalih
    if (body.isCover) {
      await prisma.projectImage.updateMany({
        where: { projectId: image.projectId, id: { not: id } },
        data: { isCover: false },
      });
    }

    const updated = await prisma.projectImage.update({
      where: { id },
      data: {
        alt: body.alt !== undefined ? body.alt : image.alt,
        isCover: body.isCover !== undefined ? body.isCover : image.isCover,
        order: body.order !== undefined ? body.order : image.order,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Update image error:', error);
    return NextResponse.json(
      { error: 'Greška pri ažuriranju slike' },
      { status: 500 }
    );
  }
}
