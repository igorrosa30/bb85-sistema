"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { Check, ChevronLeft, ChevronRight, Clock, Map } from "lucide-react"
import { cn } from "@/lib/utils"
import { submitExam } from "@/app/actions"

interface ExamInterfaceProps {
    questions: any[]
    config: any
}

export default function ExamInterface({ questions, config }: ExamInterfaceProps) {
    const router = useRouter()

    // State
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answers, setAnswers] = useState<Record<number, string>>({})
    const [syntheses, setSyntheses] = useState<Record<number, string>>({})
    const [timeLeft, setTimeLeft] = useState(0)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [startTime, setStartTime] = useState(Date.now())
    const [localQuestions, setLocalQuestions] = useState<any[]>([])

    // Timer & Init Logic
    useEffect(() => {
        // Load config from session
        const storedConfigStr = sessionStorage.getItem("simulado-config")
        let activeQuestions = questions
        let activeConfig = config

        if (storedConfigStr) {
            const storedConfig = JSON.parse(storedConfigStr)
            activeConfig = storedConfig

            // Filter and Shuffle logic
            let filtered = [...questions]

            if (storedConfig.tipo === 'prova' && storedConfig.provas?.length) {
                // Filter by prova (match ID or similar logic)
                // Note: The PROVAS list in config page used IDs "A", "B"... 
                // We need to match with question.prova.tipo_prova (or similar)
                // Assuming questions have 'prova' relation loaded.
                filtered = filtered.filter(q => storedConfig.provas.includes(q.prova?.tipo_prova || q.prova?.id?.toString()))
            }
            else if (storedConfig.tipo === 'materia' && storedConfig.materias?.length) {
                filtered = filtered.filter(q => storedConfig.materias.includes(q.materia))
            }

            // Shuffle
            for (let i = filtered.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
            }

            // Slice
            if (storedConfig.quantidade) {
                filtered = filtered.slice(0, storedConfig.quantidade)
            }

            activeQuestions = filtered
            setLocalQuestions(activeQuestions)
        } else {
            setLocalQuestions(questions.slice(0, 70)) // Default fallback
        }

        // Calculate max time: (questions.length / 70) * 5 hours (in seconds)
        const maxTime = Math.ceil((activeQuestions.length / 70) * 18000)
        setTimeLeft(maxTime)

        // Timer
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)
                    // handleFinish(true) // Avoiding auto-submit loop in effect, handle carefully
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [questions])

    const handleAnswer = (value: string) => {
        setAnswers(prev => ({
            ...prev,
            [localQuestions[currentQuestionIndex].id]: value
        }))
    }

    const handleFinish = async (auto = false) => {
        if (isSubmitting) return
        setIsSubmitting(true)

        const endTime = Date.now()
        const totalTimeSpent = Math.floor((endTime - startTime) / 1000) // approx

        // Prepare data
        const questionsToSubmit = localQuestions.length > 0 ? localQuestions : questions
        const respostas = questionsToSubmit.map(q => {
            const marked = answers[q.id] || "X" // X for unanswered
            const correct = marked === q.alternativa_correta_base
            return {
                questaoId: q.id,
                respostaMarcada: marked,
                correta: correct,
                tempoGasto: 0,
                materia: q.materia,
                sinteseErro: syntheses[q.id] || ""
            }
        })

        try {
            const result = await submitExam({
                tempoTotal: totalTimeSpent,
                tipo: config.tipo || 'personalizado',
                config: config,
                respostas: respostas
            })

            if (result.success) {
                toast.success("Simulado finalizado!")
                sessionStorage.removeItem("exam-state")
                router.push(`/simulado/resultado/${result.id}`)
            } else {
                toast.error("Erro ao enviar simulado.")
                setIsSubmitting(false)
            }
        } catch (e) {
            console.error(e)
            toast.error("Erro inesperado.")
            setIsSubmitting(false)
        }
    }

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600)
        const m = Math.floor((seconds % 3600) / 60)
        const s = seconds % 60
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    }

    const currentQ = localQuestions[currentQuestionIndex]
    if (!currentQ) return <div className="flex items-center justify-center h-screen">Carregando prova...</div>

    const progress = (Object.keys(answers).length / localQuestions.length) * 100

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header / Timer Bar */}
            <div className="sticky top-0 z-50 bg-background border-b shadow-sm">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="font-bold text-xl text-primary">BB85</span>
                        <div className="h-6 w-px bg-border hidden sm:block"></div>
                        <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Questão {currentQuestionIndex + 1} de {localQuestions.length}</span>
                        </div>
                    </div>

                    <div className={cn(
                        "flex items-center gap-2 font-mono text-xl font-bold px-4 py-2 rounded-md border",
                        timeLeft < 600 ? "bg-red-50 text-red-600 border-red-200 animate-pulse" : "bg-muted"
                    )}>
                        <Clock className="w-5 h-5" />
                        {formatTime(timeLeft)}
                    </div>

                    <div className="flex items-center gap-2">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="default">Finalizar</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Você respondeu {Object.keys(answers).length} de {localQuestions.length} questões.
                                        Ao finalizar, você não poderá alterar suas respostas.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleFinish()} className="bg-primary text-primary-foreground">
                                        Confirmar e Enviar
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
                <Progress value={progress} className="h-1 rounded-none" />
            </div>

            <main className="flex-1 container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Question Area */}
                <div className="lg:col-span-9 space-y-6">
                    <Card className="border-2 shadow-sm">
                        <CardHeader>
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-sm font-semibold text-primary uppercase tracking-wider">{currentQ.materia}</span>
                                <span className="text-sm text-muted-foreground">Prova {currentQ.prova?.tipo_prova} ({currentQ.prova?.ano})</span>
                            </div>
                            <CardDescription className="text-lg font-medium text-foreground whitespace-pre-wrap">
                                {currentQ.enunciado}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {currentQ.imagem_url && (
                                <div className="mb-6 rounded-lg overflow-hidden border">
                                    <img src={currentQ.imagem_url} alt="Imagem da questão" className="max-w-full h-auto" />
                                </div>
                            )}

                            <RadioGroup
                                value={answers[currentQ.id]}
                                onValueChange={handleAnswer}
                                className="space-y-3"
                            >
                                {['A', 'B', 'C', 'D', 'E'].map((alt) => (
                                    <div key={alt} className="flex items-start space-x-2">
                                        <RadioGroupItem value={alt} id={`q${currentQ.id}-${alt}`} className="mt-1" />
                                        <Label
                                            htmlFor={`q${currentQ.id}-${alt}`}
                                            className={cn(
                                                "flex-1 p-3 rounded-md border cursor-pointer hover:bg-muted transition-colors leading-relaxed",
                                                answers[currentQ.id] === alt ? "border-primary bg-primary/5 ring-1 ring-primary" : ""
                                            )}
                                        >
                                            <span className="font-bold mr-2 text-primary">{alt})</span>
                                            {currentQ[`alternativa_${alt}` as keyof typeof currentQ]}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>

                            <div className="mt-8 space-y-6">
                                <Explanation 
                                    question={currentQ} 
                                    markedAnswer={answers[currentQ.id]}
                                    onSynthesisChange={(val) => setSyntheses(prev => ({ ...prev, [currentQ.id]: val }))}
                                    synthesisValue={syntheses[currentQ.id] || ""}
                                />
                            </div>

                        </CardContent>
                        <CardFooter className="flex justify-between pt-6 border-t bg-muted/20">
                            <Button
                                variant="outline"
                                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                                disabled={currentQuestionIndex === 0}
                            >
                                <ChevronLeft className="w-4 h-4 mr-2" /> Anterior
                            </Button>

                            <Button
                                onClick={() => setCurrentQuestionIndex(prev => Math.min(localQuestions.length - 1, prev + 1))}
                                disabled={currentQuestionIndex === localQuestions.length - 1}
                            >
                                Próxima <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                {/* Navigation Sidebar */}
                <div className="lg:col-span-3">
                    <Card className="sticky top-24">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base flex items-center gap-2">
                                <Map className="w-4 h-4" /> Mapa da Prova
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[calc(100vh-300px)] pr-4">
                                <div className="grid grid-cols-5 gap-2">
                                    {localQuestions.map((q, idx) => {
                                        const isAnswered = !!answers[q.id]
                                        const isCurrent = idx === currentQuestionIndex
                                        return (
                                            <button
                                                key={q.id}
                                                onClick={() => setCurrentQuestionIndex(idx)}
                                                className={cn(
                                                    "w-10 h-10 rounded-md text-sm font-bold flex items-center justify-center transition-all",
                                                    isCurrent
                                                        ? "bg-primary text-primary-foreground ring-2 ring-offset-2 ring-primary"
                                                        : isAnswered
                                                            ? "bg-slate-700 text-white dark:bg-slate-600"
                                                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                                                )}
                                            >
                                                {idx + 1}
                                            </button>
                                        )
                                    })}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Youtube, AlertTriangle, PenLine } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

function Explanation({ 
    question, 
    markedAnswer, 
    onSynthesisChange, 
    synthesisValue 
}: { 
    question: any, 
    markedAnswer?: string,
    onSynthesisChange: (val: string) => void,
    synthesisValue: string
}) {
    const [isOpen, setIsOpen] = useState(false)
    const isWrong = markedAnswer && markedAnswer !== question.alternativa_correta_base

    const getPegadinhaLabel = (tipo: string) => {
        const labels: Record<string, string> = {
            sintaxe_exata: "Sintaxe Exata (API/Lib)",
            polimorfismo: "Polimorfismo/Herança (OOP)",
            sql_subconsulta: "SQL/Subconsultas",
            algoritmo_manual: "Algoritmo Manual (Pilha/Árvore)",
            conceito_direto: "Conceito Direto"
        }
        return labels[tipo] || "Geral"
    }

    return (
        <div className="space-y-4">
            {isWrong && (
                <Card className="border-red-200 bg-red-50/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-bold text-red-700 flex items-center gap-2">
                            <PenLine className="w-4 h-4" /> CADERNO DE ERROS (PIAZZI)
                        </CardTitle>
                        <CardDescription className="text-red-600">
                            A dor do erro ensina. Escreva uma síntese de até 140 caracteres sobre o que você errou aqui:
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Textarea 
                            placeholder="Ex: O .fit() do Scikit-learn recebe (X, y) e não apenas X..."
                            className="bg-white border-red-200 focus-visible:ring-red-500"
                            maxLength={140}
                            value={synthesisValue}
                            onChange={(e) => onSynthesisChange(e.target.value)}
                        />
                        <div className="mt-2 text-right text-xs text-red-400">
                            {synthesisValue.length}/140
                        </div>
                    </CardContent>
                </Card>
            )}

            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border rounded-md bg-muted/30">
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full flex justify-between p-4 hover:bg-muted/50">
                        <span className="font-semibold flex items-center gap-2">
                            💡 Ver Resolução Comentada
                        </span>
                        <span className="text-muted-foreground">{isOpen ? "Ocultar" : "Mostrar"}</span>
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 pt-0 border-t bg-background/50">
                    <div className="pt-4 space-y-4">
                        <div className="flex items-center gap-2 px-2 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded uppercase w-fit">
                            <AlertTriangle className="w-3 h-3" /> Pegadinha: {getPegadinhaLabel(question.tipo_pegadinha)}
                        </div>
                        
                        <div>
                            <span className="font-bold text-primary">Gabarito: {question.alternativa_correta_base}</span>
                            <p className="mt-2 text-sm leading-relaxed">
                                {question.comentario || question.comentario_detalhado || "Sem comentário disponível."}
                            </p>
                        </div>

                        <div>
                            <a
                                href={question.video_url || `https://www.youtube.com/results?search_query=${encodeURIComponent(`Banco do Brasil Cesgranrio ${question.ano} ${question.materia} questão ${question.numero_base}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-red-600 hover:underline font-medium"
                            >
                                <Youtube className="w-5 h-5" />
                                Assistir resolução em vídeo
                            </a>
                        </div>
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    )
}
