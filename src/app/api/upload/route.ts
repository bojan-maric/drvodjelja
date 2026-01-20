// src/app/api/upload/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'uploads';

    if (!file) {
      return NextResponse.json(
        { error: 'Datoteka nije poslana' },
        { status: 400 }
      );
    }

    // Provjeri tip datoteke
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Nedozvoljeni tip datoteke. Dozvoljeni: JPG, PNG, WebP, GIF' },
        { status: 400 }
      );
    }

    // Provjeri veličinu (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Datoteka je prevelika. Maksimum: 10MB' },
        { status: 400 }
      );
    }

    // Generiraj jedinstveno ime datoteke
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const filename = `${timestamp}-${randomStr}.${ext}`;

    // Sanitiziraj folder naziv
    const safeFolder = folder.replace(/[^a-z0-9-]/gi, '');

    // Kreiraj direktorij ako ne postoji
    const uploadDir = path.join(process.cwd(), 'public', 'images', safeFolder);
    await mkdir(uploadDir, { recursive: true });

    // Spremi datoteku
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    // Vraći relativni path za korištenje u <img>
    const publicPath = `/images/${safeFolder}/${filename}`;

    return NextResponse.json({
      success: true,
      filename,
      path: publicPath,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Greška pri uploadu datoteke' },
      { status: 500 }
    );
  }
}
