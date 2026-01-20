// src/app/api/contact/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validacija
    const errors: string[] = [];

    if (!body.name?.trim()) {
      errors.push('Ime je obavezno');
    }

    if (!body.email?.trim()) {
      errors.push('Email je obavezan');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      errors.push('Email nije ispravan');
    }

    if (!body.message?.trim()) {
      errors.push('Poruka je obavezna');
    } else if (body.message.trim().length < 10) {
      errors.push('Poruka mora imati najmanje 10 znakova');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: errors.join(', ') },
        { status: 400 }
      );
    }

    // Spremi u bazu
    const inquiry = await prisma.inquiry.create({
      data: {
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone?.trim() || null,
        service: body.service || null,
        message: body.message.trim(),
        status: 'new',
      },
    });

    // TODO: Poslati email notifikaciju (Resend/Nodemailer)
    // await sendEmailNotification(inquiry);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Poruka uspješno poslana',
        id: inquiry.id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      { error: 'Došlo je do greške pri slanju poruke. Pokušajte ponovo.' },
      { status: 500 }
    );
  }
}

// GET - dohvati sve upite (za admin)
export async function GET(request: NextRequest) {
  try {
    // Provjeri autentikaciju (pojednostavnjeno za sada)
    // U produkciji bi koristili NextAuth session

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const inquiries = await prisma.inquiry.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
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
