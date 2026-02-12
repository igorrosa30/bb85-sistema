'use client';

import { useState, useEffect } from 'react';

interface Question {
    id: number;
    enunciado: string;
    alternativa_A: string;
    alternativa_B: string;
    alternativa_C: string;
    alternativa_D: string;
    alternativa_E: string;
    alternativa_correta_base: string;
    materia: string;
}

export default function ExamPage() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [loading, setLoading] = useState(true);
    const [finished, setFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isHiddenMode, setIsHiddenMode] = useState(false);

    useEffect(() => {
        async function fetchQuestions() {
            try {
                const res = await fetch('/api/questions?limit=10');
                const data = await res.json();
                setQuestions(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
        fetchQuestions();

        const timer = setInterval(() => {
            setElapsedTime((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleAnswer = (option: string) => {
        setAnswers({ ...answers, [questions[currentIndex].id]: option });
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            finishExam();
        }
    };

    const finishExam = async () => {
        const questionsToScore = questions.length > 0 ? questions : [];
        if (questionsToScore.length === 0) return;

        let correctCount = 0;
        questionsToScore.forEach((q) => {
            if (answers[q.id] === q.alternativa_correta_base) {
                correctCount++;
            }
        });

        const finalScore = (correctCount / questionsToScore.length) * 100;
        setScore(finalScore);
        setFinished(true);

        // Save result
        try {
            await fetch('/api/simulations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tempo_total: elapsedTime,
                    percentual_geral: finalScore,
                    percentual_materia_json: {}, // TODO: Calculate per subject
                    classificacao: finalScore >= 85 ? 'Aprovado' : 'Em Formação',
                }),
            });
        } catch (e) {
            console.error('Error saving result', e);
        }
    };

    if (loading) return <div className="glass-panel" style={{ padding: '2rem' }}>Carregando Simulado...</div>;

    if (finished) {
        return (
            <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Resultado</h1>
                <div style={{ fontSize: '4rem', fontWeight: 'bold', color: score >= 85 ? 'var(--bb-yellow-neon)' : 'inherit' }}>
                    {score.toFixed(0)}%
                </div>
                <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
                    Tempo: {Math.floor(elapsedTime / 60)}m {elapsedTime % 60}s
                </p>
                <button
                    className="btn-primary"
                    style={{ marginTop: '2rem' }}
                    onClick={() => window.location.href = '/dashboard'}
                >
                    Voltar ao Dashboard
                </button>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];

    if (!currentQuestion) return <div className="glass-panel" style={{ padding: '2rem' }}>Nenhuma questão disponível. Verifique se o banco de dados foi populado.</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    <span style={{ filter: isHiddenMode ? 'blur(5px)' : 'none', transition: 'filter 0.3s' }}>
                        Questão {currentIndex + 1} de {questions.length}
                    </span>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button
                        onClick={() => setIsHiddenMode(!isHiddenMode)}
                        style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', padding: '5px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}
                    >
                        {isHiddenMode ? '👁️ Exibir Info' : '🙈 Modo Oculto'}
                    </button>
                    <div className="glass-panel" style={{ padding: '5px 15px', filter: isHiddenMode ? 'blur(5px)' : 'none', transition: 'filter 0.3s' }}>
                        ⏳ {Math.floor(elapsedTime / 60)}:{String(elapsedTime % 60).padStart(2, '0')}
                    </div>
                </div>
            </div>

            <div className="glass-panel" style={{ padding: '2rem' }}>
                <div style={{ marginBottom: '1rem', color: 'var(--bb-blue-neon)', fontWeight: 600 }}>
                    {currentQuestion.materia}
                </div>
                <p style={{ fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                    {currentQuestion.enunciado}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {['A', 'B', 'C', 'D', 'E'].map((opt) => (
                        <div
                            key={opt}
                            onClick={() => handleAnswer(opt)}
                            style={{
                                padding: '15px',
                                border: `1px solid ${answers[currentQuestion.id] === opt ? 'var(--bb-blue-neon)' : 'var(--glass-border)'}`,
                                borderRadius: '8px',
                                cursor: 'pointer',
                                background: answers[currentQuestion.id] === opt ? 'rgba(46, 122, 249, 0.1)' : 'transparent',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <span style={{ fontWeight: 'bold', marginRight: '10px', color: 'var(--bb-blue-neon)' }}>{opt})</span>
                            {/* @ts-ignore - dynamic key access */}
                            {currentQuestion[`alternativa_${opt}`]}
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        className="btn-primary"
                        onClick={handleNext}
                    >
                        {currentIndex === questions.length - 1 ? 'Finalizar' : 'Próxima'}
                    </button>
                </div>
            </div>
        </div>
    );
}
