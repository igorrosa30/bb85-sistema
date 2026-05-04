'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Send, AlertCircle, Copy, Check, RotateCcw } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function RedacaoEditor() {
    const router = useRouter();
    const [tema, setTema] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [copied, setCopied] = useState(false);

    // Simulated line count based on character density
    const charPerLine = 75;
    const estimatedLines = Math.ceil(conteudo.length / charPerLine);
    const lineWarning = estimatedLines < 20 ? 'Texto muito curto (mín. 20 linhas)' : (estimatedLines > 30 ? 'Cuidado: Texto longo (máx. 30 linhas)' : null);

    const handleSave = async (status: 'Rascunho' | 'Enviada') => {
        if (!tema || !conteudo) {
            alert('Preencha o tema e o conteúdo da redação.');
            return;
        }

        setIsSaving(true);
        try {
            const response = await fetch('/api/redacao', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tema, conteudo, status }),
            });

            if (response.ok) {
                router.push('/redacao');
                router.refresh();
            } else {
                alert('Erro ao salvar redação.');
            }
        } catch (error) {
            console.error(error);
            alert('Erro de conexão.');
        } finally {
            setIsSaving(false);
        }
    };

    const copyPrompt = () => {
        const prompt = `Aja como um corretor experiente da banca Cesgranrio. Corrija a redação abaixo com base nos seguintes critérios: 1) Adequação ao tema e tipo de texto; 2) Estrutura argumentativa (introdução, desenvolvimento, conclusão); 3) Coesão e coerência; 4) Domínio da norma padrão da língua portuguesa. A redação deve ter entre 20 e 30 linhas. Aponte erros, sugira melhorias e dê uma nota de 0 a 100.

TEMA: ${tema}

REDAÇÃO:
${conteudo}`;

        navigator.clipboard.writeText(prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Editor Area */}
            <div className="lg:col-span-8 space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-black text-secondary uppercase tracking-wider">Tema da Redação</label>
                    <input 
                        type="text"
                        placeholder="Ex: Os desafios da segurança digital nos bancos modernos"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-lg font-bold text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none transition-all"
                        value={tema}
                        onChange={(e) => setTema(e.target.value)}
                    />
                </div>

                <div className="space-y-2 relative">
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-black text-secondary uppercase tracking-wider">Seu Texto</label>
                        <div className="flex items-center gap-4 text-[10px] font-bold">
                            <span className={estimatedLines < 20 || estimatedLines > 30 ? 'text-red-400' : 'text-green-400'}>
                                {estimatedLines} LINHAS (ESTIMADO)
                            </span>
                            <span className="text-secondary">{conteudo.length} CARACTERES</span>
                        </div>
                    </div>
                    <Textarea 
                        placeholder="Comece sua redação aqui..."
                        className="min-h-[500px] bg-black/40 border-white/10 text-base leading-relaxed font-serif p-6 resize-none focus:border-neon-blue transition-all"
                        value={conteudo}
                        onChange={(e) => setConteudo(e.target.value)}
                    />
                    
                    {lineWarning && (
                        <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-red-500/20 text-red-400 px-3 py-1.5 rounded-lg text-xs font-bold border border-red-500/30 animate-pulse">
                            <AlertCircle size={14} />
                            {lineWarning}
                        </div>
                    )}
                </div>

                <div className="flex gap-4">
                    <Button 
                        variant="outline" 
                        className="flex-1 border-white/10 hover:bg-white/5 py-6 rounded-xl"
                        onClick={() => handleSave('Rascunho')}
                        disabled={isSaving}
                    >
                        <Save className="mr-2" size={18} />
                        SALVAR RASCUNHO
                    </Button>
                    <Button 
                        className="flex-1 bg-neon-blue text-black font-black py-6 rounded-xl hover:shadow-[0_0_20px_rgba(0,163,255,0.4)]"
                        onClick={() => handleSave('Enviada')}
                        disabled={isSaving}
                    >
                        <Send className="mr-2" size={18} />
                        CONCLUIR REDAÇÃO
                    </Button>
                </div>
            </div>

            {/* AI Correction Assistant Sidebar */}
            <div className="lg:col-span-4 space-y-6">
                <div className="glass-panel p-6 border-neon-blue/30 bg-neon-blue/5">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 bg-neon-blue text-black rounded-lg">
                            <RotateCcw size={20} />
                        </div>
                        <h3 className="font-bold text-white uppercase text-sm tracking-tight">Assistente de Correção</h3>
                    </div>

                    <p className="text-xs text-secondary leading-relaxed mb-6">
                        O BB85-X usa um prompt especializado para o **ChatGPT** corrigir sua redação no padrão exato da Cesgranrio.
                    </p>

                    <div className="space-y-4">
                        <Button 
                            className="w-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-bold py-6 rounded-xl"
                            onClick={copyPrompt}
                            disabled={!conteudo}
                        >
                            {copied ? <Check className="mr-2 text-green-400" size={18} /> : <Copy className="mr-2" size={18} />}
                            {copied ? 'PROMPT COPIADO!' : 'COPIAR PROMPT PARA IA'}
                        </Button>
                        
                        <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                            <h4 className="text-[10px] font-black text-secondary uppercase mb-2">Instruções:</h4>
                            <ol className="text-[10px] text-white/70 space-y-2 list-decimal list-inside">
                                <li>Escreva sua redação no campo ao lado.</li>
                                <li>Clique em "Copiar Prompt para IA".</li>
                                <li>Cole no ChatGPT ou Gemini.</li>
                                <li>Salve o rascunho aqui para não perder.</li>
                            </ol>
                        </div>
                    </div>
                </div>

                <div className="glass-panel p-6 bg-white/5 border border-white/10">
                    <h4 className="text-xs font-bold text-white mb-3 flex items-center gap-2">
                        <AlertCircle size={14} className="text-neon-yellow" />
                        Esqueleto da Introdução
                    </h4>
                    <p className="text-[11px] text-secondary leading-relaxed italic">
                        "No cenário contemporâneo brasileiro, é evidente que [TEMA] representa um desafio relevante. Nesse sentido, é crucial analisar como [ARGUMENTO 1] e [ARGUMENTO 2] potencializam essa problemática."
                    </p>
                </div>
            </div>
        </div>
    );
}
