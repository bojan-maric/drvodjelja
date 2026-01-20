// src/app/admin/layout.tsx
'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Home, Image, Settings, LogOut, FolderOpen, Mail, Wrench } from 'lucide-react';
import { AuthProvider } from '@/components/providers/AuthProvider';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/projects', label: 'Projekti', icon: FolderOpen },
  { href: '/admin/services', label: 'Usluge', icon: Wrench },
  { href: '/admin/inquiries', label: 'Upiti', icon: Mail },
  { href: '/admin/settings', label: 'Postavke', icon: Settings },
];

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === 'unauthenticated' && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [status, pathname, router]);

  // Login page - no layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Loading
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-wood"></div>
      </div>
    );
  }

  // Not authenticated
  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-md">
        <div className="p-6 border-b">
          <h1 className="text-xl font-serif font-bold text-wood">Drvodjelja</h1>
          <p className="text-sm text-gray-500 mt-1">{session.user.email}</p>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                      isActive
                        ? 'bg-wood text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center gap-3 px-4 py-2 w-full text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            <LogOut size={20} />
            Odjava
          </button>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AuthProvider>
  );
}
