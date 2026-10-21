import json
import os

root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
content_dir = os.path.join(root_dir, 'content')

with open(os.path.join(content_dir, 'en.json'), 'r', encoding='utf-8') as f:
    en = json.load(f)
with open(os.path.join(content_dir, 'it.json'), 'r', encoding='utf-8') as f:
    it = json.load(f)
with open(os.path.join(content_dir, 'es.json'), 'r', encoding='utf-8') as f:
    es = json.load(f)

# Italian additions
aboutDualLens_it = {
    "tag": "CAPITOLO II • SCIENZA & MAESTRIA CONTEMPLATIVA",
    "title": "Il Doppio Sguardo: La Scienza Incontra il Silenzio",
    "subtitle": "Un fondamento raro che unisce una solida comprensione medica a oltre 15 anni di autentica maestria contemplativa.",
    "badgeDoctor": "SCIENZA PRATICA",
    "card1Title": "Dottore in Medicina (M.D.)",
    "card1Desc": "Comprensione scientifica dei meccanismi dello stress, della respirazione e delle risposte biologiche del corpo.",
    "card1Chips": ["🩺 Connessione Mente-Corpo", "⚡ Riflesso Naturale di Calma", "🧠 Riposo Profondo & Ritmi del Sonno"],
    "card1Expand": "Esplora come risponde il corpo",
    "card1Collapse": "Nascondi dettagli sul corpo",
    "card1Insight1Title": "Comprensione Personale:",
    "card1Insight1Desc": "Osservare con precisione come lo stress quotidiano, la stanchezza e le tensioni muscolari si accumulano nel corpo.",
    "card1Insight2Title": "Reset Naturale:",
    "card1Insight2Desc": "Calmare le reazioni di stress iperattive e sostenere la naturale capacità del corpo di riposare e rigenerarsi.",
    "card1FooterFormat": "Quadro concettuale informato dalle evidenze scientifiche",
    "badgeMaster": "15+ ANNI DI MAESTRIA",
    "card2Title": "Maestro di Meditazione & Cammino Spirituale",
    "card2Desc": "Oltre 15 anni di immersione nelle antiche tradizioni contemplative, padroneggiando respiro pranico, risonanza acustica e allineamento energetico.",
    "card2Chips": ["🪷 Respiro Pranayama", "☸️ Frequenze dei 7 Chakra", "🔔 Risonanza Sonora Vibratoria"],
    "card2Expand": "Esplora le tradizioni contemplative",
    "card2Collapse": "Nascondi tradizioni contemplative",
    "card2Insight1Title": "Risveglio Energetico Sottile:",
    "card2Insight1Desc": "Sciogliere blocchi energetici dalla radice alla corona mediante suono sacro, visualizzazione e respiro.",
    "card2Insight2Title": "Presenza Testimone Pura:",
    "card2Insight2Desc": "Placare il continuo chiacchiericcio mentale per accedere al silenzio diretto, all'equilibrio emotivo e alla pace incrollabile.",
    "card2FooterFormat": "Tradizione autentica & pratica diretta",
    "card3Badge": "SANTUARIO SU MISURA 1:1",
    "card3Title": "Come Scienza e Silenzio si Uniscono nella Tua Sessione",
    "card3Desc": "Nella tua sessione individuale con il Dr. Mayank non separi mai il corpo fisico dallo spirito. Individuiamo dove risiede la tensione e applichiamo pratiche gentili per ricreare armonia.",
    "card3Steps": [
        { "heading": "Ascolto Attento", "body": "Ascolto empatico e chiaro per comprendere dove si è accumulata tensione nella mente, nelle emozioni o nel corpo." },
        { "heading": "Pratiche Personalizzate", "body": "Guida attraverso dolci respirazioni, suoni calmanti e riequilibrio energetico modellato sulle tue esigenze." },
        { "heading": "Abitudini per la Vita Quotidiana", "body": "Creazione di semplici rituali di 5 minuti affinché la pace vissuta rimanga con te in ogni momento." }
    ],
    "card3FooterFormat": "Accompagnamento 1:1 completamente personalizzato",
    "card3Cta": "Prenota una Sessione Privata 1:1",
    "experienceSession": "Vivi in Sessione 1:1"
}

