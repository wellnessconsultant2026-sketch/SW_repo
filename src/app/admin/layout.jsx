'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Providers from '@/components/common/Providers';
import AdminLayout from '@/views/admin/AdminLayout';
import ProtectedRoute from '@/components/common/ProtectedRoute';

export default function AdminRootLayout({ children }) {
  const pathname = usePathname() || '';
  const isLoginPage = pathname === '/admin/login';

  return (
    <Providers initialLang="en">
      {isLoginPage ? (
        children
      ) : (
        <ProtectedRoute>
          <AdminLayout>
            {children}
          </AdminLayout>
        </ProtectedRoute>
      )}
    </Providers>
  );
}
