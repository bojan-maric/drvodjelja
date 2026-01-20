// src/types/index.ts

// ================================
// DRVODJELJA - Type Definitions
// ================================

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: ProjectCategory;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  images: ProjectImage[];
}

export type ProjectCategory = 'kuhinje' | 'vrata' | 'namjestaj' | 'stepenice' | 'ostalo';

export interface ProjectImage {
  id: string;
  projectId: string;
  filename: string;
  path: string;
  alt: string | null;
  isCover: boolean;
  order: number;
  createdAt: Date;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string;
  order: number;
  active: boolean;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  status: InquiryStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type InquiryStatus = 'new' | 'replied' | 'archived';

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  updatedAt: Date;
}

// Component Props Types
export interface SectionProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

// Category config
export const CATEGORIES: { value: ProjectCategory; label: string }[] = [
  { value: 'kuhinje', label: 'Kuhinje' },
  { value: 'vrata', label: 'Vrata i prozori' },
  { value: 'namjestaj', label: 'Namještaj' },
  { value: 'stepenice', label: 'Stepenice' },
  { value: 'ostalo', label: 'Ostalo' },
];
