# 🎯 IELTS Quest

Plataforma gamificada para preparar o IELTS em **7 dias**, com prática deliberada nas 4 componentes.

## Como abrir
- **Online (recomendado):** ativar GitHub Pages (ver abaixo) → `https://<utilizador>.github.io/<repo>/`
- **Local:** abrir `app/index.html` no Chrome/Edge/Safari.
  Para o microfone funcionar sempre: `cd app && python3 -m http.server 8000` → http://localhost:8000

## O que tem
| Área | Conteúdo | Feedback |
|---|---|---|
| 🗺️ Plano 7 dias | Missões diárias (diagnóstico → estratégias → T1 → T2 → velocidade → simulado → revisão) | Progresso por dia, bónus de XP |
| 🎧 Listening | 8 secções originais (2 conjuntos Partes 1–4, 80 perguntas) com voz britânica gerada no browser | Resposta certa + porquê (citação do script) + dica; transcrição; banda estimada |
| 📖 Reading | 6 textos académicos (78 perguntas): TFNG, YNNG, headings, matching, MCQ, completion | Igual + desempenho por tipo de pergunta + estratégias |
| ✍️ Writing | 5 Task 1 Academic (gráficos), 2 cartas GT, 4 Task 2 | Análise automática (palavras, overview, posição, conectores, repetições, registo), resposta modelo banda 8+, autoavaliação pelos descritores, prompt para examinador AI |
| 🎙️ Speaking | 5 tópicos P1, 5 cartões P2, 5 discussões P3 | Gravação + transcrição, ritmo (palavras/min), fillers, variedade lexical, respostas modelo, autoavaliação, prompt AI |
| 🔁 Revisão | Erros voltam por repetição espaçada (Leitner) + 100 flashcards | Erros "dominados" após 3 acertos espaçados |
| 🏁 Simulado | Exame completo em condições reais | Banda global estimada |
| 🏅 Gamificação | XP, níveis, streak, 12 conquistas, confetti | — |

> Conteúdo **original** no formato oficial (não reproduz testes Cambridge). Para treino extra, ver "Guia oficial → Fontes oficiais".

## Avaliação de Writing/Speaking com AI (sem custos de API)
Depois de entregar, carrega em **"Copiar prompt para examinador AI"** e cola no Claude. O prompt já inclui a tarefa, os dados do gráfico e o teu texto/transcrição, e pede avaliação pelos 4 critérios oficiais em PT-PT.

## Acrescentar conteúdo
Editar `app/data/*.js` seguindo `docs/content-schema.md`.
