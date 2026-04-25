import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '登录 - AI小游戏平台',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
