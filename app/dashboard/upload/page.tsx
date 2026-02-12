'use client';

import { useState } from 'react';

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<string>('');
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsUploading(true);
        setStatus('Enviando...');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                setStatus(`Sucesso! Texto extraído: ${data.textLength} caracteres.`);
                console.log('Preview:', data.preview);
            } else {
                setStatus(`Erro: ${data.error}`);
            }
        } catch (error) {
            console.error(error);
            setStatus('Erro ao conectar com o servidor.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Upload de Prova</h1>

            <div className="glass-panel" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', borderStyle: 'dashed' }}>
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="file-upload"
                />
                <label
                    htmlFor="file-upload"
                    className="btn-primary"
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                    📄 Selecionar PDF
                </label>

                {file && (
                    <div style={{ marginTop: '1rem' }}>
                        Arquivo: <strong>{file.name}</strong>
                    </div>
                )}

                <button
                    onClick={handleUpload}
                    disabled={!file || isUploading}
                    className="glass-panel"
                    style={{
                        padding: '10px 30px',
                        marginTop: '1rem',
                        opacity: (!file || isUploading) ? 0.5 : 1,
                        cursor: (!file || isUploading) ? 'not-allowed' : 'pointer'
                    }}
                >
                    {isUploading ? 'Processando...' : 'Processar Prova'}
                </button>

                {status && (
                    <div style={{ marginTop: '1rem', padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>
                        {status}
                    </div>
                )}
            </div>

            <div style={{ marginTop: '2rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>Instruções</h3>
                <ul style={{ listStyle: 'disc', paddingLeft: '20px', color: 'var(--text-secondary)' }}>
                    <li>Envie o PDF original da prova (Cesgranrio).</li>
                    <li>O sistema extrairá o texto e tentará identificar as questões automaticamente.</li>
                    <li>Após o upload, verifique as questões na aba "Banco de Questões".</li>
                </ul>
            </div>
        </div>
    );
}
