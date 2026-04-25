import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '注册 - AI小游戏平台',
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
