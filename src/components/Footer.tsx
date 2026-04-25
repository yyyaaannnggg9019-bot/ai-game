import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 px-4 mt-auto">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-semibold mb-3">🎮 AI小游戏平台</h3>
          <p className="text-sm">分享你的AI创意游戏，让全世界玩家在线畅玩</p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">快速链接</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/games" className="hover:text-white transition">游戏广场</Link></li>
            <li><Link href="/upload" className="hover:text-white transition">发布游戏</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">关于</h3>
          <p className="text-sm">一个开放的AI小游戏分享平台</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-gray-800 text-center text-sm">
        © 2026 AI小游戏平台. All rights reserved.
      </div>
    </footer>
  );
}
