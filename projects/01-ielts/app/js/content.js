/* Conteúdo pedagógico fixo: plano, descritores, estratégias, conversões. */
window.IELTS = window.IELTS || {};

/* ---------- Plano de 7 dias ----------
   Missão: { type, id?, gt? (id alternativo para General Training), label?, count?, min } */
IELTS.plan = [
  { day: 1, title: "Diagnóstico", focus: "Conhecer o formato e medir o ponto de partida.",
    why: "Como numa due diligence: primeiro mede-se a situação real, depois decide-se onde investir o tempo.",
    missions: [
      { type: "guide", id: "format", label: "Formato do exame e como é avaliado", min: 15 },
      { type: "listening", id: "l1", min: 12 },
      { type: "reading", id: "r1", min: 20 },
      { type: "writing", id: "w8", min: 40 },
      { type: "speaking", id: "s1", min: 6 },
      { type: "vocab", count: 15, min: 8 }
    ] },
  { day: 2, title: "Estratégias de Reading & Listening", focus: "TRUE/FALSE/NOT GIVEN, headings e antecipação no Listening.",
    why: "São as componentes com resposta objetiva: cada ponto ganho aqui é 'retorno garantido'.",
    missions: [
      { type: "guide", id: "strategies", label: "Estratégias por tipo de pergunta", min: 10 },
      { type: "reading", id: "r2", min: 20 },
      { type: "listening", id: "l2", min: 12 },
      { type: "speaking", id: "s6", min: 6 },
      { type: "review", min: 10 },
      { type: "vocab", count: 15, min: 8 }
    ] },
  { day: 3, title: "Writing Task 1", focus: "Overview claro, comparações e linguagem de tendências.",
    why: "Task 1 é um 'relatório executivo' de dados — exatamente a tua zona de conforto em finanças.",
    missions: [
      { type: "writing", id: "w1", gt: "w6", min: 20 },
      { type: "writing", id: "w2", gt: "w7", min: 20 },
      { type: "listening", id: "l3", min: 12 },
      { type: "speaking", id: "s2", min: 6 },
      { type: "speaking", id: "s11", min: 6 },
      { type: "review", min: 10 }
    ] },
  { day: 4, title: "Writing Task 2", focus: "Posição clara, parágrafos com uma ideia + exemplo, coesão.",
    why: "Task 2 vale o dobro da Task 1 — é a maior alavanca da nota de Writing.",
    missions: [
      { type: "writing", id: "w9", min: 40 },
      { type: "reading", id: "r3", min: 20 },
      { type: "listening", id: "l4", min: 12 },
      { type: "speaking", id: "s7", min: 6 },
      { type: "speaking", id: "s12", min: 6 },
      { type: "review", min: 10 }
    ] },
  { day: 5, title: "Velocidade & precisão", focus: "Treino cronometrado e correção dos erros recorrentes.",
    why: "Gestão de tempo é gestão de risco: não deixar perguntas em branco.",
    missions: [
      { type: "writing", id: "w3", min: 20 },
      { type: "writing", id: "w10", min: 40 },
      { type: "speaking", id: "s3", min: 6 },
      { type: "speaking", id: "s8", min: 6 },
      { type: "speaking", id: "s13", min: 6 },
      { type: "review", min: 15 },
      { type: "vocab", count: 20, min: 10 }
    ] },
  { day: 6, title: "Simulado completo", focus: "Exame completo em condições reais (≈ 2h45).",
    why: "Stress test: simular o dia do exame para não haver surpresas.",
    missions: [
      { type: "mock", id: "listening", label: "Simulado Listening (4 partes, 40 perguntas)", min: 32 },
      { type: "mock", id: "reading", label: "Simulado Reading (3 textos, 60 min)", min: 60 },
      { type: "mock", id: "writing", label: "Simulado Writing (Task 1 + Task 2, 60 min)", min: 60 },
      { type: "mock", id: "speaking", label: "Simulado Speaking (Partes 1–3)", min: 14 }
    ] },
  { day: 7, title: "Revisão leve & dia D", focus: "Rever erros, aquecer o Speaking, preparar a logística.",
    why: "Na véspera não se aprende matéria nova: consolida-se e descansa-se.",
    missions: [
      { type: "review", min: 20 },
      { type: "vocab", count: 20, min: 10 },
      { type: "speaking", id: "s5", min: 6 },
      { type: "speaking", id: "s10", min: 6 },
      { type: "speaking", id: "s15", min: 6 },
      { type: "guide", id: "examday", label: "Checklist do dia do exame", min: 5 }
    ] }
];

