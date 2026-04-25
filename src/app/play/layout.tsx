import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '游玩 - AI小游戏平台',
};

export default function PlayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
