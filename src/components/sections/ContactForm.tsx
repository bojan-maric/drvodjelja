// src/components/sections/ContactForm.tsx
'use client';

import { useState } from 'react';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const usluge = [
  { value: '', label: 'Odaberite uslugu (opcionalno)' },
  { value: 'kuhinje', label: 'Kuhinje po mjeri' },
  { value: 'vrata', label: 'Vrata i prozori' },
  { value: 'namjestaj', label: 'Namještaj po mjeri' },
  { value: 'stepenice', label: 'Stepenice' },
  { value: 'restauracija', label: 'Restauracija' },
  { value: 'poslovni-prostori', label: 'Poslovni prostori' },
  { value: 'ostalo', label: 'Ostalo' },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Ime je obavezno';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email je obavezan';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Unesite ispravan email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Poruka je obavezna';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Poruka mora imati najmanje 10 znakova';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Došlo je do greške');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Došlo je do greške. Pokušajte ponovo.'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Ime */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Ime i prezime <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-wood/50 ${
            errors.name 
              ? 'border-red-400 bg-red-50' 
              : 'border-gray-200 focus:border-wood'
          }`}
          placeholder="Vaše ime i prezime"
          disabled={status === 'loading'}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      {/* Email i Telefon - dva stupca */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-wood/50 ${
              errors.email 
                ? 'border-red-400 bg-red-50' 
                : 'border-gray-200 focus:border-wood'
            }`}
            placeholder="vas@email.com"
            disabled={status === 'loading'}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Telefon */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Telefon <span className="text-gray-400">(opcionalno)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-wood focus:outline-none focus:ring-2 focus:ring-wood/50 transition-colors"
            placeholder="+385 xx xxx xxxx"
            disabled={status === 'loading'}
          />
        </div>
      </div>

      {/* Usluga */}
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
          Vrsta usluge
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-wood focus:outline-none focus:ring-2 focus:ring-wood/50 transition-colors bg-white"
          disabled={status === 'loading'}
        >
          {usluge.map((usluga) => (
            <option key={usluga.value} value={usluga.value}>
              {usluga.label}
            </option>
          ))}
        </select>
      </div>

      {/* Poruka */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Poruka <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={`w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-wood/50 resize-none ${
            errors.message 
              ? 'border-red-400 bg-red-50' 
              : 'border-gray-200 focus:border-wood'
          }`}
          placeholder="Opišite što vam treba..."
          disabled={status === 'loading'}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message}</p>
        )}
      </div>

      {/* Status poruke */}
      {status === 'success' && (
        <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          <CheckCircle size={20} />
          <span>Hvala! Vaša poruka je uspješno poslana. Javit ćemo vam se uskoro.</span>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertCircle size={20} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full flex items-center justify-center gap-2 bg-wood text-white px-6 py-4 rounded-lg font-medium hover:bg-wood-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            Šaljem...
          </>
        ) : (
          <>
            <Send size={20} />
            Pošalji poruku
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        Vaši podaci su sigurni i koristimo ih samo za odgovor na vaš upit.
      </p>
    </form>
  );
}
