// src/app/admin/projects/new/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Save, 
  Loader2, 
  Upload, 
  X, 
  Star, 
  GripVertical,
  ImageIcon
} from 'lucide-react';

interface UploadedImage {
  id: string;
  filename: string;
  path: string;
  isCover: boolean;
  order: number;
}

const categories = [
  { value: 'kuhinje', label: 'Kuhinje' },
  { value: 'vrata', label: 'Vrata i prozori' },
  { value: 'namjestaj', label: 'Namještaj' },
  { value: 'stepenice', label: 'Stepenice' },
  { value: 'ostalo', label: 'Ostalo' },
];

export default function NewProjectPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('kuhinje');
  const [featured, setFeatured] = useState(false);
  const [images, setImages] = useState<UploadedImage[]>([]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    setError('');

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'projekti');

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Upload failed');
        }

        const data = await res.json();

        setImages((prev) => [
          ...prev,
          {
            id: `temp-${Date.now()}-${Math.random()}`,
            filename: data.filename,
            path: data.path,
            isCover: prev.length === 0, // Prva slika je cover
            order: prev.length,
          },
        ]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Greška pri uploadu');
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      // Ako smo uklonili cover, postavi novu prvu sliku kao cover
      if (filtered.length > 0 && !filtered.some((img) => img.isCover)) {
        filtered[0].isCover = true;
      }
      return filtered.map((img, i) => ({ ...img, order: i }));
    });
  };

  const setCover = (id: string) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,
        isCover: img.id === id,
      }))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Naslov je obavezan');
      return;
    }

    setSaving(true);

    try {
      // 1. Kreiraj projekt
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || null,
          category,
          featured,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Greška pri kreiranju projekta');
      }

      const project = await res.json();

      // 2. Dodaj slike projektu
      for (const img of images) {
        await fetch(`/api/projects/${project.id}/images`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: img.filename,
            path: img.path,
            isCover: img.isCover,
            order: img.order,
          }),
        });
      }

      router.push('/admin/projects');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Greška pri spremanju');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeft size={20} />
          Natrag na projekte
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Novi projekt</h1>
      </div>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Osnovni podaci</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Naslov *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wood/20 focus:border-wood"
                    placeholder="npr. Kuhinja po mjeri - Obitelj Horvat"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Opis
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wood/20 focus:border-wood resize-none"
                    placeholder="Kratki opis projekta..."
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Slike</h2>

              {/* Upload Area */}
              <label className="block border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-wood/50 hover:bg-wood/5 transition-colors mb-4">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
                {uploading ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="w-10 h-10 text-wood animate-spin mb-2" />
                    <p className="text-gray-500">Učitavanje...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="w-10 h-10 text-gray-400 mb-2" />
                    <p className="text-gray-600 font-medium">
                      Kliknite ili povucite slike ovdje
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      JPG, PNG, WebP do 10MB
                    </p>
                  </div>
                )}
              </label>

              {/* Image Grid */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {images.map((img) => (
                    <div
                      key={img.id}
                      className={`relative aspect-square rounded-lg overflow-hidden group ${
                        img.isCover ? 'ring-2 ring-wood' : ''
                      }`}
                    >
                      <Image
                        src={img.path}
                        alt=""
                        fill
                        className="object-cover"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors">
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => setCover(img.id)}
                            className={`p-1.5 rounded-lg ${
                              img.isCover
                                ? 'bg-yellow-400 text-yellow-900'
                                : 'bg-white/90 text-gray-600 hover:bg-yellow-400 hover:text-yellow-900'
                            }`}
                            title="Postavi kao naslovnu"
                          >
                            <Star size={16} fill={img.isCover ? 'currentColor' : 'none'} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeImage(img.id)}
                            className="p-1.5 rounded-lg bg-white/90 text-red-600 hover:bg-red-500 hover:text-white"
                            title="Ukloni"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Cover Badge */}
                      {img.isCover && (
                        <div className="absolute bottom-2 left-2 bg-wood text-white text-xs px-2 py-1 rounded">
                          Naslovna
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {images.length === 0 && !uploading && (
                <div className="text-center py-8 text-gray-400">
                  <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Još nema slika</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Category */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Kategorija</h2>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wood/20 focus:border-wood"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Featured */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-5 h-5 text-wood border-gray-300 rounded focus:ring-wood"
                />
                <div>
                  <p className="font-medium text-gray-900">Istaknuti projekt</p>
                  <p className="text-sm text-gray-500">
                    Prikaži na naslovnici
                  </p>
                </div>
              </label>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <button
                type="submit"
                disabled={saving}
                className="w-full inline-flex items-center justify-center gap-2 bg-wood text-white px-5 py-3 rounded-lg hover:bg-wood-dark transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Spremanje...
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    Spremi projekt
                  </>
                )}
              </button>
              <Link
                href="/admin/projects"
                className="w-full inline-flex items-center justify-center mt-3 text-gray-500 hover:text-gray-700"
              >
                Odustani
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