IELTS.mocks = {
  listening: ["l5", "l6", "l7", "l8"],
  reading: ["r4", "r5", "r6"],
  writing: { academic: ["w4", "w11"], general: ["w7", "w11"] },
  speaking: ["s4", "s9", "s14"]
};

/* ---------- Conversão raw score → banda (tabelas públicas aproximadas, escala /40) ---------- */
IELTS.bandTables = {
  listening: [[39,9],[37,8.5],[35,8],[32,7.5],[30,7],[26,6.5],[23,6],[18,5.5],[16,5],[13,4.5],[10,4],[8,3.5],[6,3],[4,2.5],[0,2]],
  readingAcademic: [[39,9],[37,8.5],[35,8],[33,7.5],[30,7],[27,6.5],[23,6],[19,5.5],[15,5],[13,4.5],[10,4],[8,3.5],[6,3],[4,2.5],[0,2]],
  readingGeneral: [[40,9],[39,8.5],[37,8],[36,7.5],[34,7],[32,6.5],[30,6],[27,5.5],[23,5],[19,4.5],[15,4],[12,3.5],[9,3],[6,2.5],[0,2]]
};

/* ---------- Critérios e descritores (resumo/paráfrase dos descritores públicos) ---------- */
IELTS.criteria = {
  writing1: [
    { key: "TA", name: "Task Achievement", d: {
      5: "Relata detalhes de forma mecânica; sem overview claro; pode haver dados errados.",
      6: "Cobre os requisitos; há overview mas pouco claro; alguns detalhes irrelevantes ou imprecisos.",
      7: "Overview claro das tendências/diferenças principais; destaca bem as features-chave.",
      8: "Cobre todos os requisitos com destaque claro e bem ilustrado das features-chave.",
      9: "Resposta completa e totalmente relevante; features-chave apresentadas com precisão impecável." } },
    { key: "CC", name: "Coherence & Cohesion", d: {
      5: "Alguma organização, mas sem progressão clara; conectores repetitivos ou em falta.",
      6: "Organização coerente; conectores úteis mas por vezes mecânicos ou imprecisos.",
      7: "Progressão lógica clara; boa variedade de conectores, com pequenos excessos.",
      8: "Sequência lógica; coesão gerida com naturalidade; paragrafação adequada.",
      9: "Coesão tão natural que não chama a atenção; paragrafação perfeita." } },
    { key: "LR", name: "Lexical Resource", d: {
      5: "Vocabulário limitado e repetitivo; erros que podem dificultar a leitura.",
      6: "Vocabulário adequado; tenta palavras menos comuns com alguma imprecisão.",
      7: "Vocabulário suficiente para flexibilidade e precisão; algumas colocações menos comuns.",
      8: "Vocabulário amplo e preciso; erros raros de escolha ou colocação.",
      9: "Vocabulário muito amplo, natural e sofisticado; erros só como 'slips'." } },
    { key: "GRA", name: "Grammatical Range & Accuracy", d: {
      5: "Estruturas limitadas; frases complexas com erros frequentes.",
      6: "Mistura de frases simples e complexas; alguns erros que raramente dificultam.",
      7: "Variedade de estruturas complexas; muitas frases sem erros.",
      8: "Grande variedade; a maioria das frases sem erros.",
      9: "Variedade total com precisão; erros raríssimos." } }
  ],
  writing2: [
    { key: "TR", name: "Task Response", d: {
      5: "Responde só parcialmente; posição pouco clara; ideias pouco desenvolvidas.",
      6: "Aborda todas as partes, umas mais que outras; posição presente mas conclusões pouco claras.",
      7: "Aborda todas as partes; posição clara ao longo do texto; ideias principais desenvolvidas e apoiadas.",
      8: "Responde plenamente; ideias bem desenvolvidas, relevantes e bem apoiadas.",
      9: "Resposta completa; posição totalmente desenvolvida com ideias extensas e bem fundamentadas." } },
    { key: "CC", name: "Coherence & Cohesion", d: {
      5: "Organização fraca; parágrafos inadequados ou ausentes.",
      6: "Organização coerente; parágrafos nem sempre lógicos; referência por vezes confusa.",
      7: "Organização lógica; cada parágrafo com ideia central clara; boa variedade de conectores.",
      8: "Sequência lógica; coesão bem gerida; paragrafação suficiente e adequada.",
      9: "Coesão natural e impercetível; paragrafação exemplar." } },
    { key: "LR", name: "Lexical Resource", d: {
      5: "Vocabulário limitado; erros de ortografia/formação visíveis.",
      6: "Vocabulário adequado à tarefa; tentativas de vocabulário menos comum com imprecisões.",
      7: "Vocabulário flexível e preciso; consciência de estilo e colocação.",
      8: "Vocabulário amplo, fluido e preciso; erros ocasionais.",
      9: "Vocabulário sofisticado e natural em todo o texto." } },
    { key: "GRA", name: "Grammatical Range & Accuracy", d: {
      5: "Estruturas limitadas; erros frequentes de gramática e pontuação.",
      6: "Mistura de formas simples e complexas; alguns erros sem afetar muito a comunicação.",
      7: "Variedade de estruturas complexas; frequentes frases sem erros; bom controlo.",
      8: "Grande variedade; a maioria das frases sem erros.",
      9: "Variedade total e flexível; precisão quase total." } }
  ],
  speaking: [
    { key: "FC", name: "Fluency & Coherence", d: {
      5: "Mantém o discurso com repetições, autocorreções e pausas frequentes.",
      6: "Fala longamente mas com perda ocasional de coerência; conectores por vezes mecânicos.",
      7: "Fala longamente sem esforço visível; algumas hesitações ligadas à língua; conectores flexíveis.",
      8: "Fala fluentemente; hesitações raras e ligadas ao conteúdo; desenvolve temas com coerência.",
      9: "Fluência total; hesitações só de conteúdo; desenvolvimento coerente e completo." } },
    { key: "LR", name: "Lexical Resource", d: {
      5: "Vocabulário limitado em temas menos familiares; paráfrase com dificuldade.",
      6: "Vocabulário suficiente para discutir os temas; parafraseia com algum sucesso.",
      7: "Vocabulário flexível; usa algumas expressões idiomáticas e colocações.",
      8: "Vocabulário amplo e preciso; idiomatismo usado com competência.",
      9: "Vocabulário totalmente flexível e idiomático." } },
    { key: "GRA", name: "Grammatical Range & Accuracy", d: {
      5: "Formas básicas razoavelmente corretas; estruturas complexas limitadas e com erros.",
      6: "Mistura de formas simples e complexas, mas com flexibilidade limitada e erros.",
      7: "Variedade de estruturas complexas com alguma flexibilidade; frases sem erros frequentes.",
      8: "Grande variedade; maioria das frases sem erros; erros ocasionais.",
      9: "Estruturas naturais e precisas em todo o discurso." } },
    { key: "P", name: "Pronunciation", d: {
      5: "Alguns traços positivos, mas erros de pronúncia causam dificuldade de compreensão.",
      6: "Geralmente compreensível; controlo variável de traços (acento, entoação).",
      7: "Facilmente compreensível; boa utilização de acentuação e entoação, com lapsos.",
      8: "Fácil de compreender; sotaque L1 com efeito mínimo; ritmo natural.",
      9: "Pronúncia precisa e subtil em todo o discurso; sem esforço para o ouvinte." } }
  ]
};

