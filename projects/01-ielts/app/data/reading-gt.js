var IELTS = window.IELTS = window.IELTS || {};
IELTS.reading = (IELTS.reading || []).concat([
{
  id: "g1", title: "Local Notices and Adverts", module: "general", section: 1, difficulty: "5.0-6.0", timeMinutes: 18,
  paragraphs: [
    { label: "A", heading: "Riverside Swim Club", text: "Riverside Swim Club is open from 6 a.m. to 10 p.m. on weekdays and from 8 a.m. to 8 p.m. at weekends. New members pay only half price for their first month if they join before 30 April. Every member receives a free locker for the duration of each visit, and children under five swim free when accompanied by an adult. Adult beginner lessons take place on Tuesday evenings." },
    { label: "B", heading: "Brightside Language Evenings", text: "Learn Spanish or French in a friendly atmosphere. Courses run on Wednesday evenings at 7 p.m. for ten weeks and cost £90, with all materials included. Classes are limited to eight students so that everyone has the chance to speak. To secure your place, please enrol by 15 March at the front desk or by telephone." },
    { label: "C", heading: "Notice to Residents of Maple Court", text: "Please note that the water supply to all flats will be switched off on Thursday 12 June between 9 a.m. and 1 p.m. while engineers repair the main pipe. Bottled water will be available at reception during this period. Residents with questions should speak to the caretaker." },
    { label: "D", heading: "Greenfield Community Library", text: "From next month the library will stay open until 5 p.m. on Saturdays. Free computer sessions for over-60s are held every Monday morning. Books can now be renewed online, and late fees have been abolished for children under sixteen. Adults will continue to be charged for overdue items." },
    { label: "E", heading: "Peak Performance Gym", text: "Join Peak Performance and enjoy 24-hour access with your personal key card. Annual members receive one free session with a personal trainer. Our timetable includes yoga, spinning and circuit training. Showers are available, but towels are not provided, so please bring your own." },
    { label: "F", heading: "Pedal Pals Bike Workshop", text: "Every Saturday morning, our volunteers help local people to repair and maintain their bicycles. Bring your own bike, and we will provide the tools. The workshop is free and suitable for anyone aged sixteen or over. No previous experience is necessary; you will learn how to mend a puncture, adjust brakes and keep your chain in good condition." }
  ],
  groups: [
    {
      type: "match",
      instructions: "The reading passage has six short texts, A–F. Which text mentions the following? Write the correct letter, A–F. You may use any letter more than once.",
      options: [
        "A Riverside Swim Club",
        "B Brightside Language Evenings",
        "C Notice to Residents of Maple Court",
        "D Greenfield Community Library",
        "E Peak Performance Gym",
        "F Pedal Pals Bike Workshop"
      ],
      questions: [
        { n: 1, prompt: "a cheaper price for new members for a limited time", answer: "A", explanation: "O texto A diz: 'New members pay only half price for their first month if they join before 30 April'.", tip: "'Cheaper price for a limited time' parafraseia 'half price... before 30 April'. Procure condições temporais associadas a descontos." },
        { n: 2, prompt: "a service that will be unavailable for a few hours", answer: "C", explanation: "O texto C refere que a água 'will be switched off on Thursday 12 June between 9 a.m. and 1 p.m.'.", tip: "'Unavailable' costuma esconder-se em verbos como 'switched off', 'closed' ou 'suspended'." },
        { n: 3, prompt: "a limit on the number of people in each class", answer: "B", explanation: "O texto B afirma: 'Classes are limited to eight students'.", tip: "'Limit on the number of people' = 'limited to eight students'. Os números são boas âncoras." },
        { n: 4, prompt: "an activity for which participants must bring their own equipment", answer: "F", explanation: "O texto F diz: 'Bring your own bike, and we will provide the tools'.", tip: "Atenção: as ferramentas são fornecidas, mas a bicicleta não; a pergunta refere-se ao material do participante." },
        { n: 5, prompt: "the opportunity to use a facility at any time of day or night", answer: "E", explanation: "O texto E menciona '24-hour access with your personal key card'.", tip: "'At any time of day or night' é paráfrase de '24-hour'. O texto A tem horário alargado, mas não é permanente." },
        { n: 6, prompt: "free storage for personal belongings", answer: "A", explanation: "O texto A indica que 'Every member receives a free locker for the duration of each visit'.", tip: "'Storage for belongings' = 'locker'. Reconheça palavras concretas que correspondem a descrições gerais." },
        { n: 7, prompt: "a service that can now be used on the internet", answer: "D", explanation: "O texto D diz: 'Books can now be renewed online'.", tip: "'On the internet' = 'online'. A palavra 'now' sinaliza uma mudança recente, tal como a pergunta sugere." }
      ]
    },
    {
      type: "tfng",
      instructions: "Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.",
      questions: [
        { n: 8, prompt: "Riverside Swim Club closes later at weekends than on weekdays.", answer: "FALSE", explanation: "O clube fecha às '10 p.m.' durante a semana e às '8 p.m.' ao fim de semana, ou seja, mais cedo.", tip: "Compare sempre os dois valores antes de decidir; a direção da comparação (later/earlier) é a armadilha." },
        { n: 9, prompt: "The language courses at Brightside last ten weeks.", answer: "TRUE", explanation: "O texto B diz: 'Courses run on Wednesday evenings at 7 p.m. for ten weeks'.", tip: "Quando o número aparece igual no texto e na pergunta, confirme o que é contado (semanas, aulas, horas)." },
        { n: 10, prompt: "The water supply at Maple Court will be off for the whole of 12 June.", answer: "FALSE", explanation: "A água estará cortada apenas 'between 9 a.m. and 1 p.m.', não o dia inteiro.", tip: "'The whole day' é um exagero típico de afirmações FALSE; verifique o intervalo de tempo exato." },
        { n: 11, prompt: "The volunteers at Pedal Pals are all professional mechanics.", answer: "NOT GIVEN", explanation: "O texto diz que 'our volunteers help local people' mas nada indica a sua profissão ou formação.", tip: "Se o texto não fala da qualificação das pessoas, não pode inferir; escolha NOT GIVEN." }
      ]
    },
    {
      type: "gap",
      instructions: "Answer the questions below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage for each answer.",
      questions: [
        { n: 12, prompt: "By what date must students enrol for the Brightside courses? ___", answer: "15 March", accept: ["15th march", "march 15"], explanation: "O texto B diz: 'please enrol by 15 March'.", tip: "Copie datas exatamente como surgem no texto e respeite o limite de palavras." },
        { n: 13, prompt: "On which day of the week are the library's computer sessions for over-60s held? ___", answer: "Monday", accept: ["mondays", "monday morning"], explanation: "O texto D indica 'Free computer sessions for over-60s are held every Monday morning'.", tip: "Responda só ao que é pedido (o dia), sem acrescentar palavras desnecessárias." },
        { n: 14, prompt: "What must members of Peak Performance Gym bring themselves? ___", answer: "towels", accept: ["towel", "their own towels"], explanation: "O texto E afirma: 'towels are not provided, so please bring your own'.", tip: "A resposta está numa frase negativa ('not provided'); leia atentamente as negações." }
      ]
    }
  ]
}
,
{
  id: "g2", title: "Staff Handbook: Leave, Flexibility and the Development Scheme", module: "general", section: 2, difficulty: "5.5-6.5", timeMinutes: 20,
  paragraphs: [
    { label: "A", heading: "Annual leave", text: "All full-time employees are entitled to 25 days of paid annual leave each year, in addition to eight public holidays. The leave year begins on 1 April and ends on 31 March. Part-time staff receive a proportion of this entitlement, based on their contracted hours. Requests must be submitted through the staff portal at least two weeks in advance and approved by your line manager. During December, no more than two members of any team may be absent at the same time. Up to five unused days may be carried over to the following year; any additional days will be lost unless a manager has agreed otherwise in writing." },
    { label: "B", heading: "Sickness and other absence", text: "If you are unable to work because of illness, you must telephone your manager before 9.30 a.m. on the first day of absence. A medical certificate is required once an absence exceeds seven consecutive days. Employees who have completed one year of service receive full pay for up to ten days of sickness in any leave year. Compassionate leave of up to three days may be granted following the death of a close relative. Staff who wish to take unpaid leave for travel or study should speak to Human Resources, as such requests are considered only after two years of employment." },
    { label: "C", heading: "Flexible working", text: "Employees who have completed six months of service may apply to work flexible hours. Core hours are 10.00 a.m. to 3.00 p.m., and staff may start work at any time between 7.30 and 10.00. With the approval of a manager, employees may work from home for up to two days a week. A laptop is provided by the company, and a one-off home-office allowance of £150 may be claimed towards a desk or chair. Compressed schedules, such as four ten-hour days, are available in departments where the pattern of work permits." },
    { label: "D", heading: "The Graduate Development Scheme", text: "The Graduate Development Scheme is a two-year programme designed for newly qualified employees who wish to progress into management. Participants rotate through three departments, spending eight months in each, and are assigned a mentor from the senior leadership team. Applications open each January and close on 28 February. Candidates must hold a degree and have at least six months' experience with the company. Selection is based on a written application followed by an interview with a panel." },
    { label: "E", heading: "Benefits for participants", text: "Successful applicants receive a salary increase of 5 per cent on joining the scheme. The company pays the tuition fees for one professional qualification of the participant's choice, and trainees may use up to two paid study days a month to prepare for examinations. At the end of the programme, participants who meet the required standard are guaranteed an interview for a junior management post. Those who leave the company within a year of completing the scheme must repay half of the tuition fees." }
  ],
  groups: [
    {
      type: "gap",
      instructions: "Complete the notes below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage for each answer.",
      questions: [
        { n: 15, prompt: "The leave year starts on ___.", answer: "1 April", accept: ["1st april", "april 1"], explanation: "O parágrafo A diz: 'The leave year begins on 1 April'.", tip: "'Starts' é paráfrase de 'begins'. Anote datas completas, incluindo o mês." },
        { n: 16, prompt: "Leave requests must be made through the ___.", answer: "staff portal", accept: ["portal"], explanation: "O texto afirma: 'Requests must be submitted through the staff portal'.", tip: "'Made' substitui 'submitted'; mantenha o substantivo composto tal como está no texto." },
        { n: 17, prompt: "A maximum of ___ unused days can be carried over to the next year.", answer: "five", accept: ["5"], explanation: "A frase 'Up to five unused days may be carried over' dá a resposta.", tip: "'A maximum of' = 'up to'. Os números podem aparecer por extenso ou em algarismos; ambos são aceites." },
        { n: 18, prompt: "Staff who are ill must telephone their manager before ___ on the first day.", answer: "9.30 a.m.", accept: ["9.30", "9.30am", "9.30 am"], explanation: "O parágrafo B diz: 'you must telephone your manager before 9.30 a.m. on the first day of absence'.", tip: "Horas contam como número; copie o formato do texto." },
        { n: 19, prompt: "A medical certificate is needed if absence lasts more than ___ consecutive days.", answer: "seven", accept: ["7"], explanation: "O texto indica: 'A medical certificate is required once an absence exceeds seven consecutive days'.", tip: "'More than' = 'exceeds'. Reconheça verbos formais que expressam comparação." },
        { n: 20, prompt: "Employees may claim a one-off home-office allowance of ___.", answer: "£150", accept: ["150", "150 pounds"], explanation: "O parágrafo C diz: 'a one-off home-office allowance of £150'.", tip: "Inclua o símbolo da moeda se estiver no texto; a versão sem símbolo também é aceite." },
        { n: 21, prompt: "Participants in the Graduate Development Scheme work in ___ different departments.", answer: "three", accept: ["3"], explanation: "O parágrafo D afirma: 'Participants rotate through three departments'.", tip: "'Work in different departments' parafraseia 'rotate through'. Fique atento a verbos que descrevem movimento entre áreas." },
        { n: 22, prompt: "Every participant is given a ___ from the senior leadership team.", answer: "mentor", accept: ["a mentor"], explanation: "O texto D diz: 'are assigned a mentor from the senior leadership team'.", tip: "'Is given' = 'are assigned'. A palavra a seguir ao artigo indefinido é um substantivo contável singular." }
      ]
    },
    {
      type: "tfng",
      instructions: "Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.",
      questions: [
        { n: 23, prompt: "Employees can take unpaid leave for study after one year of employment.", answer: "FALSE", explanation: "O parágrafo B indica que tais pedidos 'are considered only after two years of employment', não um.", tip: "Os números são a armadilha mais comum em FALSE: verifique se o valor na pergunta coincide com o do texto." },
        { n: 24, prompt: "Compassionate leave is paid at the full rate of pay.", answer: "NOT GIVEN", explanation: "O texto só diz que pode ser concedida licença 'of up to three days'; não refere se é remunerada.", tip: "Quando o texto fala de duração mas a pergunta trata de pagamento, a informação em falta indica NOT GIVEN." },
        { n: 25, prompt: "Applicants for the Graduate Development Scheme must already have worked for the company.", answer: "TRUE", explanation: "O parágrafo D exige 'at least six months' experience with the company'.", tip: "'Already have worked' é paráfrase de 'have experience'. Identifique requisitos obrigatórios (must, required)." },
        { n: 26, prompt: "Staff receive a pay rise when they begin the scheme.", answer: "TRUE", explanation: "O parágrafo E diz: 'Successful applicants receive a salary increase of 5 per cent on joining the scheme'.", tip: "'Pay rise' e 'salary increase' são sinónimos frequentes em textos de trabalho." },
        { n: 27, prompt: "All participants who complete the scheme are promoted to junior management.", answer: "FALSE", explanation: "Apenas é garantida 'an interview for a junior management post' aos que atingem o nível exigido, não uma promoção.", tip: "'All' e 'promoted' são alertas: uma entrevista garantida não é o mesmo que um cargo garantido." }
      ]
    }
  ]
}
,
{
  id: "g3", title: "Tram Timetable, Flats and Parking", module: "general", section: 1, difficulty: "5.0-6.0", timeMinutes: 18,
  paragraphs: [
    { label: "A", heading: "Cityline Tram Service: Winter Timetable", text: "Trams run every ten minutes from 6.30 a.m. to 11.15 p.m. Monday to Saturday, and every twenty minutes on Sundays and public holidays. The last tram leaves Central Station at 11.15 p.m. A single ticket costs £2.40 and a day pass £5.50. Children under eleven travel free when accompanied by an adult. Weekly passes are available from ticket machines only, not from drivers. Season ticket holders must carry photo identification, and lost property is kept at the Central Station office for 28 days." },
    { label: "B", heading: "Flat to Let: Canal Street", text: "Bright two-bedroom flat on the second floor, five minutes' walk from the nearest tram stop. Rent is £780 per month, with bills not included. A deposit of one month's rent is required. Available from 1 September. The kitchen is fully equipped, and the bedrooms are unfurnished. No pets and no smoking. The minimum tenancy is six months. Viewings are by appointment only; please call Mr Alvarez after 5 p.m." },
    { label: "C", heading: "Room to Rent: Hollin Road", text: "Large double room in a shared house with three other tenants. The rent is £420 per month, including all bills and broadband. Tenants have use of a garden and a washing machine, and bicycles can be kept in the shed. The room is suitable for a student or young professional. A deposit of £200 is required, and the room is available immediately. Please send applications by email with a short introduction." },
    { label: "D", heading: "Council Notice: Resident Parking Permits", text: "Residents of zones 1 to 3 may apply for a parking permit online. An annual permit costs £60 for the first vehicle and £110 for a second. Permits take ten working days to arrive. Visitor vouchers are sold in books of ten for £8 per book. Parking restrictions apply from 8 a.m. to 6 p.m., Monday to Friday. Holders of disabled badges are exempt." }
  ],
  groups: [
    {
      type: "tfng",
      instructions: "Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.",
      questions: [
        { n: 1, prompt: "Trams run less frequently on Sundays than on Saturdays.", answer: "TRUE", explanation: "Aos sábados circulam 'every ten minutes', ao domingo 'every twenty minutes'.", tip: "'Less frequently' corresponde a intervalos maiores entre trams; converta a comparação em números." },
        { n: 2, prompt: "Weekly passes can be bought from tram drivers.", answer: "FALSE", explanation: "O texto afirma que os passes semanais estão 'available from ticket machines only, not from drivers'.", tip: "A expressão 'only... not from' contradiz diretamente a afirmação; preste atenção a 'only'." },
        { n: 3, prompt: "A ten-year-old child may travel free if accompanied by an adult.", answer: "TRUE", explanation: "O texto diz: 'Children under eleven travel free when accompanied by an adult'; dez anos é menos de onze.", tip: "Faça o cálculo: 'under eleven' inclui os 10 anos mas não os 11." },
        { n: 4, prompt: "Free wi-fi is provided on all trams.", answer: "NOT GIVEN", explanation: "O texto sobre o serviço de trams não menciona internet nem wi-fi.", tip: "Se não encontrar nenhuma referência ao assunto na zona certa do texto, trata-se de NOT GIVEN." },
        { n: 5, prompt: "The rent for the Canal Street flat includes the cost of bills.", answer: "FALSE", explanation: "O anúncio diz '£780 per month, with bills not included'.", tip: "'Includes' versus 'not included': as negações em anúncios são frequentes." },
        { n: 6, prompt: "The Canal Street flat is within walking distance of a tram stop.", answer: "TRUE", explanation: "O anúncio descreve o apartamento como estando a 'five minutes' walk from the nearest tram stop'.", tip: "'Walking distance' é paráfrase de 'five minutes' walk'." },
        { n: 7, prompt: "Tenants of the Hollin Road house can use a garden.", answer: "TRUE", explanation: "O texto C afirma: 'Tenants have use of a garden and a washing machine'.", tip: "Frases coordenadas ('a garden and a washing machine') podem ocultar duas informações; confirme a que interessa." }
      ]
    },
    {
      type: "gap",
      instructions: "Answer the questions below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage for each answer.",
      questions: [
        { n: 8, prompt: "How much does a day pass for the tram cost? ___", answer: "£5.50", accept: ["5.50", "5.5"], explanation: "O texto A diz: 'a day pass £5.50'.", tip: "Não confunda bilhete simples (£2.40) com passe diário." },
        { n: 9, prompt: "At what time does the last tram leave Central Station? ___", answer: "11.15 p.m.", accept: ["11.15", "11.15pm", "11.15 pm"], explanation: "O texto indica: 'The last tram leaves Central Station at 11.15 p.m.'.", tip: "Pode haver duas horas semelhantes; escolha a que corresponde à pergunta (última partida)." },
        { n: 10, prompt: "How many months' rent is needed as a deposit for the Canal Street flat? ___", answer: "one", accept: ["1"], explanation: "O anúncio diz: 'A deposit of one month's rent is required'.", tip: "O número pode aparecer por extenso; também são aceites algarismos." },
        { n: 11, prompt: "Viewings of the Canal Street flat are by ___ only.", answer: "appointment", accept: ["an appointment"], explanation: "O texto B afirma: 'Viewings are by appointment only'.", tip: "Reconheça expressões fixas: 'by appointment', 'by invitation', 'by reservation'." },
        { n: 12, prompt: "What is the monthly rent for the room on Hollin Road? ___", answer: "£420", accept: ["420"], explanation: "O anúncio C indica: 'The rent is £420 per month, including all bills and broadband'.", tip: "O depósito (£200) é um distrator; leia a pergunta antes de copiar o valor." },
        { n: 13, prompt: "Where can tenants on Hollin Road keep their bicycles? ___", answer: "shed", accept: ["the shed", "in the shed"], explanation: "O texto diz que 'bicycles can be kept in the shed'.", tip: "Mantenha o substantivo e ignore a preposição; o limite de palavras é rigoroso." },
        { n: 14, prompt: "How many working days does a parking permit take to arrive? ___", answer: "ten", accept: ["10"], explanation: "O aviso D diz: 'Permits take ten working days to arrive'.", tip: "Tenha atenção à unidade (working days) para não responder com o preço ou outros números." }
      ]
    }
  ]
}
,
{
  id: "g4", title: "Weekend Days Out", module: "general", section: 1, difficulty: "5.0-6.0", timeMinutes: 18,
  paragraphs: [
    { label: "A", heading: "Hartley Castle", text: "Explore 800 years of history at Hartley Castle. Guided tours run at 11 a.m. and 2 p.m. and are included in the ticket price. Audio guides are available at the gate for £3 in six languages. Refresh yourself at the café in the Old Kitchen. Please note that, because of the narrow staircases, wheelchair users cannot visit the upper floors. Dogs on leads are welcome in the grounds. Adults £12, children £6." },
    { label: "B", heading: "Marlow Wildlife Park", text: "Meet over 200 animals, including red pandas and meerkats. Feeding sessions take place daily at 12.30 p.m., and visitors may watch from the viewing platforms. Parking for 400 cars is free. There is an adventure playground for children. Groups of ten or more who book in advance receive a 15 per cent discount. Paths are wheelchair-accessible throughout. Please do not feed the animals except at supervised sessions." },
    { label: "C", heading: "Old Mill Museum", text: "Discover how flour was made in the days before factories. The working waterwheel is demonstrated on the first Sunday of every month. In our activity room, children can grind their own grain and take home a small bag of flour. The shop sells locally milled flour. Open 10 a.m. to 4 p.m., closed on Mondays. Entry is free on Wednesdays." },
    { label: "D", heading: "Seaview Boat Trips", text: "Take a forty-minute trip around the bay, departing every hour from 10 a.m. Tickets cannot be reserved in advance and must be bought at the kiosk, where we accept cash only. Trips are cancelled in rough weather, and tickets are refunded in full. Lifejackets are provided for all passengers. Seals are often spotted on the rocks. Each boat carries a maximum of 30 passengers." },
    { label: "E", heading: "Kingsway Market", text: "Every Saturday from 8 a.m., more than sixty stalls sell fresh produce, crafts and vintage clothing. Live music is played near the fountain from noon. Most stalls accept card payments. If you want the best choice of fish, arrive before 10 a.m. The nearest car park is a five-minute walk away, and on-street parking is limited to two hours." }
  ],
  groups: [
    {
      type: "match",
      instructions: "The reading passage has five short texts, A–E. Which attraction does each statement describe? Write the correct letter, A–E. You may use any letter more than once.",
      options: [
        "A Hartley Castle",
        "B Marlow Wildlife Park",
        "C Old Mill Museum",
        "D Seaview Boat Trips",
        "E Kingsway Market"
      ],
      questions: [
        { n: 1, prompt: "offers a reduced price to large parties", answer: "B", explanation: "O texto B diz: 'Groups of ten or more who book in advance receive a 15 per cent discount'.", tip: "'Large parties' = 'groups of ten or more'; 'reduced price' = 'discount'." },
        { n: 2, prompt: "has areas that wheelchair users cannot reach", answer: "A", explanation: "O texto A indica que 'wheelchair users cannot visit the upper floors'. No parque (B) os caminhos são acessíveis.", tip: "Compare textos semelhantes: B refere acessibilidade total, A refere uma limitação." },
        { n: 3, prompt: "provides live entertainment", answer: "E", explanation: "O texto E menciona 'Live music is played near the fountain from noon'.", tip: "'Live entertainment' é uma categoria geral; a música ao vivo é um exemplo concreto." },
        { n: 4, prompt: "lets children try an activity for themselves", answer: "C", explanation: "O texto C refere que 'children can grind their own grain and take home a small bag of flour'.", tip: "'Try for themselves' = 'grind their own'. Procure atividades práticas descritas em termos concretos." },
        { n: 5, prompt: "may not operate if the weather is bad", answer: "D", explanation: "O texto D diz: 'Trips are cancelled in rough weather'.", tip: "'Bad weather' corresponde a 'rough weather'; verbos como 'cancelled' sinalizam suspensões." },
        { n: 6, prompt: "has somewhere to buy refreshments on site", answer: "A", explanation: "O texto A refere 'the café in the Old Kitchen'.", tip: "'Somewhere to buy refreshments' parafraseia 'café'; procure locais de consumo." },
        { n: 7, prompt: "does not accept card payments for tickets", answer: "D", explanation: "O texto D indica que os bilhetes são vendidos no quiosque, 'where we accept cash only'. No mercado (E) a maioria aceita cartão.", tip: "'Cash only' é a pista; cuidado com textos que mencionam pagamentos mas aceitam cartão." },
        { n: 8, prompt: "allows visitors to watch animals being fed", answer: "B", explanation: "O texto B diz: 'Feeding sessions take place daily at 12.30 p.m., and visitors may watch from the viewing platforms'.", tip: "Reconheça a paráfrase 'watch animals being fed' = 'feeding sessions... visitors may watch'." }
      ]
    },
    {
      type: "gap",
      instructions: "Complete the sentences below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage for each answer.",
      questions: [
        { n: 9, prompt: "Audio guides at Hartley Castle are available in ___ languages.", answer: "six", accept: ["6"], explanation: "O texto A diz: 'Audio guides are available at the gate for £3 in six languages'.", tip: "Há vários números na frase (£3, six); escolha o que descreve as línguas." },
        { n: 10, prompt: "Visitors to Marlow Wildlife Park do not pay for ___.", answer: "parking", accept: ["car parking"], explanation: "O texto B afirma: 'Parking for 400 cars is free'.", tip: "'Do not pay for' = 'is free'. Transforme a frase negativa na afirmativa equivalente." },
        { n: 11, prompt: "The Old Mill Museum demonstrates its waterwheel on the ___ Sunday of each month.", answer: "first", accept: ["1st"], explanation: "O texto C diz: 'The working waterwheel is demonstrated on the first Sunday of every month'.", tip: "Ordinais ('first', 'second') também são respostas válidas; preste atenção ao contexto gramatical." },
        { n: 12, prompt: "A trip with Seaview Boat Trips lasts ___ minutes.", answer: "forty", accept: ["40"], explanation: "O texto D diz: 'Take a forty-minute trip around the bay'.", tip: "'Forty-minute' é um adjetivo composto: a unidade já está na pergunta, por isso só falta o número." },
        { n: 13, prompt: "All passengers on the boats are given ___.", answer: "lifejackets", accept: ["life jackets", "lifejacket", "life jacket"], explanation: "O texto D afirma: 'Lifejackets are provided for all passengers'.", tip: "'Are given' = 'are provided'. Os verbos da passiva são formas comuns de paráfrase." },
        { n: 14, prompt: "Visitors to Kingsway Market who want the best choice of fish should arrive before ___.", answer: "10 a.m.", accept: ["10", "10am", "10 am", "ten"], explanation: "O texto E diz: 'If you want the best choice of fish, arrive before 10 a.m.'.", tip: "Distinga horas semelhantes: o mercado abre às 8 a.m., mas a pergunta pede a hora limite para o peixe." }
      ]
    }
  ]
}
,
{
  id: "g5", title: "Health and Safety Guidance and Internal Vacancies", module: "general", section: 2, difficulty: "5.5-6.5", timeMinutes: 20,
  paragraphs: [
    { label: "A", text: "Every accident, however minor, must be recorded in the accident book kept at reception within 24 hours. Near misses, where nobody is hurt but harm could have occurred, should be reported to the safety officer by email. Failure to report an incident may result in disciplinary action. First-aid boxes are located on each floor, and a list of trained first-aiders is displayed beside the lifts." },
    { label: "B", text: "When the alarm sounds, leave the building by the nearest exit without stopping to collect your belongings. Do not use the lifts. Assemble in the car park at the rear, where your team leader will take a register. Fire drills are held twice a year and attendance is compulsory. Anyone who needs assistance to evacuate should arrange a personal evacuation plan with Human Resources." },
    { label: "C", text: "Employees who use a computer for more than an hour a day are entitled to an eye test every two years, paid for by the company. Screens should be placed at arm's length with the top at eye level, and chairs adjusted to support the lower back. A short break of five minutes should be taken every hour. Staff who experience back or wrist pain should inform their manager promptly." },
    { label: "D", text: "Do not attempt to lift anything heavier than 15 kilograms unaided. Use the trolleys provided in the storeroom, and ask a colleague to help with bulky items. Bend your knees rather than your back, and keep the load close to your body. Staff in the warehouse must complete a handling course within three months of starting." },
    { label: "E", text: "Vacancies are advertised on the intranet for ten working days before being advertised externally, giving current employees the first opportunity to apply. To be eligible, staff must have completed at least twelve months in their present role and must have no active written warning. Applicants should discuss their intention with their line manager before submitting a form, although the manager's permission is not required." },
    { label: "F", text: "Applications consist of a two-page form and a short statement explaining why you are suited to the post. Shortlisted candidates attend an interview with a panel of three, which usually includes a representative from the department concerned. Unsuccessful applicants are entitled to feedback within five working days, and successful candidates will normally begin their new role within a month." }
  ],
  groups: [
    {
      type: "match",
      instructions: "The reading passage has six paragraphs, A–F. Choose the correct heading for paragraphs A–E from the list of headings below. Write the correct number, i–viii. There are more headings than paragraphs, so you will not use them all.",
      options: [
        "i  Reducing the risk of injury when moving objects",
        "ii  Leaving the building safely",
        "iii  Looking after your eyes and posture at your desk",
        "iv  Recording incidents and getting help",
        "v  A chance for existing staff to apply for new posts",
        "vi  Training for new warehouse employees",
        "vii  How to report bullying in the workplace",
        "viii  Choosing the interview panel"
      ],
      questions: [
        { n: 15, prompt: "Paragraph A", answer: "iv", explanation: "O parágrafo explica que 'Every accident... must be recorded' e que existem caixas de primeiros socorros e uma lista de socorristas.", tip: "O título combina duas ideias (registo e ajuda); confirme que o parágrafo cobre ambas." },
        { n: 16, prompt: "Paragraph B", answer: "ii", explanation: "O texto dá instruções para o alarme: 'leave the building by the nearest exit' e reunir no parque de estacionamento.", tip: "'Leaving the building' é paráfrase de 'evacuate'. Procure sinónimos no título." },
        { n: 17, prompt: "Paragraph C", answer: "iii", explanation: "O parágrafo aborda testes de visão, a posição do ecrã e o apoio das costas: 'chairs adjusted to support the lower back'.", tip: "'Posture' não aparece no texto; é uma generalização de descrições da posição do corpo e do mobiliário." },
        { n: 18, prompt: "Paragraph D", answer: "i", explanation: "O texto dá regras para levantar pesos: 'Do not attempt to lift anything heavier than 15 kilograms unaided'.", tip: "O título vi (warehouse) é um distrator: a formação é só um pormenor, não a ideia principal." },
        { n: 19, prompt: "Paragraph E", answer: "v", explanation: "O parágrafo diz que as vagas são anunciadas na intranet 'giving current employees the first opportunity to apply'.", tip: "'Existing staff' corresponde a 'current employees'; identifique a ideia dominante do parágrafo." }
      ]
    },
    {
      type: "tfng",
      instructions: "Do the following statements agree with the information given in the passage? Write TRUE, FALSE or NOT GIVEN.",
      questions: [
        { n: 20, prompt: "Near misses should be entered in the accident book.", answer: "FALSE", explanation: "Os quase-acidentes devem ser comunicados ao responsável 'by email'; o livro de acidentes é para acidentes.", tip: "Distinga conceitos próximos: o texto separa 'accident' de 'near miss' e atribui canais diferentes." },
        { n: 21, prompt: "Fire drills take place twice a year.", answer: "TRUE", explanation: "O parágrafo B diz: 'Fire drills are held twice a year'.", tip: "'Take place' = 'are held'. Verbos de organização de eventos têm muitos sinónimos." },
        { n: 22, prompt: "The company pays for eye tests for staff who spend a lot of time at a computer.", answer: "TRUE", explanation: "O parágrafo C afirma que quem usa computador mais de uma hora por dia tem direito a um teste 'paid for by the company'.", tip: "'A lot of time' é paráfrase de 'more than an hour a day'." },
        { n: 23, prompt: "Employees who are successful in an internal application receive a higher salary.", answer: "NOT GIVEN", explanation: "Os parágrafos E e F descrevem requisitos e seleção, mas nunca falam de salário.", tip: "Informação plausível não é informação dada; só marque TRUE/FALSE se o texto o disser." }
      ]
    },
    {
      type: "gap",
      instructions: "Complete the sentences below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage for each answer.",
      questions: [
        { n: 24, prompt: "After leaving the building during an alarm, staff should assemble in the ___.", answer: "car park", accept: ["the car park"], explanation: "O parágrafo B diz: 'Assemble in the car park at the rear'.", tip: "'Assemble' = reunir; o local vem imediatamente a seguir ao verbo." },
        { n: 25, prompt: "Staff should not lift anything heavier than ___ without help.", answer: "15 kilograms", accept: ["15 kg", "15"], explanation: "O texto D indica: 'Do not attempt to lift anything heavier than 15 kilograms unaided'.", tip: "'Without help' = 'unaided'. Reconheça o prefixo negativo e o significado." },
        { n: 26, prompt: "To apply for an internal vacancy, staff must have spent at least ___ in their present role.", answer: "twelve months", accept: ["12 months", "a year"], explanation: "O parágrafo E exige 'at least twelve months in their present role'.", tip: "Mantenha a unidade de tempo (months) para respeitar o limite de duas palavras." },
        { n: 27, prompt: "Unsuccessful applicants can request feedback within ___ working days.", answer: "five", accept: ["5"], explanation: "O parágrafo F diz: 'Unsuccessful applicants are entitled to feedback within five working days'.", tip: "'Working days' já está na pergunta, por isso só precisa do número." }
      ]
    }
  ]
}
]);
