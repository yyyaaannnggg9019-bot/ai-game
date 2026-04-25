'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function GameDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [game, setGame] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [commentText, setCommentText] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      fetch(`/api/games/${id}`).then((r) => r.json()),
      fetch(`/api/games/${id}/comments`).then((r) => r.json()),
      fetch('/api/user').then((r) => r.ok ? r.json() : null).catch(() => null),
    ]).then(([gameData, commentsData, userData]) => {
      setGame(gameData);
      setComments(commentsData);
      setUser(userData);
      setLoading(false);
    });
  }, [id]);

  const handleLike = async () => {
    if (!user) { alert('请先登录'); return; }
    const res = await fetch(`/api/games/${id}/like`, { method: 'POST' });
    const data = await res.json();
    setGame((prev: any) => ({
      ...prev,
      isLiked: data.liked,
      _count: { ...prev._count, likes: prev._count.likes + (data.liked ? 1 : -1) },
    }));
  };

  const handleFavorite = async () => {
    if (!user) { alert('请先登录'); return; }
    const res = await fetch(`/api/games/${id}/favorite`, { method: 'POST' });
    const data = await res.json();
    setGame((prev: any) => ({ ...prev, isFavorited: data.favorited }));
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const res = await fetch(`/api/games/${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: commentText }),
    });
    if (res.ok) {
      const comment = await res.json();
      setComments([comment, ...comments]);
      setCommentText('');
    }
  };

  if (loading) return <div className="text-center py-16 text-gray-400">加载中...</div>;
  if (!game?.id) return <div className="text-center py-16 text-gray-400">游戏不存在</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Game Header */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center relative">
          <span className="text-8xl">🎮</span>
          <span className="absolute top-4 right-4 bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
            {game.category}
          </span>
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{game.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
            <Link href={`/user/${game.author.name}`} className="hover:text-blue-600">
              👤 {game.author.name}
            </Link>
            <span>👁️ {game.views} 次浏览</span>
            <span>❤️ {game._count.likes}</span>
            <span>💬 {game._count.comments}</span>
          </div>

          <p className="text-gray-600 mb-6">{game.description}</p>

          {/* Tags */}
          {game.tags && (
            <div className="flex flex-wrap gap-2 mb-6">
              {game.tags.split(',').map((tag: string, i: number) => (
                <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <Link
              href={`/play/${id}`}
              className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition flex items-center gap-2"
            >
              🎮 立即游玩
            </Link>
            <button
              onClick={handleLike}
              className={`px-4 py-3 rounded-xl border transition ${
                game.isLiked ? 'bg-red-50 border-red-200 text-red-600' : 'hover:bg-gray-50'
              }`}
            >
              {game.isLiked ? '❤️ 已点赞' : '🤍 点赞'}
            </button>
            <button
              onClick={handleFavorite}
              className={`px-4 py-3 rounded-xl border transition ${
                game.isFavorited ? 'bg-yellow-50 border-yellow-200 text-yellow-600' : 'hover:bg-gray-50'
              }`}
            >
              {game.isFavorited ? '⭐ 已收藏' : '☆ 收藏'}
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-2xl shadow-sm border p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">💬 评论 ({comments.length})</h2>

        {user ? (
          <form onSubmit={handleComment} className="mb-6">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="写下你的评论..."
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              rows={3}
            />
            <button
              type="submit"
              className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              发表评论
            </button>
          </form>
        ) : (
          <p className="text-gray-500 mb-6">
            <Link href="/login" className="text-blue-600 hover:underline">登录</Link> 后可以发表评论
          </p>
        )}

        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-center text-gray-400 py-8">暂无评论</p>
          ) : (
            comments.map((comment: any) => (
              <div key={comment.id} className="border-b pb-4 last:border-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">{comment.user.name}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(comment.createdAt).toLocaleString('zh-CN')}
                  </span>
                </div>
                <p className="text-gray-600">{comment.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
