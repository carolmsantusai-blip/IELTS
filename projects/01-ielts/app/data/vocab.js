var IELTS = window.IELTS = window.IELTS || {};
(function () {
  var raw = {
    "Task 1 trends": [
      ["a sharp rise", "subida acentuada", "There was a sharp rise in car ownership between 2000 and 2005."],
      ["to level off", "estabilizar", "Sales levelled off at around 500 units a month."],
      ["to fluctuate around", "oscilar em torno de", "Prices fluctuated around £3 throughout the period."],
      ["a gradual decline", "declínio gradual", "The chart shows a gradual decline in newspaper readership."],
      ["to peak at", "atingir o pico de", "Unemployment peaked at 9% in 2012."],
      ["to plummet", "cair a pique", "Demand plummeted after the new tax was introduced."],
      ["a marginal increase", "um aumento marginal", "There was only a marginal increase in rainfall over the decade."],
      ["to account for", "representar (uma proporção)", "Housing accounted for 35% of total household expenditure."],
      ["by far the largest", "de longe o maior", "Transport was by far the largest source of emissions."],
      ["the figure stood at", "o valor situava-se em", "The figure stood at 12% in 1990, before doubling by 2010."]
    ],
    "Linking & cohesion": [
      ["on the other hand", "por outro lado", "Cities offer jobs; on the other hand, living costs are high."],
      ["as a result of", "em resultado de", "Many shops closed as a result of the economic downturn."],
      ["in addition to", "além de", "In addition to lower prices, online shopping offers convenience."],
      ["despite the fact that", "apesar de (o facto de)", "Despite the fact that tickets were expensive, the concert sold out."],
      ["whereas", "ao passo que", "Urban areas are crowded, whereas rural areas are sparsely populated."],
      ["consequently", "consequentemente", "Wages stagnated; consequently, many families struggled."],
      ["by contrast", "em contraste", "Exports grew steadily. By contrast, imports fell sharply."],
      ["with regard to", "relativamente a", "With regard to safety, the new design is far superior."],
      ["provided that", "desde que", "Students may use the lab provided that they book in advance."],
      ["to put it another way", "dito de outra forma", "Prices doubled; to put it another way, people could afford half as much."]
    ],
    "Academic collocations": [
      ["to draw a conclusion", "tirar uma conclusão", "It is difficult to draw a conclusion from such limited data."],
      ["to play a crucial role in", "desempenhar um papel crucial em", "Diet plays a crucial role in preventing disease."],
      ["to raise awareness of", "sensibilizar para", "The campaign aims to raise awareness of mental health issues."],
      ["to address the issue", "abordar/resolver a questão", "Governments must address the issue of housing shortages."],
      ["a growing body of evidence", "um corpo crescente de provas", "A growing body of evidence links sleep to memory."],
      ["to take into account", "ter em conta", "Planners must take into account the needs of older residents."],
      ["to pose a threat to", "representar uma ameaça para", "Plastic waste poses a threat to marine life."],
      ["a widespread belief", "uma crença generalizada", "There is a widespread belief that older workers resist change."],
      ["to reach a consensus", "chegar a um consenso", "Experts have yet to reach a consensus on the best approach."],
      ["to strike a balance between", "encontrar um equilíbrio entre", "Schools must strike a balance between exams and creativity."]
    ],
    "Opinion & argument": [
      ["In my view", "na minha opinião", "In my view, public transport should be free for students."],
      ["I am inclined to believe", "tendo a acreditar", "I am inclined to believe that tougher penalties would deter offenders."],
      ["it is widely argued that", "argumenta-se amplamente que", "It is widely argued that social media harms teenagers."],
      ["a compelling argument", "um argumento convincente", "The article makes a compelling argument for shorter working weeks."],
      ["to a certain extent", "até certo ponto", "To a certain extent, I agree with this view."],
      ["there is no denying that", "é inegável que", "There is no denying that technology has transformed communication."],
      ["it goes without saying", "nem é preciso dizer", "It goes without saying that education is a basic right."],
      ["the main drawback", "o principal inconveniente", "The main drawback of remote work is isolation."],
      ["to weigh up the pros and cons", "ponderar os prós e contras", "Before buying a car, weigh up the pros and cons carefully."],
      ["this is far from the truth", "isto está longe da verdade", "Some claim exams are unfair, but this is far from the truth."]
    ],
    "Speaking fluency": [
      ["to be honest", "para ser honesto", "To be honest, I've never really thought about it."],
      ["let me think about that", "deixe-me pensar nisso", "That's an interesting question; let me think about that for a moment."],
      ["it's hard to say", "é difícil dizer", "It's hard to say whether prices will fall next year."],
      ["the thing is", "a questão é que", "The thing is, I don't have much free time these days."],
      ["if I remember rightly", "se bem me lembro", "If I remember rightly, we moved there when I was seven."],
      ["I'd say", "diria que", "I'd say it's one of the best cities in Europe."],
      ["come to think of it", "pensando bem", "Come to think of it, I did take a similar trip last year."],
      ["what I mean is", "o que quero dizer é", "What I mean is that I prefer small, quiet places."],
      ["to be fair", "para ser justo", "To be fair, the service was quick even though it was busy."],
      ["I have mixed feelings about", "tenho sentimentos contraditórios sobre", "I have mixed feelings about living in a big city."]
    ],
    "Topic: environment": [
      ["carbon footprint", "pegada de carbono", "Flying less is one way to reduce your carbon footprint."],
      ["renewable energy", "energia renovável", "Investment in renewable energy has grown rapidly."],
      ["deforestation", "desflorestação", "Deforestation destroys habitats and accelerates climate change."],
      ["to cut greenhouse gas emissions", "reduzir as emissões de gases com efeito de estufa", "Countries have pledged to cut greenhouse gas emissions by 2050."],
      ["biodiversity loss", "perda de biodiversidade", "Biodiversity loss threatens entire ecosystems."],
      ["throwaway culture", "cultura do descartável", "Throwaway culture produces mountains of avoidable waste."],
      ["sustainable development", "desenvolvimento sustentável", "Sustainable development meets present needs without harming the future."],
      ["fossil fuels", "combustíveis fósseis", "Many nations still depend heavily on fossil fuels."],
      ["air pollution", "poluição atmosférica", "Air pollution in major cities causes respiratory problems."],
      ["environmentally friendly", "amigo do ambiente", "More shoppers are choosing environmentally friendly products."]
    ],
    "Topic: technology": [
      ["artificial intelligence", "inteligência artificial", "Artificial intelligence is transforming medical diagnosis."],
      ["the digital divide", "o fosso digital", "The digital divide leaves rural communities behind."],
      ["data privacy", "privacidade de dados", "Data privacy has become a major public concern."],
      ["cutting-edge", "de ponta", "The lab uses cutting-edge technology to analyse samples."],
      ["to go viral", "tornar-se viral", "The video went viral within hours."],
      ["screen time", "tempo de ecrã", "Doctors advise limiting children's screen time."],
      ["cyberbullying", "ciberbullying", "Cyberbullying can have lasting psychological effects."],
      ["a technological breakthrough", "um avanço tecnológico", "The new battery is a genuine technological breakthrough."],
      ["to automate", "automatizar", "Many factories have automated routine tasks."],
      ["to keep pace with", "acompanhar o ritmo de", "Laws struggle to keep pace with rapid innovation."]
    ],
    "Topic: education": [
      ["compulsory education", "ensino obrigatório", "Compulsory education ends at sixteen in many countries."],
      ["tuition fees", "propinas", "Rising tuition fees put pressure on students."],
      ["critical thinking", "pensamento crítico", "Schools should foster critical thinking, not just memorisation."],
      ["rote learning", "aprendizagem mecânica / de cor", "Rote learning rarely leads to genuine understanding."],
      ["distance learning", "ensino à distância", "Distance learning allows adults to study while working."],
      ["academic achievement", "desempenho/sucesso académico", "Sleep has a measurable effect on academic achievement."],
      ["vocational training", "formação profissional", "Vocational training prepares students for skilled trades."],
      ["peer pressure", "pressão dos pares", "Teenagers often give in to peer pressure."],
      ["lifelong learning", "aprendizagem ao longo da vida", "Lifelong learning keeps workers' skills up to date."],
      ["to drop out of", "abandonar (os estudos)", "Many students drop out of university in the first year."]
    ],
    "Topic: work & economy": [
      ["work-life balance", "equilíbrio entre trabalho e vida pessoal", "Flexible hours help employees achieve a better work-life balance."],
      ["the cost of living", "o custo de vida", "The cost of living has risen faster than wages."],
      ["job security", "segurança no emprego", "Many young people now accept less job security."],
      ["the gender pay gap", "a disparidade salarial entre géneros", "The gender pay gap remains wide in several industries."],
      ["to climb the career ladder", "subir na carreira", "She climbed the career ladder quickly after her promotion."],
      ["rising unemployment", "desemprego crescente", "Rising unemployment led to a fall in consumer spending."],
      ["economic growth", "crescimento económico", "Economic growth slowed during the recession."],
      ["flexible working hours", "horário de trabalho flexível", "Flexible working hours attract more applicants."],
      ["the gig economy", "a economia de biscates / plataformas", "The gig economy offers freedom but little security."],
      ["to make ends meet", "conseguir pagar as contas", "Many families struggle to make ends meet."]
    ],
    "Topic: health": [
      ["a balanced diet", "uma dieta equilibrada", "A balanced diet includes plenty of fruit and vegetables."],
      ["a sedentary lifestyle", "um estilo de vida sedentário", "A sedentary lifestyle increases the risk of heart disease."],
      ["mental health", "saúde mental", "Employers are paying more attention to mental health."],
      ["life expectancy", "esperança média de vida", "Life expectancy has risen steadily over the last century."],
      ["the obesity epidemic", "a epidemia de obesidade", "Cheap junk food has fuelled the obesity epidemic."],
      ["preventive medicine", "medicina preventiva", "Preventive medicine can reduce long-term healthcare costs."],
      ["a chronic illness", "uma doença crónica", "Living with a chronic illness requires constant management."],
      ["to take up exercise", "começar a fazer exercício", "He took up exercise after his doctor's warning."],
      ["public health", "saúde pública", "Vaccination is a cornerstone of public health."],
      ["stress-related illness", "doença relacionada com o stress", "Long hours can lead to stress-related illness."]
    ]
  };
  var out = [], n = 1;
  Object.keys(raw).forEach(function (cat) {
    raw[cat].forEach(function (r) {
      out.push({ id: "v" + (n++), term: r[0], meaning: r[1], example: r[2], category: cat });
    });
  });
  IELTS.vocab = out;
})();
