'use client';

import { useState, useEffect } from 'react';
import GameCard from '@/components/GameCard';
import { useSearchParams } from 'next/navigation';

const CATEGORIES = ['全部', '文字冒险', '解谜', '对战', '策略', '休闲', '角色扮演', '其他'];

export default function GamesPageWrapper() {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('全部');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('latest');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();

  const fetchGames = async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      limit: '12',
      category: category === '全部' ? '' : category,
      search,
      sort,
    });
    try {
      const res = await fetch(`/api/games?${params}`);
      const data = await res.json();
      setGames(data.games || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 从URL参数中获取初始分类
    const initialCategory = searchParams.get('category') || '全部';
    if (initialCategory && CATEGORIES.includes(initialCategory)) {
      setCategory(initialCategory);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchGames();
  }, [category, search, sort, page]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6">🎮 游戏广场</h1>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border mb-6">
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="搜索游戏..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="flex-1 min-w-[200px] px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="latest">最新发布</option>
            <option value="popular">最多浏览</option>
          </select>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mt-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setPage(1); }}
              className={`px-4 py-1.5 rounded-full text-sm transition ${
                category === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Games Grid */}
      {loading ? (
        <div className="text-center py-16 text-gray-400">加载中...</div>
      ) : games.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-xl mb-2">🎮</p>
          <p>暂无游戏</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            上一页
          </button>
          <span className="px-4 py-2 text-gray-600">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            下一页
          </button>
        </div>
      )}
    </div>
  );
}
