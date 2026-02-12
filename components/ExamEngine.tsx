

"use client";

import React, { useState, useEffect } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    CheckCircle,
    XCircle,
    PlayCircle,
    BookOpen,
    Info,
    ChevronDown,
    ChevronUp,
    Lock
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { submitAnswer } from '@/app/actions';
import Image from 'next/image';

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
}

interface Prova {
    id: number;
    nome: string;
    questoes: Question[];
}

const ExamEngine = ({ prova }: { prova: any }) => {
    const { data: session } = useSession();
    const isPremium = session?.user?.role === 'PREMIUM' || session?.user?.role === 'ADMIN';
    const [currentIdx, setCurrentIdx] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [showDetailed, setShowDetailed] = useState(false);
    const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
    const [startTime, setStartTime] = useState<number>(Date.now());

    const question = prova.questoes[currentIdx];
    const isAnswered = !!userAnswers[question.id];
    const currentSelection = userAnswers[question.id] || selected;
    const isCorrect = userAnswers[question.id] === question.alternativa_correta_base;

    useEffect(() => {
        // Reset timer when question changes if not answered
        if (!isAnswered) {
            setStartTime(Date.now());
        }
    }, [currentIdx, isAnswered]);

    const handleSelect = (letter: string) => {
        if (isAnswered) return;
        setSelected(letter);
    };

    const handleConfirm = async () => {
        if (!selected) return;

        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        const correct = selected === question.alternativa_correta_base;

        setUserAnswers(prev => ({ ...prev, [question.id]: selected }));
        setShowFeedback(true);

        // Server Action
        await submitAnswer({
            questaoId: question.id,
            respostaMarcada: selected,
            correta: correct,
            tempoGasto: timeSpent,
            versao: 'v1'
        });
    };

    const nextQuestion = () => {
        if (currentIdx < prova.questoes.length - 1) {
            setCurrentIdx(prev => prev + 1);
            resetStateForNewQuestion(currentIdx + 1);
        }
    };

    const prevQuestion = () => {
        if (currentIdx > 0) {
            setCurrentIdx(prev => prev - 1);
            resetStateForNewQuestion(currentIdx - 1);
        }
    };

    const resetStateForNewQuestion = (newIdx: number) => {
        const nextQ = prova.questoes[newIdx];
        const answered = userAnswers[nextQ.id];
        setSelected(answered || null);
        setShowFeedback(!!answered);
        setShowDetailed(false);
    };

    const alternatives = [
        { letter: 'A', text: question.alternativa_A },
        { letter: 'B', text: question.alternativa_B },
        { letter: 'C', text: question.alternativa_C },
        { letter: 'D', text: question.alternativa_D },
        { letter: 'E', text: question.alternativa_E },
    ];

    return (
        <div className="exam-engine-container">
            <div className="exam-sidebar glass-panel">
                <div className="question-grid">
                    {prova.questoes.map((q: any, idx: number) => (
                        <button
                            key={q.id}
                            onClick={() => {
                                setCurrentIdx(idx);
                                resetStateForNewQuestion(idx);
                            }}
                            className={`grid-item ${currentIdx === idx ? 'current' : ''} ${userAnswers[q.id] ? (userAnswers[q.id] === q.alternativa_correta_base ? 'correct' : 'incorrect') : ''}`}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>
            </div>

            <div className="exam-content">
                <div className="question-card glass-panel p-8">
                    <div className="question-header">
                        <span className="badge-pill bg-info-glass">{question.materia}</span>
                        <span className="question-number">Questão {currentIdx + 1} de {prova.questoes.length}</span>
                    </div>

                    <div className="question-body mt-6">
                        <p className="enunciado-text">{question.enunciado}</p>

                        {question.imagem_url && (
                            <div className="question-image mt-4 mb-4">
                                <Image
                                    src={`/uploads/${question.imagem_url}`}
                                    alt="Imagem da questão"
                                    width={600}
                                    height={400}
                                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                                />
                            </div>
                        )}
                    </div>

                    <div className="alternatives-list mt-8">
                        {alternatives.map((alt) => {
                            let statusClass = '';
                            if (isAnswered) {
                                if (alt.letter === question.alternativa_correta_base) statusClass = 'correct';
                                else if (alt.letter === userAnswers[question.id]) statusClass = 'incorrect';
                            } else if (selected === alt.letter) {
                                statusClass = 'selected';
                            }

                            return (
                                <button
                                    key={alt.letter}
                                    onClick={() => handleSelect(alt.letter)}
                                    className={`alternative-item ${statusClass}`}
                                >
                                    <span className="alt-letter">{alt.letter}</span>
                                    <span className="alt-text">{alt.text}</span>
                                    {isAnswered && alt.letter === question.alternativa_correta_base && (
                                        <CheckCircle className="status-icon" size={20} />
                                    )}
                                    {isAnswered && alt.letter === userAnswers[question.id] && alt.letter !== question.alternativa_correta_base && (
                                        <XCircle className="status-icon" size={20} />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {!isAnswered ? (
                        <div className="exam-actions mt-8">
                            <button
                                className="btn-primary w-full py-4 text-lg"
                                disabled={!selected}
                                onClick={handleConfirm}
                            >
                                Confirmar Resposta
                            </button>
                        </div>
                    ) : (
                        <div className="feedback-section mt-8 animate-fade-in">
                            <div className={`feedback-banner ${isCorrect ? 'bg-success-glass' : 'bg-error-glass'}`}>
                                {isCorrect ? (
                                    <><CheckCircle className="text-success" /> <span>Resposta Correta!</span></>
                                ) : (
                                    <><XCircle className="text-error" /> <span>Resposta Errada. A correta é a alternativa {question.alternativa_correta_base}.</span></>
                                )}
                            </div>

                            <div className="solution-panel mt-4">
                                <div className="solution-buttons">
                                    <button
                                        className="glass-panel p-3 flex-1 flex-center gap-2 hover-bright"
                                        onClick={() => setShowDetailed(!showDetailed)}
                                    >
                                        {isPremium ? <BookOpen size={18} /> : <Lock size={18} />}
                                        {showDetailed ? 'Esconder Solução' : 'Ver Solução Detalhada'}
                                        {showDetailed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </button>

                                    {question.video_url && (
                                        <div className="flex-1">
                                            {isPremium ? (
                                                <a
                                                    href={question.video_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="glass-panel p-3 w-full flex-center gap-2 text-error hover-bright hidden md:flex"
                                                >
                                                    <PlayCircle size={18} />
                                                    Assistir Vídeo Aula
                                                </a>
                                            ) : (
                                                <button className="glass-panel p-3 w-full flex-center gap-2 text-gray-400 cursor-not-allowed hidden md:flex">
                                                    <Lock size={18} />
                                                    Vídeo Aula (Premium)
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {showDetailed && (
                                    <div className="detailed-content glass-panel p-6 mt-4 animate-slide-down">
                                        {!isPremium ? (
                                            <div className="text-center py-8">
                                                <Lock className="mx-auto text-yellow-500 mb-4" size={48} />
                                                <h3 className="text-xl font-bold mb-2">Conteúdo Exclusivo</h3>
                                                <p className="text-gray-400 mb-6">Atualize para o plano Premium para ver a solução detalhada e videoaulas.</p>
                                                <a href="/#pricing" className="btn-primary px-6 py-2 rounded-full">
                                                    Seja Premium
                                                </a>
                                            </div>
                                        ) : (
                                            <>
                                                <h4>📝 Comentário do Professor</h4>
                                                <div
                                                    className="mt-3 text-secondary"
                                                    dangerouslySetInnerHTML={{ __html: question.comentario || 'Sem comentário breve.' }}
                                                />

                                                <h4 className="mt-6">📚 Passo a Passo</h4>
                                                <div
                                                    className="mt-3 solution-rich-text"
                                                    dangerouslySetInnerHTML={{ __html: question.comentario_detalhado || 'Ainda estamos preparando a solução detalhada para esta questão.' }}
                                                />
                                                {question.video_url && (
                                                    <div className="mt-4 md:hidden">
                                                        <a href={question.video_url} target="_blank" rel="noopener noreferrer" className="text-error flex items-center gap-2">
                                                            <PlayCircle size={16} /> Assistir Vídeo
                                                        </a>
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="navigation-footer flex-between mt-8 pt-6 border-t border-glass">
                        <button
                            className="glass-panel px-6 py-2 flex-center gap-2"
                            onClick={prevQuestion}
                            disabled={currentIdx === 0}
                        >
                            <ChevronLeft size={20} /> Anterior
                        </button>
                        <button
                            className="glass-panel px-6 py-2 flex-center gap-2"
                            onClick={nextQuestion}
                            disabled={currentIdx === prova.questoes.length - 1}
                        >
                            Próxima <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExamEngine;
