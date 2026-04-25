'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import GameCard from '@/components/GameCard';

export default function HomePage() {
  const [data, setData] = useState<{ trending: any[]; recent: any[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/home')
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            🎮 AI 小游戏平台
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
            分享你制作的 AI 小游戏，让全世界玩家在线畅玩
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/games"
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold text-lg hover:bg-blue-50 transition shadow-lg"
            >
              探索游戏
            </Link>
            <Link
              href="/upload"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-white/10 transition"
            >
              发布游戏
            </Link>
          </div>
        </div>
      </section>

      {/* Game Menu - Direct Access */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">🎮 快速游玩</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Link href="/games" className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition text-center group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🔥</div>
              <h3 className="font-semibold text-lg">热门游戏</h3>
              <p className="text-gray-500 text-sm mt-1">最受欢迎的游戏</p>
            </Link>
            
            <Link href="/games?category=文字冒险" className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition text-center group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">⚔️</div>
              <h3 className="font-semibold text-lg">文字冒险</h3>
              <p className="text-gray-500 text-sm mt-1">剧情丰富的冒险游戏</p>
            </Link>
            
            <Link href="/games?category=解谜" className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition text-center group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🧠</div>
              <h3 className="font-semibold text-lg">解谜游戏</h3>
              <p className="text-gray-500 text-sm mt-1">考验智力的益智挑战</p>
            </Link>
            
            <Link href="/games?category=对战" className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition text-center group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">⚔️</div>
              <h3 className="font-semibold text-lg">对战游戏</h3>
              <p className="text-gray-500 text-sm mt-1">多人竞技对战</p>
            </Link>
            
            <Link href="/games?category=策略" className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition text-center group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">♟️</div>
              <h3 className="font-semibold text-lg">策略游戏</h3>
              <p className="text-gray-500 text-sm mt-1">需要策略思维的游戏</p>
            </Link>
            
            <Link href="/games?category=休闲" className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition text-center group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🍃</div>
              <h3 className="font-semibold text-lg">休闲游戏</h3>
              <p className="text-gray-500 text-sm mt-1">轻松愉快的小游戏</p>
            </Link>
            
            <Link href="/games?category=角色扮演" className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition text-center group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🧙</div>
              <h3 className="font-semibold text-lg">角色扮演</h3>
              <p className="text-gray-500 text-sm mt-1">沉浸式角色体验</p>
            </Link>
            
            <Link href="/games?category=其他" className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition text-center group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🎲</div>
              <h3 className="font-semibold text-lg">其他类型</h3>
              <p className="text-gray-500 text-sm mt-1">更多有趣游戏</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Games */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">🔥 热门游戏</h2>
          <Link href="/games" className="text-blue-600 hover:underline">
            查看全部 →
          </Link>
        </div>
        {loading ? (
          <div className="text-center py-8 text-gray-400">加载中...</div>
        ) : data?.trending && data.trending.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.trending.map((game: any) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <p>暂无游戏，快来发布第一个吧！</p>
          </div>
        )}
      </section>

      {/* Recent Games */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">🆕 最新游戏</h2>
            <Link href="/games" className="text-blue-600 hover:underline">
              查看全部 →
            </Link>
          </div>
          {loading ? (
            <div className="text-center py-8 text-gray-400">加载中...</div>
          ) : data?.recent && data.recent.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data.recent.map((game: any) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p>暂无游戏</p>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">平台特色</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2">快速发布</h3>
            <p className="text-gray-600">上传你的游戏文件，一键发布到平台</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">在线游玩</h3>
            <p className="text-gray-600">玩家无需下载，浏览器直接开玩</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition text-center">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold mb-2">社区互动</h3>
            <p className="text-gray-600">评论、点赞、收藏，与玩家交流</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">准备好分享你的创意了吗？</h2>
          <p className="text-xl text-blue-100 mb-8">注册账号，开始你的创作之旅</p>
          <Link
            href="/register"
            className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold text-lg hover:bg-blue-50 transition inline-block"
          >
            立即注册
          </Link>
        </div>
      </section>
    </div>
  );
}
