'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    fetch('/api/user')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.id) setUser(data);
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600 flex items-center gap-2">
          🎮 AI小游戏
        </Link>
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="text-gray-600 hover:text-blue-600 transition hidden md:block">
            首页
          </Link>
          <Link href="/games" className="text-gray-600 hover:text-blue-600 transition">
            游戏广场
          </Link>
          <Link href="/upload" className="text-gray-600 hover:text-blue-600 transition">
            发布游戏
          </Link>
          {user ? (
            <>
              <Link href={`/my-games`} className="text-gray-600 hover:text-blue-600 transition text-sm">
                我的游戏
              </Link>
              <Link href={`/my-favorites`} className="text-gray-600 hover:text-blue-600 transition text-sm">
                收藏
              </Link>
              <Link href={`/user/${user.name}`} className="text-blue-600 font-medium hover:underline">
                {user.name}
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-500 transition text-sm"
              >
                退出
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 hover:text-blue-600 transition">
                登录
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
              >
                注册
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
