'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthButtons() {
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setShowLogin(!showLogin)}
        className="text-gray-600 hover:text-blue-600 transition"
      >
        登录
      </button>
      <a
        href="/register"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
      >
        注册
      </a>
    </div>
  );
}
