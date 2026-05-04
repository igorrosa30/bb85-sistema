import { redirect } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle, XCircle, ArrowRight, Home, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

export default async function ResultadoPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    const simulado = await prisma.simulado.findUnique({
        where: { id: parseInt(id) },
        include: {
            respostas: {
                include: {
                    questao: {
                        include: {
                            prova: true
                        }
                    }
                }
            }
        }
    })

    if (!simulado) {
        return <div>Simulado não encontrado.</div>
    }

    // Parse performance JSON
    let performance: any[] = []
    try {
        performance = JSON.parse(simulado.percentual_materia_json as string)
    } catch (e) {
        console.error("Erro ao parsear performance", e)
    }

    const isApproved = simulado.percentual_geral >= 85

    return (
        <div className="container mx-auto py-10 px-4 max-w-5xl">
            <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Resultado do Simulado</h1>
                    <p className="text-muted-foreground">Confira seu desempenho detalhado.</p>
                </div>
                <div className="flex gap-2">
                    <Link href="/dashboard">
                        <Button variant="outline"><Home className="w-4 h-4 mr-2" /> Dashboard</Button>
                    </Link>
                    <Link href="/simulado">
                        <Button><RotateCcw className="w-4 h-4 mr-2" /> Novo Simulado</Button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Score Card */}
                <Card className={cn("border-t-4", isApproved ? "border-t-green-500" : "border-t-red-500")}>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Desempenho Geral</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center py-6">
                        <span className={cn("text-5xl font-extrabold", isApproved ? "text-green-600" : "text-red-600")}>
                            {simulado.percentual_geral.toFixed(1)}%
                        </span>
                        <Badge className={cn("mt-4 text-base px-4 py-1", isApproved ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-red-100 text-red-800 hover:bg-red-200")}>
                            {simulado.classificacao}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-2">
                            Tempo: {Math.floor(simulado.tempo_total / 60)} min {simulado.tempo_total % 60} s
                        </p>
                    </CardContent>
                </Card>

                {/* Analytics Summary */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Por Matéria</CardTitle>
                        <CardDescription>Sua performance em cada disciplina.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[200px] pr-4">
                            <div className="space-y-4">
                                {performance.map((item: any) => (
                                    <div key={item.materia} className="space-y-1">
                                        <div className="flex justify-between text-sm font-medium">
                                            <span>{item.materia}</span>
                                            <span className={cn(
                                                item.percentual >= 85 ? "text-green-600" :
                                                    item.percentual >= 70 ? "text-yellow-600" : "text-red-600"
                                            )}>
                                                {item.percentual.toFixed(0)}%
                                            </span>
                                        </div>
                                        <Progress
                                            value={item.percentual}
                                            className={cn("h-2",
                                                item.percentual >= 85 ? "text-green-500" :
                                                    item.percentual >= 70 ? "text-yellow-500" : "text-red-500"
                                            )} // Note: standard Progress color is managed via indicator class usually or CSS variables. 
                                        // Shadcn Progress uses bg-primary. To change color dynamically we need inline styles or custom classes on the Indicator if exposed, 
                                        // or just wrap it. Shadcn 'Progress' implementation usually passes props to Root.
                                        // Let's assume standard primay for now or add inline style if needed.
                                        // We'll stick to simple implementation.
                                        />
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="gabarito" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="gabarito">Gabarito Comentado</TabsTrigger>
                    <TabsTrigger value="erros">Apenas Erros</TabsTrigger>
                </TabsList>

                <TabsContent value="gabarito" className="space-y-4">
                    {simulado.respostas.map((resposta, index) => (
                        <ResultItem key={resposta.id} resposta={resposta} index={index + 1} />
                    ))}
                </TabsContent>

                <TabsContent value="erros" className="space-y-4">
                    {simulado.respostas.filter(r => !r.correta_ou_errada).length === 0 ? (
                        <div className="text-center py-10 text-muted-foreground">Parabéns! Você gabaritou esta prova.</div>
                    ) : (
                        simulado.respostas.filter(r => !r.correta_ou_errada).map((resposta, index) => (
                            <ResultItem key={resposta.id} resposta={resposta} index={index + 1} />
                        ))
                    )}
                </TabsContent>

            </Tabs>
        </div>
    )
}

function ResultItem({ resposta, index }: { resposta: any, index: number }) {
    const isCorrect = resposta.correta_ou_errada
    return (
        <Card className={cn("border-l-4", isCorrect ? "border-l-green-500" : "border-l-red-500")}>
            <CardHeader className="py-4">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                        <Badge variant="outline">{index}</Badge>
                        <Badge variant="secondary">{resposta.questao.materia}</Badge>
                        {isCorrect ?
                            <span className="flex items-center text-green-600 text-sm font-bold"><CheckCircle className="w-4 h-4 mr-1" /> Acertou</span> :
                            <span className="flex items-center text-red-600 text-sm font-bold"><XCircle className="w-4 h-4 mr-1" /> Errou</span>
                        }
                    </div>
                    {/* Expand/Collapse logic could be added here if Enunciado is long */}
                </div>
            </CardHeader>
            <CardContent className="pb-4">
                <p className="text-base mb-4">{resposta.questao.enunciado}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className={cn("p-3 rounded border", isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200")}>
                        <span className="font-semibold block mb-1">Sua Resposta:</span>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-lg">{resposta.resposta_marcada}</span>
                            <span>{resposta.questao[`alternativa_${resposta.resposta_marcada}`]}</span>
                        </div>
                    </div>

                    <div className="p-3 rounded border bg-muted/30">
                        <span className="font-semibold block mb-1">Gabarito:</span>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-lg text-primary">{resposta.questao.alternativa_correta}</span>
                            <span>{resposta.questao[`alternativa_${resposta.questao.alternativa_correta}`]}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t bg-muted/10 p-4 rounded-md">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">💡 Explicação</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {resposta.questao.comentario || resposta.questao.comentario_detalhado || "Sem comentário disponível."}
                    </p>
                    {resposta.questao.video_url && (
                        <a href={resposta.questao.video_url} target="_blank" className="text-xs text-blue-600 hover:underline mt-2 block">
                            Ver vídeo de resolução
                        </a>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
