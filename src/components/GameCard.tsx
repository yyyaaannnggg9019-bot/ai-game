import Link from 'next/link';
import Image from 'next/image';

interface GameCardProps {
  game: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    category: string;
    author: { name: string; avatar?: string | null };
    _count: { likes: number; comments: number };
    views: number;
  };
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/games/${game.id}`} className="group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
        <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
          {game.thumbnail && game.thumbnail !== '/placeholder-game.png' ? (
            <Image
              src={game.thumbnail}
              alt={game.title}
              fill
              className="object-cover"
            />
          ) : (
            <span className="text-6xl">🎮</span>
          )}
          <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
            {game.category}
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg group-hover:text-blue-600 transition line-clamp-1">
            {game.title}
          </h3>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">{game.description}</p>
          <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              👤 {game.author.name}
            </span>
            <div className="flex gap-3">
              <span>❤️ {game._count.likes}</span>
              <span>💬 {game._count.comments}</span>
              <span>👁️ {game.views}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
