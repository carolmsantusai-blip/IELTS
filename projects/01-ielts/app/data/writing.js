window.IELTS = window.IELTS || {};
window.IELTS.writing = [
  {
    id: "w1", task: 1, module: "academic",
    title: "Renewable electricity in four countries",
    prompt: "The bar chart below shows the percentage of electricity generated from renewable sources in four countries in 2000, 2010 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    chart: {
      type: "bar", title: "Electricity from renewable sources", unit: "%",
      labels: ["2000", "2010", "2020"],
      series: [
        { name: "Germany", values: [7, 17, 42] },
        { name: "Spain", values: [19, 33, 46] },
        { name: "Japan", values: [9, 10, 20] },
        { name: "Canada", values: [61, 60, 68] }
      ]
    },
    minWords: 150, timeMinutes: 20,
    modelAnswer: "The bar chart compares the proportion of electricity produced from renewable sources in Germany, Spain, Japan and Canada in 2000, 2010 and 2020.\n\nOverall, the share of renewable electricity rose in every country over the period, with Germany showing by far the most dramatic growth. Canada was the only country to rely mainly on renewables throughout.\n\nCanada began the period with the highest figure, at 61%, and this barely changed in 2010 before reaching 68% in 2020. By contrast, the other three countries started from much lower levels. Spain generated 19% of its electricity from renewable sources in 2000, rising to 33% in 2010 and 46% in 2020, which meant it was close to matching Canada by the end.\n\nGermany's progress was the most striking. Starting at just 7%, the country more than doubled its figure to 17% in 2010 and then climbed sharply to 42% in 2020, a six-fold increase overall. Japan, however, grew far more slowly. Its share stayed almost flat between 2000 and 2010 (9% and 10%) and only doubled to 20% in the final decade, leaving it well behind the other three nations.",
    modelBand: 8,
    keyFeatures: [
      "Overview: a percentagem de eletricidade renovável aumentou em todos os países entre 2000 e 2020.",
      "A Alemanha teve o maior crescimento (de 7% para 42%, seis vezes mais).",
      "O Canadá teve sempre o valor mais alto e quase estável (61% para 68%).",
      "O Japão cresceu pouco e ficou claramente atrás dos restantes (10% em 2010, 20% em 2020).",
      "Comparar países em vez de descrever cada barra isoladamente."
    ],
    usefulLanguage: [
      "the proportion of electricity generated from ...",
      "rose sharply / climbed steadily",
      "a six-fold increase",
      "more than doubled",
      "remained almost flat",
      "By contrast, ...",
      "leaving X well behind the other countries",
      "Overall, ... was the only country to ...",
      "started from a much lower base",
      "close to matching ..."
    ],
    commonMistakes: [
      "Não escrever um overview: sem uma frase global clara, o Task Achievement desce muito.",
      "Dizer \"the percentage of 42\" em vez de \"a share of 42%\"; com percentagens use \"the proportion/share of\".",
      "Esquecer o artigo: \"in the 2020\" está errado; diga \"in 2020\" (sem artigo antes de anos).",
      "Descrever todos os números um a um em vez de selecionar e comparar as características principais."
    ]
  },
  {
    id: "w2", task: 1, module: "academic",
    title: "Museum visitors, 2017–2023",
    prompt: "The line graph below shows the average number of monthly visitors to three museums in a city between 2017 and 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    chart: {
      type: "line", title: "Average monthly visitors", unit: "thousands",
      labels: ["2017", "2018", "2019", "2020", "2021", "2022", "2023"],
      series: [
        { name: "Science Museum", values: [52, 55, 58, 21, 36, 50, 57] },
        { name: "Art Gallery", values: [40, 41, 43, 12, 24, 35, 41] },
        { name: "History Museum", values: [30, 33, 31, 19, 25, 30, 34] }
      ]
    },
    minWords: 150, timeMinutes: 20,
    modelAnswer: "The line graph illustrates how many people visited three museums in a city each month between 2017 and 2023.\n\nOverall, visitor numbers rose gradually at all three venues before a sudden fall in 2020, after which they recovered steadily. By 2023 every museum had returned to, or exceeded, its pre-decline level.\n\nBefore 2020, the Science Museum was the most popular attraction, climbing from 52,000 visitors to 58,000 in 2019. The Art Gallery attracted between 40,000 and 43,000 people, while the History Museum recorded the lowest figures, hovering around 30,000 to 33,000.\n\nIn 2020 all three museums experienced a steep drop. The Art Gallery was hit hardest, falling by around 70% to just 12,000, and the Science Museum fell to 21,000. The History Museum was affected least, still receiving 19,000 visitors.\n\nNumbers then began to recover. The Science Museum reached 50,000 in 2022 and 57,000 in 2023, almost matching its earlier peak. The Art Gallery climbed back to 41,000, and the History Museum finished at 34,000, which was actually its highest level in the whole period.",
    modelBand: 8,
    keyFeatures: [
      "Overview: subida gradual até 2019, queda abrupta em 2020 e recuperação até 2023.",
      "O Science Museum foi sempre o mais visitado.",
      "A Art Gallery sofreu a maior quebra em 2020 (de 43 mil para 12 mil).",
      "O History Museum foi o menos afetado e em 2023 atingiu o máximo do período (34 mil).",
      "Indicar a unidade (milhares) e ordenar a descrição por fases cronológicas."
    ],
    usefulLanguage: [
      "illustrates how ... changed",
      "a steep / sudden drop",
      "was hit hardest",
      "hovered around ...",
      "recovered steadily",
      "almost matching its earlier peak",
      "the highest level in the whole period",
      "before / after a sharp decline",
      "attracted between X and Y visitors",
      "finished at ..."
    ],
    commonMistakes: [
      "Confundir \"between 2017 and 2023\" com \"from 2017 until 2023\" sem verbo adequado; use \"from ... to\" ou \"between ... and\".",
      "Usar \"actually\" como \"atualmente\" (falso amigo): em inglês significa \"na verdade\"; para \"atualmente\" use \"currently\".",
      "Misturar tempos verbais: um gráfico com datas passadas pede passado simples (\"rose\", \"fell\").",
      "Escrever \"the people visited\" em vez de \"the number of visitors\"; \"number\" exige um substantivo contável."
    ]
  },
  {
    id: "w3", task: 1, module: "academic",
    title: "How a household spends its income",
    prompt: "The pie chart below shows how an average household in a European country spent its monthly income in 2022. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    chart: {
      type: "pie", title: "Household spending by category", unit: "%",
      labels: ["Housing", "Food", "Transport", "Leisure", "Other"],
      series: [ { name: "Share of income", values: [34, 20, 15, 12, 19] } ]
    },
    minWords: 150, timeMinutes: 20,
    modelAnswer: "The pie chart shows how an average household in a European country divided its monthly income among five categories in 2022.\n\nOverall, housing was by far the largest expense, and basic needs together accounted for well over half of total spending, whereas leisure took up the smallest portion.\n\nHousing absorbed 34% of household income, which was considerably more than any other category. Food came second at 20%, so these two items alone made up 54% of the budget. Transport represented a further 15%, meaning that the three essential categories accounted for just over two-thirds of all spending, at 69%.\n\nThe remaining income was divided between leisure and other costs. Households spent 12% on leisure, the smallest share on the chart, which was less than a third of the amount devoted to housing. A final 19% went on miscellaneous items, such as clothing, healthcare and education. This figure was slightly lower than the share for food but higher than both transport and leisure, so no single category apart from housing dominated the budget.",
    modelBand: 8,
    keyFeatures: [
      "Overview: a habitação é a maior despesa e as necessidades básicas ocupam mais de metade do orçamento.",
      "Habitação 34%, alimentação 20% (juntas 54%).",
      "Lazer é a categoria mais pequena (12%).",
      "Somar categorias (por exemplo, habitação + alimentação + transporte = 69%) mostra capacidade de análise.",
      "Usar comparações (\"more than\", \"less than a third of\") em vez de repetir percentagens."
    ],
    usefulLanguage: [
      "divided its income among ...",
      "accounted for / made up X%",
      "by far the largest",
      "came second at ...",
      "a further X%",
      "just over two-thirds",
      "the smallest share",
      "the remainder was spent on ...",
      "considerably more than ...",
      "taken together, ..."
    ],
    commonMistakes: [
      "Usar \"the biggest part\" em vez de \"the largest proportion/share\"; \"part\" é demasiado informal.",
      "\"Spend money in\" em vez de \"spend money on\": a preposição certa com despesas é \"on\".",
      "Escrever frases demasiado longas com muitas vírgulas; divida-as em duas para manter clareza.",
      "Esquecer de somar ou agrupar categorias: um bom relatório destaca padrões, não apenas números soltos."
    ]
  },
  {
    id: "w4", task: 1, module: "academic",
    title: "Travel to work in four cities",
    prompt: "The table below shows the main method of travel to work used by employees in four cities in 2022. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    chart: {
      type: "table", title: "Main method of travel to work, 2022", unit: "%",
      labels: ["Car", "Public transport", "Bicycle", "Walking"],
      series: [
        { name: "Leeds", values: [62, 22, 3, 13] },
        { name: "Utrecht", values: [30, 18, 38, 14] },
        { name: "Madrid", values: [38, 40, 2, 20] },
        { name: "Brisbane", values: [71, 15, 3, 11] }
      ]
    },
    minWords: 150, timeMinutes: 20,
    modelAnswer: "The table compares the main ways in which employees travelled to work in Leeds, Utrecht, Madrid and Brisbane in 2022.\n\nOverall, the car was the dominant choice in two of the four cities, whereas Utrecht and Madrid showed very different patterns, with cycling and public transport respectively being the most common options.\n\nCar use was highest in Brisbane, at 71%, followed by Leeds with 62%. In both cities public transport accounted for only 15% to 22% of journeys, and cycling was almost negligible at 3%. Walking was slightly more popular, at 11% in Brisbane and 13% in Leeds.\n\nThe other two cities were quite different. In Utrecht, 38% of employees cycled to work, the highest figure for any method in the city, and this was far above the 2% to 3% recorded elsewhere. Car use there was only 30%, the lowest of all four cities. Madrid, meanwhile, was the only place where public transport was the leading option, used by 40% of workers, just ahead of the car at 38%. Madrid also had the highest proportion of walkers, at 20%.",
    modelBand: 8,
    keyFeatures: [
      "Overview: o carro domina em Brisbane e Leeds; Utrecht destaca-se pela bicicleta e Madrid pelos transportes públicos.",
      "Brisbane (71%) e Leeds (62%) têm a maior utilização do carro.",
      "Utrecht: 38% de bicicleta, valor muito acima das outras cidades (2-3%).",
      "Madrid: transportes públicos (40%) ligeiramente à frente do carro (38%) e mais pessoas a pé (20%).",
      "Agrupar as cidades com padrões semelhantes em vez de descrever linha a linha."
    ],
    usefulLanguage: [
      "the dominant choice",
      "followed by ...",
      "accounted for only ...",
      "almost negligible",
      "was far above the figure for ...",
      "the lowest of all four cities",
      "the only place where ...",
      "just ahead of ...",
      "the most common option",
      "whereas / meanwhile"
    ],
    commonMistakes: [
      "Traduzir \"transportes públicos\" como \"public transports\": em inglês é incontável, \"public transport\".",
      "Esquecer o artigo definido em \"the car\" ou usá-lo mal em \"the Utrecht\": nomes de cidades não levam artigo.",
      "Listar os dados de cada célula; deve-se agrupar e comparar (por exemplo, cidades dependentes do carro).",
      "Usar \"people\" em vez de \"employees/workers\" quando o enunciado fala de quem trabalha; seja preciso."
    ]
  },
  {
    id: "w5", task: 1, module: "academic",
    title: "University graduates by gender, 1990–2020",
    prompt: "The graph below shows the percentage of men and women aged 25 to 34 who held a university degree in Ireland and Italy between 1990 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    chart: {
      type: "line", title: "Adults aged 25–34 with a university degree", unit: "%",
      labels: ["1990", "2000", "2010", "2020"],
      series: [
        { name: "Ireland (women)", values: [14, 28, 46, 60] },
        { name: "Ireland (men)", values: [15, 24, 36, 45] },
        { name: "Italy (women)", values: [6, 12, 24, 36] },
        { name: "Italy (men)", values: [7, 11, 18, 24] }
      ]
    },
    minWords: 150, timeMinutes: 20,
    modelAnswer: "The line graph compares the proportion of men and women aged 25 to 34 with a university degree in Ireland and Italy over thirty years, from 1990 to 2020.\n\nOverall, the figures rose in all four groups, but women improved far more quickly than men, and Ireland consistently outperformed Italy. The most notable change was that women overtook men in both countries.\n\nIn 1990 the gap between the genders was tiny. In Ireland 14% of women and 15% of men held a degree, while the Italian figures were 6% and 7%. By 2000, however, Irish women had pulled ahead, at 28% compared with 24% for men. Italian women overtook men a decade later, reaching 24% against 18% in 2010.\n\nThe gender gap then continued to widen. By 2020, 60% of Irish women were graduates, 15 percentage points more than men at 45%. Italy followed a similar pattern at a lower level, with 36% of women and only 24% of men holding degrees. Even so, Italian women in 2020 had only just reached the level that Irish women had passed in 2000, which shows how far behind Italy remained.",
    modelBand: 8,
    keyFeatures: [
      "Overview: aumento em todos os grupos; as mulheres cresceram mais depressa e ultrapassaram os homens nos dois países.",
      "Em 1990 diferenças mínimas entre géneros (14/15% na Irlanda; 6/7% em Itália).",
      "Irlandesas ultrapassam os homens por volta de 2000; italianas por volta de 2010.",
      "Em 2020: 60% vs 45% na Irlanda e 36% vs 24% em Itália.",
      "Comparar ao mesmo tempo país e género, sem separar em duas descrições independentes."
    ]
    ,
    usefulLanguage: [
      "consistently outperformed ...",
      "overtook / pulled ahead of ...",
      "the gender gap widened",
      "percentage points",
      "a decade later",
      "held a degree",
      "followed a similar pattern at a lower level",
      "compared with / against",
      "even so, ...",
      "by the end of the period"
    ],
    commonMistakes: [
      "Confundir \"percentage\" com \"percentage points\": a diferença entre 60% e 45% é de 15 pontos percentuais, não 15%.",
      "Traduzir \"licenciados\" como \"licensed\"; o correto é \"graduates\" ou \"degree holders\".",
      "Usar \"since 1990 to 2020\"; em inglês use \"from 1990 to 2020\" ou \"between 1990 and 2020\".",
      "Frases longas com \"and ... and ...\"; use ligações como \"while\", \"whereas\" e \"however\" para contrastar os grupos."
    ]
  },
  {
    id: "w6", task: 1, module: "general",
    title: "Letter of complaint: damaged laptop",
    prompt: "You recently bought a laptop from an online shop. When it arrived, it was damaged, and the company has not replied to your emails.\n\nWrite a letter to the customer services manager. In your letter:\n- describe what is wrong with the laptop\n- explain what you have already done about the problem\n- say what you would like the company to do\n\nWrite at least 150 words. You do NOT need to write any addresses. Begin your letter with Dear Sir or Madam.",
    chart: null,
    minWords: 150, timeMinutes: 20,
    modelAnswer: "Dear Sir or Madam,\n\nI am writing to complain about a laptop I purchased from your website on 3 March, order number 48215.\n\nWhen the parcel arrived last week, the screen was cracked and one corner of the case was badly dented. The packaging showed obvious signs of rough handling, so I assume the damage occurred during delivery. As a result, the computer cannot be used at all, which is particularly inconvenient because I need it for my studies.\n\nI emailed your customer service team on 10 March and again on 14 March, attaching photographs of the damage, but I have not received any reply. I also tried to telephone your helpline twice, but nobody answered.\n\nI would therefore be grateful if you could either send me a replacement laptop as soon as possible or give me a full refund. I would also appreciate a written confirmation of whichever option you choose.\n\nIf I do not hear from you within seven days, I will have no choice but to contact my bank and consumer protection authorities.\n\nI look forward to your prompt response.\n\nYours faithfully,\nAna Costa",
    modelBand: 8,
    keyFeatures: [
      "Registo formal consistente, com \"Dear Sir or Madam\" e \"Yours faithfully\".",
      "Cobrir os três pontos: descrever o problema, o que já fez, o que pretende.",
      "Dar detalhes concretos (data, número de encomenda, dano) para tornar o texto credível.",
      "Pedido claro e educado, com um prazo ou consequência razoável.",
      "Parágrafos curtos, cada um com uma função."
    ],
    usefulLanguage: [
      "I am writing to complain about ...",
      "I would be grateful if you could ...",
      "I would therefore like to request ...",
      "As a result, ...",
      "I have not received any reply",
      "a full refund / a replacement",
      "I look forward to your prompt response.",
      "I will have no choice but to ...",
      "Yours faithfully,",
      "attaching photographs of ..."
    ],
    commonMistakes: [
      "Usar contrações (\"I'm\", \"don't\") numa carta formal; escreva \"I am\", \"do not\".",
      "Escrever \"I want that you refund me\"; em inglês diz-se \"I would like you to refund me\".",
      "Terminar com \"Yours sincerely\" depois de \"Dear Sir or Madam\": o correto é \"Yours faithfully\".",
      "Falsos amigos: \"actually\" significa \"na verdade\" (não \"atualmente\") e \"assist\" significa \"ajudar\" (não \"assistir\")."
    ]
  },
  {
    id: "w7", task: 1, module: "general",
    title: "Letter to a friend: visit to your city",
    prompt: "A friend from another country is planning to visit your city next month.\n\nWrite a letter to your friend. In your letter:\n- say how you feel about the visit\n- suggest some things to do and see during the visit\n- explain why you cannot meet your friend at the airport\n\nWrite at least 150 words. You do NOT need to write any addresses. Begin your letter as follows: Dear ...,",
    chart: null,
    minWords: 150, timeMinutes: 20,
    modelAnswer: "Dear Marco,\n\nThanks so much for your message. I was thrilled to hear that you are finally coming to visit me next month. It has been almost three years since we last met, so I can't wait to show you around.\n\nThere is plenty to do here. If the weather is good, I suggest we walk along the river to the old castle, which has wonderful views over the whole city. You should also try the market on Saturday morning, because the street food there is fantastic. And since you love history, we could spend an afternoon at the national museum, which has just opened a new exhibition on medieval life.\n\nUnfortunately, I won't be able to pick you up from the airport. I will be at work until six that evening, and I have an important meeting I cannot miss. However, the airport train runs every ten minutes and takes you right to the central station, where I will be waiting for you.\n\nLet me know your flight details as soon as you can. I'm really looking forward to seeing you!\n\nBest wishes,\nJoana",
    modelBand: 8,
    keyFeatures: [
      "Registo informal/semi-formal: contrações permitidas, tom caloroso.",
      "Cobrir os três pontos: sentimentos, sugestões, explicação de por que não pode ir ao aeroporto.",
      "Apresentar a justificação com alternativa útil (comboio e encontro na estação).",
      "Sugestões variadas e específicas, adaptadas aos interesses do amigo.",
      "Terminar com fórmula informal adequada (\"Best wishes\", \"See you soon\")."
    ],
    usefulLanguage: [
      "I was thrilled to hear that ...",
      "I can't wait to show you around.",
      "I suggest we ...",
      "You should definitely try ...",
      "Unfortunately, I won't be able to ...",
      "I have an important meeting I cannot miss.",
      "Let me know your flight details.",
      "I'm really looking forward to seeing you!",
      "It has been ages since ...",
      "Best wishes,"
    ],
    commonMistakes: [
      "Escrever \"I will go to buscar-te\" de forma literal; em inglês: \"pick you up\".",
      "Usar \"sympathetic\" por \"simpático\" (falso amigo): diga \"nice\" ou \"friendly\".",
      "Esquecer a preposição em \"look forward to seeing\": depois de \"to\" vem o gerúndio, não o infinitivo.",
      "Tornar a carta demasiado formal e esquecer a naturalidade; evite \"I would like to inform you that\" num texto a um amigo."
    ]
  },
  {
    id: "w8", task: 2, module: "academic",
    title: "Free university education (agree/disagree)",
    prompt: "Some people believe that university education should be free for all students. To what extent do you agree or disagree?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
    chart: null,
    minWords: 250, timeMinutes: 40,
    modelAnswer: "It is often argued that governments should pay for all students to attend university. While I accept that free higher education would bring significant benefits, I only partly agree, because a fully free system may be unaffordable and unfair to those who never go to university.\n\nThe main argument in favour is that free tuition promotes equality of opportunity. When fees are high, talented young people from low-income families may decide not to apply, or they may graduate with years of debt that limit their choices. In Germany, for example, public universities charge almost no fees, and students from varied backgrounds can focus on their studies rather than on repayments. A better-educated workforce also boosts the economy, so society as a whole benefits from the investment.\n\nHowever, there are strong reasons why a completely free system may not work. Universities are expensive to run, and the money must come from taxes paid by everyone, including people who never study at that level. It is questionable whether a plumber or a shop assistant should help to finance the education of future lawyers, who will usually earn more. Moreover, when degrees cost nothing, some students may treat them less seriously, which can lead to high dropout rates.\n\nA more balanced approach would be to keep fees low and offer grants to students who cannot afford them, together with income-linked loans repaid only after graduates earn a reasonable salary. This would protect access without placing an unreasonable burden on taxpayers.\n\nIn conclusion, although free university education has clear social advantages, I believe a targeted system of financial support would be fairer and more sustainable.",
    modelBand: 8,
    keyFeatures: [
      "Posição clara desde a introdução (aqui: concorda em parte) e mantida até ao fim.",
      "Responder à pergunta \"to what extent\" com uma opinião graduada, não apenas sim ou não.",
      "Argumento a favor: igualdade de oportunidades, economia mais forte.",
      "Argumento contra: custo para os contribuintes e justiça social.",
      "Exemplo concreto (Alemanha) e conclusão que repete a posição."
    ],
    usefulLanguage: [
      "It is often argued that ...",
      "I only partly agree because ...",
      "promotes equality of opportunity",
      "graduate with years of debt",
      "a significant burden on taxpayers",
      "It is questionable whether ...",
      "A more balanced approach would be to ...",
      "income-linked loans",
      "Moreover, / However, / In conclusion, ...",
      "financially sustainable"
    ],
    commonMistakes: [
      "Escrever \"the education\" em frases gerais: diga \"education\" ou \"university education\" sem artigo.",
      "Traduzir \"propinas\" como \"propines\" ou \"tuitions\": o termo correto é \"tuition fees\" ou simplesmente \"fees\".",
      "Frases demasiado longas e sem pontuação clara; prefira frases médias bem ligadas.",
      "Dar a opinião só na conclusão: deve aparecer também na introdução."
    ]
  },
  {
    id: "w9", task: 2, module: "academic",
    title: "Prison or community service (discussion)",
    prompt: "Some people think that prison is the best way to deal with crime. Others believe that community service and rehabilitation programmes are more effective.\n\nDiscuss both views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
    chart: null,
    minWords: 250, timeMinutes: 40,
    modelAnswer: "The question of how best to deal with criminals is a long-standing debate. Some people argue that imprisonment is the most effective approach, while others prefer community service and rehabilitation. I will discuss both views before explaining why I believe a mixed approach, favouring rehabilitation for minor offences, works best.\n\nThose who support prison believe that it protects society by removing dangerous people from the streets. A violent offender who is locked up cannot harm anyone else during that time. Prison is also thought to act as a deterrent, since the prospect of losing freedom may discourage potential criminals. For serious crimes such as murder or armed robbery, many people feel that a custodial sentence is the only fair response.\n\nOn the other hand, critics point out that prison often fails to change behaviour. Overcrowded cells can become places where inmates learn new criminal skills, and after release they struggle to find work. In Norway, by contrast, prisons focus on education and training, and the reoffending rate is among the lowest in Europe. Community service is also much cheaper than imprisonment and allows offenders to remain with their families and give something back to the community, which can help them regain self-respect.\n\nIn my opinion, neither option is suitable for every case. Violent and repeat offenders should be imprisoned for public safety, but even then, prison should include education and counselling so that inmates are prepared for life afterwards. People who commit minor or first-time offences, however, are more likely to reform through community punishment.\n\nIn conclusion, although prison is necessary for serious crime, rehabilitation should play a much larger role in the justice system.",
    modelBand: 8,
    keyFeatures: [
      "Discutir os dois pontos de vista (prisão e serviço comunitário) em parágrafos separados.",
      "Dar uma opinião pessoal clara (aqui: abordagem mista).",
      "Argumentos a favor da prisão: proteção da sociedade, dissuasão.",
      "Argumentos a favor da reabilitação: reincidência, custo, reintegração.",
      "Exemplo concreto (Noruega) e conclusão coerente com a opinião."
    ],
    usefulLanguage: [
      "a long-standing debate",
      "act as a deterrent",
      "a custodial sentence",
      "On the other hand, ...",
      "the reoffending rate",
      "give something back to the community",
      "neither option is suitable for every case",
      "first-time offenders",
      "are more likely to reform",
      "play a larger role in ..."
    ],
    commonMistakes: [
      "Confundir \"arrested\" (detido) com \"sentenced\" (condenado); a expressão correta é \"to be sentenced to prison\".",
      "Escrever \"the crime\" em vez de \"crime\" quando se fala em geral.",
      "Apresentar só um dos pontos de vista; no tipo discussion ambos têm de ser tratados.",
      "Traduzir \"pena\" como \"pain\": use \"sentence\" ou \"punishment\"."
    ]
  },
  {
    id: "w10", task: 2, module: "academic",
    title: "Studying abroad (advantages and disadvantages)",
    prompt: "More and more students are choosing to study at universities in other countries.\n\nDo the advantages of this development outweigh the disadvantages?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
    chart: null,
    minWords: 250, timeMinutes: 40,
    modelAnswer: "In recent years, a growing number of young people have left their home countries to pursue a degree abroad. Although this trend carries certain drawbacks, I believe that the benefits clearly outweigh them.\n\nThe most obvious advantage is the academic opportunity. Students can access courses, research facilities and teachers that may not exist in their own countries, and a qualification from a respected foreign university often improves employment prospects. In addition, living overseas helps young people to become independent and mature. They have to manage budgets, deal with unfamiliar systems and solve problems without family support, and these skills are highly valued by employers. Studying abroad also gives them a chance to master another language, which is easiest when it is used daily.\n\nHowever, there are disadvantages that should not be ignored. The most serious is the financial burden, since international students usually pay higher tuition fees and must cover accommodation in an expensive foreign city. Homesickness and loneliness can also affect performance, especially in the first months when friendships have not yet formed. Furthermore, some graduates never return, which causes a brain drain that deprives their home countries of educated professionals.\n\nNevertheless, these problems can largely be reduced. Scholarships and part-time work ease the cost, universities increasingly offer support services for international students, and governments can encourage returning graduates with attractive jobs. For example, many Portuguese engineers who studied in northern Europe have come home and started successful companies, bringing with them new skills, international contacts and fresh ideas that benefit the local economy.\n\nIn conclusion, despite the costs and emotional challenges, studying abroad provides academic, personal and professional benefits that outweigh its disadvantages.",
    modelBand: 8,
    keyFeatures: [
      "Responder diretamente: \"do the advantages outweigh the disadvantages?\" (posição clara).",
      "Vantagens: oportunidades académicas, independência, língua estrangeira.",
      "Desvantagens: custo, saudades de casa, \"brain drain\".",
      "Mostrar que as desvantagens podem ser reduzidas (bolsas, apoio).",
      "Conclusão que repete a posição sem introduzir ideias novas."
    ],
    usefulLanguage: [
      "pursue a degree abroad",
      "the benefits clearly outweigh the drawbacks",
      "improve employment prospects",
      "become independent and mature",
      "the financial burden",
      "homesickness",
      "a brain drain",
      "can largely be reduced",
      "Furthermore, / In addition, / Nevertheless, ...",
      "scholarships ease the cost"
    ],
    commonMistakes: [
      "Usar \"to study in abroad\": \"abroad\" é advérbio, diga \"to study abroad\".",
      "Confundir \"college\" (ensino superior nos EUA) com \"colégio\" (escola privada); use \"university\".",
      "Escrever \"the advantages and disadvantages\" em listas sem desenvolver cada ponto com exemplos.",
      "Traduzir \"saudades\" como \"nostalgy\": use \"homesickness\" ou \"to miss home\"."
    ]
  },
  {
    id: "w11", task: 2, module: "academic",
    title: "Childhood obesity (problem and solution)",
    prompt: "In many countries, the number of overweight children is increasing.\n\nWhat are the main causes of this problem, and what measures could be taken to solve it?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
    chart: null,
    minWords: 250, timeMinutes: 40,
    modelAnswer: "Childhood obesity has become a serious public health concern in many parts of the world. This essay will examine the main causes of the problem and suggest several practical measures that could reverse the trend.\n\nThere are two principal causes. First, children's diets have changed dramatically. Fast food, sugary drinks and processed snacks are cheap, heavily advertised and easy to buy, and busy parents often rely on them instead of cooking fresh meals. Second, young people are far less physically active than previous generations. Many spend hours each day in front of screens, and a lack of safe outdoor spaces, together with fewer sports lessons at school, means that they burn fewer calories than they consume.\n\nSeveral solutions could help. Firstly, schools should offer healthy lunches and teach children about nutrition from an early age, so that they learn to make better choices. Daily physical education should also become compulsory, because regular exercise builds habits that last into adulthood. Secondly, governments can take legislative action. Taxing sugary drinks, as the United Kingdom has done, has encouraged manufacturers to reduce sugar, and restricting television advertising of junk food during children's programmes would limit its influence.\n\nParents, too, have a role to play. They can set limits on screen time and eat meals together as a family, which research shows encourages healthier eating. Local authorities could support them by building parks, playgrounds and cycle paths, so that active play becomes a safe and attractive alternative to staying indoors, particularly in crowded urban areas.\n\nIn conclusion, unhealthy diets and inactivity are the main causes of childhood obesity, and a combination of education, regulation and parental involvement offers the best chance of tackling it.",
    modelBand: 8,
    keyFeatures: [
      "Responder às duas partes da pergunta: causas e soluções.",
      "Causas: dieta pouco saudável e sedentarismo (cada uma desenvolvida).",
      "Soluções: escolas, legislação/impostos, papel dos pais, infraestruturas.",
      "Ligar cada solução a uma causa para dar coerência.",
      "Exemplo concreto (imposto sobre bebidas açucaradas no Reino Unido)."
    ],
    usefulLanguage: [
      "a serious public health concern",
      "reverse the trend",
      "processed snacks",
      "burn fewer calories than they consume",
      "take legislative action",
      "have a role to play",
      "make better choices",
      "Firstly, ... Secondly, ...",
      "tackle the problem",
      "habits that last into adulthood"
    ],
    commonMistakes: [
      "Usar \"actually\" ou \"eventually\" com o sentido português (\"atualmente\", \"eventualmente\"): são falsos amigos.",
      "Dizer \"the children are\" em generalizações: diga \"children are\" sem artigo.",
      "Responder só às causas ou só às soluções; as duas partes têm de ter o mesmo peso.",
      "Escrever \"preservatives\" por \"preservativos\" ao falar de alimentos: em inglês significa conservantes, e \"condoms\" é preservativos."
    ]
  }
];
