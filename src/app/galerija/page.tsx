// src/app/galerija/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GalleryFilter, GalleryGrid, Lightbox, type Category } from '@/components/gallery';

// Svi radovi s kategorijama
const sviRadovi = [
  { id: 1, src: '/images/radovi/rad-1.jpg', alt: 'Moderna kuhinja s drvenim detaljima', category: 'Kuhinje' },
  { id: 2, src: '/images/radovi/rad-2.jpg', alt: 'Kuhinjski elementi od masivnog drva', category: 'Kuhinje' },
  { id: 3, src: '/images/radovi/rad-3.jpg', alt: 'Kuhinja detalj - radna ploča', category: 'Kuhinje' },
  { id: 4, src: '/images/radovi/rad-4.jpg', alt: 'Bijela kuhinja s drvenim akcentima', category: 'Kuhinje' },
  { id: 5, src: '/images/radovi/rad-5.jpg', alt: 'Kuhinja s drvenom pregradom', category: 'Kuhinje' },
  { id: 6, src: '/images/radovi/rad-6.jpg', alt: 'Drveni namještaj - ormar', category: 'Namještaj' },
  { id: 7, src: '/images/radovi/rad-7.jpg', alt: 'Kuhinja po mjeri', category: 'Kuhinje' },
  { id: 8, src: '/images/radovi/rad-8.jpg', alt: 'Drvena stolarija', category: 'Ostalo' },
  { id: 9, src: '/images/radovi/rad-9.jpg', alt: 'Moderna kuhinja', category: 'Kuhinje' },
  { id: 10, src: '/images/radovi/rad-10.jpg', alt: 'Bijela kuhinja s drvenom radnom pločom', category: 'Kuhinje' },
  { id: 11, src: '/images/radovi/rad-11.jpg', alt: 'Drveni namještaj po mjeri', category: 'Namještaj' },
  { id: 12, src: '/images/radovi/rad-12.jpg', alt: 'Drvena konstrukcija', category: 'Ostalo' },
  { id: 13, src: '/images/radovi/rad-13.jpg', alt: 'Stolarski rad', category: 'Ostalo' },
  { id: 14, src: '/images/radovi/rad-14.jpg', alt: 'Drveni detalji', category: 'Ostalo' },
];

// Mapiranje kategorija za filter
const categoryMap: Record<Category, string> = {
  sve: '',
  kuhinje: 'Kuhinje',
  vrata: 'Vrata i prozori',
  namjestaj: 'Namještaj',
  stepenice: 'Stepenice',
  ostalo: 'Ostalo',
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export default function GalerijaPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('sve');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Filtrirani radovi
  const filteredRadovi = useMemo(() => {
    if (activeCategory === 'sve') {
      return sviRadovi;
    }
    const categoryName = categoryMap[activeCategory];
    return sviRadovi.filter((rad) => rad.category === categoryName);
  }, [activeCategory]);

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrev = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? filteredRadovi.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => 
      prev === filteredRadovi.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero section */}
      <section className="bg-cream py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <p className="text-wood font-medium tracking-wider uppercase text-sm mb-2">
              Portfolio
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-wood-darker mb-4">
              Galerija radova
            </h1>
            <p className="text-gray-600 text-lg">
              Pregledajte naše realizirane projekte. Svaki komad izrađen je s pažnjom, 
              posvećenošću i više od 30 godina iskustva u stolarskom zanatu.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Gallery */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Filter */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <GalleryFilter 
              activeCategory={activeCategory} 
              onCategoryChange={setActiveCategory} 
            />
          </motion.div>

          {/* Results count */}
          <motion.p
            className="text-center text-gray-500 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Prikazano {filteredRadovi.length} {filteredRadovi.length === 1 ? 'rad' : 
              filteredRadovi.length < 5 ? 'rada' : 'radova'}
          </motion.p>

          {/* Gallery Grid */}
          <GalleryGrid 
            images={filteredRadovi} 
            onImageClick={openLightbox} 
          />

          {/* Empty state */}
          {filteredRadovi.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <p className="text-gray-500 text-lg mb-4">
                Trenutno nemamo radove u ovoj kategoriji.
              </p>
              <button
                onClick={() => setActiveCategory('sve')}
                className="text-wood hover:text-wood-dark font-medium underline underline-offset-4"
              >
                Prikaži sve radove
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-wood-darker py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
              Želite sličan projekt?
            </h2>
            <p className="text-white/70 mb-8">
              Kontaktirajte nas za besplatnu konzultaciju i ponudu. 
              Svaki projekt prilagođavamo vašim potrebama i prostoru.
            </p>
            <a
              href="/#kontakt"
              className="inline-flex items-center gap-2 bg-wood hover:bg-wood-light text-white px-8 py-4 rounded-lg font-medium transition-all hover:scale-105"
            >
              Kontaktirajte nas
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        images={filteredRadovi}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onPrev={goToPrev}
        onNext={goToNext}
      />
    </div>
  );
}
