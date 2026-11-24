# Contexto global — Percurso de aprendizagem da Carolina

## Quem é a utilizadora
- Carolina, background em **Finanças**. Fala português (PT-PT) — responder sempre em PT-PT, salvo quando o conteúdo de treino for em inglês.
- Objetivo de longo prazo: tornar-se expert em **AI, análise de dados, machine learning, Python e SQL**, através de projetos práticos.
- Aprende melhor com **prática deliberada**: repetição, testes, exercícios hands-on, feedback imediato (resposta certa + porquê + o que fazer da próxima vez).

## Como este repositório está organizado
- Cada projeto vive em `projects/NN-nome/` e tem o seu próprio `CLAUDE.md` com o contexto e o "papel de especialista" que o Claude deve assumir nesse projeto.
- `README.md` na raiz = mapa do percurso (lista de projetos, estado, competências treinadas).

## Princípios de trabalho (para o Claude)
1. **Eficiência de tokens**: ler só o necessário, preferir ficheiros de dados estruturados, usar modelos mais leves (Sonnet/Haiku) para geração de conteúdo em massa e o modelo principal só para arquitetura/revisão.
2. **Sem build steps desnecessários**: preferir HTML/CSS/JS estático ou Python simples, fácil de correr e de publicar no GitHub Pages.
3. **Explicar decisões em linguagem de quem vem de finanças** (analogias com KPIs, modelos, risco) quando ajuda.
4. Cada exercício termina com: **resposta certa → explicação → recomendação para a próxima vez**.
5. Trabalhar no branch de desenvolvimento indicado pela sessão; não criar PRs sem pedido explícito.

## Projetos
| # | Projeto | Pasta | Competências |
|---|---------|-------|--------------|
| 01 | Plataforma gamificada de treino IELTS (7 dias) | `projects/01-ielts` | Inglês (IELTS), produto/UX, JS |
