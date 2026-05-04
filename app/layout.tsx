import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'BB85 - Sistema Pessoal de Estudo',
  description: 'Sistema pessoal de alta performance para aprovação no Banco do Brasil. Simulados, tracking de desempenho e análise detalhada.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.variable}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-auto bg-[#050505] text-white">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}
