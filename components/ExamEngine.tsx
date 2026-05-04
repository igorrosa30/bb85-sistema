"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { submitAnswer, submitExam } from '@/app/actions';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardDescription, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ChevronLeft, ChevronRight, Clock, Map, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Question {
    id: number;
    numero_base: number;
    materia: string;
    enunciado: string;
    imagem_url: string | null;
    alternativa_A: string;
    alternativa_B: string;
    alternativa_C: string;
    alternativa_D: string;
    alternativa_E: string;
    alternativa_correta_base: string;
    comentario: string | null;
    comentario_detalhado: string | null;
    video_url: string | null;
    prova?: {
        ano: number;
        tipo_prova: string;
    };
}

interface Prova {
    id: number;
    ano: number;
    cargo: string;
    tipo_prova: string;
    versao: string;
    questoes: Question[];
}

const ExamEngine = ({ prova }: { prova: Prova }) => {
    const router = useRouter();
    const isPremium = true; // Personal system is always premium
    const [currentIdx, setCurrentIdx] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
    const [timeLeft, setTimeLeft] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Timer states
    const [examStartTime] = useState<number>(Date.now());

    const question = prova.questoes[currentIdx];
    const isAnswered = !!userAnswers[question.id];

    useEffect(() => {
        // Calculate max time: (questions.length / 70) * 5 hours (in seconds)
        const maxTime = Math.ceil((prova.questoes.length / 70) * 18000);
        setTimeLeft(maxTime);

        // Timer
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [prova.questoes.length]);

    const handleSelect = (value: string) => {
        setUserAnswers(prev => ({ ...prev, [question.id]: value }));
    };

    const handleFinishExam = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        const totalTime = Math.floor((Date.now() - examStartTime) / 1000);

        const respostas = Object.entries(userAnswers).map(([qId, resposta]) => {
            const q = prova.questoes.find((i: any) => i.id === Number(qId));
            return {
                questaoId: Number(qId),
                respostaMarcada: resposta,
                correta: q?.alternativa_correta_base === resposta,
                tempoGasto: 0,
                materia: q?.materia || ''
            };
        });

        try {
            const result = await submitExam({
                tempoTotal: totalTime,
                tipo: 'prova',
                config: { provaId: prova.id },
                respostas
            });

            if (result.success) {
                toast.success("Simulado finalizado!");
                router.push(`/simulado/resultado/${result.id}`);
            } else {
                toast.error("Erro ao finalizar simulado.");
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error(error);
            toast.error("Erro inesperado.");
            setIsSubmitting(false);
        }
    };

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const progress = (Object.keys(userAnswers).length / prova.questoes.length) * 100;

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header / Timer Bar */}
            <div className="sticky top-0 z-50 bg-background border-b shadow-sm">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="font-bold text-xl text-primary">BB Simulados</span>
                        <div className="h-6 w-px bg-border hidden sm:block"></div>
                        <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            <span>{formatTime(timeLeft)}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground hidden md:block">
                            {Object.keys(userAnswers).length}/{prova.questoes.length} respondidas
                        </span>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" className="bg-red-600 hover:bg-red-700">Finalizar</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Você respondeu {Object.keys(userAnswers).length} de {prova.questoes.length} questões.
                                        Ao finalizar, você não poderá alterar suas respostas.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleFinishExam} className="bg-primary text-primary-foreground">
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
                                <span className="text-sm font-semibold text-primary uppercase tracking-wider">{question.materia}</span>
                                <span className="text-sm text-muted-foreground">Questão {currentIdx + 1} de {prova.questoes.length}</span>
                            </div>
                            <CardDescription className="text-lg font-medium text-foreground whitespace-pre-wrap">
                                {question.enunciado}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {question.imagem_url && (
                                <div className="mb-6 rounded-lg overflow-hidden border">
                                    <Image
                                        src={`/uploads/${question.imagem_url}`}
                                        alt="Imagem da questão"
                                        width={600}
                                        height={400}
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                    />
                                </div>
                            )}

                            <RadioGroup
                                value={userAnswers[question.id]}
                                onValueChange={handleSelect}
                                className="space-y-3"
                            >
                                {['A', 'B', 'C', 'D', 'E'].map((alt) => (
                                    <div key={alt} className="flex items-start space-x-2">
                                        <RadioGroupItem value={alt} id={`q${question.id}-${alt}`} className="mt-1" />
                                        <Label
                                            htmlFor={`q${question.id}-${alt}`}
                                            className={cn(
                                                "flex-1 p-3 rounded-md border cursor-pointer hover:bg-muted transition-colors leading-relaxed",
                                                userAnswers[question.id] === alt ? "border-primary bg-primary/5 ring-1 ring-primary" : ""
                                            )}
                                        >
                                            <span className="font-bold mr-2 text-primary">({alt})</span>
                                            {question[`alternativa_${alt}` as keyof Question]}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>

                            <div className="mt-8">
                                <Explanation question={question} />
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-6 border-t bg-muted/20">
                            <Button
                                variant="outline"
                                onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                                disabled={currentIdx === 0}
                            >
                                <ChevronLeft className="w-4 h-4 mr-2" /> Anterior
                            </Button>

                            <span className="text-sm text-muted-foreground">
                                {currentIdx + 1} / {prova.questoes.length}
                            </span>

                            <Button
                                onClick={() => setCurrentIdx(prev => Math.min(prova.questoes.length - 1, prev + 1))}
                                disabled={currentIdx === prova.questoes.length - 1}
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
                            <h3 className="text-base font-bold flex items-center gap-2">
                                <Map className="w-4 h-4" /> Mapa da Prova
                            </h3>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[calc(100vh-300px)] pr-4">
                                <div className="grid grid-cols-5 gap-2">
                                    {prova.questoes.map((q, idx) => {
                                        const isAnswered = !!userAnswers[q.id];
                                        const isCurrent = idx === currentIdx;
                                        return (
                                            <button
                                                key={q.id}
                                                onClick={() => setCurrentIdx(idx)}
                                                className={cn(
                                                    "w-10 h-10 rounded-md text-sm font-bold flex items-center justify-center transition-all",
                                                    isCurrent
                                                        ? "bg-primary text-primary-foreground ring-2 ring-offset-2 ring-primary"
                                                        : isAnswered
                                                            ? "bg-blue-600 text-white dark:bg-blue-700"
                                                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                                                )}
                                            >
                                                {idx + 1}
                                            </button>
                                        );
                                    })}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
};

// Explanation Component
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Youtube } from 'lucide-react';

function Explanation({ question }: { question: Question }) {
    const [isOpen, setIsOpen] = useState(false);

    // Generate YouTube search query for this specific question
    const searchQuery = `Banco do Brasil Cesgranrio ${question.prova?.ano || 2023} ${question.materia} questão ${question.numero_base}`;
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`;

    return (
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
                    <div>
                        <span className="font-bold text-primary">Gabarito: {question.alternativa_correta_base}</span>
                        <p className="mt-2 text-sm leading-relaxed">
                            {question.comentario || question.comentario_detalhado || "Sem comentário disponível."}
                        </p>
                    </div>

                    <div>
                        <a
                            href={question.video_url || searchUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-red-600 hover:underline font-medium"
                        >
                            <Youtube className="w-5 h-5" />
                            {question.video_url ? "Assistir resolução em vídeo" : "Buscar resolução no YouTube"}
                        </a>
                    </div>
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
}

export default ExamEngine;
