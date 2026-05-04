import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import ExamInterface from "./exam-interface"

export default async function ExamPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const params = await searchParams
    // If no config found in session (client side), we might rely on URL params or default.
    // Actually, the previous page saved to sessionStorage. 
    // Server Component cannot access sessionStorage. 
    // So we expect *start* parameters to be passed via URL query as well, or we depend on Client Component to load from session.
    // But we need to fetch questions on server.
    // Strategy: The config page should have passed params in URL -> router.push('/simulado/exam?tipo=...&ids=...')
    // BUT the config page implementation I wrote did: `router.push("/simulado/exam")` and saved to sessionStorage.
    // This is a disconnect. Server component needs to know what to fetch.
    // I will update the Config Page to pass params in URL for redundancy/Server Side Fetching, OR
    // I will make this Page a Client Component that fetches questions via API.
    // Given requirements "React 18 + TypeScript + Vite ... Persistência: LocalStorage (sem backend)", the original request implied client-side logic.
    // I am adapting to Next.js + Prisma.
    // Best approach for Next.js App Router:
    // 1. Config Page redirects to `/simulado/load-exam?config=...` which is a API/Server Action that generates the exam and redirects to `/simulado/exam/[examId]`?
    // 2. OR Config Page redirects to `/simulado/exam?tipo=completo` and Server Component fetches "random 70".

    // Let's assume for now we rely on URL params.
    // If URL params are missing, we might render a client component that reads sessionStorage and then calls a Server Action to "Start Exam" and get questions.
    // Let's try to support URL params for "tipo".

    // Since I can't easily change the Config page without another tool call (I can, but let's stick to current flow),
    // I will make the Page hybrid:
    // It checks URL. If empty, it renders a "Loading..." client component that reads SessionStorage and redirects with params or calls server.

    // Actually, to be robust: I will fetch ALL questions (it's only 280) if no params, or filter if params exist.
    // But wait, fetching 280 questions and sending to client is cheap (text data).
    // So I will fetch ALL questions on the server, and let the Client Component `ExamInterface` filter/shuffle based on the `sessionStorage` config if URL params are missing.
    // This bridges the "Server Side" and "Session Storage" gap.

    const allQuestions = await prisma.questao.findMany({
        include: {
            prova: true
        }
    })

    // Shuffle is better done on client if we rely on client config. 
    // But ideally we do it on server. 
    // Let's pass all questions to client and let client filter/shuffle based on the stored config.
    // It's 280 items, negligible payload.

    return <ExamInterface questions={allQuestions} config={{}} />
}
