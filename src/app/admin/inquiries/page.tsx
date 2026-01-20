// src/app/admin/inquiries/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Mail, 
  User, 
  Phone, 
  Calendar,
  Clock,
  Loader2,
  Inbox,
  CheckCircle,
  Archive,
  Trash2,
  ChevronRight,
  X,
  ExternalLink,
  Filter
} from 'lucide-react';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  status: 'new' | 'replied' | 'archived';
  createdAt: string;
  updatedAt: string;
}

const statusLabels: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: 'Novi', color: 'text-blue-700', bg: 'bg-blue-100' },
  replied: { label: 'Odgovoreno', color: 'text-green-700', bg: 'bg-green-100' },
  archived: { label: 'Arhivirano', color: 'text-gray-500', bg: 'bg-gray-100' },
};

export default function InquiriesPage() {
  const searchParams = useSearchParams();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setSelectedId(id);
    }
  }, [searchParams]);

  const fetchInquiries = async () => {
    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const updated = await res.json();
        setInquiries(inquiries.map((i) => (i.id === id ? updated : i)));
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Jeste li sigurni da želite obrisati ovaj upit?')) return;

    setDeleting(id);
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries(inquiries.filter((i) => i.id !== id));
        if (selectedId === id) setSelectedId(null);
      }
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setDeleting(null);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('hr-HR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `prije ${diffMins} min`;
    if (diffHours < 24) return `prije ${diffHours}h`;
    if (diffDays < 7) return `prije ${diffDays} dana`;
    return date.toLocaleDateString('hr-HR');
  };

  const filteredInquiries = inquiries.filter((inquiry) => {
    if (!filter) return true;
    return inquiry.status === filter;
  });

  const selectedInquiry = inquiries.find((i) => i.id === selectedId);

  const newCount = inquiries.filter((i) => i.status === 'new').length;

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
          <h1 className="text-2xl font-bold text-gray-900">Upiti</h1>
          <p className="text-gray-500 mt-1">
            {newCount > 0 ? (
              <span className="text-blue-600 font-medium">{newCount} novih upita</span>
            ) : (
              'Nema novih upita'
            )}
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-400" />
          <span className="text-sm text-gray-500 mr-2">Filter:</span>
          <button
            onClick={() => setFilter('')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              filter === '' ? 'bg-wood text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Svi ({inquiries.length})
          </button>
          <button
            onClick={() => setFilter('new')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              filter === 'new' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Novi ({inquiries.filter((i) => i.status === 'new').length})
          </button>
          <button
            onClick={() => setFilter('replied')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              filter === 'replied' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Odgovoreno ({inquiries.filter((i) => i.status === 'replied').length})
          </button>
          <button
            onClick={() => setFilter('archived')}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              filter === 'archived' ? 'bg-gray-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Arhiva ({inquiries.filter((i) => i.status === 'archived').length})
          </button>
        </div>
      </div>

      {filteredInquiries.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <Inbox className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">
            {filter ? `Nema upita sa statusom "${statusLabels[filter]?.label}"` : 'Nema upita'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inquiry List */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
              {filteredInquiries.map((inquiry) => (
                <button
                  key={inquiry.id}
                  onClick={() => setSelectedId(inquiry.id)}
                  className={`w-full text-left px-4 py-4 hover:bg-gray-50 transition-colors ${
                    selectedId === inquiry.id ? 'bg-wood/5 border-l-4 border-wood' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`w-2 h-2 rounded-full ${
                          inquiry.status === 'new' ? 'bg-blue-500' : 
                          inquiry.status === 'replied' ? 'bg-green-500' : 'bg-gray-400'
                        }`} />
                        <p className="font-medium text-gray-900 truncate">
                          {inquiry.name}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{inquiry.email}</p>
                      <p className="text-sm text-gray-400 line-clamp-1 mt-1">
                        {inquiry.message}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-gray-400">{formatTimeAgo(inquiry.createdAt)}</p>
                      {inquiry.service && (
                        <span className="text-xs text-wood bg-wood/10 px-2 py-0.5 rounded mt-1 inline-block">
                          {inquiry.service}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-2">
            {selectedInquiry ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-100">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-semibold text-gray-900">
                        {selectedInquiry.name}
                      </h2>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        statusLabels[selectedInquiry.status].bg
                      } ${statusLabels[selectedInquiry.status].color}`}>
                        {statusLabels[selectedInquiry.status].label}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(selectedInquiry.createdAt)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedId(null)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Mail className="text-wood" size={20} />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-900">{selectedInquiry.email}</p>
                    </div>
                    <ExternalLink size={14} className="text-gray-400 ml-auto" />
                  </a>
                  {selectedInquiry.phone && (
                    <a
                      href={`tel:${selectedInquiry.phone}`}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Phone className="text-wood" size={20} />
                      <div>
                        <p className="text-xs text-gray-500">Telefon</p>
                        <p className="text-sm font-medium text-gray-900">{selectedInquiry.phone}</p>
                      </div>
                      <ExternalLink size={14} className="text-gray-400 ml-auto" />
                    </a>
                  )}
                </div>

                {/* Service */}
                {selectedInquiry.service && (
                  <div className="mb-6">
                    <p className="text-xs text-gray-500 mb-1">Zainteresiran za</p>
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-wood/10 text-wood rounded-lg text-sm font-medium">
                      {selectedInquiry.service}
                    </span>
                  </div>
                )}

                {/* Message */}
                <div className="mb-6">
                  <p className="text-xs text-gray-500 mb-2">Poruka</p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedInquiry.message}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
                  {selectedInquiry.status !== 'replied' && (
                    <button
                      onClick={() => updateStatus(selectedInquiry.id, 'replied')}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <CheckCircle size={18} />
                      Označi kao odgovoreno
                    </button>
                  )}
                  {selectedInquiry.status !== 'archived' && (
                    <button
                      onClick={() => updateStatus(selectedInquiry.id, 'archived')}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Archive size={18} />
                      Arhiviraj
                    </button>
                  )}
                  {selectedInquiry.status === 'archived' && (
                    <button
                      onClick={() => updateStatus(selectedInquiry.id, 'new')}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Inbox size={18} />
                      Vrati u inbox
                    </button>
                  )}
                  <button
                    onClick={() => deleteInquiry(selectedInquiry.id)}
                    disabled={deleting === selectedInquiry.id}
                    className="inline-flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-auto disabled:opacity-50"
                  >
                    {deleting === selectedInquiry.id ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Trash2 size={18} />
                    )}
                    Obriši
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Odaberite upit za pregled detalja</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