aboutDualLens_es = {
    "tag": "CAPÍTULO II • CIENCIA Y MAESTRÍA CONTEMPLATIVA",
    "title": "La Doble Mirada: La Ciencia Encuentra la Quietud",
    "subtitle": "Un cimiento singular que une la comprensión médica rigurosa con más de 15 años de auténtica maestría contemplativa.",
    "badgeDoctor": "CIENCIA PRÁCTICA",
    "card1Title": "Doctor en Medicina (M.D.)",
    "card1Desc": "Comprensión científica de los patrones de estrés, respiración y cómo el organismo responde a la exigencia diaria.",
    "card1Chips": ["🩺 Conexión Mente-Cuerpo", "⚡ Reflejo Natural de Calma", "🧠 Descanso Profundo y Sueño"],
    "card1Expand": "Explora cómo responde el cuerpo",
    "card1Collapse": "Ocultar respuesta del cuerpo",
    "card1Insight1Title": "Comprensión Personal:",
    "card1Insight1Desc": "Examinar con detenimiento cómo el estrés, la fatiga y la tensión muscular se acumulan en el organismo.",
    "card1Insight2Title": "Reinicio Natural:",
    "card1Insight2Desc": "Serenar reacciones de estrés desmedidas y apoyar la capacidad biológica del cuerpo para regenerarse.",
    "card1FooterFormat": "Marco sustentado en el rigor científico",
    "badgeMaster": "15+ AÑOS DE MAESTRÍA",
    "card2Title": "Maestro de Meditación y Camino Espiritual",
    "card2Desc": "Más de 15 años inmerso en tradiciones contemplativas ancestrales, dominando el pranayama, la resonancia acústica y el flujo sutil.",
    "card2Chips": ["🪷 Respiración Pranayama", "☸️ Frecuencia de los 7 Chakras", "🔔 Resonancia Sonora Vibracional"],
    "card2Expand": "Explorar tradiciones contemplativas",
    "card2Collapse": "Ocultar tradiciones contemplativas",
    "card2Insight1Title": "Despertar Energético Sutil:",
    "card2Insight1Desc": "Despejar estancamientos desde la raíz hasta la coronilla mediante sonido sacro, visualización y aliento.",
    "card2Insight2Title": "Presencia Testigo Pura:",
    "card2Insight2Desc": "Aquietar el diálogo mental incesante para acceder a la quietud directa, el equilibrio emocional y la paz interior.",
    "card2FooterFormat": "Tradición viva y experiencia directa",
    "card3Badge": "SANTUARIO A MEDIDA 1:1",
    "card3Title": "Cómo Convergen Ciencia y Quietud en Tu Sesión",
    "card3Desc": "En tu sesión privada con el Dr. Mayank jamás se escinde el cuerpo del espíritu. Identificamos dónde se retiene la tensión y aplicamos prácticas suaves para devolver el equilibrio.",
    "card3Steps": [
        { "heading": "Escucha Atenta", "body": "Escuchar con empatía y discernimiento para comprender dónde se aloja la tensión en la mente o el cuerpo." },
        { "heading": "Prácticas a Medida", "body": "Acompañamiento en respiraciones suaves, tonos acústicos y armonización energética adaptada a ti." },
        { "heading": "Hábitos para el Día a Día", "body": "Pautas de 5 minutos para que la serenidad alcanzada te acompañe de manera constante en la vida." }
    ],
    "card3FooterFormat": "Acompañamiento 1:1 totalmente individualizado",
    "card3Cta": "Reservar una Sesión Personal 1:1",
    "experienceSession": "Vivir en Sesión 1:1"
}

