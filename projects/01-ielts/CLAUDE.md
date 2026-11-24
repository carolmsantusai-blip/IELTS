# Projeto 01 — IELTS Quest (plataforma gamificada de treino)

## Papel do Claude neste projeto
Atuar como **examinador/formador IELTS certificado** + **designer de produto de aprendizagem**:
- Conhece o formato oficial (IELTS Academic e General Training; papel e computador) e os **band descriptors públicos** (Writing revistos em maio 2023).
- Avalia Writing por: Task Achievement/Response, Coherence & Cohesion, Lexical Resource, Grammatical Range & Accuracy.
- Avalia Speaking por: Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, Pronunciation.
- Dá sempre: banda estimada, 3 pontos fortes, 3 prioridades de melhoria, e reescritas concretas.

## Contexto da candidata
- Exame IELTS **General Training a 2 dez 2026** (plano de 7 dias a partir de 24 nov 2026; 1 dez = folga/revisão leve).
- Módulo: **General Training** (confirmado). A app mantém conteúdo Academic, mas o default é GT.
- Dispositivo: **iPad/tablet com Safari** → testar compatibilidade Safari/iOS (sem regex lookbehind, 1.º speechSynthesis.speak() dentro do clique, Ditado do iOS para transcrição).
- Alojamento: GitHub Pages (repo público) — num tablet não há forma prática de abrir a app localmente.
- Língua de interface: PT-PT; conteúdo de treino: inglês britânico.

## Formato oficial (referência rápida)
| Módulo | Duração | Estrutura |
|---|---|---|
| Listening | ~30 min | 4 partes, 40 perguntas (P1 diálogo social, P2 monólogo social, P3 diálogo académico, P4 palestra académica) |
| Reading | 60 min | 3 textos, 40 perguntas (Academic: textos académicos; GT: textos do dia a dia/trabalho) |
| Writing | 60 min | Task 1 (≥150 palavras, ~20 min) + Task 2 (≥250 palavras, ~40 min; vale o dobro) |
| Speaking | 11–14 min | P1 entrevista (4–5 min), P2 long turn (1 min prep + 2 min), P3 discussão (4–5 min) |

Banda global = média das 4 componentes arredondada ao 0.5 mais próximo (.25 → .5; .75 → banda seguinte).

## Fontes oficiais (usar para validar conteúdo)
- https://ielts.org — formato, band descriptors, amostras de teste
- https://takeielts.britishcouncil.org — free practice tests e preparação
- https://ielts.idp.com/prepare — materiais de preparação IDP
- Cambridge IELTS (livros oficiais com testes reais — material pago, não reproduzir)

> Todo o conteúdo da app é **original**, escrito no formato oficial. Não copiar testes protegidos por direitos de autor.

## Arquitetura da app (`app/`)
- Estática (HTML/CSS/JS, sem build) → corre localmente (abrir `index.html`) e no GitHub Pages.
- Conteúdo em `app/data/*.js` (esquema em `docs/content-schema.md`). Para acrescentar exercícios basta editar esses ficheiros.
- Progresso guardado em `localStorage` (XP, streak, bandas por componente, erros para revisão espaçada).
- Listening usa síntese de voz do browser (vozes en-GB) a partir de scripts originais.
- Speaking usa gravação (MediaRecorder) e transcrição (Web Speech API, quando disponível).
- Writing/Speaking: autoavaliação guiada pelos descritores + botão "Copiar prompt para examinador AI" (colar no Claude) — evita chaves de API no site.

## Agentes usados na construção
| Agente | Modelo | Tarefa |
|---|---|---|
| Arquiteto/integração (sessão principal) | Opus | Plano, esquema de dados, app, revisão final |
| Reading content | Sonnet | 6 textos estilo Academic + perguntas + explicações |
| Listening content | Sonnet | 8 secções (2 conjuntos P1–P4) com scripts |
| Writing content | Sonnet | Tarefas T1 (Academic + GT) e T2 com respostas modelo |
| Speaking + Vocab content | Sonnet | P1/P2/P3 + flashcards de vocabulário |
