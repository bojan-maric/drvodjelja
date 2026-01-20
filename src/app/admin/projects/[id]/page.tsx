// src/app/admin/projects/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Save, 
  Loader2, 
  Upload, 
  X, 
  Star, 
  Trash2,
  ImageIcon,
  ExternalLink
} from 'lucide-react';

interface ProjectImage {
  id: string;
  filename: string;
  path: string;
  alt: string | null;
  isCover: boolean;
  order: number;
}

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string;
  featured: boolean;
  order: number;
  images: ProjectImage[];
}

const categories = [
  { value: 'kuhinje', label: 'Kuhinje' },
  { value: 'vrata', label: 'Vrata i prozori' },
  { value: 'namjestaj', label: 'Namještaj' },
  { value: 'stepenice', label: 'Stepenice' },
  { value: 'ostalo', label: 'Ostalo' },
];

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const [project, setProject] = useState<Project | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('kuhinje');
  const [featured, setFeatured] = useState(false);
  const [images, setImages] = useState<ProjectImage[]>([]);

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/projects/${projectId}`);
      if (!res.ok) {
        if (res.status === 404) {
          router.push('/admin/projects');
          return;
        }
        throw new Error('Failed to fetch');
      }
      const data = await res.json();
      setProject(data);
      setTitle(data.title);
      setDescription(data.description || '');
      setCategory(data.category);
      setFeatured(data.featured);
      setImages(data.images);
    } catch (error) {
      console.error('Error fetching project:', error);
      setError('Greška pri učitavanju projekta');
    } finally {
      setLoading(false);
    }
  };

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

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadRes.ok) {
          const data = await uploadRes.json();
          throw new Error(data.error || 'Upload failed');
        }

        const uploadData = await uploadRes.json();

        // Dodaj sliku u bazu
        const imageRes = await fetch(`/api/projects/${projectId}/images`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: uploadData.filename,
            path: uploadData.path,
            isCover: images.length === 0,
            order: images.length,
          }),
        });

        if (imageRes.ok) {
          const newImage = await imageRes.json();
          setImages((prev) => [...prev, newImage]);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Greška pri uploadu');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const removeImage = async (imageId: string) => {
    if (!confirm('Obrisati ovu sliku?')) return;

    try {
      const res = await fetch(`/api/images/${imageId}`, { method: 'DELETE' });
      if (res.ok) {
        setImages((prev) => {
          const filtered = prev.filter((img) => img.id !== imageId);
          // Ako smo uklonili cover, postavi novu prvu sliku kao cover
          if (filtered.length > 0 && !filtered.some((img) => img.isCover)) {
            filtered[0].isCover = true;
            // Update u bazi
            fetch(`/api/images/${filtered[0].id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ isCover: true }),
            });
          }
          return filtered;
        });
      }
    } catch (error) {
      console.error('Delete image error:', error);
    }
  };

  const setCover = async (imageId: string) => {
    try {
      const res = await fetch(`/api/images/${imageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCover: true }),
      });

      if (res.ok) {
        setImages((prev) =>
          prev.map((img) => ({
            ...img,
            isCover: img.id === imageId,
          }))
        );
      }
    } catch (error) {
      console.error('Set cover error:', error);
    }
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
      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
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
        throw new Error(data.error || 'Greška pri spremanju');
      }

      router.push('/admin/projects');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Greška pri spremanju');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Jeste li sigurni da želite obrisati ovaj projekt? Ova akcija je nepovratna.')) {
      return;
    }

    try {
      const res = await fetch(`/api/projects/${projectId}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/admin/projects');
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      setError('Greška pri brisanju projekta');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-wood" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Projekt nije pronađen</p>
        <Link href="/admin/projects" className="text-wood hover:text-wood-dark mt-4 inline-block">
          ← Natrag na projekte
        </Link>
      </div>
    );
  }

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
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Uredi projekt</h1>
          <a
            href={`/galerija#${project.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-wood hover:text-wood-dark flex items-center gap-1"
          >
            Pregled
            <ExternalLink size={14} />
          </a>
        </div>
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
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={project.slug}
                    disabled
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">
                Slike ({images.length})
              </h2>

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
                    <p className="text-gray-600 font-medium">Dodaj nove slike</p>
                    <p className="text-sm text-gray-400 mt-1">JPG, PNG, WebP do 10MB</p>
                  </div>
                )}
              </label>

              {/* Image Grid */}
              {images.length > 0 ? (
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
                        alt={img.alt || ''}
                        fill
                        className="object-cover"
                      />

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
                            title="Obriši"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>

                      {img.isCover && (
                        <div className="absolute bottom-2 left-2 bg-wood text-white text-xs px-2 py-1 rounded">
                          Naslovna
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Nema slika</p>
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
                  <p className="text-sm text-gray-500">Prikaži na naslovnici</p>
                </div>
              </label>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-3">
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
                    Spremi promjene
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="w-full inline-flex items-center justify-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-5 py-3 rounded-lg transition-colors"
              >
                <Trash2 size={20} />
                Obriši projekt
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
