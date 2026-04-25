'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import GameCard from '@/components/GameCard';

export default function UserProfilePage() {
  const params = useParams();
  const username = params.username as string;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users/${username}`)
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  if (loading) return <div className="text-center py-16 text-gray-400">加载中...</div>;
  if (!data?.user) return <div className="text-center py-16 text-gray-400">用户不存在</div>;

  const { user, games } = data;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            {user.bio && <p className="text-gray-500 mt-1">{user.bio}</p>}
            <div className="flex gap-4 mt-2 text-sm text-gray-400">
              <span>🎮 {user._count.games} 个游戏</span>
              <span>❤️ {user._count.likes} 次获赞</span>
              <span>📅 加入于 {new Date(user.createdAt).toLocaleDateString('zh-CN')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Games */}
      <h2 className="text-xl font-bold mb-4">发布的游戏 ({games.length})</h2>
      {games.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-xl mb-2">📭</p>
          <p>还没有发布游戏</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game: any) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}
