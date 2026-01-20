// src/lib/utils.ts

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format phone number for tel: link
 */
export function formatPhoneForLink(phone: string): string {
  return phone.replace(/\s/g, '');
}

/**
 * Generate mailto link
 */
export function getMailtoLink(email: string, subject?: string): string {
  const base = `mailto:${email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}

/**
 * Slugify string
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[čć]/g, 'c')
    .replace(/š/g, 's')
    .replace(/ž/g, 'z')
    .replace(/đ/g, 'd')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}
