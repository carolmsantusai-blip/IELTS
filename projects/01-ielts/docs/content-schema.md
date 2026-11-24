# Esquema de conteúdo — IELTS Quest

Todos os ficheiros em `app/data/` são **JavaScript simples** (não JSON) para funcionarem também com `file://`.
Cada ficheiro começa com:

```js
window.IELTS = window.IELTS || {};
IELTS.<chave> = [ ... ];
```

Regras gerais
- Conteúdo **100% original** (nunca copiar Cambridge/IELTS oficiais), inglês britânico, nível exame real (bandas 6–8).
- `explanation` e `tip` escritos em **português (PT-PT)**; citações do texto em inglês entre aspas.
- `explanation` = porquê a resposta está certa (citar a frase do texto/script que a prova).
- `tip` = recomendação acionável para a próxima vez (estratégia, armadilha, paráfrase a reconhecer).
- Strings em JS com aspas duplas; escapar aspas internas. Sem trailing commas problemáticas não é problema em JS, mas manter limpo.

## Grupos de perguntas (partilhado por Reading e Listening)

```js
groups: [
  {
    type: "tfng" | "ynng" | "mcq" | "match" | "gap",
    instructions: "Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.",
    options: ["i  ...", "ii ..."],    // SÓ para type "match": lista partilhada (headings, pessoas, etc.). Cada opção começa pelo seu código ("i", "A", ...)
    questions: [
      {
        n: 1,                          // número da pergunta (contínuo dentro do teste/secção)
        prompt: "texto da pergunta",   // para gap usar "___" onde fica o espaço
        options: ["A ...", "B ...", "C ...", "D ..."], // SÓ para mcq; cada opção começa pela letra
        answer: "TRUE",                // tfng: TRUE/FALSE/NOT GIVEN; ynng: YES/NO/NOT GIVEN; mcq: "B"; match: código ("iv" ou "C"); gap: resposta principal
        accept: ["alternativa"],       // SÓ gap (opcional): outras grafias aceites (minúsculas; ex. "10", "ten")
        explanation: "PT-PT ...",
        tip: "PT-PT ..."
      }
    ]
  }
]
```

Para gap, `instructions` deve dizer o limite ("Write NO MORE THAN TWO WORDS AND/OR A NUMBER").

## `reading.js` → `IELTS.reading`

```js
{
  id: "r1", title: "The Return of the Urban Beekeeper", difficulty: "6.0-7.0",
  timeMinutes: 20,
  paragraphs: [ { label: "A", text: "..." }, ... ],   // 6–8 parágrafos, total 700–900 palavras
  groups: [ ... ]                                       // 13 perguntas, 2–3 grupos de tipos diferentes
}
```

## `listening.js` → `IELTS.listening`

```js
{
  id: "l1", set: "A", part: 1, title: "Booking a community sports course",
  context: "You will hear a woman phoning a leisure centre to ask about a course.",
  speakers: [ { name: "Receptionist", voice: "female" }, { name: "Caller", voice: "male" } ],
  script: [ { s: 0, t: "Good morning, Riverside Leisure Centre..." }, ... ],  // s = índice em speakers
  groups: [ ... ]                                                                // 10 perguntas
}
```
- P1: conversa (2 pessoas) contexto quotidiano, maioritariamente `gap` (formulário/notas) com nomes soletrados ("That's H-A-R-T-L-E-Y") e números.
- P2: monólogo contexto social (visita guiada, rádio local) — mcq + match (mapa/plano descrito verbalmente) ou gap.
- P3: 2–3 pessoas contexto académico (estudantes + tutor) — mcq + match.
- P4: palestra académica monólogo — gap (notas de aula).
- Incluir distratores realistas (a pessoa corrige-se, muda de ideia, números que se alteram).
- Script com 450–700 palavras por secção. As respostas aparecem no script pela ordem das perguntas.

## `writing.js` → `IELTS.writing`

```js
{
  id: "w1", task: 1, module: "academic" | "general",
  title: "Household energy use 2000–2020",
  prompt: "The chart below shows ... Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
  chart: {                          // SÓ academic task 1 (null caso contrário)
    type: "bar" | "line" | "pie" | "table",
    title: "...", unit: "%",
    labels: ["2000","2010","2020"],                 // eixo X (bar/line) ou categorias (pie) ou colunas (table)
    series: [ { name: "Heating", values: [45, 40, 32] }, ... ]  // pie: 1 série; table: cada série = linha
  },
  minWords: 150, timeMinutes: 20,
  modelAnswer: "texto completo, parágrafos separados por \n\n, banda 8+",
  modelBand: 8,
  keyFeatures: ["PT-PT: feature principal que tem de aparecer no overview", ...],
  usefulLanguage: ["en: expressão útil", ...],    // 8–12
  commonMistakes: ["PT-PT", ...]                   // 3–5
}
```

## `speaking.js` → `IELTS.speaking`

```js
{
  id: "s1", part: 1 | 2 | 3, topic: "Work and studies",
  questions: ["...?", ...],          // P1: 4–5; P3: 4–5; P2: []
  cueCard: { title: "Describe a ...", bullets: ["what it was", ...], close: "and explain why ..." }, // SÓ P2
  sampleAnswers: [ { q: "...", a: "resposta banda 8, natural, 40–80 palavras (P2: 250–300)" } ],
  usefulLanguage: ["en ...", ...],
  tips: ["PT-PT ...", ...]
}
```

## `vocab.js` → `IELTS.vocab`

```js
{ id: "v1", term: "a sharp rise", meaning: "PT-PT: subida acentuada", example: "en: There was a sharp rise in ...", category: "Task 1 trends" }
```
Categorias: "Task 1 trends", "Linking & cohesion", "Academic collocations", "Opinion & argument", "Speaking fluency", "Topic: environment", "Topic: technology", "Topic: education", "Topic: work & economy", "Topic: health".