/* ---------- Estratégias por tipo de pergunta ---------- */
IELTS.strategies = {
  tfng: { name: "TRUE / FALSE / NOT GIVEN", tips: [
    "FALSE = o texto diz o contrário. NOT GIVEN = o texto não diz o suficiente para confirmar nem negar.",
    "Sublinha palavras que restringem o sentido: 'all', 'only', 'always', 'most', 'some', comparativos e datas.",
    "As respostas seguem a ordem do texto: localiza com nomes/números e depois lê 2–3 frases à volta.",
    "Não uses conhecimento geral — só conta o que está escrito." ] },
  ynng: { name: "YES / NO / NOT GIVEN", tips: [
    "Avalia a opinião do autor, não factos. Procura verbos de atitude: 'argues', 'doubts', 'it is clear that'.",
    "NO = o autor discorda explicitamente; NOT GIVEN = o autor não se pronuncia.",
    "Cuidado com opiniões de terceiros citadas no texto que o autor não subscreve." ] },
  match: { name: "Matching (headings / features)", tips: [
    "Headings: lê o 1.º e o último período de cada parágrafo — o heading resume a ideia central, não um detalhe.",
    "Começa pelos parágrafos mais fáceis e risca headings usados; desconfia de headings que repetem palavras do texto.",
    "Matching features: localiza primeiro os nomes (fácil de 'scanar') e depois confirma a ideia por paráfrase." ] },
  mcq: { name: "Escolha múltipla", tips: [
    "Lê a pergunta antes das opções e formula a resposta mentalmente.",
    "Elimina opções: parcialmente verdadeiras, demasiado gerais ou que usam as mesmas palavras do texto sem o mesmo sentido.",
    "No Listening, as opções erradas costumam ser mencionadas — ouve até ao fim da ideia (correções, 'actually', 'but')." ] },
  gap: { name: "Completar espaços", tips: [
    "Respeita o limite de palavras — exceder = errado. Hífenes contam como uma palavra.",
    "Antecipa a categoria gramatical (nome, número, adjetivo) e se é singular/plural.",
    "A ortografia conta: pratica nomes soletrados e números (13 vs 30, 'double five')." ] }
};

