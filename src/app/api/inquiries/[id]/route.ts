// src/app/api/inquiries/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET - dohvati pojedinačni upit
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const inquiry = await prisma.inquiry.findUnique({
      where: { id },
    });

    if (!inquiry) {
      return NextResponse.json(
        { error: 'Upit nije pronađen' },
        { status: 404 }
      );
    }

    return NextResponse.json(inquiry);
  } catch (error) {
    console.error('Get inquiry error:', error);
    return NextResponse.json(
      { error: 'Greška pri dohvaćanju upita' },
      { status: 500 }
    );
  }
}

// PUT - ažuriraj status upita
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.inquiry.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: 'Upit nije pronađen' },
        { status: 404 }
      );
    }

    // Validacija statusa
    const validStatuses = ['new', 'replied', 'archived'];
    if (body.status && !validStatuses.includes(body.status)) {
      return NextResponse.json(
        { error: 'Nevažeći status. Dozvoljeni: new, replied, archived' },
        { status: 400 }
      );
    }

    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: {
        status: body.status ?? existing.status,
      },
    });

    return NextResponse.json(inquiry);
  } catch (error) {
    console.error('Update inquiry error:', error);
    return NextResponse.json(
      { error: 'Greška pri ažuriranju upita' },
      { status: 500 }
    );
  }
}

// DELETE - obriši upit
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.inquiry.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: 'Upit nije pronađen' },
        { status: 404 }
      );
    }

    await prisma.inquiry.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Upit obrisan' });
  } catch (error) {
    console.error('Delete inquiry error:', error);
    return NextResponse.json(
      { error: 'Greška pri brisanju upita' },
      { status: 500 }
    );
  }
}
