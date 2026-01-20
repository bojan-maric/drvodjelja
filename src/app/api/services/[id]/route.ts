// src/app/api/services/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET - dohvati pojedinačnu uslugu
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    const service = await prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      return NextResponse.json(
        { error: 'Usluga nije pronađena' },
        { status: 404 }
      );
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error('Get service error:', error);
    return NextResponse.json(
      { error: 'Greška pri dohvaćanju usluge' },
      { status: 500 }
    );
  }
}

// PUT - ažuriraj uslugu
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.service.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: 'Usluga nije pronađena' },
        { status: 404 }
      );
    }

    // Validacija
    if (body.name !== undefined && !body.name?.trim()) {
      return NextResponse.json(
        { error: 'Naziv usluge je obavezan' },
        { status: 400 }
      );
    }

    // Ako se naziv promijenio, generiraj novi slug
    let slug = existing.slug;
    if (body.name && body.name.trim() !== existing.name) {
      const baseSlug = body.name
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
        const found = await prisma.service.findUnique({ where: { slug } });
        if (!found || found.id === id) break;
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    const service = await prisma.service.update({
      where: { id },
      data: {
        name: body.name?.trim() ?? existing.name,
        slug,
        description: body.description !== undefined ? body.description?.trim() || null : existing.description,
        icon: body.icon ?? existing.icon,
        order: body.order ?? existing.order,
        active: body.active ?? existing.active,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error('Update service error:', error);
    return NextResponse.json(
      { error: 'Greška pri ažuriranju usluge' },
      { status: 500 }
    );
  }
}

// DELETE - obriši uslugu
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.service.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: 'Usluga nije pronađena' },
        { status: 404 }
      );
    }

    await prisma.service.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Usluga obrisana' });
  } catch (error) {
    console.error('Delete service error:', error);
    return NextResponse.json(
      { error: 'Greška pri brisanju usluge' },
      { status: 500 }
    );
  }
}