/* ---------- Badges ---------- */
IELTS.badges = [
  { id: "first", em: "🌱", name: "Primeiro passo", desc: "Completa o primeiro exercício" },
  { id: "streak3", em: "🔥", name: "Em chamas", desc: "3 dias seguidos" },
  { id: "streak7", em: "🏆", name: "Semana perfeita", desc: "7 dias seguidos" },
  { id: "perfect", em: "💎", name: "Sem falhas", desc: "100% num teste de Reading ou Listening" },
  { id: "allskills", em: "🧭", name: "Explorador", desc: "Treina as 4 componentes" },
  { id: "words50", em: "🧠", name: "Word Smith", desc: "50 revisões de vocabulário" },
  { id: "writer", em: "🖋️", name: "Escritora", desc: "Escreve 1000 palavras no total" },
  { id: "speaker", em: "🎤", name: "Voz ativa", desc: "Grava 10 respostas de Speaking" },
  { id: "fixer", em: "🔧", name: "Corrige-erros", desc: "Domina 15 erros na revisão" },
  { id: "mock", em: "🏁", name: "Sobrevivente", desc: "Termina um simulado completo de uma componente" },
  { id: "band7", em: "⭐", name: "Clube Band 7", desc: "Banda estimada ≥ 7 numa componente" },
  { id: "day7", em: "🎓", name: "Pronta para o exame", desc: "Completa os 7 dias do plano" }
];

