// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { label: 'Početna', href: '/' },
    { label: 'O nama', href: '/#o-nama' },
    { label: 'Usluge', href: '/#usluge' },
    { label: 'Galerija', href: '/galerija' },
    { label: 'Kontakt', href: '/#kontakt' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-serif font-bold text-wood-darker">
              Drvodjelja
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-wood transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="tel:+385XXXXXXXX"
              className="flex items-center gap-2 bg-wood text-white px-4 py-2 rounded-lg hover:bg-wood-dark transition-colors"
            >
              <Phone size={18} />
              <span>Nazovite nas</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Zatvori menu' : 'Otvori menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="py-2 text-gray-600 hover:text-wood transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="tel:+385XXXXXXXX"
                className="flex items-center justify-center gap-2 bg-wood text-white px-4 py-3 rounded-lg hover:bg-wood-dark transition-colors mt-4"
              >
                <Phone size={18} />
                <span>Nazovite nas</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
