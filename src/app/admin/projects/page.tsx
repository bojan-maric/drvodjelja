// src/app/admin/projects/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ImageIcon, 
  Star,
  Loader2,
  Filter
} from 'lucide-react';
import { SimpleToast } from '@/components/ui/Toast';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string;
  featured: boolean;
  order: number;
  createdAt: string;
  images: { id: string; path: string; isCover: boolean }[];
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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  
  // Delete state
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState(false);
  
  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    
    setDeleting(true);
    try {
      const res = await fetch(`/api/projects/${deleteTarget.id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects(projects.filter((p) => p.id !== deleteTarget.id));
        setToast({ message: 'Projekt uspješno obrisan', type: 'success' });
      } else {
        setToast({ message: 'Greška pri brisanju projekta', type: 'error' });
      }
    } catch (error) {
      console.error('Delete error:', error);
      setToast({ message: 'Greška pri brisanju projekta', type: 'error' });
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const handleCloseToast = useCallback(() => setToast(null), []);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || project.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCoverImage = (project: Project) => {
    const cover = project.images.find((img) => img.isCover);
    return cover?.path || project.images[0]?.path;
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
      {/* Toast Notification */}
      {toast && (
        <SimpleToast 
          message={toast.message} 
          type={toast.type} 
          onClose={handleCloseToast}
        />
      )}

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Obriši projekt"
        message={`Jeste li sigurni da želite obrisati "${deleteTarget?.title}"? Ova akcija je nepovratna.`}
        confirmText="Obriši"
        cancelText="Odustani"
        variant="danger"
        loading={deleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projekti</h1>
          <p className="text-gray-500 mt-1">
            {projects.length} {projects.length === 1 ? 'projekt' : 'projekata'}
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 bg-wood text-white px-5 py-2.5 rounded-lg hover:bg-wood-dark transition-colors"
        >
          <Plus size={20} />
          Novi projekt
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Pretraži projekte..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wood/20 focus:border-wood"
            />
          </div>
          <div className="relative sm:w-48">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wood/20 focus:border-wood appearance-none bg-white"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid/List */}
      {filteredProjects.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">
            {searchTerm || categoryFilter
              ? 'Nema projekata koji odgovaraju pretrazi'
              : 'Još nema projekata'}
          </p>
          {!searchTerm && !categoryFilter && (
            <Link
              href="/admin/projects/new"
              className="text-wood hover:text-wood-dark"
            >
              Dodaj prvi projekt →
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                {getCoverImage(project) ? (
                  <Image
                    src={getCoverImage(project)!}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-gray-300" />
                  </div>
                )}
                {project.featured && (
                  <div className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                    <Star size={12} fill="currentColor" />
                    Istaknuto
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs text-gray-600">
                  {project.images.length} slika
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-1">
                    {project.title}
                  </h3>
                  <span className="text-xs bg-wood/10 text-wood px-2 py-1 rounded-full whitespace-nowrap">
                    {categoryLabels[project.category] || project.category}
                  </span>
                </div>
                {project.description && (
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                    {project.description}
                  </p>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 text-sm text-wood hover:text-wood-dark py-2 rounded-lg hover:bg-wood/5 transition-colors"
                  >
                    <Edit size={16} />
                    Uredi
                  </Link>
                  <button
                    onClick={() => setDeleteTarget(project)}
                    className="flex-1 inline-flex items-center justify-center gap-2 text-sm text-red-600 hover:text-red-700 py-2 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                    Obriši
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
