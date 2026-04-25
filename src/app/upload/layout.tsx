import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '发布游戏 - AI小游戏平台',
};

export default function UploadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
