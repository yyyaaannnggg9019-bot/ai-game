'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function PlayPage() {
  const params = useParams();
  const id = params.id as string;
  const [gameUrl, setGameUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In production, this would fetch the actual game URL from the database
    // For now, we'll use a placeholder
    setGameUrl(`/games/${id}/index.html`);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-4xl mb-4">🎮</div>
          <p className="text-gray-400">加载游戏中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-gray-900 text-white px-4 py-2 flex items-center justify-between">
        <span className="font-semibold">🎮 正在游玩</span>
        <a href={`/games/${id}`} className="text-sm text-blue-300 hover:text-blue-200">
          返回详情页
        </a>
      </div>
      <iframe
        src={gameUrl}
        className="flex-1 w-full border-0"
        title="Game Player"
        allow="fullscreen"
      />
    </div>
  );
}
