// src/components/layout/Footer.tsx

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-wood-darker text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <Image 
              src="/images/logo/logo-full.png" 
              alt="Drvodjelja" 
              width={250} 
              height={100}
              className="h-20 w-auto mb-4 brightness-0 invert opacity-90"
            />
            <p className="text-gray-300 leading-relaxed">
              30 godina sa vama. Tradicija, kvaliteta i povjerenje u svakom 
              komadu drvenog namještaja.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-wood-light">Brzi linkovi</h4>
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/" 
                className="text-gray-300 hover:text-wood-light transition-colors"
              >
                Početna
              </Link>
              <Link 
                href="/#o-nama" 
                className="text-gray-300 hover:text-wood-light transition-colors"
              >
                O nama
              </Link>
              <Link 
                href="/#usluge" 
                className="text-gray-300 hover:text-wood-light transition-colors"
              >
                Usluge
              </Link>
              <Link 
                href="/#radovi" 
                className="text-gray-300 hover:text-wood-light transition-colors"
              >
                Naši radovi
              </Link>
              <Link 
                href="/#kontakt" 
                className="text-gray-300 hover:text-wood-light transition-colors"
              >
                Kontakt
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-wood-light">Kontakt</h4>
            <div className="flex flex-col space-y-3">
              <a 
                href="mailto:info@drvodjelja.hr"
                className="flex items-center text-gray-300 hover:text-wood-light transition-colors"
              >
                <Mail size={18} className="mr-3 flex-shrink-0" />
                info@drvodjelja.hr
              </a>
              
              <a
                href="tel:+385XXXXXXXX"
                className="flex items-center text-gray-300 hover:text-wood-light transition-colors"
              >
                <Phone size={18} className="mr-3 flex-shrink-0" />
                +385 XX XXX XXXX
              </a>

              <div className="flex items-center text-gray-300">
                <MapPin size={18} className="mr-3 flex-shrink-0" />
                <span>Adresa radionice, Grad</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>© {currentYear} Drvodjelja - Miljenko Bošnjak. Sva prava pridržana.</p>
        </div>
      </div>
    </footer>
  );
}
