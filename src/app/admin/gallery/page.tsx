// src/app/admin/gallery/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Image as ImageIcon, 
  Trash2, 
  Loader2, 
  Filter,
  ExternalLink,
  FolderOpen,
  Plus
} from 'lucide-react';

interface GalleryImage {
  id: string;
  path: string;
  alt: string | null;
  isCover: boolean;
  projectId: string;
  projectTitle: string;
  projectSlug: string;
  category: string;
}

const categories = [
  { value: '', label: 'Sve kategorije' },
  { value: 'kuhinje', label: 'Kuhinje' },
  { value: 'vrata', label: 'Vrata i prozori' },
  { value: 'namjestaj', label: 'Namještaj' },
  { value: 'stepenice', label: 'Stepenice' },
  { value: 'ostalo', label: 'Ostalo' },
];

const categoryLabels: Record<string, string> = {
  kuhinje: 'Kuhinje',
  vrata: 'Vrata i prozori',
  namjestaj: 'Namještaj',
  stepenice: 'Stepenice',
  ostalo: 'Ostalo',
};

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/gallery');
      if (res.ok) {
        const data = await res.json();
        setImages(data);
      }
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (imageId: string) => {
    if (!confirm('Jeste li sigurni da želite obrisati ovu sliku?')) return;

    setDeleting(imageId);
    try {
      const res = await fetch(`/api/images/${imageId}`, { method: 'DELETE' });
      if (res.ok) {
        setImages(images.filter((img) => img.id !== imageId));
      } else {
        alert('Greška pri brisanju slike');
      }
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setDeleting(null);
    }
  };

  const filteredImages = images.filter((img) => {
    if (!categoryFilter) return true;
    return img.category === categoryFilter;
  });

  // Grupiraj po kategoriji
  const groupedImages = filteredImages.reduce((acc, img) => {
    if (!acc[img.category]) {
      acc[img.category] = [];
    }
    acc[img.category].push(img);
    return acc;
  }, {} as Record<string, GalleryImage[]>);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-wood" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Galerija</h1>
          <p className="text-gray-500 mt-1">
            {images.length} {images.length === 1 ? 'slika' : 'slika'} ukupno
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 bg-wood text-white px-5 py-2.5 rounded-lg hover:bg-wood-dark transition-colors"
        >
          <Plus size={20} />
          Novi projekt sa slikama
        </Link>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex items-center gap-4">
          <Filter size={18} className="text-gray-400" />
          <span className="text-sm text-gray-500">Kategorija:</span>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategoryFilter(cat.value)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  categoryFilter === cat.value
                    ? 'bg-wood text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredImages.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">
            {categoryFilter 
              ? `Nema slika u kategoriji "${categoryLabels[categoryFilter]}"` 
              : 'Nema slika u galeriji'}
          </p>
          <Link
            href="/admin/projects/new"
            className="text-wood hover:text-wood-dark"
          >
            Dodaj projekt sa slikama →
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedImages).map(([category, categoryImages]) => (
            <div key={category}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {categoryLabels[category] || category}
                </h2>
                <span className="text-sm text-gray-500">
                  {categoryImages.length} slika
                </span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {categoryImages.map((img) => (
                  <div
                    key={img.id}
                    className="group relative aspect-square rounded-lg overflow-hidden bg-gray-100"
                  >
                    <Image
                      src={img.path}
                      alt={img.alt || img.projectTitle}
                      fill
                      className="object-cover"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors">
                      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        {/* Project link */}
                        <Link
                          href={`/admin/projects/${img.projectId}`}
                          className="text-white text-xs bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg mb-2 hover:bg-white/30 transition-colors flex items-center gap-1"
                        >
                          <FolderOpen size={12} />
                          {img.projectTitle}
                        </Link>
                        
                        {/* Delete button */}
                        <button
                          onClick={() => handleDelete(img.id)}
                          disabled={deleting === img.id}
                          className="text-white bg-red-500/80 hover:bg-red-600 px-3 py-1.5 rounded-lg text-xs transition-colors disabled:opacity-50 flex items-center gap-1"
                        >
                          {deleting === img.id ? (
                            <Loader2 size={12} className="animate-spin" />
                          ) : (
                            <Trash2 size={12} />
                          )}
                          Obriši
                        </button>
                      </div>
                    </div>

                    {/* Cover badge */}
                    {img.isCover && (
                      <div className="absolute top-2 left-2 bg-wood text-white text-xs px-2 py-0.5 rounded">
                        Cover
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info box */}
      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          <strong>💡 Savjet:</strong> Slike se dodaju kroz projekte. 
          <Link href="/admin/projects" className="underline ml-1">
            Idi na projekte
          </Link>
          {' '}da dodaš nove slike ili urediš postojeće.
        </p>
      </div>
    </div>
  );
}