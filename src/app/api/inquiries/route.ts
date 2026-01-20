// src/app/api/inquiries/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET - dohvati sve upite
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = searchParams.get('limit');

    const inquiries = await prisma.inquiry.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit) : undefined,
    });

    return NextResponse.json(inquiries);
  } catch (error) {
    console.error('Get inquiries error:', error);
    return NextResponse.json(
      { error: 'Greška pri dohvaćanju upita' },
      { status: 500 }
    );
  }
}
