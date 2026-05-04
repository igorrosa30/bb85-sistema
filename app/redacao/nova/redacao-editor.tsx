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
            <div className="lg:col-span-8 space-y-8">
                <div className="space-y-3">
                    <label className="text-[10px] font-black text-[#a1a1aa] uppercase tracking-[0.2em]">Tema da Batalha</label>
                    <input 
                        type="text"
                        placeholder="Ex: Os desafios da segurança digital nos bancos modernos"
                        className="w-full bg-[#0a0a0a] border border-white/10 rounded-2xl px-6 py-4 text-lg font-black text-white focus:border-[#eaff20] outline-none transition-all"
                        value={tema}
                        onChange={(e) => setTema(e.target.value)}
                    />
                </div>

                <div className="space-y-3 relative">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-[10px] font-black text-[#a1a1aa] uppercase tracking-[0.2em]">Sua Dissertação</label>
                        <div className="flex items-center gap-6 text-[10px] font-black uppercase">
                            <span className={estimatedLines < 20 || estimatedLines > 30 ? 'text-red-500' : 'text-green-500'}>
                                {estimatedLines} / 30 LINHAS
                            </span>
                            <span className="text-[#a1a1aa]">{conteudo.length} CARACTERES</span>
                        </div>
                    </div>
                    <Textarea 
                        placeholder="Inicie sua argumentação... (Foque na clareza e conectivos)"
                        className="min-h-[600px] bg-[#0a0a0a] border-white/10 text-lg leading-relaxed font-serif p-8 resize-none focus:border-[#eaff20] transition-all rounded-3xl"
                        value={conteudo}
                        onChange={(e) => setConteudo(e.target.value)}
                    />
                    
                    {lineWarning && (
                        <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-xl text-[10px] font-black border border-red-500/20 animate-pulse uppercase tracking-widest">
                            <AlertCircle size={14} />
                            {lineWarning}
                        </div>
                    )}
                </div>

                <div className="flex gap-4">
                    <Button 
                        variant="outline" 
                        className="flex-1 border-white/10 bg-white/5 hover:bg-white/10 py-8 rounded-2xl font-black uppercase tracking-widest text-xs"
                        onClick={() => handleSave('Rascunho')}
                        disabled={isSaving}
                    >
                        <Save className="mr-2" size={18} />
                        SALVAR RASCUNHO
                    </Button>
                    <Button 
                        className="flex-1 bg-[#eaff20] text-black font-black py-8 rounded-2xl hover:shadow-[0_0_30px_rgba(234,255,32,0.4)] uppercase tracking-widest text-xs"
                        onClick={() => handleSave('Enviada')}
                        disabled={isSaving}
                    >
                        <Send className="mr-2" size={18} />
                        CONCLUIR E ENVIAR
                    </Button>
                </div>
            </div>

            {/* AI Correction Assistant Sidebar */}
            <div className="lg:col-span-4 space-y-8">
                <div className="bg-[#0a0a0a] border border-[#00a3ff]/30 p-8 rounded-3xl relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 text-[#00a3ff]/5">
                        <RotateCcw size={150} />
                    </div>
                    
                    <div className="flex items-center gap-3 mb-6 relative z-10">
                        <div className="p-3 bg-[#00a3ff]/20 text-[#00a3ff] rounded-xl">
                            <RotateCcw size={24} />
                        </div>
                        <h3 className="font-black text-white uppercase text-sm tracking-widest">IA de Correção</h3>
                    </div>

                    <p className="text-xs text-[#a1a1aa] leading-relaxed mb-8 relative z-10 font-medium">
                        O sistema gera um prompt militarizado para o **ChatGPT** corrigir sua redação no nível máximo da Cesgranrio.
                    </p>

                    <div className="space-y-4 relative z-10">
                        <Button 
                            className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black py-6 rounded-2xl text-xs uppercase tracking-widest"
                            onClick={copyPrompt}
                            disabled={!conteudo}
                        >
                            {copied ? <Check className="mr-2 text-green-400" size={18} /> : <Copy className="mr-2" size={18} />}
                            {copied ? 'PRONTO PARA COLAR!' : 'COPIAR PROMPT IA'}
                        </Button>
                        
                        <div className="p-6 bg-black/40 rounded-2xl border border-white/5 space-y-3">
                            <h4 className="text-[10px] font-black text-[#a1a1aa] uppercase tracking-widest">Protocolo:</h4>
                            <div className="space-y-3">
                                <ProtocolStep num="01" text="Escreva o texto completo." />
                                <ProtocolStep num="02" text="Copie o Prompt Supreme." />
                                <ProtocolStep num="03" text="Cole na IA (GPT-4 recomendado)." />
                                <ProtocolStep num="04" text="Analise as falhas apontadas." />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#eaff20]/5 border border-[#eaff20]/10 p-6 rounded-2xl">
                    <h4 className="text-[10px] font-black text-[#eaff20] mb-4 flex items-center gap-2 uppercase tracking-widest">
                        <AlertCircle size={14} />
                        Estrutura de Elite
                    </h4>
                    <p className="text-[11px] text-[#a1a1aa] leading-relaxed italic font-medium">
                        "No cenário contemporâneo brasileiro, é evidente que [TEMA] representa um desafio relevante. Nesse sentido, é crucial analisar como [ARGUMENTO 1] e [ARGUMENTO 2] potencializam essa problemática."
                    </p>
                </div>
            </div>
        </div>
    );
}

function ProtocolStep({ num, text }: { num: string, text: string }) {
    return (
        <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-[#00a3ff]">{num}</span>
            <span className="text-[10px] text-white/60 font-bold uppercase">{text}</span>
        </div>
    );
}


