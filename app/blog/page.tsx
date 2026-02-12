import PublicNavbar from "@/components/PublicNavbar";
import { Calendar, ExternalLink, Rss } from "lucide-react";
import Link from "next/link";
import { type Metadata } from "next";

export const metadata: Metadata = {
    title: 'Notícias de Concursos Bancários | BB85 Blog',
    description: 'Fique atualizado com as últimas notícias sobre o Concurso do Banco do Brasil e setor bancário.',
};

async function getNews() {
    try {
        // Using a public RSS to JSON bridge for simplicity in this demo.
        // In production, parsing XML on the server with 'rss-parser' is more robust.
        const FEED_URL = "https://news.google.com/rss/search?q=Concurso+Banco+do+Brasil+OR+Concurso+Caixa&hl=pt-BR&gl=BR&ceid=BR:pt-419";
        const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(FEED_URL)}`;

        const res = await fetch(API_URL, { next: { revalidate: 3600 } }); // Catch for 1 hour

        if (!res.ok) {
            // Fallback mock data if API fails (rate limits usually)
            return getMockNews();
        }

        const data = await res.json();
        return data.items || getMockNews();
    } catch (error) {
        console.error("Error fetching news:", error);
        return getMockNews();
    }
}

function getMockNews() {
    return [
        {
            title: "Concurso Banco do Brasil: O que estudar para a prova?",
            pubDate: new Date().toUTCString(),
            link: "#",
            description: "Confira as principais dicas e matérias que você precisa dominar para garantir sua vaga no próximo concurso."
        },
        {
            title: "Edital BB pode sair em breve? Entenda as previsões",
            pubDate: new Date().toUTCString(),
            link: "#",
            description: "Especialistas analisam o déficit de funcionários e a possibilidade de um novo certame ainda este ano."
        },
        {
            title: "Tecnologia da Informação no BB: Cargo em alta",
            pubDate: new Date().toUTCString(),
            link: "#",
            description: "A área de TI tem sido o foco das últimas contratações. Saiba como se preparar para Agente de Tecnologia."
        }
    ];
}

export default async function BlogPage() {
    const news = await getNews();

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white">
            <PublicNavbar />

            <main className="max-w-6xl mx-auto px-6 py-32">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-blue-900/20 text-blue-400 px-4 py-1.5 rounded-full mb-6">
                        <Rss size={16} />
                        <span className="text-sm font-semibold uppercase tracking-wider">Updates em Tempo Real</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Central de Notícias</h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Acompanhe tudo sobre o universo dos concursos bancários. Nosso robô busca as últimas novidades 24h por dia.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {news.map((item: any, index: number) => (
                        <article key={index} className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all group hover:-translate-y-1">
                            <div className="p-8">
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                    <Calendar size={14} />
                                    {new Date(item.pubDate).toLocaleDateString('pt-BR')}
                                </div>

                                <h2 className="text-xl font-bold mb-4 line-clamp-2 group-hover:text-blue-400 transition-colors">
                                    <Link href={item.link} target="_blank">{item.title}</Link>
                                </h2>

                                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {item.description ? item.description.replace(/<[^>]*>?/gm, '') : 'Clique para ler a notícia completa na fonte original.'}
                                </p>

                                <Link href={item.link} target="_blank" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm">
                                    Ler na íntegra <ExternalLink size={14} />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="py-12 border-t border-gray-800 text-center text-gray-500 bg-gray-950">
                <p>&copy; {new Date().getFullYear()} BB85 Blog. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}
