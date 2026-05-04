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
import { submitExam, getQuestionHistory } from "@/app/actions"

interface ExamInterfaceProps {
    questions: any[]
    config: any
}

function QuestionStats({ questaoId }: { questaoId: number }) {
    const [history, setHistory] = useState<any>(null);

    useEffect(() => {
        getQuestionHistory(questaoId).then(setHistory);
    }, [questaoId]);

    if (!history || history.total === 0) return null;

    return (
        <div className="flex gap-2 mt-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-secondary border border-white/5">
                VISTO {history.total}x
            </span>
            <span className={`text-[10px] font-black px-2 py-0.5 rounded ${history.erros > 0 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                {history.acertos} ACERTOS / {history.erros} ERROS
            </span>
            {history.erros >= 2 && (
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-neon-yellow text-black animate-pulse">
                    ⚠️ ERRO RECORRENTE!
                </span>
            )}
        </div>
    );
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

    // Gamification State
    const [lastXpGain, setLastXpGain] = useState<number | null>(null)

    // Timer & Init Logic (keep as is)
    useEffect(() => {
        // ... (existing timer logic)
    }, [questions])

    const handleAnswer = (value: string) => {
        const q = localQuestions[currentQuestionIndex];
        const isCorrect = value === q.alternativa_correta_base;
        
        setAnswers(prev => ({
            ...prev,
            [q.id]: value
        }))

        // Show quick feedback for correct answer (gamification)
        if (isCorrect) {
            setLastXpGain(10);
            setTimeout(() => setLastXpGain(null), 2000);
        }
    }

    const handleFinish = async (auto = false) => {
        if (isSubmitting) return
        setIsSubmitting(true)

        const endTime = Date.now()
        const totalTimeSpent = Math.floor((endTime - startTime) / 1000)

        const questionsToSubmit = localQuestions.length > 0 ? localQuestions : questions
        const respostas = questionsToSubmit.map(q => {
            const marked = answers[q.id] || "X"
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
                toast.success(`Simulado finalizado! +${result.xpGain} XP`)
                if (result.leveledUp) {
                    toast.success("🏆 LEVEL UP! Você subiu de nível!", {
                        duration: 5000,
                        icon: '🔥'
                    })
                }
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
    if (!currentQ) return <div className="flex items-center justify-center h-screen bg-black text-white">Carregando prova...</div>

    const progress = (Object.keys(answers).length / localQuestions.length) * 100

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {/* XP Float Notification */}
            {lastXpGain && (
                <div className="fixed top-20 right-10 z-[100] animate-bounce bg-neon-blue text-black font-black px-4 py-2 rounded-full shadow-[0_0_20px_rgba(0,163,255,0.8)]">
                    +{lastXpGain} XP
                </div>
            )}

            {/* Header / Timer Bar */}
            <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="font-black text-2xl tracking-tighter text-neon-blue">BB85<span className="text-white">X</span></span>
                        <div className="h-6 w-px bg-white/10 hidden sm:block"></div>
                        <div className="hidden sm:flex flex-col text-[10px] font-black uppercase tracking-widest text-secondary">
                            <span>Questão {currentQuestionIndex + 1} / {localQuestions.length}</span>
                            <Progress value={progress} className="h-1 w-24 bg-white/5" />
                        </div>
                    </div>

                    <div className={cn(
                        "flex items-center gap-2 font-mono text-xl font-black px-6 py-2 rounded-xl border transition-all",
                        timeLeft < 600 ? "bg-red-500/20 text-red-500 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)] animate-pulse" : "bg-white/5 border-white/10 text-white"
                    )}>
                        <Clock className="w-5 h-5" />
                        {formatTime(timeLeft)}
                    </div>

                    <div className="flex items-center gap-2">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className="bg-white text-black font-black hover:bg-neon-blue transition-all">FINALIZAR</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-zinc-900 border-white/10 text-white">
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="text-2xl font-black">MISSÃO CONCLUÍDA?</AlertDialogTitle>
                                    <AlertDialogDescription className="text-secondary font-medium">
                                        Você respondeu {Object.keys(answers).length} de {localQuestions.length} questões.
                                        Sua performance será processada para o ranking global.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/5">ABORTAR</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleFinish()} className="bg-neon-blue text-black font-black">
                                        CONFIRMAR ENVIO
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </div>

            <main className="flex-1 container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Question Area */}
                <div className="lg:col-span-9 space-y-6">
                    <div className="glass-panel p-8 bg-white/[0.03] border-white/10 shadow-2xl relative overflow-hidden">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <span className="text-[10px] font-black text-neon-blue uppercase tracking-[0.2em]">{currentQ.materia}</span>
                                <h2 className="text-sm font-bold text-white/40 mt-1">Prova {currentQ.prova?.tipo_prova} ({currentQ.prova?.ano})</h2>
                                <QuestionStats questaoId={currentQ.id} />
                            </div>
                            <div className="text-right">
                                <span className="text-4xl font-black opacity-10 italic">#{currentQ.numero_base}</span>
                            </div>
                        </div>

                        <div className="text-xl font-medium text-white leading-relaxed mb-8 whitespace-pre-wrap">
                            {currentQ.enunciado}
                        </div>

                        {currentQ.imagem_url && (
                            <div className="mb-8 rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                                <img src={currentQ.imagem_url} alt="Imagem da questão" className="max-w-full h-auto mx-auto" />
                            </div>
                        )}

                        <RadioGroup
                            value={answers[currentQ.id]}
                            onValueChange={handleAnswer}
                            className="space-y-4"
                        >
                            {['A', 'B', 'C', 'D', 'E'].map((alt) => (
                                <div key={alt} className="flex items-start space-x-0 group">
                                    <RadioGroupItem value={alt} id={`q${currentQ.id}-${alt}`} className="sr-only" />
                                    <Label
                                        htmlFor={`q${currentQ.id}-${alt}`}
                                        className={cn(
                                            "flex-1 p-5 rounded-2xl border cursor-pointer transition-all leading-relaxed flex items-center gap-4",
                                            answers[currentQ.id] === alt 
                                                ? "border-neon-blue bg-neon-blue/10 text-white shadow-[0_0_20px_rgba(0,163,255,0.15)]" 
                                                : "border-white/5 bg-white/5 text-white/70 hover:bg-white/10 hover:border-white/20"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm transition-all",
                                            answers[currentQ.id] === alt ? "bg-neon-blue text-black" : "bg-white/10 text-white"
                                        )}>
                                            {alt}
                                        </div>
                                        {currentQ[`alternativa_${alt}` as keyof typeof currentQ]}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>

                        <div className="mt-12">
                            <Explanation 
                                question={currentQ} 
                                markedAnswer={answers[currentQ.id]}
                                onSynthesisChange={(val) => setSyntheses(prev => ({ ...prev, [currentQ.id]: val }))}
                                synthesisValue={syntheses[currentQ.id] || ""}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center px-2">
                        <Button
                            variant="ghost"
                            className="text-secondary hover:text-white font-bold h-14 px-8"
                            onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                            disabled={currentQuestionIndex === 0}
                        >
                            <ChevronLeft className="w-5 h-5 mr-2" /> ANTERIOR
                        </Button>

                        <div className="flex gap-2">
                            {currentQuestionIndex < localQuestions.length - 1 ? (
                                <Button
                                    className="bg-white text-black font-black h-14 px-12 rounded-xl hover:bg-neon-blue transition-all"
                                    onClick={() => setCurrentQuestionIndex(prev => Math.min(localQuestions.length - 1, prev + 1))}
                                >
                                    PRÓXIMA <ChevronRight className="w-5 h-5 ml-2" />
                                </Button>
                            ) : (
                                <Button
                                    className="bg-neon-blue text-black font-black h-14 px-12 rounded-xl"
                                    onClick={() => handleFinish()}
                                >
                                    FINALIZAR PROVA
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Navigation Sidebar */}
                <div className="lg:col-span-3">
                    <div className="glass-panel p-6 bg-white/5 border-white/10 sticky top-24">
                        <div className="flex items-center gap-2 mb-6">
                            <Map className="w-4 h-4 text-neon-blue" />
                            <h3 className="text-xs font-black uppercase tracking-widest text-white">Mapa Tático</h3>
                        </div>
                        
                        <ScrollArea className="h-[calc(100vh-400px)] pr-2">
                            <div className="grid grid-cols-4 gap-2">
                                {localQuestions.map((q, idx) => {
                                    const isAnswered = !!answers[q.id]
                                    const isCurrent = idx === currentQuestionIndex
                                    return (
                                        <button
                                            key={q.id}
                                            onClick={() => setCurrentQuestionIndex(idx)}
                                            className={cn(
                                                "w-full aspect-square rounded-xl text-xs font-black flex items-center justify-center transition-all border",
                                                isCurrent
                                                    ? "bg-neon-blue text-black border-neon-blue shadow-[0_0_15px_rgba(0,163,255,0.4)]"
                                                    : isAnswered
                                                        ? "bg-white/20 text-white border-white/10"
                                                        : "bg-white/5 text-white/30 border-white/5 hover:border-white/20"
                                            )}
                                        >
                                            {(idx + 1).toString().padStart(2, '0')}
                                        </button>
                                    )
                                })}
                            </div>
                        </ScrollArea>

                        <div className="mt-8 p-4 bg-neon-blue/5 rounded-2xl border border-neon-blue/10">
                            <div className="text-[10px] font-black text-neon-blue uppercase mb-1">Status da Missão</div>
                            <div className="text-xl font-black text-white">{Object.keys(answers).length} / {localQuestions.length}</div>
                            <div className="text-[10px] text-secondary font-bold">Questões Respondidas</div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Youtube, AlertTriangle, PenLine, Flame } from "lucide-react"
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
                <div className="glass-panel p-6 border-red-500/30 bg-red-500/5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-red-500 text-white rounded-lg">
                            <Flame size={20} fill="currentColor" />
                        </div>
                        <div>
                            <h3 className="font-black text-red-500 uppercase text-xs tracking-widest">SÍNTESE DE RECUPERAÇÃO (PIAZZI)</h3>
                            <p className="text-[10px] text-red-400 font-bold">ERRO DETECTADO. OBRIGATÓRIO CRIAR SALVAGUARDA MENTAL.</p>
                        </div>
                    </div>
                    
                    <Textarea 
                        placeholder="Escreva aqui a síntese do seu erro (O que você não pode esquecer?). Máximo 140 caracteres."
                        className="bg-black/40 border-red-500/20 text-white focus:border-red-500 h-24 text-sm leading-relaxed"
                        maxLength={140}
                        value={synthesisValue}
                        onChange={(e) => onSynthesisChange(e.target.value)}
                    />
                    <div className="mt-2 flex justify-between items-center text-[10px] font-black">
                        <span className="text-red-500/60 italic">"Escrever à mão (ou sintetizar) é a única forma de aprender." - Piazzi</span>
                        <span className={cn("px-2 py-0.5 rounded", synthesisValue.length > 120 ? "bg-red-500 text-white" : "text-red-400")}>
                            {synthesisValue.length} / 140
                        </span>
                    </div>
                </div>
            )}

            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden">
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full flex justify-between p-6 hover:bg-white/10 transition-all">
                        <span className="font-black text-xs tracking-widest uppercase flex items-center gap-3 text-neon-blue">
                            <Zap size={16} fill="currentColor" />
                            Ver Resolução Tática
                        </span>
                        <span className="text-secondary text-xs">{isOpen ? "FECHAR" : "ABRIR"}</span>
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="p-6 pt-0 border-t border-white/5 bg-black/40">
                    <div className="pt-6 space-y-6">
                        <div className="flex items-center gap-2 px-3 py-1 bg-neon-yellow text-black text-[10px] font-black rounded uppercase w-fit">
                            <AlertTriangle className="w-3 h-3" /> Pegadinha: {getPegadinhaLabel(question.tipo_pegadinha)}
                        </div>
                        
                        <div>
                            <div className="flex items-center gap-2 text-green-400 font-black text-sm mb-2 uppercase tracking-widest">
                                <Check size={18} /> GABARITO: {question.alternativa_correta_base}
                            </div>
                            <p className="text-sm text-secondary leading-relaxed border-l-2 border-neon-blue pl-4">
                                {question.comentario || question.comentario_detalhado || "Sem comentário disponível."}
                            </p>
                        </div>

                        <div>
                            <a
                                href={question.video_url || `https://www.youtube.com/results?search_query=${encodeURIComponent(`Banco do Brasil Cesgranrio ${question.ano} ${question.materia} questão ${question.numero_base}`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-black text-[10px] uppercase tracking-widest transition-colors"
                            >
                                <Youtube className="w-5 h-5" />
                                ASSISTIR RESOLUÇÃO EM VÍDEO
                            </a>
                        </div>
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    )
}

