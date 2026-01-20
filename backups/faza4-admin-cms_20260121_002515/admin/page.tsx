// src/app/admin/page.tsx
'use client';

import Link from 'next/link';
import { FolderOpen, Settings, ExternalLink, Mail, Wrench, ImageIcon } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats - Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-wood/10 rounded-lg">
              <FolderOpen className="text-wood" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Projekti</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-wood-light/20 rounded-lg">
              <ImageIcon className="text-wood-light" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Slike</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-wood-dark/10 rounded-lg">
              <Wrench className="text-wood-dark" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Usluge</p>
              <p className="text-2xl font-bold">6</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Mail className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Novi upiti</p>
              <p className="text-2xl font-bold">0</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <h2 className="text-lg font-semibold mb-4">Brze akcije</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          href="/admin/projects"
          className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow flex items-center gap-4"
        >
          <FolderOpen className="text-wood" size={24} />
          <div>
            <p className="font-medium">Projekti</p>
            <p className="text-sm text-gray-500">Dodaj ili uredi radove</p>
          </div>
        </Link>

        <Link
          href="/admin/inquiries"
          className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow flex items-center gap-4"
        >
          <Mail className="text-wood" size={24} />
          <div>
            <p className="font-medium">Upiti</p>
            <p className="text-sm text-gray-500">Pregled kontakt upita</p>
          </div>
        </Link>
        
        <Link
          href="/admin/settings"
          className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow flex items-center gap-4"
        >
          <Settings className="text-wood" size={24} />
          <div>
            <p className="font-medium">Postavke</p>
            <p className="text-sm text-gray-500">Kontakt info, tekstovi</p>
          </div>
        </Link>
        
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow flex items-center gap-4"
        >
          <ExternalLink className="text-wood" size={24} />
          <div>
            <p className="font-medium">Pregled stranice</p>
            <p className="text-sm text-gray-500">Otvori u novom tabu</p>
          </div>
        </a>
      </div>

      {/* Info box */}
      <div className="mt-8 bg-wood/5 border border-wood/20 rounded-lg p-6">
        <h3 className="font-semibold text-wood-dark mb-2">🪵 Faza 1 Završena!</h3>
        <p className="text-gray-600 text-sm">
          Ovo je kostur Drvodjelja projekta. Admin panel, auth sustav i baza su spremni.
          U sljedećim fazama dodajemo: javne stranice s pravim sadržajem, galeriju radova,
          potpun CMS za projekte i usluge, te kontakt formu.
        </p>
      </div>
    </div>
  );
}