aboutProtocolPresets_it = {
    "stress": {
        "id": "stress",
        "num": "01",
        "duration": "RESET DI CALMA",
        "icon": "⚡",
        "label": "Stress & Pensieri Ripetitivi",
        "focusName": "Calmare la Mente & Ristabilire la Pace Interiore",
        "target": "Stress Quotidiano & Sovraccarico",
        "shortDesc": "Quando la pressione incessante fa correre i pensieri, diventa difficile staccare e trovare vero riposo.",
        "beforeState": "Sopraffatto & Irrequieto",
        "afterState": "Calma Profonda & Riposo Sereno",
        "format": "Calma Rapida & Rilassamento",
        "medicalInsight": "Lo stress prolungato affatica la concentrazione, innesca pensieri circolari e impedisce al sistema nervoso di rilassarsi.",
        "spiritualApproach": "Respirazione ritmica dolce e silenzio guidato che ti radicano naturalmente nella quiete interiore.",
        "transformation": "Rilassamento distensivo, fine del vortice mentale, rassicurante senso di sicurezza e riposo naturale."
    },
    "fatigue": {
        "id": "fatigue",
        "num": "02",
        "duration": "RICARICA NATURALE",
        "icon": "🌧️",
        "label": "Stanchezza & Burnout",
        "focusName": "Rinnovare Vitalità Quotidiana & Focus",
        "target": "Energia Esaurita & Spossatezza",
        "shortDesc": "Giornate interminabili e una corsa continua prosciugano le energie, lasciandoti spossato e svuotato.",
        "beforeState": "Svuotato & Appannato",
        "afterState": "Calma Ristorata & Mente Limpida",
        "format": "Ricarica Energetica Profonda",
        "medicalInsight": "La tensione continua consuma le riserve biologiche cellulari, offuscando la mente e riducendo la resistenza.",
        "spiritualApproach": "Armonizzazione energetica gentile, rilassamento guidato profondo e suoni armonici per rinnovare le forze.",
        "transformation": "Limpida chiarezza mentale, sensazione di leggerezza e rinnovato entusiasmo sereno per la vita quotidiana."
    },
    "blocks": {
        "id": "blocks",
        "num": "03",
        "duration": "RILASCIO DOLCE",
        "icon": "🌀",
        "label": "Emozioni Trattenute & Tensioni",
        "focusName": "Rilassamento Dolce & Lasciar Andare",
        "target": "Tensioni Emotive Inespresse",
        "shortDesc": "I sentimenti non espressi e le preoccupazioni quotidiane si accumulano come stress silenzioso, creando pesantezza.",
        "beforeState": "Appesantito & Teso",
        "afterState": "Leggero, Libero & in Pace",
        "format": "Rilascio Emotivo Dolce",
        "medicalInsight": "Le emozioni trattenute creano rigidità muscolare cronica, affaticamento e una diffusa sensazione di disagio.",
        "spiritualApproach": "Visualizzazione calmante, frequenze sonore armoniche e guida accogliente per lasciare andare vecchi pesi.",
        "transformation": "Scioglimento della pesantezza, libertà emotiva, limpida serenità d'animo e una naturale sensazione di leggerezza."
    },
    "growth": {
        "id": "growth",
        "num": "04",
        "duration": "PACE PROFONDA",
        "icon": "🕊️",
        "label": "Senso Interiore & Vocazione",
        "focusName": "Silenzio Pacato & Riconnessione",
        "target": "Pace Interiore & Direzione Chiara",
        "shortDesc": "Il desiderio di una quiete duratura, una mente libera da affanni e un legame diretto con ciò che conta davvero.",
        "beforeState": "Disorientato & Disconnesso",
        "afterState": "Visione Chiara & Silenzio Sereno",
        "format": "Mentorship Individuale 1:1",
        "medicalInsight": "Placare il dialogo interiore consente al cervello di accedere a uno stato raro di presenza cristallina e concentrazione rilassata.",
        "spiritualApproach": "Guida 1:1 nella meditazione profonda per ritrovare il tuo sé autentico al di là del trambusto esterno.",
        "transformation": "Direzione limpida, profonda tranquillità, risoluzione dei conflitti interni e incrollabile sicurezza in chi sei."
    }
}

