# BB85 - Sistema Pessoal de Estudo

Sistema simplificado para uso pessoal, focado em simulados, tracking de desempenho e aprovação no Banco do Brasil.

## 🎯 Funcionalidades

- ✅ Simulados completos com questões reais
- ✅ Tracking de desempenho por matéria
- ✅ Histórico de acertos e evolução
- ✅ Meta de 85% de acertos
- ✅ 15.000+ questões comentadas
- ✅ Análise detalhada de performance

## 🚀 Como Usar Localmente

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Database
```bash
npx prisma generate
npx prisma db push
```

### 3. Rodar Localmente
```bash
npm run dev
```

Acesse: `http://localhost:3000`

## 📦 Deploy no Netlify

### 1. Fazer Upload no GitHub
- Crie um repositório no GitHub
- Faça upload de todos os arquivos (exceto `node_modules` e `.next`)

### 2. Conectar ao Netlify
- Acesse https://app.netlify.com
- Clique em "Add new site" → "Import an existing project"
- Conecte ao seu repositório GitHub
- Build settings:
  - Build command: `npm run build`
  - Publish directory: `.next`

### 3. Deploy Automático
O Netlify fará deploy automaticamente a cada push no GitHub.

## 📊 Estrutura

- `/` - Dashboard principal
- `/simulado` - Fazer simulados
- `/desempenho` - Ver estatísticas
- `/dashboard/history` - Histórico de simulados

## 🗄️ Database

SQLite local (`dev.db`) - todos os dados ficam salvos localmente.

## ⚙️ Tecnologias

- Next.js 16
- Prisma ORM
- SQLite
- Tailwind CSS
- Lucide Icons

---

**Foco total**: Estudo, prática e aprovação! 🎯
