// src/app/api/services/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET - dohvati sve usluge
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active') === 'true';

    const services = await prisma.service.findMany({
      where: activeOnly ? { active: true } : undefined,
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error('Get services error:', error);
    return NextResponse.json(
      { error: 'Greška pri dohvaćanju usluga' },
      { status: 500 }
    );
  }
}

// POST - kreiraj novu uslugu
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Validacija
    if (!body.name?.trim()) {
      return NextResponse.json(
        { error: 'Naziv usluge je obavezan' },
        { status: 400 }
      );
    }

    // Generiraj slug
    const baseSlug = body.name
      .toLowerCase()
      .replace(/č/g, 'c')
      .replace(/ć/g, 'c')
      .replace(/đ/g, 'd')
      .replace(/š/g, 's')
      .replace(/ž/g, 'z')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    let slug = baseSlug;
    let counter = 1;
    while (await prisma.service.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Dohvati max order
    const maxOrder = await prisma.service.aggregate({
      _max: { order: true },
    });

    const service = await prisma.service.create({
      data: {
        name: body.name.trim(),
        slug,
        description: body.description?.trim() || null,
        icon: body.icon || 'Wrench',
        order: body.order ?? (maxOrder._max.order ?? -1) + 1,
        active: body.active ?? true,
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error('Create service error:', error);
    return NextResponse.json(
      { error: 'Greška pri kreiranju usluge' },
      { status: 500 }
    );
  }
}
