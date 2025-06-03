'use client';

import { useRouter } from 'next/navigation'; // nếu dùng React thuần: `react-router-dom`
import React from 'react';

export default function HomePage() {
  const router = useRouter();

  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Chào mừng đến với Web
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Đây là trang chủ
        </p>
        <button
          onClick={goToLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow"
        >
          Đăng nhập
        </button>
      </div>
    </main>
  );
}
