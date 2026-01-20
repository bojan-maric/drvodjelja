// src/app/api/settings/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET - dohvati sve postavke
export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany();

    // Pretvori u key-value objekt
    const settingsObj: Record<string, string> = {};
    settings.forEach((s) => {
      settingsObj[s.key] = s.value;
    });

    return NextResponse.json(settingsObj);
  } catch (error) {
    console.error('Get settings error:', error);
    return NextResponse.json(
      { error: 'Greška pri dohvaćanju postavki' },
      { status: 500 }
    );
  }
}

// PUT - ažuriraj postavke (batch update)
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // body je objekt { key: value, key2: value2, ... }
    if (typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json(
        { error: 'Body mora biti objekt s key-value parovima' },
        { status: 400 }
      );
    }

    // Upsert svaku postavku
    for (const [key, value] of Object.entries(body)) {
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
    }

    // Dohvati ažurirane postavke
    const settings = await prisma.siteSetting.findMany();
    const settingsObj: Record<string, string> = {};
    settings.forEach((s) => {
      settingsObj[s.key] = s.value;
    });

    return NextResponse.json(settingsObj);
  } catch (error) {
    console.error('Update settings error:', error);
    return NextResponse.json(
      { error: 'Greška pri ažuriranju postavki' },
      { status: 500 }
    );
  }
}
