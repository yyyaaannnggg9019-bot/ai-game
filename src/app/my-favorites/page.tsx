'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import GameCard from '@/components/GameCard';

export default function MyFavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/user').then((r) => (r.ok ? r.json() : null)).catch(() => null),
      fetch('/api/user/favorites').then((r) => (r.ok ? r.json() : [])).catch(() => []),
    ]).then(([userData, favData]) => {
      setUser(userData);
      setFavorites(favData);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-center py-16 text-gray-400">加载中...</div>;
  if (!user) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-gray-500 mb-4">请先登录</p>
        <Link href="/login" className="text-blue-600 hover:underline">去登录</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6">⭐ 我的收藏</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-xl mb-2">📭</p>
          <p>还没有收藏游戏</p>
          <Link href="/games" className="text-blue-600 hover:underline mt-4 inline-block">
            去探索
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((game: any) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}