aboutProtocolPresets_es = {
    "stress": {
        "id": "stress",
        "num": "01",
        "duration": "REINICIO DE CALMA",
        "icon": "⚡",
        "label": "Estrés y Pensamientos Agitados",
        "focusName": "Serenar la Mente y Restaurar la Paz Interior",
        "target": "Estrés Diario y Sobrecarga",
        "shortDesc": "Cuando la presión constante hace girar la mente sin descanso, resulta difícil desconectar y encontrar calma.",
        "beforeState": "Abrumado e Inquieto",
        "afterState": "Calma Profunda y Descanso Sereno",
        "format": "Alivio Rápido y Relajación",
        "medicalInsight": "El estrés crónico merma la atención, genera bucles de pensamientos y bloquea la relajación natural del cuerpo.",
        "spiritualApproach": "Respiración rítmica suave y quietud guiada que te anclan de forma natural en un estado de sosiego.",
        "transformation": "Relajación reparadora, cese del torbellino mental, reconfortante sensación de seguridad y descanso profundo."
    },
    "fatigue": {
        "id": "fatigue",
        "num": "02",
        "duration": "RECARGA NATURAL",
        "icon": "🌧️",
        "label": "Cansancio y Agotamiento",
        "focusName": "Renovar la Vitalidad Diaria y el Foco",
        "target": "Energía Agotada y Sobreesfuerzo",
        "shortDesc": "Largas jornadas de tareas continuas vacían tus reservas, dejándote con una sensación de desgaste y falta de aliento.",
        "beforeState": "Agotado y Confuso",
        "afterState": "Calma Renovada y Mente Clara",
        "format": "Recarga Energética Profunda",
        "medicalInsight": "La tensión continuada gasta los depósitos de energía celular, nublando el foco y reduciendo la resistencia.",
        "spiritualApproach": "Equilibrio sutil de energía, descanso guiado reparador y armonías sonoras para revitalizar tu bienestar.",
        "transformation": "Fresca claridad mental, sensación de ligereza y un entusiasmo sereno ante tu vida cotidiana."
    },
    "blocks": {
        "id": "blocks",
        "num": "03",
        "duration": "LIBERACIÓN AMABLE",
        "icon": "🌀",
        "label": "Emociones Retenidas y Tensión",
        "focusName": "Relajación Amable y Desapego",
        "target": "Tensión Emocional Acumulada",
        "shortDesc": "Los sentimientos no expresados y la exigencia diaria se sedimentan como estrés mudo, generando pesadez.",
        "beforeState": "Cargado y Tenso",
        "afterState": "Ligero, Libre y en Paz",
        "format": "Alivio Emocional Amable",
        "medicalInsight": "Las emociones reprimidas provocan rigidez somática, cansancio crónico y un desasosiego persistente.",
        "spiritualApproach": "Visualización tranquilizadora, tonos sonoros y acompañamiento compasivo para soltar viejas cargas.",
        "transformation": "Liberación de la pesadez, soltura emocional, diáfana paz mental y una sensación natural de sosiego."
    },
    "growth": {
        "id": "growth",
        "num": "04",
        "duration": "PAZ INTERIOR",
        "icon": "🕊️",
        "label": "Sentido Interior y Vocación",
        "focusName": "Quietud Lúcida y Autodescubrimiento",
        "target": "Paz Interior y Rumbo Claro",
        "shortDesc": "El anhelo de un sosiego duradero, una mente libre de zozobras y un contacto directo con lo que verdaderamente importa.",
        "beforeState": "Desorientado y Desconectado",
        "afterState": "Visión Clara y Quietud Serena",
        "format": "Mentoría Personal 1:1",
        "medicalInsight": "Aquietar el diálogo interno permite al cerebro sumergirse en un estado infrecuente de presencia y lucidez relajada.",
        "spiritualApproach": "Acompañamiento 1:1 en meditación profunda para regresar a tu naturaleza auténtica más allá del ajetreo.",
        "transformation": "Rumbo nítido, serenidad profunda, resolución de conflictos internos y un anclaje inquebrantable en tu ser."
    }
}

