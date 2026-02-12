import Link from "next/link";
import { CheckCircle, Zap, Shield, BarChart } from "lucide-react";

export default function Home() {
  return (
    <div className="landing-page min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="hero-section relative py-20 px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Passe no Concurso do <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Banco do Brasil</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
            O sistema definitivo para garantir sua aprovação com 85%+ de acertos. Simulados inteligentes, análise de desempenho e foco total no edital.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register" className="btn-primary text-lg px-8 py-4 rounded-full shadow-lg shadow-blue-500/20 transform hover:scale-105 transition-all">
              Começar Grátis
            </Link>
            <Link href="/login" className="btn-secondary text-lg px-8 py-4 rounded-full border border-gray-700 hover:bg-gray-800 transition-all">
              Já tenho conta
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features py-20 bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap className="text-yellow-400" size={32} />}
            title="Alta Performance"
            description="Algoritmos que identificam seus pontos fracos e personalizam seus estudos."
          />
          <FeatureCard
            icon={<Shield className="text-blue-400" size={32} />}
            title="Foco no Edital"
            description="Questões atualizadas e organizadas exatamente como na prova real."
          />
          <FeatureCard
            icon={<BarChart className="text-green-400" size={32} />}
            title="Análise Detalhada"
            description="Acompanhe sua evolução com gráficos e métricas precisas."
          />
        </div>
      </section>

      {/* Pricing / Call to Action */}
      <section className="cta py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Prepare-se com quem entende de aprovação</h2>
          <p className="text-gray-400 mb-8">Junte-se a milhares de candidatos que estão elevando seu nível de preparação.</p>
          <Link href="/register" className="btn-primary px-8 py-3 rounded-full">
            Criar Conta Gratuita
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} BB85 Sistema de Alta Performance. Todos os direitos reservados.</p>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "BB85 - Sistema de Alta Performance",
            "url": "https://bb85-sistema.netlify.app",
            "description": "Sistema completo de preparação para o Concurso do Banco do Brasil com foco em 85% de acertos.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://bb85-sistema.netlify.app/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-gray-600 transition-all">
      <div className="mb-4 inline-block p-3 rounded-lg bg-gray-900/50">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
