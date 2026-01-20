// src/app/admin/settings/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { 
  Save, 
  Loader2, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Globe,
  Facebook,
  Instagram,
  CheckCircle
} from 'lucide-react';

interface Settings {
  // Kontakt
  email: string;
  phone: string;
  phone2: string;
  address: string;
  city: string;
  postalCode: string;
  
  // Radno vrijeme
  workingHours: string;
  workingDays: string;
  
  // Društvene mreže
  facebook: string;
  instagram: string;
  
  // SEO
  siteTitle: string;
  siteDescription: string;
  
  // Ostalo
  googleMapsUrl: string;
  companyName: string;
  oib: string;
}

const defaultSettings: Settings = {
  email: '',
  phone: '',
  phone2: '',
  address: '',
  city: '',
  postalCode: '',
  workingHours: '08:00 - 16:00',
  workingDays: 'Pon - Pet',
  facebook: '',
  instagram: '',
  siteTitle: 'Drvodjelja - Stolarska radionica',
  siteDescription: 'Kvalitetna izrada namještaja po mjeri s 30 godina iskustva',
  googleMapsUrl: '',
  companyName: 'Drvodjelja',
  oib: '',
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings({ ...defaultSettings, ...data });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (key: keyof Settings, value: string) => {
    setSettings({ ...settings, [key]: value });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-wood" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Postavke</h1>
          <p className="text-gray-500 mt-1">Konfigurirajte informacije o stranici</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-wood text-white px-5 py-2.5 rounded-lg hover:bg-wood-dark transition-colors disabled:opacity-50"
        >
          {saving ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Spremanje...
            </>
          ) : saved ? (
            <>
              <CheckCircle size={18} />
              Spremljeno!
            </>
          ) : (
            <>
              <Save size={18} />
              Spremi promjene
            </>
          )}
        </button>
      </div>

      <div className="space-y-6">
        {/* Kontakt podaci */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-wood/10 rounded-lg">
              <Phone className="text-wood" size={20} />
            </div>
            <h2 className="font-semibold text-gray-900">Kontakt podaci</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wood/20 focus:border-wood"
                  placeholder="info@drvodjelja.hr"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefon
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wood/20 focus:border-wood"
                  placeholder="+385 XX XXX XXXX"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dodatni telefon
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="tel"
                  value={settings.phone2}
                  onChange={(e) => updateField('phone2', e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wood/20 focus:border-wood"
                  placeholder="+385 XX XXX XXXX"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                OIB
              </label>
              <input
                type="text"
                value={settings.oib}
                onChange={(e) => updateField('oib', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wood/20 focus:border-wood"
                placeholder="12345678901"
              />
            </div>
          </div>
        </div>

        {/* Adresa */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-wood/10 rounded-lg">
              <MapPin className="text-wood" size={20} />
            </div>
            <h2 className="font-semibold text-gray-900">Adresa</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adresa
              </label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => updateField('address', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wood/20 focus:border-wood"
                placeholder="Ulica i kućni broj"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Grad
              </label>
              <input
                type="text"
                value={settings.city}
                onChange={(e) => updateField('city', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wood/20 focus:border-wood"
                placeholder="npr. Zagreb"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Poštanski broj
              </label>
              <input
                type="text"
                value={settings.postalCode}
                onChange={(e) => updateField('postalCode', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wood/20 focus:border-wood"
                placeholder="10000"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Google Maps URL
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="url"
                  value={settings.googleMapsUrl}
                  onChange={(e) => updateField('googleMapsUrl', e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wood/20 focus:border-wood"
                  placeholder="https://maps.google.com/..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Radno vrijeme */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-wood/10 rounded-lg">
              <Clock className="text-wood" size={20} />
            </div>
            <h2 className="font-semibold text-gray-900">Radno vrijeme</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Radni dani
              </label>
              <input
                type="text"
                value={settings.workingDays}
                onChange={(e) => updateField('workingDays', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wood/20 focus:border-wood"
                placeholder="Pon - Pet"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Radno vrijeme
              </label>
              <input
                type="text"
                value={settings.workingHours}
                onChange={(e) => updateField('workingHours', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wood/20 focus:border-wood"
                placeholder="08:00 - 16:00"
              />
            </div>
          </div>
        </div>

        {/* Društvene mreže */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-wood/10 rounded-lg">
              <Globe className="text-wood" size={20} />
            </div>
            <h2 className="font-semibold text-gray-900">Društvene mreže</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Facebook
              </label>
              <div className="relative">
                <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="url"
                  value={settings.facebook}
                  onChange={(e) => updateField('facebook', e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wood/20 focus:border-wood"
                  placeholder="https://facebook.com/..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instagram
              </label>
              <div className="relative">
                <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="url"
                  value={settings.instagram}
                  onChange={(e) => updateField('instagram', e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wood/20 focus:border-wood"
                  placeholder="https://instagram.com/..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-wood/10 rounded-lg">
              <Globe className="text-wood" size={20} />
            </div>
            <h2 className="font-semibold text-gray-900">SEO postavke</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Naziv tvrtke
              </label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => updateField('companyName', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wood/20 focus:border-wood"
                placeholder="Drvodjelja"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Naslov stranice (title tag)
              </label>
              <input
                type="text"
                value={settings.siteTitle}
                onChange={(e) => updateField('siteTitle', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wood/20 focus:border-wood"
                placeholder="Drvodjelja - Stolarska radionica"
              />
              <p className="text-xs text-gray-400 mt-1">
                Prikazuje se u kartici preglednika i rezultatima pretraživanja
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Opis stranice (meta description)
              </label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => updateField('siteDescription', e.target.value)}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wood/20 focus:border-wood resize-none"
                placeholder="Kvalitetna izrada namještaja po mjeri..."
              />
              <p className="text-xs text-gray-400 mt-1">
                Prikazuje se u rezultatima pretraživanja (preporučeno 150-160 znakova)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
