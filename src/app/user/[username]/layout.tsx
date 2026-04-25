import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '用户主页 - AI小游戏平台',
};

export default function UserPageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
