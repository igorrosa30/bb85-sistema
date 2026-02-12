"use client";

import Link from "next/link";
import { CheckCircle, Zap, Shield, BarChart, Users, Target, TrendingUp, BookOpen, Star, Award, Clock } from "lucide-react";
import PublicNavbar from "@/components/PublicNavbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar />

      {/* Hero Section - Corporate Blue */}
      <section className="relative pt-28 md:pt-40 pb-20 md:pb-28 px-4 md:px-6 overflow-hidden bg-gradient-to-br from-[#00214D] via-[#003D82] to-[#0055B8]">
        {/* Geometric Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <div className="text-left text-white">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                <span className="text-sm font-medium">Concurso Banco do Brasil 2026</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                A Plataforma Nº1 para Aprovação no{" "}
                <span className="text-[#FF9500]">Banco do Brasil</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
                Mais de <strong>15.000 questões</strong> comentadas, simulados inteligentes e análise de desempenho personalizada. Nosso objetivo: fazer você alcançar <strong className="text-[#FFC107]">85% de acertos</strong>.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/register"
                  className="btn-primary text-base md:text-lg px-8 py-4 inline-flex items-center justify-center gap-2 rounded-lg font-bold hover:scale-105 transition-transform"
                >
                  Começar Gratuitamente
                  <TrendingUp size={20} />
                </Link>
                <Link
                  href="/login"
                  className="btn-outline text-base md:text-lg px-8 py-4 inline-flex items-center justify-center gap-2 rounded-lg font-semibold bg-white text-[#003D82] hover:bg-gray-50"
                >
                  Já Tenho Conta
                </Link>
              </div>

              {/* Social Proof */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-200">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-[#FFC107]" />
                  <span>+2.300 aprovados</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={18} className="text-[#FFC107]" />
                  <span>4.9/5 (1.823 avaliações)</span>
                </div>
              </div>
            </div>

            {/* Right Column - Stats Card */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#003D82] to-[#0055B8] flex items-center justify-center">
                    <Target className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">Sistema BB85</h3>
                    <p className="text-sm text-gray-600">Alta Performance</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <StatItem icon={<CheckCircle className="text-green-500" />} label="Questões" value="15.000+" />
                  <StatItem icon={<BookOpen className="text-blue-500" />} label="Simulados" value="Ilimitados" />
                  <StatItem icon={<TrendingUp className="text-orange-500" />} label="Meta de Acertos" value="85%" />
                  <StatItem icon={<Award className="text-yellow-500" />} label="Aprovados" value="2.300+" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-6 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <Shield size={20} className="text-[#003D82]" />
              <span className="font-medium">100% Seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <Award size={20} className="text-[#003D82]" />
              <span className="font-medium">Conteúdo Atualizado</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={20} className="text-[#003D82]" />
              <span className="font-medium">Comunidade Ativa</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-[#003D82]" />
              <span className="font-medium">Acesso 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="vantagens" className="py-20 md:py-28 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Por que escolher o BB85?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa metodologia é baseada em <span className="text-[#FF9500] font-semibold">dados e aprovações reais</span>. Não é apenas estudar mais, é estudar melhor.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="text-[#FF9500]" size={40} />}
              title="Aprendizado Inteligente"
              description="Algoritmo que identifica suas dificuldades e personaliza o conteúdo para preencher suas lacunas."
            />
            <FeatureCard
              icon={<Target className="text-[#003D82]" size={40} />}
              title="Foco no Que Importa"
              description="80% do seu tempo nos 20% do conteúdo mais cobrado. Aplicamos o Princípio de Pareto rigorosamente."
            />
            <FeatureCard
              icon={<BarChart className="text-[#0055B8]" size={40} />}
              title="Análise Completa"
              description="Gráficos detalhados, relatórios por matéria e previsão de desempenho baseada no seu ritmo de evolução."
            />
            <FeatureCard
              icon={<Shield className="text-green-600" size={40} />}
              title="Questões Atualizadas"
              description="Banco constantemente atualizado com questões reais e inéditas no estilo do Banco do Brasil."
            />
            <FeatureCard
              icon={<BookOpen className="text-purple-600" size={40} />}
              title="Comentários Detalhados"
              description="Todas as questões possuem comentários explicativos e vídeos de resolução passo a passo."
            />
            <FeatureCard
              icon={<Users className="text-[#FFC107]" size={40} />}
              title="Ranking e Comunidade"
              description="Compare sua evolução com outros candidatos e participe de uma comunidade engajada."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 px-4 md:px-6 bg-gradient-to-r from-[#003D82] to-[#0055B8]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Comece sua jornada de aprovação hoje
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
            Acesso gratuito com questões ilimitadas. Sem cartão de crédito. Sem pegadinhas.
          </p>

          <Link
            href="/register"
            className="inline-flex items-center gap-3 bg-[#FF9500] hover:bg-[#FF8C00] text-white font-bold text-lg md:text-xl px-12 py-5 rounded-lg shadow-xl hover:scale-105 transition-transform"
          >
            Criar Conta Gratuita
            <TrendingUp size={24} />
          </Link>

          <p className="mt-6 text-sm text-gray-300 flex items-center justify-center gap-2">
            <CheckCircle size={16} /> Grátis para sempre • Cancele quando quiser
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200 bg-gray-50 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="text-2xl font-bold text-[#003D82] mb-4 block">
                BB<span className="text-[#FF9500]">85</span>
              </Link>
              <p className="text-sm text-gray-600">
                A plataforma nº1 de preparação para o Concurso do Banco do Brasil
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Plataforma</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/simulado" className="hover:text-[#003D82]">Simulados</Link></li>
                <li><Link href="/ranking" className="hover:text-[#003D82]">Ranking</Link></li>
                <li><Link href="/desempenho" className="hover:text-[#003D82]">Desempenho</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/blog" className="hover:text-[#003D82]">📰 Notícias</Link></li>
                <li><Link href="#vantagens" className="hover:text-[#003D82]">Vantagens</Link></li>
                <li><Link href="#" className="hover:text-[#003D82]">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="#" className="hover:text-[#003D82]">Termos de Uso</Link></li>
                <li><Link href="#" className="hover:text-[#003D82]">Privacidade</Link></li>
                <li><Link href="#" className="hover:text-[#003D82]">Contato</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} BB85 Sistema de Alta Performance. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 md:p-8 rounded-xl bg-white border border-gray-200 hover:border-[#003D82] hover:shadow-xl transition-all duration-300 group">
      <div className="mb-4 inline-flex p-4 rounded-lg bg-gray-50 group-hover:bg-gradient-to-br group-hover:from-[#003D82]/10 group-hover:to-[#0055B8]/10 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#003D82] transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function StatItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <span className="font-bold text-gray-900">{value}</span>
    </div>
  );
}
