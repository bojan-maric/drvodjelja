// src/app/admin/services/page.tsx
'use client';

import { useEffect, useState, useCallback } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Loader2,
  Check,
  X,
  Wrench,
  Save
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { SimpleToast } from '@/components/ui/Toast';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string;
  order: number;
  active: boolean;
}

const availableIcons = [
  'Wrench', 'Hammer', 'ChefHat', 'DoorOpen', 'Sofa', 'Stairs', 
  'Home', 'Building', 'Ruler', 'Pencil', 'PaintBucket', 'Drill',
  'Axe', 'TreeDeciduous', 'Package', 'Box', 'Settings', 'Star'
];

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Edit/New state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'Wrench',
    active: true,
  });

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/services');
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNew = () => {
    setIsNew(true);
    setEditingId(null);
    setFormData({ name: '', description: '', icon: 'Wrench', active: true });
  };

  const handleEdit = (service: Service) => {
    setIsNew(false);
    setEditingId(service.id);
    setFormData({
      name: service.name,
      description: service.description || '',
      icon: service.icon,
      active: service.active,
    });
  };

  const handleCancel = () => {
    setIsNew(false);
    setEditingId(null);
    setFormData({ name: '', description: '', icon: 'Wrench', active: true });
  };

  const handleSave = async () => {
    if (!formData.name.trim()) return;

    setSaving(true);
    try {
      if (isNew) {
        const res = await fetch('/api/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const newService = await res.json();
          setServices([...services, newService]);
          setToast({ message: 'Usluga uspješno dodana', type: 'success' });
        }
      } else if (editingId) {
        const res = await fetch(`/api/services/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const updated = await res.json();
          setServices(services.map((s) => (s.id === editingId ? updated : s)));
          setToast({ message: 'Usluga uspješno ažurirana', type: 'success' });
        }
      }
      handleCancel();
    } catch (error) {
      console.error('Save error:', error);
      setToast({ message: 'Greška pri spremanju', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/services/${deleteTarget.id}`, { method: 'DELETE' });
      if (res.ok) {
        setServices(services.filter((s) => s.id !== deleteTarget.id));
        setToast({ message: 'Usluga uspješno obrisana', type: 'success' });
      } else {
        setToast({ message: 'Greška pri brisanju', type: 'error' });
      }
    } catch (error) {
      console.error('Delete error:', error);
      setToast({ message: 'Greška pri brisanju', type: 'error' });
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const toggleActive = async (service: Service) => {
    try {
      const res = await fetch(`/api/services/${service.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !service.active }),
      });
      if (res.ok) {
        const updated = await res.json();
        setServices(services.map((s) => (s.id === service.id ? updated : s)));
        setToast({ 
          message: updated.active ? 'Usluga aktivirana' : 'Usluga deaktivirana', 
          type: 'success' 
        });
      }
    } catch (error) {
      console.error('Toggle error:', error);
    }
  };

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[iconName];
    return Icon ? <Icon size={20} /> : <Wrench size={20} />;
  };

  const handleCloseToast = useCallback(() => setToast(null), []);

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
        title="Obriši uslugu"
        message={`Jeste li sigurni da želite obrisati uslugu "${deleteTarget?.name}"?`}
        confirmText="Obriši"
        cancelText="Odustani"
        variant="danger"
        loading={deleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Usluge</h1>
          <p className="text-gray-500 mt-1">Upravljajte uslugama koje nudite</p>
        </div>
        {!isNew && !editingId && (
          <button
            onClick={handleNew}
            className="inline-flex items-center gap-2 bg-wood text-white px-5 py-2.5 rounded-lg hover:bg-wood-dark transition-colors"
          >
            <Plus size={20} />
            Nova usluga
          </button>
        )}
      </div>

      {/* New/Edit Form */}
      {(isNew || editingId) && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">
            {isNew ? 'Nova usluga' : 'Uredi uslugu'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Naziv *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wood/20 focus:border-wood"
                placeholder="npr. Kuhinje po mjeri"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ikona
              </label>
              <div className="flex flex-wrap gap-2 p-2 border border-gray-200 rounded-lg max-h-24 overflow-y-auto">
                {availableIcons.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon })}
                    className={`p-2 rounded-lg transition-colors ${
                      formData.icon === icon
                        ? 'bg-wood text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    title={icon}
                  >
                    {getIcon(icon)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Opis
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-wood/20 focus:border-wood resize-none"
              placeholder="Kratki opis usluge..."
            />
          </div>

          <div className="flex items-center gap-4 mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-4 h-4 text-wood border-gray-300 rounded focus:ring-wood"
              />
              <span className="text-sm text-gray-700">Aktivna usluga</span>
            </label>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={saving || !formData.name.trim()}
              className="inline-flex items-center gap-2 bg-wood text-white px-5 py-2.5 rounded-lg hover:bg-wood-dark transition-colors disabled:opacity-50"
            >
              {saving ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {isNew ? 'Dodaj uslugu' : 'Spremi promjene'}
            </button>
            <button
              onClick={handleCancel}
              className="px-5 py-2.5 text-gray-600 hover:text-gray-800"
            >
              Odustani
            </button>
          </div>
        </div>
      )}

      {/* Services List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {services.length === 0 ? (
          <div className="p-12 text-center">
            <Wrench className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Još nema usluga</p>
            <button
              onClick={handleNew}
              className="text-wood hover:text-wood-dark"
            >
              Dodaj prvu uslugu →
            </button>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Usluga
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Opis
                </th>
                <th className="text-center px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Akcije
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${service.active ? 'bg-wood/10 text-wood' : 'bg-gray-100 text-gray-400'}`}>
                        {getIcon(service.icon)}
                      </div>
                      <div>
                        <p className={`font-medium ${service.active ? 'text-gray-900' : 'text-gray-400'}`}>
                          {service.name}
                        </p>
                        <p className="text-xs text-gray-400 md:hidden line-clamp-1">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <p className={`text-sm line-clamp-2 ${service.active ? 'text-gray-600' : 'text-gray-400'}`}>
                      {service.description || '-'}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleActive(service)}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        service.active
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {service.active ? (
                        <>
                          <Check size={12} />
                          Aktivna
                        </>
                      ) : (
                        <>
                          <X size={12} />
                          Neaktivna
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(service)}
                        className="p-2 text-gray-400 hover:text-wood hover:bg-wood/10 rounded-lg transition-colors"
                        title="Uredi"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(service)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Obriši"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