/* ---------- Guia (secções) ---------- */
IELTS.guide = {
  format: { title: "Formato do exame e avaliação", html: `
    <p>O IELTS avalia 4 componentes. Listening, Reading e Writing são feitos no mesmo dia, sem intervalos; o Speaking pode ser no mesmo dia ou até 7 dias antes/depois.</p>
    <div class="table-wrap"><table class="t">
      <tr><th>Componente</th><th>Duração</th><th>Estrutura</th><th>Como é avaliada</th></tr>
      <tr><td>🎧 Listening</td><td>~30 min (+10 min de transcrição em papel / 2 min revisão no computador)</td><td>4 partes, 40 perguntas. Ouves <b>uma só vez</b>.</td><td>1 ponto por resposta → tabela de conversão para banda</td></tr>
      <tr><td>📖 Reading</td><td>60 min (sem tempo extra)</td><td>3 textos, 40 perguntas</td><td>1 ponto por resposta → banda (tabelas diferentes Academic/GT)</td></tr>
      <tr><td>✍️ Writing</td><td>60 min</td><td>Task 1 (≥150 palavras) + Task 2 (≥250 palavras)</td><td>4 critérios cada; Task 2 vale o dobro</td></tr>
      <tr><td>🎙️ Speaking</td><td>11–14 min</td><td>P1 entrevista · P2 cartão (1 min prep + até 2 min) · P3 discussão</td><td>4 critérios com peso igual</td></tr>
    </table></div>
    <h3 style="margin-top:16px">Banda global</h3>
    <p>Média das 4 componentes, arredondada: .25 sobe para .5 e .75 sobe para a banda seguinte. Ex.: 6.5 + 6.5 + 5.0 + 7.0 = 6.25 → <b>6.5</b>.</p>
    <h3>Writing — critérios</h3>
    <p><b>Task Achievement/Response</b> (respondes ao que foi pedido?), <b>Coherence & Cohesion</b> (organização e ligação), <b>Lexical Resource</b> (vocabulário), <b>Grammatical Range & Accuracy</b> (variedade e correção). Abaixo do mínimo de palavras há penalização em Task Achievement/Response.</p>
    <h3>Speaking — critérios</h3>
    <p><b>Fluency & Coherence</b>, <b>Lexical Resource</b>, <b>Grammatical Range & Accuracy</b>, <b>Pronunciation</b>. Sotaque não é penalizado — conta a inteligibilidade.</p>
    <div class="notice"><b>Nesta app:</b> Reading/Listening são corrigidos automaticamente e convertidos numa banda estimada (proporcional a 40). Writing/Speaking usam autoavaliação com os descritores + análise automática, e podes copiar um prompt para um examinador AI (ex.: Claude) para uma segunda opinião.</div>` },
  strategies: { title: "Estratégias por tipo de pergunta", html: "" },
  examday: { title: "Checklist do dia do exame", html: `
    <ul class="clean">
      <li>🪪 Leva o <b>mesmo documento de identificação</b> usado na inscrição (passaporte/CC válido).</li>
      <li>⏰ Chega cedo (verifica o horário no email de confirmação); há registo biométrico/foto.</li>
      <li>✏️ Papel: lápis, borracha, afia — e só garrafa de água transparente. Telemóvel e relógio ficam no cacifo.</li>
      <li>🎧 Listening: usa o tempo antes de cada parte para ler as perguntas e prever o tipo de resposta. No papel, tens 10 min no fim para transcrever (em <b>MAIÚSCULAS</b> evita problemas de letra).</li>
      <li>📖 Reading: ~20 min por texto; nunca deixes respostas em branco (não há penalização por erro).</li>
      <li>✍️ Writing: começa pela <b>Task 2</b> se te sentires mais segura (vale o dobro). Reserva 3–5 min para rever artigos, plurais e concordância.</li>
      <li>🎙️ Speaking: responde em 2–3 frases na P1, usa o minuto de preparação da P2 para notas por tópicos e fala até o examinador parar. Se não perceberes: <i>"Could you repeat the question, please?"</i></li>
      <li>😴 Na véspera: revisão leve, dormir bem. Os resultados saem em ~3–5 dias (computador) ou ~13 dias (papel).</li>
    </ul>` },
  sources: { title: "Fontes oficiais para treino extra", html: `
    <ul class="clean">
      <li><a href="https://ielts.org/take-a-test/preparation-resources" target="_blank" rel="noopener">ielts.org — Preparation resources</a> (amostras oficiais, band descriptors)</li>
      <li><a href="https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-english-practice-tests" target="_blank" rel="noopener">British Council — Free practice tests</a> (testes completos cronometrados)</li>
      <li><a href="https://ielts.idp.com/prepare" target="_blank" rel="noopener">IDP — Prepare for IELTS</a> (webinars, testes de prática)</li>
      <li><a href="https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing" target="_blank" rel="noopener">Descritores oficiais de Writing e Speaking</a> (PDF em ielts.org)</li>
      <li>Livros <b>Cambridge IELTS Academic</b> (testes reais anteriores) — o melhor treino pago.</li>
    </ul>` }
};
