-- CreateTable
CREATE TABLE "Prova" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ano" INTEGER NOT NULL,
    "cargo" TEXT NOT NULL,
    "tipo_prova" TEXT NOT NULL,
    "versao" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Questao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "prova_id" INTEGER NOT NULL,
    "numero_base" INTEGER NOT NULL,
    "materia" TEXT NOT NULL,
    "subtema" TEXT,
    "peso_materia" REAL NOT NULL,
    "enunciado" TEXT NOT NULL,
    "imagem_url" TEXT,
    "alternativa_A" TEXT NOT NULL,
    "alternativa_B" TEXT NOT NULL,
    "alternativa_C" TEXT NOT NULL,
    "alternativa_D" TEXT NOT NULL,
    "alternativa_E" TEXT NOT NULL,
    "alternativa_correta_base" TEXT NOT NULL,
    "comentario" TEXT,
    CONSTRAINT "Questao_prova_id_fkey" FOREIGN KEY ("prova_id") REFERENCES "Prova" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MapeamentoVersao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "questao_id" INTEGER NOT NULL,
    "versao" TEXT NOT NULL,
    "mapeamento_json" TEXT NOT NULL,
    "gabarito_oficial" TEXT NOT NULL,
    CONSTRAINT "MapeamentoVersao_questao_id_fkey" FOREIGN KEY ("questao_id") REFERENCES "Questao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RespostaUsuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "questao_id" INTEGER NOT NULL,
    "versao_utilizada" TEXT NOT NULL,
    "resposta_marcada" TEXT NOT NULL,
    "correta_ou_errada" BOOLEAN NOT NULL,
    "tempo_gasto" INTEGER NOT NULL,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RespostaUsuario_questao_id_fkey" FOREIGN KEY ("questao_id") REFERENCES "Questao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Simulado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tempo_total" INTEGER NOT NULL,
    "percentual_geral" REAL NOT NULL,
    "percentual_materia_json" TEXT NOT NULL,
    "classificacao" TEXT NOT NULL
);
