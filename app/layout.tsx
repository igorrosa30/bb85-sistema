import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'BB85 - Sistema de Alta Performance para Concurso do Banco do Brasil',
    template: '%s | BB85'
  },
  description: 'Garanta sua aprovação no Concurso do Banco do Brasil com o BB85. Simulados inteligentes, questões comentadas e foco em 85% de acertos. Comece grátis!',
  keywords: ['Concurso Banco do Brasil', 'Simulado BB', 'Questões Banco do Brasil', 'Preparatório Banco do Brasil', 'BB85', 'Concurso Público'],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://bb85-sistema.netlify.app',
    title: 'BB85 - A Casa do Aprovado no Banco do Brasil',
    description: 'Sistema completo de preparação com questões, simulados e análise de desempenho.',
    siteName: 'BB85',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BB85 - Prepare-se para o Banco do Brasil',
    description: 'Simulados e Questões comentadas para o concurso do BB.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { Providers } from '@/components/Providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.variable}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
