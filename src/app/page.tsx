// src/app/page.tsx
'use client';

import Image from 'next/image';
import { ChevronDown, ChefHat, DoorOpen, Armchair, TrendingUp, Hammer, Building2, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import ContactForm from '@/components/sections/ContactForm';

// Podaci o radovima
const radovi = [
  { id: 1, src: '/images/radovi/rad-1.jpg', alt: 'Moderna kuhinja s drvenim detaljima', category: 'Kuhinje' },
  { id: 2, src: '/images/radovi/rad-10.jpg', alt: 'Bijela kuhinja s drvenom radnom pločom', category: 'Kuhinje' },
  { id: 3, src: '/images/radovi/rad-5.jpg', alt: 'Kuhinja s drvenom pregradom', category: 'Kuhinje' },
  { id: 4, src: '/images/radovi/rad-2.jpg', alt: 'Kuhinjski elementi', category: 'Kuhinje' },
  { id: 5, src: '/images/radovi/rad-9.jpg', alt: 'Kuhinja po mjeri', category: 'Kuhinje' },
  { id: 6, src: '/images/radovi/rad-11.jpg', alt: 'Drveni namještaj', category: 'Namještaj' },
  { id: 7, src: '/images/radovi/rad-3.jpg', alt: 'Kuhinja detalj', category: 'Kuhinje' },
  { id: 8, src: '/images/radovi/rad-8.jpg', alt: 'Stolarija', category: 'Ostalo' },
];

// Usluge
const usluge = [
  { 
    icon: ChefHat, 
    title: 'Kuhinje po mjeri', 
    desc: 'Izrađujemo kuhinje koje savršeno odgovaraju vašem prostoru i potrebama.' 
  },
  { 
    icon: DoorOpen, 
    title: 'Vrata i prozori', 
    desc: 'Drvena vrata i prozori izrađeni od najkvalitetnijeg drva.' 
  },
  { 
    icon: Armchair, 
    title: 'Namještaj po mjeri', 
    desc: 'Ormare, komode, police i drugi namještaj prema vašim željama.' 
  },
  { 
    icon: TrendingUp, 
    title: 'Stepenice', 
    desc: 'Drvene stepenice - ravne, zavojite i konzolne.' 
  },
  { 
    icon: Hammer, 
    title: 'Restauracija', 
    desc: 'Obnavljamo stari namještaj i vraćamo mu nekadašnji sjaj.' 
  },
  { 
    icon: Building2, 
    title: 'Poslovni prostori', 
    desc: 'Opremamo restorane, hotele i poslovne prostore.' 
  },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 }
  }
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center">
        {/* Background - Tekstura drva */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero/wood-bg.webp"
            alt="Tekstura drva"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Overlay za kontrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          
          {/* 1. Gornji tekst */}
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-xs sm:text-sm tracking-[0.4em] uppercase mb-8"
          >
            Stolarska radionica
          </motion.p>
          
          {/* 2. Naslov */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-wider mb-10"
            style={{ textShadow: '2px 4px 20px rgba(0,0,0,0.4)' }}
          >
            DRVODJELJA
          </motion.h1>
          
          {/* 3. Mali logo - bijela verzija */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-10"
          >
            <Image 
              src="/images/logo/logo-full.png" 
              alt="Drvodjelja logo" 
              width={280} 
              height={112}
              className="h-20 sm:h-24 md:h-28 w-auto mx-auto brightness-0 invert drop-shadow-lg"
              priority
            />
          </motion.div>
          
          {/* 4. Tagline */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-white/90 text-xl sm:text-2xl mb-3 font-light"
          >
            30 godina sa vama
          </motion.p>
          
          {/* 5. Slogan */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-white/60 text-sm sm:text-base tracking-widest mb-12"
          >
            Tradicija · Kvaliteta · Povjerenje
          </motion.p>
          
          {/* 6. CTA Buttoni */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a 
              href="#radovi" 
              className="group inline-flex items-center justify-center gap-2 bg-wood hover:bg-wood-dark text-white text-base sm:text-lg px-8 py-4 rounded-lg transition-all hover:scale-105 shadow-xl"
            >
              Pogledaj radove
              <svg 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a 
              href="#kontakt" 
              className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20 px-8 py-4 rounded-lg transition-all hover:scale-105"
            >
              Kontaktirajte nas
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.a 
          href="#o-nama" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors animate-bounce"
        >
          <ChevronDown size={36} />
        </motion.a>

        {/* VL info - diskretno u kutu */}
        <div className="absolute bottom-8 right-6 text-white/30 text-xs tracking-wider hidden md:block">
          VL: Miljenko Bošnjak
        </div>
      </section>

      {/* O nama Section */}
      <section id="o-nama" className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.p 
              variants={fadeInUp}
              className="text-wood font-medium tracking-wider uppercase text-sm mb-2"
            >
              O nama
            </motion.p>
            <motion.h2 
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-serif font-bold mb-6 text-wood-darker"
            >
              Više od 30 godina majstorstva
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-600 mb-6"
            >
              <strong>Drvodjelja</strong> je stolarska radionica vlasnika <strong>Miljenka Bošnjaka</strong> s 
              preko 30 godina iskustva u izradi kvalitetnog drvenog namještaja i stolarije.
            </motion.p>
            <motion.p 
              variants={fadeInUp}
              className="text-gray-600 mb-8"
            >
              Naša tradicija, znanje i ljubav prema drvu čine svaki naš proizvod posebnim.
              Od generacije do generacije prenosimo zanat i posvećenost kvaliteti. 
              Svaki komad namještaja izrađujemo s pažnjom i preciznošću koju samo 
              iskustvo može donijeti.
            </motion.p>
            
            {/* Stats */}
            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200"
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-wood">30+</div>
                <div className="text-sm text-gray-500 mt-1">Godina iskustva</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-wood">500+</div>
                <div className="text-sm text-gray-500 mt-1">Zadovoljnih klijenata</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-wood">100%</div>
                <div className="text-sm text-gray-500 mt-1">Predanost kvaliteti</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Usluge Section */}
      <section id="usluge" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <p className="text-wood font-medium tracking-wider uppercase text-sm mb-2">
              Što radimo
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-wood-darker">
              Naše usluge
            </h2>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {usluge.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div 
                  key={index} 
                  variants={scaleIn}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 bg-wood-light/20 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="text-wood" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-wood-darker">{service.title}</h3>
                  <p className="text-gray-600">{service.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Radovi Section */}
      <section id="radovi" className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <p className="text-wood font-medium tracking-wider uppercase text-sm mb-2">
              Portfolio
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-wood-darker mb-4">
              Naši radovi
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Pogledajte neke od naših realiziranih projekata. Svaki komad je izrađen 
              s pažnjom i posvećenošću kvaliteti.
            </p>
          </motion.div>
          
          {/* Gallery Grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {radovi.map((rad) => (
              <motion.div 
                key={rad.id} 
                variants={scaleIn}
                className="group relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <Image
                  src={rad.src}
                  alt={rad.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block bg-wood text-white text-xs px-2 py-1 rounded">
                    {rad.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <p className="text-gray-500 mb-4">
              Ovo je samo dio naših radova. Kontaktirajte nas za više primjera.
            </p>
            <a 
            href="/galerija" 
            className="inline-flex items-center gap-2 bg-wood text-white px-6 py-3 rounded-lg hover:bg-wood-dark transition-all hover:scale-105"
          >
            Pogledaj kompletnu galeriju
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          </motion.div>
        </div>
      </section>

      {/* Kontakt Section */}
      <section id="kontakt" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <p className="text-wood font-medium tracking-wider uppercase text-sm mb-2">
              Javite nam se
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-wood-darker">
              Kontaktirajte nas
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Imate pitanja ili želite besplatnu ponudu? Ispunite formu ili nas kontaktirajte direktno.
            </p>
          </motion.div>
          
          <div className="max-w-5xl mx-auto">
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-5 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {/* Kontakt info */}
              <motion.div 
                variants={fadeInUp}
                className="lg:col-span-2 space-y-6"
              >
                <div className="bg-cream rounded-xl p-6">
                  <h3 className="font-semibold text-wood-darker mb-4">Kontakt informacije</h3>
                  
                  <div className="space-y-4">
                    <a 
                      href="mailto:info@drvodjelja.hr" 
                      className="flex items-center gap-3 text-gray-600 hover:text-wood transition-colors"
                    >
                      <div className="w-10 h-10 bg-wood-light/20 rounded-lg flex items-center justify-center">
                        <Mail size={18} className="text-wood" />
                      </div>
                      <span>info@drvodjelja.hr</span>
                    </a>
                    
                    <a 
                      href="tel:+385XXXXXXXX" 
                      className="flex items-center gap-3 text-gray-600 hover:text-wood transition-colors"
                    >
                      <div className="w-10 h-10 bg-wood-light/20 rounded-lg flex items-center justify-center">
                        <Phone size={18} className="text-wood" />
                      </div>
                      <span>+385 XX XXX XXXX</span>
                    </a>
                    
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="w-10 h-10 bg-wood-light/20 rounded-lg flex items-center justify-center">
                        <MapPin size={18} className="text-wood" />
                      </div>
                      <span>Adresa radionice, Grad</span>
                    </div>
                  </div>
                </div>

                <div className="bg-wood-darker rounded-xl p-6 text-white">
                  <h3 className="font-semibold mb-2">Radno vrijeme</h3>
                  <div className="text-white/80 text-sm space-y-1">
                    <p>Ponedjeljak - Petak: 08:00 - 17:00</p>
                    <p>Subota: 08:00 - 13:00</p>
                    <p>Nedjelja: Zatvoreno</p>
                  </div>
                </div>
              </motion.div>

              {/* Kontakt forma */}
              <motion.div 
                variants={fadeInUp}
                className="lg:col-span-3"
              >
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
                  <ContactForm />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
