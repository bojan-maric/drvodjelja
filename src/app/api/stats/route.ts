// src/app/api/stats/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Paralelno dohvati sve statistike
    const [
      projectsCount,
      imagesCount,
      servicesCount,
      newInquiriesCount,
      totalInquiriesCount,
      recentInquiries,
      recentProjects,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.projectImage.count(),
      prisma.service.count({ where: { active: true } }),
      prisma.inquiry.count({ where: { status: 'new' } }),
      prisma.inquiry.count(),
      prisma.inquiry.findMany({
        where: { status: 'new' },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          name: true,
          email: true,
          service: true,
          createdAt: true,
        },
      }),
      prisma.project.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          images: {
            where: { isCover: true },
            take: 1,
          },
        },
      }),
    ]);

    return NextResponse.json({
      stats: {
        projects: projectsCount,
        images: imagesCount,
        services: servicesCount,
        newInquiries: newInquiriesCount,
        totalInquiries: totalInquiriesCount,
      },
      recentInquiries,
      recentProjects,
    });
  } catch (error) {
    console.error('Get stats error:', error);
    return NextResponse.json(
      { error: 'Greška pri dohvaćanju statistika' },
      { status: 500 }
    );
  }
}
