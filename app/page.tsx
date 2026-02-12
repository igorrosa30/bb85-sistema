"use client";

import Link from "next/link";
import { CheckCircle, Zap, Shield, BarChart, Users, Clock, Award, TrendingUp, BookOpen, Star } from "lucide-react";
import PublicNavbar from "@/components/PublicNavbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
      <PublicNavbar />

      {/* Hero Section */}
      <section className="relative pt-28 md:pt-36 pb-16 md:pb-24 px-4 md:px-6 text-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 md:h-[500px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-48 md:w-[300px] h-48 md:h-[300px] bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6 md:mb-8 animate-fade-in-up">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs md:text-sm font-medium text-gray-300">🔥 Vagas abertas para o Banco do Brasil</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 md:mb-6 tracking-tight leading-[1.1] animate-fade-in-up delay-100 px-4">
            A Diferença Entre{" "}
            <span className="text-gray-500">Tentar</span>{" "}
            e <span className="block md:inline text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600">Ser Aprovado</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200 px-4">
            O único sistema que adapta o estudo ao seu cérebro.{" "}
            <span className="text-white font-semibold">85% de acertos</span> é a nossa meta para você.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 animate-fade-in-up delay-300 px-4 max-w-lg mx-auto sm:max-w-none">
            <Link
              href="/register"
              className="group relative btn-primary text-base md:text-lg px-8 md:px-10 py-4 md:py-5 rounded-full shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] hover:shadow-[0_0_60px_-10px_rgba(59,130,246,0.6)] transform hover:-translate-y-1 transition-all duration-300 overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 font-bold"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                🚀 Quero Minha Vaga
                <TrendingUp size={20} className="group-hover:translate-x-1 transition-transform hidden sm:inline" />
              </span>
            </Link>
            <Link
              href="/login"
              className="btn-secondary text-base md:text-lg px-8 md:px-10 py-4 md:py-5 rounded-full border-2 border-gray-700 hover:bg-white/5 transition-all flex items-center justify-center gap-2"
            >
              Já Tenho Conta
            </Link>
          </div>

          {/* Social Proof Pills */}
          <div className="mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-gray-500 text-xs md:text-sm animate-fade-in-up delay-500 px-4">
            <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-full border border-white/10">
              <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
              <span>+15.000 Questões</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-full border border-white/10">
              <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
              <span>IA Personalizada</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-full border border-white/10">
              <Users size={14} className="text-blue-400 flex-shrink-0" />
              <span>+2.300 Aprovados</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-8 md:py-10 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <p className="text-gray-500 text-xs md:text-sm mb-4 md:mb-6 uppercase tracking-wider font-medium">
            ✅ Plataforma validada por aprovados
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-70">
            <span className="text-base md:text-xl font-bold flex items-center gap-2">
              <Shield size={20} className="md:w-6 md:h-6" /> Segurança
            </span>
            <span className="text-base md:text-xl font-bold flex items-center gap-2">
              <Award size={20} className="md:w-6 md:h-6" /> Top Educação
            </span>
            <span className="text-base md:text-xl font-bold flex items-center gap-2">
              <Star size={20} className="md:w-6 md:h-6 text-yellow-400" /> 4.9/5
            </span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 relative px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              Por que o BB85 funciona?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg px-4">
              Não é apenas um banco de questões. É uma metodologia baseada em{" "}
              <span className="text-yellow-400 font-semibold">neurociência</span> para maximizar sua retenção.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard
              icon={<Zap className="text-yellow-400" size={36} />}
              title="Aprendizado Ativo"
              description="Nosso algoritmo força seu cérebro a recuperar informações no momento ideal, evitando a Curva do Esquecimento."
            />
            <FeatureCard
              icon={<Shield className="text-blue-400" size={36} />}
              title="Blindagem de Conteúdo"
              description="Focamos 80% do seu tempo nos 20% do conteúdo que realmente cai na prova (Princípio de Pareto)."
            />
            <FeatureCard
              icon={<BarChart className="text-green-400" size={36} />}
              title="Metrificação Total"
              description="Você não gerencia o que não mede. Saiba exatamente sua probabilidade de aprovação em tempo real."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 text-center relative overflow-hidden px-4 md:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 md:p-12 rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-yellow-500 text-black text-[10px] md:text-xs font-bold px-2 md:px-3 py-1 rounded-bl-lg uppercase">
              ⏰ Oferta Limitada
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 mt-4">
              Sua Aprovação Começa Agora
            </h2>
            <p className="text-gray-400 mb-8 md:mb-10 text-base md:text-lg px-4">
              Junte-se a uma elite de candidatos que não contam com a sorte.
              <br />
              <span className="text-yellow-400 font-medium">Acesso gratuito liberado hoje.</span>
            </p>

            <Link
              href="/register"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg md:text-xl px-10 md:px-12 py-4 md:py-5 rounded-full shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform duration-300"
            >
              Começar Gratuitamente
              <Users size={24} />
            </Link>

            <p className="mt-6 text-xs md:text-sm text-gray-500 flex items-center justify-center gap-2">
              <Clock size={14} /> Leva menos de 30 segundos
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 border-t border-gray-800 text-center text-gray-500 bg-gray-950 px-4 md:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <Link href="/" className="text-2xl font-bold text-white tracking-tight mb-2 block">
              BB<span className="text-yellow-400">85</span>
            </Link>
            <p className="text-xs md:text-sm">Alta performance para concursos bancários.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-xs md:text-sm">
            <Link href="/blog" className="hover:text-white transition-colors">📰 Blog</Link>
            <Link href="#" className="hover:text-white transition-colors">Termos</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacidade</Link>
            <Link href="#" className="hover:text-white transition-colors">Contato</Link>
          </div>
        </div>
        <div className="mt-8 md:mt-12 text-[10px] md:text-xs border-t border-gray-900 pt-6 md:pt-8">
          &copy; {new Date().getFullYear()} BB85 Sistema de Alta Performance. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-white/[0.03] border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.05] transition-all duration-300 group hover:-translate-y-2">
      <div className="mb-4 md:mb-6 inline-flex p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg group-hover:scale-110 transition-transform duration-300 ring-1 ring-white/10 group-hover:ring-blue-500/50">
        {icon}
      </div>
      <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-white group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-sm md:text-base text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
