// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navigation = [
    { label: 'Početna', href: '/' },
    { label: 'O nama', href: '/#o-nama' },
    { label: 'Usluge', href: '/#usluge' },
    { label: 'Galerija', href: '/galerija' },
    { label: 'Radovi', href: '/#radovi' },
    { label: 'Kontakt', href: '/#kontakt' },
  ];

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  };

  const navItemVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.08,
        duration: 0.4,
        ease: 'easeOut'
      }
    })
  };

  const closeButtonVariants = {
    closed: { opacity: 0, rotate: -90 },
    open: {
      opacity: 1,
      rotate: 0,
      transition: {
        delay: 0.2,
        duration: 0.3
      }
    }
  };

  return (
    <>
      <header 
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled 
            ? 'bg-white shadow-lg' 
            : 'bg-gradient-to-b from-black/60 via-black/30 to-transparent'
        )}
      >
        <nav className="container mx-auto px-4">
          <div className={cn(
            'flex items-center justify-between transition-all duration-500',
            isScrolled ? 'py-3' : 'py-5'
          )}>
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image 
                src="/images/logo/logo.png" 
                alt="Drvodjelja - 30 godina sa vama" 
                width={200} 
                height={80}
                className={cn(
                  'w-auto transition-all duration-300',
                  isScrolled 
                    ? 'h-10 md:h-12' 
                    : 'h-12 md:h-14 brightness-0 invert'
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
                  'flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all',
                  isScrolled 
                    ? 'bg-wood text-white hover:bg-wood-dark' 
                    : 'bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20'
                )}
              >
                <Phone size={18} />
                <span>Nazovite nas</span>
              </a>
            </div>

            {/* Mobile Menu Button - Hamburger */}
            <button
              className={cn(
                'md:hidden p-2 rounded-lg transition-colors relative w-10 h-10 flex items-center justify-center',
                isScrolled 
                  ? 'text-gray-600 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/10'
              )}
              onClick={() => setIsMenuOpen(true)}
              aria-label="Otvori menu"
            >
              <div className="flex flex-col gap-1.5">
                <span className={cn(
                  'block w-6 h-0.5 rounded-full transition-colors',
                  isScrolled ? 'bg-gray-600' : 'bg-white'
                )} />
                <span className={cn(
                  'block w-6 h-0.5 rounded-full transition-colors',
                  isScrolled ? 'bg-gray-600' : 'bg-white'
                )} />
                <span className={cn(
                  'block w-4 h-0.5 rounded-full transition-colors',
                  isScrolled ? 'bg-gray-600' : 'bg-white'
                )} />
              </div>
            </button>
          </div>
        </nav>
      </header>

      {/* Full-screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-wood-darker via-wood-dark to-wood-darker" />
            
            {/* Subtle wood grain texture overlay */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Content */}
            <div className="relative h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5">
                {/* Logo */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <Image 
                    src="/images/logo/logo.png" 
                    alt="Drvodjelja" 
                    width={160} 
                    height={64}
                    className="h-12 w-auto brightness-0 invert"
                  />
                </motion.div>

                {/* Close Button */}
                <motion.button
                  variants={closeButtonVariants}
                  onClick={() => setIsMenuOpen(false)}
                  className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  aria-label="Zatvori menu"
                >
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 20 20" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M4 4l12 12M16 4L4 16" />
                  </svg>
                </motion.button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 flex flex-col items-center justify-center px-6 -mt-10">
                <ul className="space-y-2 text-center w-full max-w-xs">
                  {navigation.map((item, i) => (
                    <motion.li
                      key={item.href}
                      custom={i}
                      variants={navItemVariants}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-3 text-2xl font-medium text-white/90 hover:text-white transition-colors"
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.a
                  href="tel:+385XXXXXXXX"
                  custom={navigation.length}
                  variants={navItemVariants}
                  className="mt-10 flex items-center gap-3 bg-wood hover:bg-wood-light text-white px-8 py-4 rounded-full font-medium transition-all hover:scale-105 shadow-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Phone size={20} />
                  <span>Nazovite nas</span>
                </motion.a>
              </nav>

              {/* Footer info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="px-6 py-6 text-center"
              >
                <p className="text-white/40 text-sm">
                  30 godina tradicije i kvalitete
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
