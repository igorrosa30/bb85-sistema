"use client";

import Link from "next/link";
import { CheckCircle, Zap, Shield, BarChart, Users, Clock, Award, TrendingUp, BookOpen, Star } from "lucide-react";
import PublicNavbar from "@/components/PublicNavbar";

export default function Home() {
  return (
    <div className="landing-page min-h-screen bg-[#0a0a0f] text-white font-sans selection:bg-yellow-500/30">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="hero-section relative pt-32 pb-20 px-6 text-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 animate-fade-in-up">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300">🔥 Vagas abertas para o Banco do Brasil</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight animate-fade-in-up delay-100">
            A Diferença Entre <span className="text-gray-500">Tentar</span> e <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600">Ser Aprovado</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            O único sistema que adapta o estudo ao seu cérebro. <span className="text-white font-semibold">85% de acertos</span> é a nossa meta para você.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up delay-300">
            <Link href="/register" className="group relative btn-primary text-lg px-8 py-4 rounded-full shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] hover:shadow-[0_0_60px_-10px_rgba(59,130,246,0.6)] transform hover:-translate-y-1 transition-all duration-300 overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 font-bold">
              <span className="relative z-10 flex items-center gap-2">
                🚀 Quero Minha Vaga
                <TrendingUp size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link href="/login" className="btn-secondary text-lg px-8 py-4 rounded-full border border-gray-700 hover:bg-white/5 transition-all flex items-center justify-center gap-2">
              Já Tenho Conta
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-gray-500 text-sm animate-fade-in-up delay-500">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" /> +15.000 Questões
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" /> IA Personalizada
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-blue-400" /> +2.300 Alunos Aprovados
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Trust */}
      <section className="py-10 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm mb-6 uppercase tracking-wider font-medium">✅ Plataforma validada por aprovados</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-70 transition-all duration-500">
            <span className="text-xl font-bold flex items-center gap-2"><Shield size={24} /> Segurança</span>
            <span className="text-xl font-bold flex items-center gap-2"><Award size={24} /> Top Educação</span>
            <span className="text-xl font-bold flex items-center gap-2"><Star size={24} className="text-yellow-400" /> 4.9/5 Avaliação</span>
          </div>
        </div>
      </section>

      {/* Features Grid - Neuro-marketing Focus */}
      <section id="features" className="features py-24 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Por que o BB85 funciona?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Não é apenas um banco de questões. É uma metodologia baseada em <span className="text-yellow-400 font-semibold">neurociência</span> para maximizar sua retenção.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="text-yellow-400" size={40} />}
              title="Aprendizado Ativo"
              description="Nosso algoritmo força seu cérebro a recuperar informações no momento ideal, evitando a Curva do Esquecimento."
              delay="0"
            />
            <FeatureCard
              icon={<Shield className="text-blue-400" size={40} />}
              title="Blindagem de Conteúdo"
              description="Focamos 80% do seu tempo nos 20% do conteúdo que realmente cai na prova (Princípio de Pareto)."
              delay="100"
            />
            <FeatureCard
              icon={<BarChart className="text-green-400" size={40} />}
              title="Metrificação Total"
              description="Você não gerencia o que não mede. Saiba exatamente sua probabilidade de aprovação em tempo real."
              delay="200"
            />
          </div>
        </div>
      </section>

      {/* Scarcity / Call to Action */}
      <section className="cta py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg uppercase">
              ⏰ Oferta Limitada
            </div>

            <h2 className="text-4xl font-bold mb-6">Sua Aprovação Começa Agora</h2>
            <p className="text-gray-400 mb-10 text-lg">
              Junte-se a uma elite de candidatos que não contam com a sorte.
              <br />
              <span className="text-yellow-400 font-medium">Acesso gratuito liberado hoje.</span>
            </p>

            <Link href="/register" className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-xl px-12 py-5 rounded-full shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform duration-300">
              Começar Gratuitamente
              <Users size={24} />
            </Link>

            <p className="mt-6 text-sm text-gray-500 flex items-center justify-center gap-2">
              <Clock size={14} /> Leva menos de 30 segundos
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-800 text-center text-gray-500 bg-gray-950">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-left">
            <Link href="/" className="text-2xl font-bold text-white tracking-tight mb-2 block">
              BB<span className="text-yellow-400">85</span>
            </Link>
            <p className="text-sm">Alta performance para concursos bancários.</p>
          </div>
          <div className="flex gap-8 text-sm">
            <Link href="/blog" className="hover:text-white transition-colors">📰 Blog</Link>
            <Link href="#" className="hover:text-white transition-colors">Termos</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacidade</Link>
            <Link href="#" className="hover:text-white transition-colors">Contato</Link>
          </div>
        </div>
        <div className="mt-12 text-xs border-t border-gray-900 pt-8">
          &copy; {new Date().getFullYear()} BB85 Sistema de Alta Performance. Todos os direitos reservados.
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "BB85 - Sistema de Alta Performance",
            "url": "https://concursobanc odobrasil.netlify.app",
            "description": "Sistema completo de preparação para o Concurso do Banco do Brasil com foco em 85% de acertos.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://concursobancodobrasil.netlify.app/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: any, title: string, description: string, delay: string }) {
  return (
    <div className={`p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.05] transition-all duration-300 group hover:-translate-y-2`} style={{ animationDelay: `${delay}ms` }}>
      <div className="mb-6 inline-flex p-4 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg group-hover:scale-110 transition-transform duration-300 ring-1 ring-white/10 group-hover:ring-blue-500/50">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
