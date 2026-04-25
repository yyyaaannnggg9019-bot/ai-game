import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '游玩游戏 - AI小游戏平台',
};

export default function PlayPageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
