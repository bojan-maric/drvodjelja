// src/app/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FolderOpen, 
  Settings, 
  ExternalLink, 
  Mail, 
  Wrench, 
  ImageIcon,
  Clock,
  ArrowRight,
  User,
  Loader2
} from 'lucide-react';

interface Stats {
  projects: number;
  images: number;
  services: number;
  newInquiries: number;
  totalInquiries: number;
}

interface RecentInquiry {
  id: string;
  name: string;
  email: string;
  service: string | null;
  createdAt: string;
}

interface RecentProject {
  id: string;
  title: string;
  category: string;
  createdAt: string;
  images: { path: string }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentInquiries, setRecentInquiries] = useState<RecentInquiry[]>([]);
  const [recentProjects, setRecentProjects] = useState<RecentProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setRecentInquiries(data.recentInquiries);
        setRecentProjects(data.recentProjects);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('hr-HR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
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
    return formatDate(dateStr);
  };

  const categoryLabels: Record<string, string> = {
    kuhinje: 'Kuhinje',
    vrata: 'Vrata i prozori',
    namjestaj: 'Namještaj',
    stepenice: 'Stepenice',
    ostalo: 'Ostalo',
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
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Dobrodošli u admin panel</p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-wood hover:text-wood-dark transition-colors"
        >
          <span className="text-sm">Pregled stranice</span>
          <ExternalLink size={16} />
        </a>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-wood/10 rounded-xl">
              <FolderOpen className="text-wood" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Projekti</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.projects ?? 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-wood-light/20 rounded-xl">
              <ImageIcon className="text-wood-light" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Slike</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.images ?? 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-wood-dark/10 rounded-xl">
              <Wrench className="text-wood-dark" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Usluge</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.services ?? 0}</p>
            </div>
          </div>
        </div>

        <Link 
          href="/admin/inquiries"
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:border-green-200 hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
              <Mail className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Novi upiti</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.newInquiries ?? 0}</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Nedavni upiti</h2>
            <Link 
              href="/admin/inquiries"
              className="text-sm text-wood hover:text-wood-dark flex items-center gap-1"
            >
              Svi upiti
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentInquiries.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-400">
                <Mail className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Nema novih upita</p>
              </div>
            ) : (
              recentInquiries.map((inquiry) => (
                <Link
                  key={inquiry.id}
                  href={`/admin/inquiries?id=${inquiry.id}`}
                  className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-wood/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-wood" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{inquiry.name}</p>
                    <p className="text-sm text-gray-500 truncate">{inquiry.email}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock size={12} />
                      {formatTimeAgo(inquiry.createdAt)}
                    </p>
                    {inquiry.service && (
                      <span className="text-xs text-wood bg-wood/10 px-2 py-0.5 rounded-full">
                        {inquiry.service}
                      </span>
                    )}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Nedavni projekti</h2>
            <Link 
              href="/admin/projects"
              className="text-sm text-wood hover:text-wood-dark flex items-center gap-1"
            >
              Svi projekti
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentProjects.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-400">
                <FolderOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Nema projekata</p>
                <Link 
                  href="/admin/projects/new"
                  className="text-wood hover:text-wood-dark text-sm mt-2 inline-block"
                >
                  Dodaj prvi projekt →
                </Link>
              </div>
            ) : (
              recentProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/admin/projects/${project.id}`}
                  className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                    {project.images[0] ? (
                      <Image
                        src={project.images[0].path}
                        alt={project.title}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-5 h-5 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{project.title}</p>
                    <p className="text-sm text-gray-500">
                      {categoryLabels[project.category] || project.category}
                    </p>
                  </div>
                  <div className="text-xs text-gray-400">
                    {formatDate(project.createdAt)}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg font-semibold text-gray-900 mt-8 mb-4">Brze akcije</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/admin/projects/new"
          className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-all border border-gray-100 hover:border-wood/30 flex items-center gap-4 group"
        >
          <div className="p-2 bg-wood/10 rounded-lg group-hover:bg-wood/20 transition-colors">
            <FolderOpen className="text-wood" size={20} />
          </div>
          <div>
            <p className="font-medium text-gray-900">Novi projekt</p>
            <p className="text-sm text-gray-500">Dodaj novi rad</p>
          </div>
        </Link>

        <Link
          href="/admin/inquiries"
          className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-all border border-gray-100 hover:border-wood/30 flex items-center gap-4 group"
        >
          <div className="p-2 bg-wood/10 rounded-lg group-hover:bg-wood/20 transition-colors">
            <Mail className="text-wood" size={20} />
          </div>
          <div>
            <p className="font-medium text-gray-900">Upiti</p>
            <p className="text-sm text-gray-500">Pregled poruka</p>
          </div>
        </Link>

        <Link
          href="/admin/services"
          className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-all border border-gray-100 hover:border-wood/30 flex items-center gap-4 group"
        >
          <div className="p-2 bg-wood/10 rounded-lg group-hover:bg-wood/20 transition-colors">
            <Wrench className="text-wood" size={20} />
          </div>
          <div>
            <p className="font-medium text-gray-900">Usluge</p>
            <p className="text-sm text-gray-500">Uredi usluge</p>
          </div>
        </Link>

        <Link
          href="/admin/settings"
          className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-all border border-gray-100 hover:border-wood/30 flex items-center gap-4 group"
        >
          <div className="p-2 bg-wood/10 rounded-lg group-hover:bg-wood/20 transition-colors">
            <Settings className="text-wood" size={20} />
          </div>
          <div>
            <p className="font-medium text-gray-900">Postavke</p>
            <p className="text-sm text-gray-500">Kontakt info</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
