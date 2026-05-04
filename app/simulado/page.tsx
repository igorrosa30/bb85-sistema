"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Check, BookOpen, FileText, Layers, Clock, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

type SimuladoMode = "completo" | "prova" | "materia" | "personalizado"

// Mapeamento de matérias conforme o prompt
const MATERIAS = [
    "Língua Portuguesa",
    "Língua Inglesa",
    "Matemática",
    "Atualidades do Mercado Financeiro",
    "Probabilidade e Estatística",
    "Conhecimentos Bancários",
    "Tecnologia da Informação"
]

const PROVAS = [
    { id: "100", label: "Agente de Tecnologia (2023)" },
    { id: "A", label: "Prova A (2023)" },
    { id: "B", label: "Prova B (2023)" },
    { id: "C", label: "Prova C (2023)" },
    { id: "D", label: "Prova A (2021)" },
]

export default function SimuladoConfigPage() {
    const router = useRouter()
    const [mode, setMode] = useState<SimuladoMode>("completo")
    const [selectedProva, setSelectedProva] = useState<string>("A")
    const [selectedMateria, setSelectedMateria] = useState<string>(MATERIAS[0])
    const [quantidade, setQuantidade] = useState<number>(70)

    // Persistir estado se necessário (opcional)
    useEffect(() => {
        const saved = sessionStorage.getItem("simulado-config-last")
        if (saved) {
            // Restore logic if needed
        }
    }, [])

    const handleStart = () => {
        const config: any = {
            tipo: mode,
            quantidade: mode === "completo" ? 70 : quantidade,
        }

        if (mode === "prova") config.provas = [selectedProva]
        if (mode === "materia") {
            config.materias = [selectedMateria]
            config.quantidade = 10 // Default para matéria única? Or let user choose
        }
        if (mode === "personalizado") config.materias = [selectedMateria] // Simplificação inicial

        // Salvar configuração na sessão
        sessionStorage.setItem("simulado-config", JSON.stringify(config))

        // Redirecionar para o exame
        router.push("/simulado/exam")
    }

    return (
        <div className="container mx-auto py-10 px-4 max-w-4xl">
            <div className="mb-8 text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-primary">Configuração do Simulado</h1>
                <p className="text-muted-foreground">Escolha como você quer treinar hoje.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <ModeCard
                    title="Simulado Completo"
                    icon={<Layers className="w-8 h-8 text-blue-500" />}
                    description="70 questões misturadas como na prova real."
                    active={mode === "completo"}
                    onClick={() => setMode("completo")}
                />
                <ModeCard
                    title="Por Prova"
                    icon={<FileText className="w-8 h-8 text-green-500" />}
                    description="Refaça uma prova específica de anos anteriores."
                    active={mode === "prova"}
                    onClick={() => setMode("prova")}
                />
                <ModeCard
                    title="Por Matéria"
                    icon={<BookOpen className="w-8 h-8 text-purple-500" />}
                    description="Foque seus estudos em uma disciplina específica."
                    active={mode === "materia"}
                    onClick={() => setMode("materia")}
                />
                <ModeCard
                    title="Personalizado"
                    icon={<AlertCircle className="w-8 h-8 text-orange-500" />}
                    description="Escolha matérias e quantidade de questões."
                    active={mode === "personalizado"}
                    onClick={() => setMode("personalizado")}
                />
            </div>

            <Card className="border-2 border-primary/10 shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        {mode === "completo" && <><Layers /> Detalhes do Simulado Completo</>}
                        {mode === "prova" && <><FileText /> Selecione a Prova</>}
                        {mode === "materia" && <><BookOpen /> Selecione a Matéria</>}
                        {mode === "personalizado" && <><AlertCircle /> Configuração Personalizada</>}
                    </CardTitle>
                    <CardDescription>
                        {mode === "completo" && "Você enfrentará 70 questões distribuídas exatamente como no edital. Tempo estimado: 5 horas."}
                        {mode === "prova" && "Escolha qual edição da prova você deseja realizar."}
                        {mode === "materia" && "Treine intensivamente os tópicos que você mais precisa."}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">

                    {mode === "prova" && (
                        <RadioGroup value={selectedProva} onValueChange={setSelectedProva} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {PROVAS.map((p) => (
                                <div key={p.id}>
                                    <RadioGroupItem value={p.id} id={`p-${p.id}`} className="peer sr-only" />
                                    <Label
                                        htmlFor={`p-${p.id}`}
                                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                                    >
                                        <span className="font-semibold text-lg">{p.label}</span>
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    )}

                    {(mode === "materia" || mode === "personalizado") && (
                        <div className="space-y-4">
                            <Label>Disciplina</Label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {MATERIAS.map((m) => (
                                    <div
                                        key={m}
                                        className={cn(
                                            "p-3 rounded-md border cursor-pointer transition-colors text-sm font-medium",
                                            selectedMateria === m
                                                ? "bg-primary text-primary-foreground border-primary"
                                                : "bg-background hover:bg-muted"
                                        )}
                                        onClick={() => setSelectedMateria(m)}
                                    >
                                        {m}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-muted-foreground" />
                            <div className="space-y-0.5">
                                <span className="text-sm font-medium">Tempo Estimado</span>
                                <p className="text-xs text-muted-foreground">Baseado na quantidade de questões</p>
                            </div>
                        </div>
                        <Badge variant="outline" className="text-lg px-3 py-1 bg-background">
                            {mode === "completo" ? "5h 00m" : "Calculado..."}
                        </Badge>
                    </div>

                </CardContent>
                <CardFooter>
                    <Button size="lg" className="w-full text-lg font-bold py-6 shadow-md transition-transform hover:scale-[1.01]" onClick={handleStart}>
                        Iniciar Simulado Agora
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

function ModeCard({ title, icon, description, active, onClick }: any) {
    return (
        <div
            onClick={onClick}
            className={cn(
                "relative flex flex-col items-center text-center p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md",
                active
                    ? "border-primary bg-primary/5 shadow-lg scale-105 z-10"
                    : "border-muted bg-card hover:border-primary/50"
            )}
        >
            <div className="mb-4 p-3 rounded-full bg-background border shadow-sm">
                {icon}
            </div>
            <h3 className="font-bold mb-2">{title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
            {active && (
                <div className="absolute top-3 right-3">
                    <div className="bg-primary text-primary-foreground rounded-full p-1">
                        <Check className="w-3 h-3" />
                    </div>
                </div>
            )}
        </div>
    )
}
