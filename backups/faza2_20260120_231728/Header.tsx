// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { label: 'Početna', href: '/' },
    { label: 'O nama', href: '/#o-nama' },
    { label: 'Usluge', href: '/#usluge' },
    { label: 'Radovi', href: '/#radovi' },
    { label: 'Kontakt', href: '/#kontakt' },
  ];

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      )}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/logo/logo.png" 
              alt="Drvodjelja - 30 godina sa vama" 
              width={200} 
              height={80}
              className={cn(
                'h-10 md:h-12 w-auto transition-all duration-300',
                !isScrolled && 'brightness-0 invert'
              )}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'font-medium transition-colors',
                  isScrolled 
                    ? 'text-gray-600 hover:text-wood' 
                    : 'text-white/90 hover:text-white'
                )}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="tel:+385XXXXXXXX"
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg transition-all',
                isScrolled 
                  ? 'bg-wood text-white hover:bg-wood-dark' 
                  : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30'
              )}
            >
              <Phone size={18} />
              <span>Nazovite nas</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              'md:hidden p-2 rounded-lg transition-colors',
              isScrolled 
                ? 'text-gray-600 hover:bg-gray-100' 
                : 'text-white hover:bg-white/10'
            )}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Zatvori menu' : 'Otvori menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={cn(
            'md:hidden py-4 mt-2 rounded-lg',
            isScrolled 
              ? 'bg-white border-t' 
              : 'bg-black/80 backdrop-blur-md'
          )}>
            <div className="flex flex-col space-y-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'py-3 px-4 rounded-lg font-medium transition-colors',
                    isScrolled 
                      ? 'text-gray-600 hover:text-wood hover:bg-gray-50' 
                      : 'text-white hover:bg-white/10'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="tel:+385XXXXXXXX"
                className="flex items-center justify-center gap-2 bg-wood text-white px-4 py-3 rounded-lg hover:bg-wood-dark transition-colors mt-2"
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