aboutUiLabels_it = {
    "pathsInSessionLabel": "Guida 1:1 nel Santuario:",
    "pathsRequestInSession": "Richiedi nella tua sessione",
    "pathsExpandPrompt": "Guida alla pratica in sessione",
    "pathsHidePrompt": "Nascondi guida alla pratica",
    "pathsTechniqueLabel": "Tecnica",
    "pathsShiftLabel": "Effetto Primario",
    "pathsExplore8": "Esplora le 8 pratiche di presenza",
    "pathsCollapse8": "Nascondi le 8 pratiche di presenza",
    "scrollExplore": "Scorri per esplorare il cammino",
    "bookSessionWithDr": "Prenota una sessione 1:1 con il Dr. Mayank",
    "rootFocus": "Focus Fondamentale:",
    "exploreProtocol": "Esplora il protocollo in 3 fasi",
    "hideProtocol": "Nascondi il protocollo",
    "step1Title": "1. Cosa Accade",
    "step2Title": "2. Il Reset del Dr. Mayank",
    "step3Title": "3. Cosa Sperimenti",
    "experienceInSession": "Vivi in Sessione 1:1"
}

aboutUiLabels_es = {
    "pathsInSessionLabel": "Acompañamiento 1:1 en el Santuario:",
    "pathsRequestInSession": "Solicitar en tu sesión",
    "pathsExpandPrompt": "Guía vivencial en sesión",
    "pathsHidePrompt": "Ocultar guía vivencial",
    "pathsTechniqueLabel": "Técnica",
    "pathsShiftLabel": "Efecto Principal",
    "pathsExplore8": "Explorar las 8 prácticas conscientes",
    "pathsCollapse8": "Ocultar las 8 prácticas conscientes",
    "scrollExplore": "Desplaza para explorar el recorrido",
    "bookSessionWithDr": "Reservar una sesión 1:1 con el Dr. Mayank",
    "rootFocus": "Enfoque Esencial:",
    "exploreProtocol": "Explorar protocolo en 3 fases",
    "hideProtocol": "Ocultar protocolo",
    "step1Title": "1. Qué Sucede",
    "step2Title": "2. El Reinicio del Dr. Mayank",
    "step3Title": "3. Qué Experimentas",
    "experienceInSession": "Vivir en Sesión 1:1"
}

aboutChapters_it = [
    { "id": "chapter-1", "title": "Soglia & Storia" },
    { "id": "chapter-pillars", "title": "Scienza × Meditazione × Spirito" },
    { "id": "chapter-2", "title": "Il Doppio Sguardo" },
    { "id": "chapter-3", "title": "Navigatore degli Stati Interiori" },
    { "id": "chapter-benefits", "title": "Benefici Reali & Profondi" },
    { "id": "chapter-4", "title": "Caratteristiche Chiave" },
    { "id": "chapter-5", "title": "Silenzio Rigenerante" },
    { "id": "chapter-6", "title": "Vie Verso l'Equilibrio" },
    { "id": "chapter-7", "title": "Formati delle Sedute" },
    { "id": "chapter-8", "title": "Ritorno a Te Stesso" }
]

aboutChapters_es = [
    { "id": "chapter-1", "title": "Umbral e Historia" },
    { "id": "chapter-pillars", "title": "Ciencia × Meditación × Espíritu" },
    { "id": "chapter-2", "title": "La Doble Mirada" },
    { "id": "chapter-3", "title": "Navegador de Estados Interiores" },
    { "id": "chapter-benefits", "title": "Beneficios Reales y Profundos" },
    { "id": "chapter-4", "title": "Diferenciales Esenciales" },
    { "id": "chapter-5", "title": "Quietud Restauradora" },
    { "id": "chapter-6", "title": "Vías Hacia el Equilibrio" },
    { "id": "chapter-7", "title": "Formatos de Encuentro" },
    { "id": "chapter-8", "title": "Regreso a Ti Mismo" }
]

