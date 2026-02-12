import Link from "next/link";
import { Calendar, TrendingUp, ChevronRight, ArrowRight } from "lucide-react";
import PublicNavbar from "@/components/PublicNavbar";
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: 'Notícias Concurso Banco do Brasil 2026 | BB85',
    description: 'Acompanhe as últimas notícias, editais e atualizações sobre o Concurso Banco do Brasil e concursos bancários. Mantenha-se informado com o BB85.',
    keywords: ['concurso banco do brasil', 'notícias banco do brasil', 'edital bb', 'concursos bancários', 'bb85'],
    openGraph: {
        title: 'Notícias - Concurso Banco do Brasil | BB85',
        description: 'Últimas notícias sobre concursos bancários e Banco do Brasil',
        type: 'website',
    },
};

// Mock data - Em produção, isso viria de um sistema de CMS ou API
const noticias = [
    {
        id: 1,
        titulo: "Novo Edital do Banco do Brasil Previsto para 2026",
        resumo: "Fontes próximas ao BB indicam que um novo concurso com 6.000+ vagas deve ser lançado no primeiro semestre de 2026. Prepare-se agora!",
        data: "2026-02-10",
        categoria: "Edital",
        slug: "novo-edital-bb-2026",
        imagem: "/placeholder-news.jpg"
    },
    {
        id: 2,
        titulo: "Salários do Banco do Brasil Chegam a R$ 20.000",
        resumo: "Com progressão de carreira, benefícios e participação nos lucros, funcionários do BB podem alcançar salários superiores a R$ 20 mil mensais.",
        data: "2026-02-08",
        categoria: "Carreira",
        slug: "salarios-bb-2026",
        imagem: "/placeholder-news.jpg"
    },
    {
        id: 3,
        titulo: "Mudanças nas Provas: Mais Questões de Conhecimentos Bancários",
        resumo: "Últimas tendências indicam aumento no peso de conhecimentos bancários e atualidades. Foque no que realmente importa.",
        data: "2026-02-05",
        categoria: "Provas",
        slug: "mudancas-provas-bb",
        imagem: "/placeholder-news.jpg"
    },
    {
        id: 4,
        titulo: "BB85: Como 2.300 Candidatos Alcançaram a Aprovação",
        resumo: "Metodologia baseada em repetição espaçada e análise de desempenho ajudou milhares de candidatos a conquistarem a sonhada vaga no BB.",
        data: "2026-02-02",
        categoria: "Aprovação",
        slug: "metodologia-bb85-aprovacao",
        imagem: "/placeholder-news.jpg"
    },
    {
        id: 5,
        titulo: "Concursos Bancários 2026: Calendário Atualizado",
        resumo: "Caixa, Banco do Brasil, BNDES e outros bancos planejam concursos este ano. Veja o calendário completo e organize seus estudos.",
        data: "2026-01-30",
        categoria: "Concursos",
        slug: "calendario-concursos-bancarios-2026",
        imagem: "/placeholder-news.jpg"
    },
    {
        id: 6,
        titulo: "Dicas de Estudos para Alcançar 85% de Acertos",
        resumo: "Especialistas revelam as melhores técnicas de estudo e como a prática deliberada pode aumentar drasticamente seu desempenho.",
        data: "2026-01-25",
        categoria: "Estudo",
        slug: "dicas-85-acertos",
        imagem: "/placeholder-news.jpg"
    },
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <PublicNavbar />

            {/* Header */}
            <section className="pt-28 md:pt-36 pb-16 md:pb-20 px-4 md:px-6 bg-gradient-to-r from-[#003D82] to-[#0055B8]">
                <div className="max-w-6xl mx-auto text-center text-white">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        Notícias de Concursos Bancários
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
                        Fique por dentro de editais, salários, dicas de estudo e tudo sobre o Concurso do Banco do Brasil e outros concursos bancários.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
                        <TrendingUp size={18} />
                        <span>Atualizado diariamente com as últimas novidades</span>
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-16 md:py-20 px-4 md:px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {noticias.map((noticia) => (
                            <article key={noticia.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-200">
                                <div className="h-48 bg-gradient-to-br from-[#003D82] to-[#0055B8] flex items-center justify-center text-white">
                                    <div className="text-center p-6">
                                        <Calendar size={48} className="mx-auto mb-2 opacity-50" />
                                        <p className="text-sm font-medium">{new Date(noticia.data).toLocaleDateString('pt-BR')}</p>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="inline-block px-3 py-1 bg-[#FF9500]/10 text-[#FF9500] text-xs font-bold rounded-full mb-3">
                                        {noticia.categoria}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                                        {noticia.titulo}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {noticia.resumo}
                                    </p>
                                    <Link
                                        href={`/blog/${noticia.slug}`}
                                        className="inline-flex items-center gap-2 text-[#003D82] font-semibold hover:gap-3 transition-all"
                                    >
                                        Ler mais
                                        <ChevronRight size={18} />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-20 px-4 md:px-6 bg-white border-t border-gray-200">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Pronto para <span className="text-[#FF9500]">Começar sua Preparação</span>?
                    </h2>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                        Não apenas acompanhe as notícias. <strong>Prepare-se de verdade</strong> com o sistema que já aprovou +2.300 candidatos no Banco do Brasil.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/register"
                            className="btn-primary px-8 py-4 rounded-lg text-lg font-bold inline-flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                        >
                            Criar Conta Gratuita
                            <ArrowRight size={20} />
                        </Link>
                        <Link
                            href="/#vantagens"
                            className="btn-outline px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center justify-center gap-2"
                        >
                            Ver Como Funciona
                        </Link>
                    </div>

                    <p className="mt-6 text-sm text-gray-500">
                        ✓ Acesso gratuito • ✓ 15.000+ questões • ✓ Análise de desempenho
                    </p>
                </div>
            </section>

            {/* SEO-enhancing structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Blog",
                        "name": "Notícias BB85 - Concurso Banco do Brasil",
                        "description": "Notícias atualizadas sobre concursos bancários e Banco do Brasil",
                        "url": "https://concursobancodobrasil.netlify.app/blog",
                        "blogPost": noticias.map(n => ({
                            "@type": "BlogPosting",
                            "headline": n.titulo,
                            "description": n.resumo,
                            "datePublished": n.data,
                            "author": {
                                "@type": "Organization",
                                "name": "BB85"
                            }
                        }))
                    })
                }}
            />
        </div>
    );
}