# Apply to IT
it['about']['dualLens'] = aboutDualLens_it
it['about']['protocolPresets'] = aboutProtocolPresets_it
it['about']['ui'] = { **it['about'].get('ui', {}), **aboutUiLabels_it }
it['about']['chapters'] = aboutChapters_it
it['about']['medicalBackground']['tag'] = "FORMAZIONE SCIENTIFICA & MEDICA"
it['about']['medicalBackground']['text'] = "Formatosi come Dottore in Medicina, il Dr. Mayank approccia il benessere unendo la precisione biologica alla sensibilità verso la persona intera."
it['about']['spiritualJourney']['tag'] = "15+ ANNI DI PRATICA DEDICATA"
it['about']['spiritualJourney']['text'] = "Il cammino interiore del Dr. Mayank è iniziato oltre 15 anni fa, esplorando il silenzio meditativo e la guarigione energetica sottile."
it['about']['philosophyDetailed']['tag'] = "FILOSOFIA FONDAMENTALE"
it['about']['philosophyDetailed']['headline'] = "La Trasformazione Inizia da Dentro • Ritorna a Te Stesso"
it['about']['philosophyDetailed']['quote'] = "Non hai bisogno di essere aggiustato; hai solo bisogno di ricordare chi sei nel silenzio."
it['about']['philosophyDetailed']['text'] = "Un cammino autentico verso l'equilibrio comincia con l'ascolto attento di pensieri, emozioni, corpo e anima."
it['about']['differentiators']['tag'] = "PERCHÉ SCEGLIERE IL DR. MAYANK"
it['about']['goal']['heading'] = "La Nostra Meta"
it['about']['goal']['keywords'] = "Calma • Benessere • Equilibrio • Armonia • Pienezza"
it['stillness']['pressToBegin'] = "Clicca per iniziare"
it['stillness']['restartCircle'] = "Ricomincia il cerchio"
it['faq']['reachOut'] = "Hai una domanda specifica? Contattaci con fiducia."

# Apply to ES
es['about']['dualLens'] = aboutDualLens_es
es['about']['protocolPresets'] = aboutProtocolPresets_es
es['about']['ui'] = { **es['about'].get('ui', {}), **aboutUiLabels_es }
es['about']['chapters'] = aboutChapters_es
es['about']['medicalBackground']['tag'] = "TRAYECTORIA CIENTÍFICA Y MÉDICA"
es['about']['medicalBackground']['text'] = "Formado como Doctor en Medicina, el Dr. Mayank enfoca el bienestar uniendo el rigor biológico con la comprensión integral del ser humano."
es['about']['spiritualJourney']['tag'] = "15+ AÑOS DE PRÁCTICA COMPROMETIDA"
es['about']['spiritualJourney']['text'] = "El camino interior del Dr. Mayank comenzó hace más de 15 años, adentrándose en el silencio meditativo y el equilibrio energético sutil."
es['about']['philosophyDetailed']['tag'] = "FILOSOFÍA FUNDAMENTAL"
es['about']['philosophyDetailed']['headline'] = "La Transformación Comienza en el Interior • Vuelve a Ti Mismo"
es['about']['philosophyDetailed']['quote'] = "No necesitas ser reparado; solo necesitas recordar quién eres en la quietud."
es['about']['philosophyDetailed']['text'] = "Un viaje significativo hacia el equilibrio se inicia con la atención plena a los pensamientos, emociones, cuerpo y espíritu."
es['about']['differentiators']['tag'] = "POR QUÉ TRABAJAR CON EL DR. MAYANK"
es['about']['goal']['heading'] = "Nuestro Propósito"
es['about']['goal']['keywords'] = "Calma • Bienestar • Equilibrio • Armonía • Plenitud"
es['stillness']['pressToBegin'] = "Presiona para comenzar"
es['stillness']['restartCircle'] = "Reiniciar círculo"
es['faq']['reachOut'] = "¿Tienes alguna consulta particular? Escríbenos con total confianza."

with open(os.path.join(content_dir, 'it.json'), 'w', encoding='utf-8') as f:
    json.dump(it, f, ensure_ascii=False, indent=2)
print("[OK] Saved full Italian details")

with open(os.path.join(content_dir, 'es.json'), 'w', encoding='utf-8') as f:
    json.dump(es, f, ensure_ascii=False, indent=2)
print("[OK] Saved full Spanish details")
