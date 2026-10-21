const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '..', 'content');

// Read existing JSON files
const en = JSON.parse(fs.readFileSync(path.join(contentDir, 'en.json'), 'utf-8'));
const de = JSON.parse(fs.readFileSync(path.join(contentDir, 'de.json'), 'utf-8'));
const fr = JSON.parse(fs.readFileSync(path.join(contentDir, 'fr.json'), 'utf-8'));
const ro = JSON.parse(fs.readFileSync(path.join(contentDir, 'ro.json'), 'utf-8'));
const ru = JSON.parse(fs.readFileSync(path.join(contentDir, 'ru.json'), 'utf-8'));

// 1. NAV additions
const navAdditions = {
  en: { faq: 'FAQ', testimonials: 'Testimonials' },
  de: { faq: 'Häufige Fragen', testimonials: 'Erfahrungsberichte' },
  fr: { faq: 'FAQ', testimonials: 'Témoignages' },
  ro: { faq: 'Întrebări Frecvente', testimonials: 'Mărturii' },
  ru: { faq: 'Частые Вопросы', testimonials: 'Отзывы' }
};

// 2. HERO additions
const heroAdditions = {
  en: {
    floatingMedicalTitle: 'Doctor of Medicine',
    floatingMedicalSubtitle: 'Science & Mindfulness',
    floatingMasteryTitle: '15+ Years Mastery',
    floatingMasterySubtitle: '10,000+ Meditative Hours',
    authorityTag: 'Mind-Body Sanctuary'
  },
  de: {
    floatingMedicalTitle: 'Doktor der Medizin',
    floatingMedicalSubtitle: 'Wissenschaft & Achtsamkeit',
    floatingMasteryTitle: '15+ Jahre Meisterschaft',
    floatingMasterySubtitle: '10.000+ Meditationsstunden',
    authorityTag: 'Geist-Körper-Refugium'
  },
  fr: {
    floatingMedicalTitle: 'Docteur en Médecine',
    floatingMedicalSubtitle: 'Science & Pleine Conscience',
    floatingMasteryTitle: '15+ Ans de Maîtrise',
    floatingMasterySubtitle: '10 000+ Heures de Méditation',
    authorityTag: 'Sanctuaire Corps-Esprit'
  },
  ro: {
    floatingMedicalTitle: 'Doctor în Medicină',
    floatingMedicalSubtitle: 'Știință & Mindfulness',
    floatingMasteryTitle: '15+ Ani de Măiestrie',
    floatingMasterySubtitle: '10.000+ Ore de Meditație',
    authorityTag: 'Sanctuar Minte-Corp'
  },
  ru: {
    floatingMedicalTitle: 'Доктор Медицины',
    floatingMedicalSubtitle: 'Наука и Осознанность',
    floatingMasteryTitle: '15+ Лет Мастерства',
    floatingMasterySubtitle: '10 000+ Часов Медитации',
    authorityTag: 'Святилище Разума и Тела'
  }
};

// 3. PAUSE additions
const pauseAdditions = {
  en: {
    eyebrow: 'A PAUSE. A BREATH. A RETURN.',
    quoteLine1: 'Sometimes the first step',
    quoteLine2: 'forward',
    quoteLine3: 'is simply learning to be',
    quoteGold: 'still.',
    scrollText: 'SCROLL TO BREATHE'
  },
  de: {
    eyebrow: 'EIN INNEHALTEN. EIN ATEMZUG. EIN HEIMKEHREN.',
    quoteLine1: 'Manchmal ist der erste Schritt',
    quoteLine2: 'nach vorn',
    quoteLine3: 'einfach zu lernen, ganz',
    quoteGold: 'still zu sein.',
    scrollText: 'SCROLLEN ZUM ATMEN'
  },
  fr: {
    eyebrow: 'UNE PAUSE. UN SOUFFLE. UN RETOUR.',
    quoteLine1: 'Parfois, le premier pas',
    quoteLine2: 'en avant',
    quoteLine3: 'consiste simplement à apprendre à être',
    quoteGold: 'paisible.',
    scrollText: 'FAITES DÉFILER POUR RESPIRER'
  },
  ro: {
    eyebrow: 'O PAUZĂ. O RESPIRAȚIE. O ÎNTOARCERE.',
    quoteLine1: 'Uneori, primul pas',
    quoteLine2: 'înainte',
    quoteLine3: 'este pur și simplu să înveți să fii',
    quoteGold: 'în liniște.',
    scrollText: 'DERULAȚI PENTRU A RESPIRA'
  },
  ru: {
    eyebrow: 'ПАУЗА. ДЫХАНИЕ. ВОЗВРАЩЕНИЕ.',
    quoteLine1: 'Иногда первый шаг',
    quoteLine2: 'вперёд',
    quoteLine3: 'это просто умение пребывать в',
    quoteGold: 'тишине.',
    scrollText: 'ПРОКРУТИТЕ, ЧТОБЫ ДЫШАТЬ'
  }
};

// 4. WELLNESS additions
const wellnessAdditions = {
  en: {
    tag: 'FOUNDATIONAL PHILOSOPHY',
    headline: 'The 5 Pillars of Wholeness',
    subtitle: 'A complete sanctuary approach harmonizing the mind, clear thinking, emotional ease, and inner growth.',
    alignedServices: 'Aligned Practices'
  },
  de: {
    tag: 'GRUNDLEGENDE PHILOSOPHIE',
    headline: 'Die 5 Säulen der Ganzheit',
    subtitle: 'Ein ganzheitlicher Ansatz, der Geist, klares Denken, emotionale Leichtigkeit und inneres Wachstum harmonisiert.',
    alignedServices: 'Abgestimmte Praktiken'
  },
  fr: {
    tag: 'PHILOSOPHIE FONDATRICE',
    headline: 'Les 5 Piliers de la Plénitude',
    subtitle: 'Une approche sanctuaire complète harmonisant l’esprit, la clarté mentale, l’aisance émotionnelle et la croissance intérieure.',
    alignedServices: 'Pratiques Associées'
  },
  ro: {
    tag: 'FILOSOFIE FUNDAMENTALĂ',
    headline: 'Cei 5 Piloni ai Întregirii',
    subtitle: 'O abordare completă de sanctuar care armonizează mintea, gândirea clară, liniștea emoțională și evoluția interioară.',
    alignedServices: 'Practici Conexe'
  },
  ru: {
    tag: 'ОСНОВОПОЛАГАЮЩАЯ ФИЛОСОФИЯ',
    headline: '5 Столпов Целостности',
    subtitle: 'Целостный подход святилища, гармонизирующий разум, ясное мышление, эмоциональный покой и внутренний рост.',
    alignedServices: 'Связанные Практики'
  }
};

// 5. NOT FOUND additions
const notFoundAdditions = {
  en: {
    tag: '404 • TRANQUIL DETOUR',
    title: 'Return to Center',
    subtitle: 'The path you sought has gently dissolved, but the sanctuary remains open. Pause, take a conscious breath, and return to the beginning.',
    cta: 'Return to Sanctuary Home'
  },
  de: {
    tag: '404 • HEILSAMER UMWEG',
    title: 'Zurück zur Mitte',
    subtitle: 'Der gesuchte Pfad hat sich sanft aufgelöst, doch das Refugium bleibt offen. Halten Sie inne, atmen Sie bewusst und kehren Sie zum Anfang zurück.',
    cta: 'Zurück zur Startseite'
  },
  fr: {
    tag: '404 • DÉTOUR PAISIBLE',
    title: 'Retour au Centre',
    subtitle: 'Le chemin recherché s’est doucement dissipé, mais le sanctuaire demeure ouvert. Faites une pause, respirez consciemment et revenez au départ.',
    cta: 'Retour à l’Accueil du Sanctuaire'
  },
  ro: {
    tag: '404 • DEVIERE LINIȘTITĂ',
    title: 'Întoarcere în Centru',
    subtitle: 'Calea căutată s-a dizolvat lin, dar sanctuarul rămâne deschis. Oprește-te, respiră conștient și revino la început.',
    cta: 'Înapoi la Pagina Principală'
  },
  ru: {
    tag: '404 • СПОКОЙНЫЙ ОБХОД',
    title: 'Возвращение к Центру',
    subtitle: 'Искомый путь мягко растворился, но святилище всегда открыто. Сделайте паузу, осознанный вдох и вернитесь к началу.',
    cta: 'Вернуться на Главную'
  }
};

// 6. FAQ additions
const faqAdditions = {
  en: { reachOut: 'Have a personal question not covered here? Reach out directly.' },
  de: { reachOut: 'Haben Sie eine persönliche Frage, die hier nicht beantwortet wurde? Schreiben Sie mir direkt.' },
  fr: { reachOut: 'Vous avez une question personnelle non traitée ici ? Contactez-moi directement.' },
  ro: { reachOut: 'Ai o întrebare personală care nu este inclusă aici? Contactează-mă direct.' },
  ru: { reachOut: 'У вас есть личный вопрос, не указанный здесь? Напишите напрямую.' }
};

// 7. GALLERY additions (viewMoment and empty text)
const galleryUiAdditions = {
  en: { viewMoment: 'View Moment', empty: 'No photos currently uploaded in this sanctuary collection.' },
  de: { viewMoment: 'Moment betrachten', empty: 'Derzeit keine Fotos in dieser Sammlung vorhanden.' },
  fr: { viewMoment: 'Voir le moment', empty: 'Aucune photo actuellement dans cette collection.' },
  ro: { viewMoment: 'Vezi momentul', empty: 'Nicio fotografie disponibilă momentan în această colecție.' },
  ru: { viewMoment: 'Смотреть момент', empty: 'В этой коллекции пока нет фотографий.' }
};

// 8. GALLERY CATEGORIES & IMAGES LOCALIZATION
const galleryLocalized = {
  en: {
    categories: [
      {
        id: 'cat_meditation',
        name: 'Meditation Sanctuary',
        slug: 'meditation-sanctuary',
        description: 'Moments of stillness, breathwork, and deep contemplative practice.',
        order: 1,
        visible: true,
        showOnHomepage: true,
        images: [
          {
            id: 'img_1788640274869',
            url: '/images/gallery/1788640274831_20190706_111832.jpg',
            title: 'Sacred Sanctuary Atmosphere',
            reflection: 'Stillness begins when the analytical mind settles into the quiet stillness of the heart.',
            order: 1,
            visible: true,
            aspectRatio: '4:3'
          }
        ]
      },
      {
        id: 'cat_retreats',
        name: 'Retreat Experiences',
        slug: 'retreat-experiences',
        description: 'Immersive sanctuary atmospheres cultivating inner clarity, biofield renewal, and serenity.',
        order: 2,
        visible: true,
        showOnHomepage: true,
        images: [
          {
            id: 'img_r1',
            url: '/meditation-hero.png',
            title: 'Sacred Sanctuary Atmosphere',
            reflection: 'True grounding restores natural equilibrium across mind, body, and spirit.',
            order: 1,
            visible: true,
            aspectRatio: '4:3'
          },
          {
            id: 'img_r2',
            url: '/meditation-hero.png',
            title: 'Evening Silence & Grounding',
            reflection: 'Entering restorative quietude enables natural cellular recovery.',
            order: 2,
            visible: true,
            aspectRatio: '4:3'
          }
        ]
      }
    ]
  },
  de: {
    categories: [
      {
        id: 'cat_meditation',
        name: 'Meditations-Refugium',
        slug: 'meditations-refugium',
        description: 'Momente der Stille, Atemarbeit und tiefen kontemplativen Praxis.',
        order: 1,
        visible: true,
        showOnHomepage: true,
        images: [
          {
            id: 'img_1788640274869',
            url: '/images/gallery/1788640274831_20190706_111832.jpg',
            title: 'Heilsame Raum-Atmosphäre',
            reflection: 'Stille beginnt in dem Moment, in dem der analytische Verstand in der Ruhe des Herzens ankommt.',
            order: 1,
            visible: true,
            aspectRatio: '4:3'
          }
        ]
      },
      {
        id: 'cat_retreats',
        name: 'Retreat-Erfahrungen',
        slug: 'retreat-erfahrungen',
        description: 'Vertiefende Erfahrungen, die innere Klarheit, feine Energie-Erneuerung und Gelassenheit schenken.',
        order: 2,
        visible: true,
        showOnHomepage: true,
        images: [
          {
            id: 'img_r1',
            url: '/meditation-hero.png',
            title: 'Heilsame Raum-Atmosphäre',
            reflection: 'Wahre Erdung stellt das natürliche Gleichgewicht von Geist, Körper und Seele wieder her.',
            order: 1,
            visible: true,
            aspectRatio: '4:3'
          },
          {
            id: 'img_r2',
            url: '/meditation-hero.png',
            title: 'Abendliche Stille & Erdung',
            reflection: 'Das Eintreten in heilsame Ruhe ermöglicht natürliche zelluläre Erholung.',
            order: 2,
            visible: true,
            aspectRatio: '4:3'
          }
        ]
      }
    ]
  },
  fr: {
    categories: [
      {
        id: 'cat_meditation',
        name: 'Sanctuaire de Méditation',
        slug: 'sanctuaire-meditation',
        description: 'Moments de silence, travail du souffle et pratique contemplative profonde.',
        order: 1,
        visible: true,
        showOnHomepage: true,
        images: [
          {
            id: 'img_1788640274869',
            url: '/images/gallery/1788640274831_20190706_111832.jpg',
            title: 'Atmosphère de Sanctuaire Sacré',
            reflection: 'Le silence commence lorsque l’esprit analytique s’établit dans la quiétude du cœur.',
            order: 1,
            visible: true,
            aspectRatio: '4:3'
          }
        ]
      },
      {
        id: 'cat_retreats',
        name: 'Expériences de Retraite',
        slug: 'experiences-retraite',
        description: 'Immersion bienfaisante cultivant la clarté intérieure, le renouveau énergétique et la sérénité.',
        order: 2,
        visible: true,
        showOnHomepage: true,
        images: [
          {
            id: 'img_r1',
            url: '/meditation-hero.png',
            title: 'Atmosphère de Sanctuaire Sacré',
            reflection: 'Un véritable ancrage rétablit l’équilibre naturel entre esprit, corps et âme.',
            order: 1,
            visible: true,
            aspectRatio: '4:3'
          },
          {
            id: 'img_r2',
            url: '/meditation-hero.png',
            title: 'Silence du Soir & Ancrage',
            reflection: 'Entrer dans un calme réparateur favorise la régénération cellulaire naturelle.',
            order: 2,
            visible: true,
            aspectRatio: '4:3'
          }
        ]
      }
    ]
  },
  ro: {
    categories: [
      {
        id: 'cat_meditation',
        name: 'Sanctuar de Meditație',
        slug: 'sanctuar-meditatie',
        description: 'Momente de liniște, respirație conștientă și practică contemplativă profundă.',
        order: 1,
        visible: true,
        showOnHomepage: true,
        images: [
          {
            id: 'img_1788640274869',
            url: '/images/gallery/1788640274831_20190706_111832.jpg',
            title: 'Atmosferă Sacră de Sanctuar',
            reflection: 'Liniștea începe atunci când mintea analitică se așază în calmul inimii.',
            order: 1,
            visible: true,
            aspectRatio: '4:3'
          }
        ]
      },
      {
        id: 'cat_retreats',
        name: 'Experiențe de Retragere',
        slug: 'experiente-retragere',
        description: 'Atmosfere imersive de sanctuar care cultivă claritatea interioară, reînnoirea energetică și seninătatea.',
        order: 2,
        visible: true,
        showOnHomepage: true,
        images: [
          {
            id: 'img_r1',
            url: '/meditation-hero.png',
            title: 'Atmosferă Sacră de Sanctuar',
            reflection: 'O împământare veritabilă restabilește echilibrul natural între minte, corp și spirit.',
            order: 1,
            visible: true,
            aspectRatio: '4:3'
          },
          {
            id: 'img_r2',
            url: '/meditation-hero.png',
            title: 'Tăcere de Seară & Împământare',
            reflection: 'Intrarea într-un calm profund facilitează refacerea celulară naturală.',
            order: 2,
            visible: true,
            aspectRatio: '4:3'
          }
        ]
      }
    ]
  },
  ru: {
    categories: [
      {
        id: 'cat_meditation',
        name: 'Обитель Медитации',
        slug: 'obitel-meditatsii',
        description: 'Моменты тишины, дыхательных практик и глубокого созерцательного покоя.',
        order: 1,
        visible: true,
        showOnHomepage: true,
        images: [
          {
            id: 'img_1788640274869',
            url: '/images/gallery/1788640274831_20190706_111832.jpg',
            title: 'Атмосфера Святилища',
            reflection: 'Тишина наступает, когда аналитический ум растворяется в спокойствии сердца.',
            order: 1,
            visible: true,
            aspectRatio: '4:3'
          }
        ]
      },
      {
        id: 'cat_retreats',
        name: 'Опыт Ретритов',
        slug: 'opyt-retritov',
        description: 'Погружающая атмосфера святилища, пробуждающая ясность, обновление энергии и безмятежность.',
        order: 2,
        visible: true,
        showOnHomepage: true,
        images: [
          {
            id: 'img_r1',
            url: '/meditation-hero.png',
            title: 'Атмосфера Святилища',
            reflection: 'Истинное заземление восстанавливает естественное равновесие разума, тела и духа.',
            order: 1,
            visible: true,
            aspectRatio: '4:3'
          },
          {
            id: 'img_r2',
            url: '/meditation-hero.png',
            title: 'Вечерняя Тишина и Заземление',
            reflection: 'Погружение в целебный покой способствует естественному клеточному восстановлению.',
            order: 2,
            visible: true,
            aspectRatio: '4:3'
          }
        ]
      }
    ]
  }
};

// 9. THREE PILLARS JOURNEY
const threePillarsData = {
  en: {
    tag: 'THE CONCEPTUAL FOUNDATION',
    mainHeading: 'Three perspectives. One whole person.',
    formulaHeadline: 'Meditation × Science × Holistic Wellness',
    subHeading: 'Meditation provides practice. Science provides understanding. Holistic wellness provides deeper connection and meaning. Together, they create a complete approach to human well-being.',
    completeJourney: 'The Complete Journey',
    pillars: [
      {
        id: 'meditation',
        num: '01',
        label: 'MEDITATION',
        tag: 'THE MINDFUL PRACTICE',
        action: 'Experience yourself.',
        principle: 'Meditation provides practice.',
        quote: 'Awareness turns understanding into a lived practice.',
        details: 'Simple breathing exercises, guided quiet time, and learning to pause. Intellectual understanding transforms into real peace, physical relaxation, and renewed energy.',
        pills: ['Mindful Breathing', 'Natural Relaxation', 'Present Awareness', 'Quiet Space']
      },
      {
        id: 'science',
        num: '02',
        label: 'SCIENCE',
        tag: 'THE GROUNDED UNDERSTANDING',
        action: 'Understand yourself.',
        principle: 'Science provides understanding.',
        quote: 'Understanding the human system gives us a foundation for meaningful change.',
        details: 'A clear look at how stress, breathing, and daily habits impact the body and mind. We focus on real, practical understanding so you know exactly why you feel the way you do.',
        pills: ['Mind-Body Connection', 'Stress Relief', 'Calm Breathing', 'Gentle Guidance']
      },
      {
        id: 'spirituality',
        num: '03',
        label: 'HOLISTIC WELLNESS',
        tag: 'THE INNER HARMONY & MEANING',
        action: 'Connect with yourself.',
        principle: 'Holistic wellness provides deeper connection and meaning.',
        quote: 'Inner connection brings meaning, balance and a deeper sense of well-being.',
        details: 'Gentle energy alignment, calming sound resonance, and clear inner peace. Reconnecting with who you are beyond busy schedules, daily roles, and expectations.',
        pills: ['Energy Alignment', 'Calming Sound', 'Inner Clarity', 'Wholeness of Being']
      }
    ]
  },
  de: {
    tag: 'DAS KONZEPTIONELLE FUNDAMENT',
    mainHeading: 'Drei Perspektiven. Ein ganzer Mensch.',
    formulaHeadline: 'Meditation × Wissenschaft × Ganzheitliches Wohlbefinden',
    subHeading: 'Meditation schenkt gelebte Praxis. Wissenschaft schenkt klares Verstehen. Ganzheitliches Wohlbefinden schenkt tiefere Verbundenheit und Sinn. Zusammen bilden sie einen vollkommenen Weg.',
    completeJourney: 'Die Ganze Reise',
    pillars: [
      {
        id: 'meditation',
        num: '01',
        label: 'MEDITATION',
        tag: 'DIE ACHTSAME PRAXIS',
        action: 'Sich selbst erfahren.',
        principle: 'Meditation schenkt gelebte Praxis.',
        quote: 'Achtsamkeit verwandelt Verstehen in gelebte Erfahrung.',
        details: 'Sanfte Atemübungen, geführte Momente der Stille und das heilsame Innehalten. Gedankliches Verstehen wandelt sich in echten Frieden und körperliche Entlastung.',
        pills: ['Achtsames Atmen', 'Natürliche Entspannung', 'Gegenwärtigkeit', 'Stiller Raum']
      },
      {
        id: 'science',
        num: '02',
        label: 'WISSENSCHAFT',
        tag: 'DAS FUNDIERTE VERSTEHEN',
        action: 'Sich selbst verstehen.',
        principle: 'Wissenschaft schenkt klares Verstehen.',
        quote: 'Das Verstehen unseres Nervensystems schafft das Fundament für echte Veränderung.',
        details: 'Ein fundierter Blick darauf, wie Stress, Atmung und Gewohnheiten auf Körper und Geist wirken. Für Klarheit darüber, warum Sie sich so fühlen, wie Sie sich fühlen.',
        pills: ['Geist-Körper-Einheit', 'Stressentlastung', 'Ruhiger Atem', 'Sanfte Begleitung']
      },
      {
        id: 'spirituality',
        num: '03',
        label: 'GANZHEITLICHES WOHLBEFINDEN',
        tag: 'INNERE HARMONIE & SINN',
        action: 'Sich mit sich verbinden.',
        principle: 'Ganzheitliches Wohlbefinden schenkt tiefere Verbundenheit.',
        quote: 'Innere Verbundenheit schenkt Sinn, Ausgeglichenheit und tiefen Seelenfrieden.',
        details: 'Sanfter Energieausgleich, beruhigende Klangresonanz und innere Klarheit. Die Wiederverbindung mit Ihrem Wesen jenseits von Alltagsrollen und Leistungsdruck.',
        pills: ['Energieausgleich', 'Heilsamer Klang', 'Innere Klarheit', 'Ganzheit des Seins']
      }
    ]
  },
  fr: {
    tag: 'LE FONDEMENT CONCEPTUEL',
    mainHeading: 'Trois perspectives. Une personne entière.',
    formulaHeadline: 'Méditation × Science × Bien-être Holistique',
    subHeading: 'La méditation offre la pratique. La science apporte la compréhension. Le bien-être holistique offre une connexion profonde et du sens. Ensemble, ils créent une harmonie complète.',
    completeJourney: 'Le Voyage Complet',
    pillars: [
      {
        id: 'meditation',
        num: '01',
        label: 'MÉDITATION',
        tag: 'LA PRATIQUE ATTENTIVE',
        action: 'Faites l’expérience de vous-même.',
        principle: 'La méditation offre la pratique vécue.',
        quote: 'La pleine conscience transforme la compréhension en une pratique vécue.',
        details: 'Exercices de respiration simples, temps de calme guidé et art de la pause. La compréhension devient paix authentique, détente physique et énergie renouvelée.',
        pills: ['Respiration Consciente', 'Détente Naturelle', 'Présence', 'Espace Paisible']
      },
      {
        id: 'science',
        num: '02',
        label: 'SCIENCE',
        tag: 'LA COMPRÉHENSION ANCRÉE',
        action: 'Comprenez-vous vous-même.',
        principle: 'La science apporte la compréhension.',
        quote: 'Comprendre le système humain nous donne le fondement pour un changement durable.',
        details: 'Un regard clair sur l’impact du stress, de la respiration et du rythme de vie sur le corps et l’esprit, pour comprendre précisément vos sensations.',
        pills: ['Connexion Corps-Esprit', 'Soulagement du Stress', 'Souffle Calme', 'Guidance Douce']
      },
      {
        id: 'spirituality',
        num: '03',
        label: 'BIEN-ÊTRE HOLISTIQUE',
        tag: 'HARMONIE INTÉRIEURE & SENS',
        action: 'Connectez-vous à vous-même.',
        principle: 'Le bien-être holistique apporte profondeur et sens.',
        quote: 'La connexion intérieure apporte du sens, de l’équilibre et une plénitude durable.',
        details: 'Harmonisation énergétique subtile, résonance sonore apaisante et paix intérieure. Retrouvez qui vous êtes au-delà des emplois du temps chargés et des attentes.',
        pills: ['Alignement Énergétique', 'Sons Apaisants', 'Clarté Intérieure', 'Plénitude d’Être']
      }
    ]
  },
  ro: {
    tag: 'FUNDAȚIA CONCEPTUALĂ',
    mainHeading: 'Trei perspective. O ființă completă.',
    formulaHeadline: 'Meditație × Știință × Bunăstare Holistică',
    subHeading: 'Meditația oferă practica. Știința oferă înțelegerea. Bunăstarea holistică oferă conexiune profundă și sens. Împreună, creează o armonie desăvârșită.',
    completeJourney: 'Călătoria Completă',
    pillars: [
      {
        id: 'meditation',
        num: '01',
        label: 'MEDITAȚIE',
        tag: 'PRACTICA CONȘTIENTĂ',
        action: 'Experimentează-te pe tine.',
        principle: 'Meditația oferă practica trăită.',
        quote: 'Conștientizarea transformă înțelegerea într-o practică vie.',
        details: 'Exerciții simple de respirație, momente ghidate de liniște și arta pauzei. Înțelegerea intelectuală se transformă în pace autentică și relaxare profundă.',
        pills: ['Respirație Conștientă', 'Relaxare Naturală', 'Prezență', 'Spațiu de Liniște']
      },
      {
        id: 'science',
        num: '02',
        label: 'ȘTIINȚĂ',
        tag: 'ÎNȚELEGEREA FUNDAMENTATĂ',
        action: 'Înțelege-te pe tine.',
        principle: 'Știința oferă înțelegerea clară.',
        quote: 'Înțelegerea sistemului uman ne oferă fundamentul pentru o transformare reală.',
        details: 'O privire clară asupra modului în care stresul, respirația și obiceiurile zilnice influențează corpul și mintea, pentru a înțelege exact starea ta.',
        pills: ['Conexiune Minte-Corp', 'Eliberare de Stres', 'Respirație Calmă', 'Ghidare Blândă']
      },
      {
        id: 'spirituality',
        num: '03',
        label: 'BUNĂSTARE HOLISTICĂ',
        tag: 'ARMONIE INTERIOARĂ & SENS',
        action: 'Conectează-te cu tine.',
        principle: 'Bunăstarea holistică aduce conexiune profundă și sens.',
        quote: 'Conexiunea interioară aduce sens, echilibru și o stare profundă de bine.',
        details: 'Armonizare energetică blândă, rezonanță sonoră liniștitoare și claritate interioară. Reconectarea cu cine ești dincolo de roluri și așteptări cotidiene.',
        pills: ['Aliniere Energetică', 'Sunet Liniștitor', 'Claritate Interioară', 'Întregirea Ființei']
      }
    ]
  },
  ru: {
    tag: 'КОНЦЕПТУАЛЬНЫЙ ФУНДАМЕНТ',
    mainHeading: 'Три грани. Одна целостная личность.',
    formulaHeadline: 'Медитация × Наука × Целостное Благополучие',
    subHeading: 'Медитация даёт живую практику. Наука даёт ясное понимание. Целостное благополучие дарит глубинную связь и смысл. Вместе они создают совершенный путь.',
    completeJourney: 'Полный Путь',
    pillars: [
      {
        id: 'meditation',
        num: '01',
        label: 'МЕДИТАЦИЯ',
        tag: 'ОСОЗНАННАЯ ПРАКТИКА',
        action: 'Почувствуйте себя.',
        principle: 'Медитация даёт живую практику.',
        quote: 'Осознанность превращает теорию в проживаемый опыт покоя.',
        details: 'Простые дыхательные практики, бережная тишина и умение останавливаться. Ментальное понимание переходит в физическое расслабление и прилив сил.',
        pills: ['Осознанное Дыхание', 'Естественный Покой', 'Присутствие', 'Тихое Пространство']
      },
      {
        id: 'science',
        num: '02',
        label: 'НАУКА',
        tag: 'ЯСНОЕ ПОНИМАНИЕ',
        action: 'Поймите себя.',
        principle: 'Наука даёт ясное понимание.',
        quote: 'Понимание законов нервной системы даёт надёжную опору для изменений.',
        details: 'Ясный взгляд на то, как стресс, ритм дыхания и образ жизни влияют на тело и мозг. Вы точно поймёте причины своих состояний и пути их исцеления.',
        pills: ['Связь Мозга и Тела', 'Снятие Стресса', 'Глубокий Вдох', 'Мягкое Ведение']
      },
      {
        id: 'spirituality',
        num: '03',
        label: 'ЦЕЛОСТНОЕ БЛАГОПОЛУЧИЕ',
        tag: 'ГАРМОНИЯ И СМЫСЛ',
        action: 'Соединитесь с собой.',
        principle: 'Целостное благополучие дарит глубину и смысл.',
        quote: 'Внутренняя связь приносит смысл, душевный баланс и наполненность.',
        details: 'Мягкое выравнивание тонких энергий, целительные звуковые вибрации и безмолвие. Возвращение к своей сути за пределами суеты и ожиданий.',
        pills: ['Баланс Энергии', 'Звуковые Вибрации', 'Внутренняя Ясность', 'Целостность Души']
      }
    ]
  }
};

// 10. ABOUT PREVIEW (Home page section)
const aboutPreviewData = {
  en: {
    tabs: {
      clinical: '🌱 Learning Foundations',
      meditation: '🧘 Mindful Practice',
      symbiosis: '🌿 The Harmony Plan'
    },
    programTabs: {
      clinical: {
        tag: 'PRACTICAL SCIENCE & UNDERSTANDING',
        title: 'Doctor of Medicine (M.D.)',
        subtitle: 'Clear Understanding of Mind, Brain & Body',
        body: 'Dr. Mayank brings a grounded scientific foundation, helping you understand how thoughts, stress, and daily habits directly affect the body. Every session is rooted in safety, clarity, and practical knowledge.',
        features: [
          { title: 'Evidence-based guidance', subtitle: 'Grounded in real science and practical mind-body wellness' },
          { title: 'Mind–body connection', subtitle: 'Connecting mental clarity with natural physical relaxation' },
          { title: 'Learn at your own pace', subtitle: 'Personalized guidance tailored around your daily schedule' }
        ],
        buttonText: 'Explore My Approach →',
        floatingBadge: '🎓 Clear understanding. Meaningful growth.'
      },
      meditation: {
        tag: 'MEDITATION & MINDFULNESS',
        title: 'Meditation Master & Mentor',
        subtitle: '15+ Years of Dedicated Mind Training',
        body: 'Going beyond quick fixes to share timeless meditation techniques, calming breath awareness, and deep inner stillness learned through 15+ years of dedicated practice.',
        features: [
          { title: 'Authentic Meditation', subtitle: 'Proven breathwork, mindfulness, and quiet contemplation' },
          { title: 'Natural Calm Reflex', subtitle: 'Encouraging your body’s natural relaxation response' },
          { title: 'Deep Mental Stillness', subtitle: 'Gently quieting repetitive stress and racing thoughts' }
        ],
        buttonText: 'Explore Meditation Sessions →',
        floatingBadge: '✨ Awaken awareness. Quiet your mind.'
      },
      symbiosis: {
        tag: 'INTEGRATIVE WELLNESS',
        title: 'The Harmony Plan',
        subtitle: 'Harmonizing Mind, Body & Personal Energy',
        body: 'Bringing together clear scientific understanding and gentle energy practices. A personalized 1:1 journey that helps ease physical tiredness, emotional stress, and personal burnout.',
        features: [
          { title: 'Personal Wellness Map', subtitle: 'Understanding your unique stress patterns and energy flow' },
          { title: 'Releasing Everyday Tension', subtitle: 'Letting go of built-up pressure and physical stiffness' },
          { title: 'Lasting Independence', subtitle: 'Lifelong emotional autonomy connected to lifestyle and regular practice.' }
        ],
        buttonText: 'Explore The Harmony Plan →',
        floatingBadge: '🌿 Restore energy. Experience harmony.'
      }
    },
    explorer: {
      tag: 'INTERACTIVE EXPERIENCE EXPLORER',
      title: 'What Are You Feeling Right Now?',
      subtitle: 'Select what you are experiencing below to see how practical understanding and mindful practices come together to bring balance.',
      calloutTitle: 'Not sure where to start?',
      calloutDesc: 'Choose what you are feeling to see how clear understanding and mindful practices help you feel better.',
      commonExperiences: 'COMMON EXPERIENCES',
      ourApproach: 'OUR APPROACH',
      explorePath: 'Explore This Path →'
    },
    symptoms: {
      insomnia: {
        label: 'Restful Sleep',
        title: 'Restful Sleep & Calm Evenings',
        italicPremise: 'Better sleep habits. Natural relaxation. Refreshed daily energy.',
        paragraph: 'Busy days, late screens, and non-stop thoughts can leave you feeling restless at night. We guide mind and body into gentle, soothing rest with relaxing evening routines, calming breath, and peaceful bedroom habits.',
        checkmarks: [
          'Promotes deep, uninterrupted restorative sleep',
          'Calms evening racing thoughts and physical restlessness',
          'Builds soothing, sustainable pre-sleep rituals',
          'Restores natural sleep rhythms and helps you wake refreshed'
        ],
        experiences: ['Restless nights', 'Difficulty falling asleep', 'Racing bedtime thoughts', 'Morning exhaustion', 'Fragmented sleep', 'Daytime energy dips'],
        approaches: [
          { title: 'Evening Rhythm', desc: 'Calming wind-down protocols that prepare mind and body for sleep.' },
          { title: 'Gentle Pranayama', desc: 'Soothing breathing to quiet the body and mind naturally.' },
          { title: 'Restorative Stillness', desc: 'Guided relaxation to unwind physical tension before sleep.' }
        ]
      },
      female: {
        label: "Women's Wellness",
        title: 'Self-Care, Balance & Vibrant Confidence',
        italicPremise: 'Nurture your rhythm. Reclaim confidence. Radiate inner balance.',
        paragraph: 'A compassionate, holistic approach supporting female vitality, emotional harmony, and grounded routines for lasting health, self-care, and radiant everyday wellbeing.',
        checkmarks: [
          'Cultivates emotional equilibrium and grounded inner strength',
          'Nourishes daily self-care habits and sustainable vitality',
          'Supports healthy natural routines and emotional ease',
          'Reclaims joyful confidence and everyday wellbeing'
        ],
        experiences: ['Emotional fatigue', 'Juggling multiple roles', 'Subtle hormonal stress', 'Low personal time', 'Sensory overwhelm', 'Loss of vibrancy'],
        approaches: [
          { title: 'Mindful Self-Care', desc: 'Bespoke daily routines honoring natural rhythms and boundaries.' },
          { title: 'Emotional Balance', desc: 'Gentle mindfulness practices for lasting inner calm.' },
          { title: 'Vibrant Harmony', desc: 'Nourishing holistic practices to sustain everyday energy.' }
        ]
      },
      teen: {
        label: 'Teen Wellbeing',
        title: 'Managing School Pressure & Screen Overload',
        italicPremise: 'Ease academic stress. Unplug overload. Build true confidence.',
        paragraph: 'Guiding adolescents to navigate school expectations, digital overload, and emotional stress through mindful downtime, healthy sleep boundaries, and balanced routines.',
        checkmarks: [
          'Relieves academic stress and performance pressure',
          'Restores healthy boundaries with screens and social media',
          'Builds authentic self-confidence and emotional resilience',
          'Protects restful sleep, restorative breaks, and social balance'
        ],
        experiences: ['Exam stress & pressure', 'Screen fatigue & late browsing', 'Emotional overwhelm', 'Loss of motivation', 'Chronic exhaustion', 'Worry about the future'],
        approaches: [
          { title: 'Pressure Relief', desc: 'Practical tools to navigate study demands without burning out.' },
          { title: 'Digital Reset', desc: 'Healthy breaks from screen overload to restore mental clarity.' },
          { title: 'Inner Grounding', desc: 'Building self-worth, emotional balance, and genuine confidence.' }
        ]
      },
      corporate: {
        label: 'Workplace Wellness',
        title: 'Workplace Calm & Corporate Stress',
        italicPremise: 'A calmer you. A brighter workday. Emotional balance & workplace ease.',
        paragraph: 'Guiding executives, leaders, and working professionals to navigate demanding workdays, decision fatigue, and high expectations through practical 5-minute stress resets, clear boundaries, and grounded focus.',
        checkmarks: [
          'Eases deadline pressure, screen fatigue, and workday overwhelm',
          'Builds practical 5-minute micro-habits to stay calm during busy days',
          'Creates healthy, guilt-free boundaries between work and personal life',
          'Protects daily mental focus, clear thinking, and peaceful evenings'
        ],
        experiences: ['Back-to-back meetings', 'Decision fatigue', 'Constant screen time', 'Deadline pressure', 'Difficulty switching off', 'Sunday evening dread'],
        approaches: [
          { title: 'Workday Resets', desc: 'Simple 5-minute breathing and pause practices between demanding tasks.' },
          { title: 'Calm Focus', desc: 'Grounding habits to clear mental clutter and make steady decisions.' },
          { title: 'Evening Boundary', desc: 'Gentle wind-down habits to truly unplug from work and enjoy restful evenings.' }
        ]
      },
      subtle: {
        label: 'Inner Balance',
        title: 'Energy Flow & Inner Peace',
        italicPremise: 'Balance the nadis. Align the chakras. Awaken inner stillness.',
        paragraph: 'Connecting with your natural energy flow—balancing active and restful energies and harmonizing the 7 chakras for grounded peace and self-awareness.',
        checkmarks: [
          'Balances active and restful inner energy flow',
          'Restores energetic alignment through the 7 chakras',
          'Clears subtle energetic blocks for effortless meditation',
          'Brings lasting integration of physical vitality and inner peace'
        ],
        experiences: ['Desire for deep stillness', 'Meditation plateaus', 'Energetic imbalance', 'Overactive mental chatter', 'Seeking inner alignment', 'Spiritual curiosity'],
        approaches: [
          { title: 'Chakra Alignment', desc: 'Guided contemplation to balance the 7 subtle energy centers.' },
          { title: 'Nadi Harmonization', desc: 'Equilibrating solar activity with lunar restorative calm.' },
          { title: 'Inner Realization', desc: 'Anchoring unshakeable presence in daily modern life.' }
        ]
      }
    },
    differentiators: {
      tag: 'WHY WORK WITH DR. MAYANK',
      title: 'The Multi-Disciplinary Approach',
      subtitle: 'Combining practical science, thoughtful understanding, and authentic meditation practices.',
      learnMore: 'Discover why it matters →',
      showLess: 'Show less ↑',
      items: [
        {
          tag: '🧠 Science + Meditation',
          title: 'The Dual Lens',
          body: 'Bringing science and meditation together for a deeper understanding of your wellbeing.',
          detail: 'Rarely do individuals find a trained doctor who deeply honors inner peace, or a meditation guide who understands how the human body works.'
        },
        {
          tag: '🌿 Grounded & Simple',
          title: 'Simple & Grounded',
          body: 'No complicated theories. Just practical, easy-to-follow guidance for everyday life.',
          detail: 'We honor your beliefs without imposing doctrine. Everything is gentle, practical, and grounded in real benefits you can feel.'
        },
        {
          tag: '💫 Personalised Care',
          title: 'Care Designed for You',
          body: 'Your journey is unique. Get guidance shaped around your needs, feelings, and goals.',
          detail: 'Whether you need calming breathwork, emotional ease, or quiet focus, the practices are individually tailored.'
        },
        {
          tag: '🌱 Lifelong Independence',
          title: 'Empowering Independence',
          body: 'Learn simple tools and habits you can continue using confidently on your own.',
          detail: 'You will graduate with a personalized sanctuary blueprint and daily practices that keep you centered regardless of external turmoil.'
        }
      ]
    }
  },
  de: {
    tabs: {
      clinical: '🌱 Wissenschaftliche Basis',
      meditation: '🧘 Achtsame Praxis',
      symbiosis: '🌿 Der Harmonie-Plan'
    },
    programTabs: {
      clinical: {
        tag: 'PRAKTISCHE WISSENSCHAFT & VERSTEHEN',
        title: 'Doktor der Medizin (M.D.)',
        subtitle: 'Klares Verständnis von Geist, Gehirn & Körper',
        body: 'Dr. Mayank verbindet ein fundiertes medizinisches Fundament mit der Praxis, damit Sie genau verstehen, wie Gedanken, Stress und Lebensgewohnheiten auf den Körper wirken. Jede Sitzung basiert auf Sicherheit, Klarheit und praktischem Wissen.',
        features: [
          { title: 'Wissenschaftlich fundiert', subtitle: 'Verankert in fundierter Wissenschaft und praktischem Wohlbefinden' },
          { title: 'Geist-Körper-Verbindung', subtitle: 'Verbindet mentale Klarheit mit natürlicher körperlicher Entspannung' },
          { title: 'In eigenem Tempo lernen', subtitle: 'Individuelle Begleitung, abgestimmt auf Ihren Tagesablauf' }
        ],
        buttonText: 'Meinen Ansatz entdecken →',
        floatingBadge: '🎓 Klares Verstehen. Echtes Wachstum.'
      },
      meditation: {
        tag: 'MEDITATION & ACHTSAMKEIT',
        title: 'Meditationsmeister & Mentor',
        subtitle: '15+ Jahre gewidmete Geistesschulung',
        body: 'Jenseits schneller Lösungen: Zeitlose Meditationstechniken, beruhigende Atemwahrnehmung und tiefe innere Stille, gewachsen aus über 15 Jahren kontinuierlicher Praxis.',
        features: [
          { title: 'Authentische Meditation', subtitle: 'Erprobte Atemarbeit, Achtsamkeit und heilsame Kontemplation' },
          { title: 'Natürlicher Entspannungsreflex', subtitle: 'Aktiviert die körpereigene Fähigkeit zu tiefer Erholung' },
          { title: 'Tiefe geistige Ruhe', subtitle: 'Löst kreisende Gedanken und chronische Anspannung sanft auf' }
        ],
        buttonText: 'Meditationssitzungen erkunden →',
        floatingBadge: '✨ Bewusstsein wecken. Gedanken beruhigen.'
      },
      symbiosis: {
        tag: 'GANZHEITLICHES WOHLBEFINDEN',
        title: 'Der Harmonie-Plan',
        subtitle: 'Einklang von Geist, Körper & feiner Energie',
        body: 'Die Synthese aus wissenschaftlichem Verstehen und energetischer Feinarbeit. Eine maßgeschneiderte 1:1-Reise, die körperliche Erschöpfung, emotionale Belastung und Burnout lindert.',
        features: [
          { title: 'Persönliche Wohlfühl-Karte', subtitle: 'Erkennen Ihrer individuellen Stressmuster und Energiebahnen' },
          { title: 'Alltagsspannung lösen', subtitle: 'Befreiung von angestautem Druck und körperlicher Verhärtung' },
          { title: 'Dauerhafte Selbstständigkeit', subtitle: 'Lebenslange emotionale Unabhängigkeit durch einfache Alltagsroutinen' }
        ],
        buttonText: 'Harmonie-Plan entdecken →',
        floatingBadge: '🌿 Energie erneuern. Harmonie erfahren.'
      }
    },
    explorer: {
      tag: 'INTERAKTIVER ERFAHRUNGS-NAVIGATOR',
      title: 'Was Fühlen Sie Gerade?',
      subtitle: 'Wählen Sie Ihren aktuellen Zustand, um zu sehen, wie wissenschaftliches Verstehen und Achtsamkeit zusammenwirken, um Ausgleich zu schaffen.',
      calloutTitle: 'Unsicher, wo Sie beginnen sollen?',
      calloutDesc: 'Wählen Sie Ihr Empfinden, um zu erfahren, wie klares Wissen und achtsame Übungen Ihnen zu Wohlbefinden verhelfen.',
      commonExperiences: 'TYPISCHE ERFAHRUNGEN',
      ourApproach: 'UNSER ANSATZ',
      explorePath: 'Diesen Weg erkunden →'
    },
    symptoms: {
      insomnia: {
        label: 'Erholsamer Schlaf',
        title: 'Erholsamer Schlaf & Ruhige Abende',
        italicPremise: 'Bessere Schlafgewohnheiten. Natürliche Entspannung. Frische Tagesenergie.',
        paragraph: 'Hektische Tage, spätes Bildschirmlicht und kreisende Gedanken rauben oft den Nachtschlaf. Wir führen Geist und Körper durch entspannende Abendrituale, sanften Atem und schlaffördernde Gewohnheiten zu tiefer Ruhe.',
        checkmarks: [
          'Fördert tiefen, ungestörten und erholsamen Schlaf',
          'Beruhigt abendliches Gedankenkreisen und körperliche Unruhe',
          'Etabliert wohltuende, nachhaltige Rituale vor dem Einschlafen',
          'Stellt den natürlichen Schlafrhythmus für erholtes Erwachen wieder her'
        ],
        experiences: ['Unruhige Nächte', 'Einschlafschwierigkeiten', 'Kreisende Gedanken im Bett', 'Morgendliche Erschöpfung', 'Unterbrochener Schlaf', 'Tiefs am Tage'],
        approaches: [
          { title: 'Abend-Rhythmus', desc: 'Beruhigende Rituale, die Geist und Körper auf den Schlaf vorbereiten.' },
          { title: 'Sanftes Pranayama', desc: 'Wohltuende Atemübungen, die das Nervensystem auf natürliche Weise beruhigen.' },
          { title: 'Regenerative Stille', desc: 'Geführte Entspannung zum Lösen körperlicher Anspannung vor der Nacht.' }
        ]
      },
      female: {
        label: 'Frauengesundheit',
        title: 'Selbstfürsorge, Balance & Strahlendes Vertrauen',
        italicPremise: 'Rhythmus nähren. Vertrauen wiedergewinnen. Innere Balance ausstrahlen.',
        paragraph: 'Ein einfühlsamer, ganzheitlicher Ansatz zur Förderung weiblicher Vitalität, emotionaler Harmonie und geerdeter Gewohnheiten für nachhaltiges Wohlbefinden und Lebensfreude.',
        checkmarks: [
          'Kultiviert emotionales Gleichgewicht und innere Stärke',
          'Nährt tägliche Selbstfürsorge-Routinen und vitale Energie',
          'Unterstützt gesunde biologische Rhythmen und emotionale Leichtigkeit',
          'Schenkt strahlende Selbstsicherheit und Wohlbefinden im Alltag'
        ],
        experiences: ['Emotionale Erschöpfung', 'Spagat zwischen Rollen', 'Hormonelle Stressbelastung', 'Wenig Zeit für sich', 'Sensorische Reizüberflutung', 'Verlust der Leichtigkeit'],
        approaches: [
          { title: 'Achtsame Selbstfürsorge', desc: 'Individuelle Alltagsroutinen, die natürliche Rhythmen und Grenzen achten.' },
          { title: 'Emotionale Balance', desc: 'Sanfte Achtsamkeitspraktiken für dauerhafte innere Ruhe.' },
          { title: 'Lebendige Harmonie', desc: 'Nährende Praktiken, die Ihre alltägliche Energie sanft aufrechterhalten.' }
        ]
      },
      teen: {
        label: 'Jugend & Schule',
        title: 'Schuldruck & Digitale Reizüberflutung Meistern',
        italicPremise: 'Schulstress lindern. Reize reduzieren. Wahres Selbstvertrauen aufbauen.',
        paragraph: 'Jugendliche dabei begleiten, schulische Erwartungen, Smartphone-Druck und emotionale Anspannung durch achtsame Pausen, gesunde Schlafzeiten und ausgewogene Routinen zu meistern.',
        checkmarks: [
          'Nimmt Leistungsdruck und schulischen Prüfungsstress',
          'Schafft gesunde Grenzen zu Bildschirmen und sozialen Medien',
          'Stärkt echtes Selbstwertgefühl und emotionale Widerstandskraft',
          'Schützt erholsamen Schlaf und soziale Ausgeglichenheit'
        ],
        experiences: ['Prüfungsangst & Druck', 'Bildschirmmüdigkeit & spätes Scrollen', 'Emotionale Überforderung', 'Motivationsverlust', 'Chronische Müdigkeit', 'Zukunftssorgen'],
        approaches: [
          { title: 'Druckentlastung', desc: 'Praktische Werkzeuge, um Lernanforderungen ohne Ausbrennen zu bewältigen.' },
          { title: 'Digitaler Neustart', desc: 'Gesunde Pausen vom Bildschirm für klare Gedanken und Konzentration.' },
          { title: 'Innere Erdung', desc: 'Aufbau von Selbstwert, seelischem Gleichgewicht und echtem Selbstvertrauen.' }
        ]
      },
      corporate: {
        label: 'Beruf & Führung',
        title: 'Gelassenheit im Beruf & Stress am Arbeitsplatz',
        italicPremise: 'Mehr Gelassenheit. Bessere Arbeitstage. Emotionale Balance im Job.',
        paragraph: 'Fach- und Führungskräfte dabei unterstützen, anspruchsvolle Arbeitstage, Entscheidungsermüdung und hohe Anforderungen durch 5-minütige Blitz-Resets, klare Grenzen und Fokus zu meistern.',
        checkmarks: [
          'Mindert Termindruck, Bildschirm-Ermüdung und Alltagsüberlastung',
          'Baut praktische 5-Minuten-Gewohnheiten für hektische Tage auf',
          'Schafft gesunde Grenzen zwischen Beruf und Privatleben ohne Schuldgefühle',
          'Schützt täglichen mentalen Fokus, klare Entscheidungen und ruhige Feierabende'
        ],
        experiences: ['Meetings ohne Pause', 'Entscheidungsmüdigkeit', 'Dauerhafte Bildschirmzeit', 'Termindruck', 'Schweres Abschalten', 'Sonntagabend-Unruhe'],
        approaches: [
          { title: 'Arbeits-Resets', desc: 'Einfache 5-Minuten-Atemübungen zwischen anspruchsvollen Aufgaben.' },
          { title: 'Ruhiger Fokus', desc: 'Erdende Gewohnheiten, um mentale Klarheit zu wahren und sicher zu entscheiden.' },
          { title: 'Feierabend-Grenze', desc: 'Sanfte Rituale, um die Arbeit loszulassen und freie Abende zu genießen.' }
        ]
      },
      subtle: {
        label: 'Innere Balance',
        title: 'Energiefluss & Innerer Frieden',
        italicPremise: 'Nadis ausgleichen. Chakren harmonisieren. Innere Stille wecken.',
        paragraph: 'Verbindung mit Ihrem natürlichen Energiefluss – Ausgleich aktiver und regenerativer Kräfte sowie Harmonisierung der 7 Hauptchakren für tiefen Frieden und Klarheit.',
        checkmarks: [
          'Gleicht aktive und regenerative Energiebahnen harmonisch aus',
          'Stellt die energetische Ausrichtung durch die 7 Energiezentren wieder her',
          'Löst feinstoffliche Blockaden für mühelose Meditation',
          'Verbindet körperliche Vitalität mit tiefem inneren Seelenfrieden'
        ],
        experiences: ['Sehnsucht nach tiefer Stille', 'Stagnation in der Meditation', 'Energetische Disbalance', 'Unruhiger Gedankenstrom', 'Suche nach innerer Ausrichtung', 'Spirituelle Neugier'],
        approaches: [
          { title: 'Chakren-Harmonisierung', desc: 'Geführte Kontemplation zum Ausgleich der 7 Energiezentren.' },
          { title: 'Nadi-Ausgleich', desc: 'Harmonisierung von Sonnenaktivität und mondhafter Ruhe.' },
          { title: 'Innere Verwirklichung', desc: 'Unerschütterliche Gegenwärtigkeit im modernen Alltag verankern.' }
        ]
      }
    },
    differentiators: {
      tag: 'WARUM MIT DR. MAYANK ARBEITEN',
      title: 'Der Multidisziplinäre Ansatz',
      subtitle: 'Die seltene Verbindung aus praktischer Wissenschaft, fundiertem Verstehen und echter Meditation.',
      learnMore: 'Erfahren Sie, warum es zählt →',
      showLess: 'Weniger anzeigen ↑',
      items: [
        {
          tag: '🧠 Wissenschaft + Meditation',
          title: 'Die Doppelte Perspektive',
          body: 'Vereint Wissenschaft und Meditation für ein tiefgreifendes Verständnis Ihres Wohlbefindens.',
          detail: 'Selten findet man einen ausgebildeten Mediziner, der die Stille des Geistes zutiefst ehrt, oder einen Meditationsbegleiter, der die Physiologie des Körpers meisterhaft versteht.'
        },
        {
          tag: '🌿 Geerdet & Klar',
          title: 'Einfach & Geerdet',
          body: 'Keine verwirrenden Theorien. Reine, leicht anwendbare Praxis für das reale Leben.',
          detail: 'Wir achten Ihre Überzeugungen ohne Dogmen. Alles ist sanft, praxistauglich und auf spürbare Ergebnisse ausgerichtet.'
        },
        {
          tag: '💫 Individuelle Begleitung',
          title: 'Ganz auf Sie abgestimmt',
          body: 'Ihre Reise ist einzigartig. Erhalten Sie Begleitung, die genau zu Ihren Zielen und Bedürfnissen passt.',
          detail: 'Ob beruhigende Atemarbeit, emotionale Entlastung oder geistige Klarheit – jede Übung wird individuell angepasst.'
        },
        {
          tag: '🌱 Nachhaltige Selbstständigkeit',
          title: 'Ermächtigung zur Unabhängigkeit',
          body: 'Lernen Sie einfache Werkzeuge, die Sie dauerhaft und sicher selbst im Alltag anwenden können.',
          detail: 'Sie beenden die Begleitung mit einem persönlichen Ruhe-Leitfaden und Routinen, die Sie auch bei äußerem Trubel zentriert halten.'
        }
      ]
    }
  },
  fr: {
    tabs: {
      clinical: '🌱 Fondations d’Apprentissage',
      meditation: '🧘 Pratique Attentive',
      symbiosis: '🌿 Le Plan Harmonie'
    },
    programTabs: {
      clinical: {
        tag: 'SCIENCE PRATIQUE & COMPRÉHENSION',
        title: 'Docteur en Médecine (M.D.)',
        subtitle: 'Compréhension Claire de l’Esprit, du Cerveau et du Corps',
        body: 'Le Dr Mayank apporte une base scientifique solide, vous aidant à comprendre comment les pensées, le stress et les habitudes impactent directement votre physiologie. Chaque séance repose sur la sécurité, la clarté et le savoir pratique.',
        features: [
          { title: 'Approche scientifique', subtitle: 'Ancrée dans la science réelle et le bien-être corps-esprit' },
          { title: 'Connexion esprit-corps', subtitle: 'Allier clarté mentale et détente physique naturelle' },
          { title: 'Apprenez à votre rythme', subtitle: 'Guidance sur mesure adaptée à votre emploi du temps' }
        ],
        buttonText: 'Découvrir mon approche →',
        floatingBadge: '🎓 Compréhension claire. Croissance réelle.'
      },
      meditation: {
        tag: 'MÉDITATION & PLEINE CONSCIENCE',
        title: 'Maître de Méditation & Mentor',
        subtitle: '15+ Ans d’Entraînement de l’Esprit',
        body: 'Au-delà des solutions éphémères : des techniques de méditation intemporelles, la conscience apaisée du souffle et un silence intérieur profond issus de plus de 15 ans de pratique.',
        features: [
          { title: 'Méditation Authentique', subtitle: 'Travail respiratoire éprouvé, pleine conscience et recueillement' },
          { title: 'Réflexe Naturel de Calme', subtitle: 'Stimule la réponse naturelle de relaxation de votre organisme' },
          { title: 'Profonde Tranquillité Mentale', subtitle: 'Apaise en douceur le stress répétitif et le flux des pensées' }
        ],
        buttonText: 'Explorer les séances de méditation →',
        floatingBadge: '✨ Éveiller la conscience. Apaiser l’esprit.'
      },
      symbiosis: {
        tag: 'BIEN-ÊTRE INTÉGRATIF',
        title: 'Le Plan Harmonie',
        subtitle: 'Harmonie de l’Esprit, du Corps & de l’Énergie',
        body: 'L’union d’une compréhension scientifique claire et de pratiques énergétiques subtiles. Un accompagnement 1:1 personnalisé qui soulage l’épuisement physique, le stress et le surmenage.',
        features: [
          { title: 'Carte Personnelle de Bien-être', subtitle: 'Comprendre vos schémas de stress et votre flux d’énergie' },
          { title: 'Libération des Tensions', subtitle: 'Relâcher la pression accumulée et la rigidité physique' },
          { title: 'Autonomie Durable', subtitle: 'Indépendance émotionnelle pérenne ancrée dans votre quotidien' }
        ],
        buttonText: 'Découvrir Le Plan Harmonie →',
        floatingBadge: '🌿 Restaurer l’énergie. Vivre l’harmonie.'
      }
    },
    explorer: {
      tag: 'NAVIGATEUR D’EXPÉRIENCE INTERACTIF',
      title: 'Que Ressentez-Vous en ce Moment ?',
      subtitle: 'Sélectionnez votre état pour découvrir comment la science claire et les pratiques attentives s’unissent pour restaurer votre équilibre.',
      calloutTitle: 'Vous ne savez pas par où commencer ?',
      calloutDesc: 'Choisissez ce que vous ressentez pour voir comment une compréhension claire et des pratiques douces vous aident à retrouver la paix.',
      commonExperiences: 'EXPÉRIENCES FRÉQUENTES',
      ourApproach: 'NOTRE APPROCHE',
      explorePath: 'Explorer ce chemin →'
    },
    symptoms: {
      insomnia: {
        label: 'Sommeil Réparateur',
        title: 'Sommeil Réparateur & Soirées Paisibles',
        italicPremise: 'Meilleur sommeil. Détente naturelle. Énergie quotidienne retrouvée.',
        paragraph: 'Journées denses, écrans tardifs et pensées incessantes perturbent vos nuits. Nous guidons le corps et l’esprit vers un repos apaisant grâce à des rituels du soir et un souffle relaxant.',
        checkmarks: [
          'Favorise un sommeil réparateur, profond et ininterrompu',
          'Calme les pensées nocturnes et l’agitation physique',
          'Construit des rituels pré-sommeil doux et durables',
          'Restaure les rythmes naturels pour un réveil serein'
        ],
        experiences: ['Nuits agitées', 'Difficulté d’endormissement', 'Pensées envahissantes au lit', 'Épuisement matinal', 'Sommeil haché', 'Baisse d’énergie en journée'],
        approaches: [
          { title: 'Rythme du Soir', desc: 'Protocoles d’apaisement préparant le corps et l’esprit au sommeil.' },
          { title: 'Pranayama Doux', desc: 'Respiration apaisante pour détendre le système nerveux naturellement.' },
          { title: 'Silence Régénérateur', desc: 'Relaxation guidée pour dénouer les tensions corporelles.' }
        ]
      },
      female: {
        label: 'Bien-être Féminin',
        title: 'Soin de Soi, Équilibre & Confiance Rayonnante',
        italicPremise: 'Honorer son rythme. Retrouver confiance. Rayonner d’équilibre.',
        paragraph: 'Une approche bienveillante et holistique pour soutenir la vitalité féminine, l’harmonie émotionnelle et des routines équilibrées pour une santé durable.',
        checkmarks: [
          'Cultive l’équilibre émotionnel et la force intérieure',
          'Nourrit des habitudes quotidiennes de soin et de vitalité',
          'Soutient les rythmes naturels et la sérénité émotionnelle',
          'Restaure une joyeuse confiance et le bien-être au quotidien'
        ],
        experiences: ['Fatigue émotionnelle', 'Multiplicité des rôles', 'Stress hormonal subtil', 'Peu de temps pour soi', 'Surcharge sensorielle', 'Perte de vitalité'],
        approaches: [
          { title: 'Soin Conscient', desc: 'Routines sur mesure respectant les rythmes naturels et les limites.' },
          { title: 'Équilibre Émotionnel', desc: 'Pratiques de pleine conscience pour un calme intérieur durable.' },
          { title: 'Harmonie Vibrante', desc: 'Pratiques holistiques nourrissantes pour préserver l’énergie.' }
        ]
      },
      teen: {
        label: 'Adolescents & Étudiants',
        title: 'Gérer la Pression Scolaire & la Surcharge Numérique',
        italicPremise: 'Alléger le stress scolaire. Déconnecter la surcharge. Bâtir une vraie confiance.',
        paragraph: 'Accompagner les adolescents face aux exigences scolaires, à la fatigue des écrans et au stress émotionnel grâce à des pauses attentives et des routines équilibrées.',
        checkmarks: [
          'Soulage l’anxiété d’évaluation et la pression académique',
          'Restaure des limites saines avec les écrans et les réseaux',
          'Développe une authentique confiance et la résilience émotionnelle',
          'Protège le sommeil et l’équilibre relationnel'
        ],
        experiences: ['Stress des examens', 'Fatigue des écrans', 'Surcharge émotionnelle', 'Baisse de motivation', 'Épuisement chronique', 'Inquiétude d’avenir'],
        approaches: [
          { title: 'Allègement de Pression', desc: 'Outils concrets pour étudier sereinement sans s’épuiser.' },
          { title: 'Pause Numérique', desc: 'Coupures saines des écrans pour retrouver la clarté d’esprit.' },
          { title: 'Ancrage Intérieur', desc: 'Consolidation de l’estime de soi et du calme intérieur.' }
        ]
      },
      corporate: {
        label: 'Monde Professionnel',
        title: 'Calme au Travail & Stress Professionnel',
        italicPremise: 'Plus de sérénité. Des journées plus légères. Équilibre au travail.',
        paragraph: 'Accompagner dirigeants et professionnels à traverser des journées intenses, la fatigue décisionnelle et les fortes exigences grâce à des pauses de 5 minutes et un focus clair.',
        checkmarks: [
          'Atténue la pression des délais, la fatigue oculaire et la surcharge',
          'Installe des micro-habitudes de 5 min pour rester calme sous la pression',
          'Établit des frontières saines et déculpabilisantes entre travail et vie privée',
          'Protège la concentration mentale et des soirées sereines'
        ],
        experiences: ['Réunions continues', 'Fatigue décisionnelle', 'Temps d’écran excessif', 'Pression des délais', 'Difficulté à décrocher', 'Appréhension du dimanche soir'],
        approaches: [
          { title: 'Resets au Bureau', desc: 'Exercices de souffle de 5 minutes entre deux tâches exigeantes.' },
          { title: 'Focus Serein', desc: 'Habitudes d’ancrage pour clarifier l’esprit et décider sereinement.' },
          { title: 'Frontière du Soir', desc: 'Rituels doux pour déconnecter réellement du travail le soir.' }
        ]
      },
      subtle: {
        label: 'Équilibre Intérieur',
        title: 'Flux Énergétique & Paix Intérieure',
        italicPremise: 'Équilibrer les nadis. Aligner les chakras. Éveiller le silence intérieur.',
        paragraph: 'Se relier à son flux d’énergie naturelle – équilibrer les énergies actives et apaisantes, harmoniser les 7 chakras pour une paix enracinée et une conscience de soi.',
        checkmarks: [
          'Équilibre le flux énergétique actif et réparateur',
          'Restaure l’alignement subtil à travers les 7 centres énergétiques',
          'Libère les blocages pour une méditation fluide',
          'Intègre durablement vitalité physique et paix intérieure'
        ],
        experiences: ['Désir de silence profond', 'Paliers en méditation', 'Déséquilibre énergétique', 'Agitation mentale', 'Recherche d’alignement', 'Curiosité spirituelle'],
        approaches: [
          { title: 'Harmonisation des Chakras', desc: 'Contemplation guidée pour équilibrer les 7 centres subtils.' },
          { title: 'Équilibre des Nadis', desc: 'Harmonisation de l’activité solaire et du calme lunaire.' },
          { title: 'Réalisation Intérieure', desc: 'Ancrer une présence inébranlable dans la vie quotidienne.' }
        ]
      }
    },
    differentiators: {
      tag: 'POURQUOI CHOISIR LE DR. MAYANK',
      title: 'L’Approche Multidisciplinaire',
      subtitle: 'La convergence rare entre science rigoureuse, compréhension bienveillante et méditation authentique.',
      learnMore: 'Découvrir pourquoi c’est essentiel →',
      showLess: 'Réduire ↑',
      items: [
        {
          tag: '🧠 Science + Méditation',
          title: 'Le Double Prisme',
          body: 'Allier la médecine et la méditation pour une compréhension profonde de votre bien-être.',
          detail: 'Il est rare de rencontrer un médecin formé qui honore la paix intérieure, ou un guide contemplatif qui maîtrise la physiologie corporelle.'
        },
        {
          tag: '🌿 Ancré & Simple',
          title: 'Simple & Pragmatique',
          body: 'Aucune théorie complexe. Une guidance accessible et directe pour votre vie de tous les jours.',
          detail: 'Nous respectons vos convictions sans dogme. Tout est bienveillant, pratique et axé sur des bienfaits tangibles.'
        },
        {
          tag: '💫 Accompagnement Personnalisé',
          title: 'Un Soin Conçu Pour Vous',
          body: 'Votre cheminement est unique. Bénéficiez d’un accompagnement pensé pour vos besoins et émotions.',
          detail: 'Qu’il s’agisse de souffle apaisant, de libération émotionnelle ou de clarté d’esprit, chaque séance est sur mesure.'
        },
        {
          tag: '🌱 Autonomie Durable',
          title: 'Favoriser l’Indépendance',
          body: 'Apprenez des outils simples que vous pourrez continuer à utiliser en toute confiance par vous-même.',
          detail: 'Vous repartirez avec votre propre plan de sérénité et des routines vous permettant de rester centré face aux aléas.'
        }
      ]
    }
  },
  ro: {
    tabs: {
      clinical: '🌱 Fundamente Științifice',
      meditation: '🧘 Practică Conștientă',
      symbiosis: '🌿 Planul Armonie'
    },
    programTabs: {
      clinical: {
        tag: 'ȘTIINȚĂ PRACTICĂ & ÎNȚELEGERE',
        title: 'Doctor în Medicină (M.D.)',
        subtitle: 'Înțelegere Clară a Minții, Creierului și Corpului',
        body: 'Dr. Mayank aduce o bază științifică solidă, ajutându-vă să înțelegeți cum gândurile, stresul și stilul de viață afectează direct corpul. Fiecare sesiune este ancorată în siguranță, claritate și cunoaștere practică.',
        features: [
          { title: 'Ghidare bazată pe dovezi', subtitle: 'Ancorată în știință reală și echilibru minte-corp' },
          { title: 'Conexiunea minte-corp', subtitle: 'Unirea clarității mentale cu relaxarea fizică naturală' },
          { title: 'În ritmul tău', subtitle: 'Ghidare personalizată adaptată programului tău zilnic' }
        ],
        buttonText: 'Descoperă abordarea mea →',
        floatingBadge: '🎓 Înțelegere clară. Creștere autentică.'
      },
      meditation: {
        tag: 'MEDITAȚIE & MINDFULNESS',
        title: 'Maestru de Meditație & Mentor',
        subtitle: '15+ Ani de Antrenament al Minții',
        body: 'Dincolo de soluții de moment: tehnici atemporale de meditație, respirație conștientă și liniște interioară dobândite în peste 15 ani de practică dedicată.',
        features: [
          { title: 'Meditație Autentică', subtitle: 'Tehnici validate de respirație, atenție și contemplare' },
          { title: 'Reflexul Natural de Calmare', subtitle: 'Stimularea răspunsului natural de relaxare al corpului' },
          { title: 'Liniște Mentală Profundă', subtitle: 'Calmarea blândă a stresului repetitiv și a gândurilor agitate' }
        ],
        buttonText: 'Explorează sesiunile de meditație →',
        floatingBadge: '✨ Trezește conștiența. Liniștește mintea.'
      },
      symbiosis: {
        tag: 'BUNĂSTARE INTEGRATIVĂ',
        title: 'Planul Armonie',
        subtitle: 'Armonizarea Minții, Corpului și Energiei',
        body: 'Sinteza dintre înțelegerea științifică clară și practicile energetice blânde. O călătorie 1:1 personalizată care ameliorează oboseala fizică, tensiunea emoțională și epuizarea.',
        features: [
          { title: 'Harta Personală de Bunăstare', subtitle: 'Înțelegerea tiparelor unice de stres și a fluxului energetic' },
          { title: 'Eliberarea Tensiunilor', subtitle: 'Renunțarea la presiunea acumulată și rigiditatea fizică' },
          { title: 'Independență Durabilă', subtitle: 'Autonomie emoțională de lungă durată ancorată în rutina zilnică' }
        ],
        buttonText: 'Descoperă Planul Armonie →',
        floatingBadge: '🌿 Reînnoiește energia. Experimentează armonia.'
      }
    },
    explorer: {
      tag: 'EXPLORATOR INTERACTIV DE EXPERIENȚE',
      title: 'Ce Simți Chiar Acum?',
      subtitle: 'Selectează starea pe care o experimentezi pentru a vedea cum înțelegerea practică și mindfulness-ul se unesc pentru a readuce echilibrul.',
      calloutTitle: 'Nu știi de unde să începi?',
      calloutDesc: 'Alege ce simți pentru a vedea cum cunoașterea clară și practicile blânde te ajută să te simți mai bine.',
      commonExperiences: 'EXPERIENȚE FRECVENTE',
      ourApproach: 'ABORDAREA NOASTRĂ',
      explorePath: 'Explorează această cale →'
    },
    symptoms: {
      insomnia: {
        label: 'Somn Odihnitor',
        title: 'Somn Odihnitor & Seri Liniștite',
        italicPremise: 'Obiceiuri mai bune de somn. Relaxare naturală. Energie zilnică reînnoită.',
        paragraph: 'Zilele aglomerate, ecranele până târziu și gândurile fără oprire pot tulbura odihna de noapte. Ghidăm mintea și corpul spre un repaus blând prin rutine liniștitoare de seară și respirație calmă.',
        checkmarks: [
          'Favorizează un somn odihnitor, profund și neîntrerupt',
          'Calmează gândurile agitate dinainte de culcare și neliniștea fizică',
          'Construiește ritualuri plăcute și durabile înainte de somn',
          'Restabilește ritmurile naturale de somn pentru o trezire plină de energie'
        ],
        experiences: ['Nopți agitate', 'Dificultate în a adormi', 'Gânduri obsesive în pat', 'Epuizare dimineața', 'Somn fragmentat', 'Căderi de energie în timpul zilei'],
        approaches: [
          { title: 'Ritmul de Seară', desc: 'Protocoale liniștitoare care pregătesc mintea și corpul pentru somn.' },
          { title: 'Pranayama Blândă', desc: 'Respirație liniștitoare pentru calmarea naturală a sistemului nervos.' },
          { title: 'Liniște Regenerativă', desc: 'Relaxare ghidată pentru detensionarea mușchilor înainte de culcare.' }
        ]
      },
      female: {
        label: 'Sănătatea Femeii',
        title: 'Grijă de Sine, Echilibru & Încredere Radiantă',
        italicPremise: 'Hrănește-ți ritmul. Redobândește încrederea. Radiază echilibru.',
        paragraph: 'O abordare empatică și holistică pentru susținerea vitalității feminine, armoniei emoționale și a unor rutine împământate pentru sănătate de durată.',
        checkmarks: [
          'Cultivă echilibrul emoțional și puterea interioară',
          'Hrănește obiceiurile zilnice de grijă de sine și vitalitate',
          'Susține ritmurile naturale sănătoase și relaxarea emoțională',
          'Redobândește încrederea senină și starea de bine de zi cu zi'
        ],
        experiences: ['Oboseală emoțională', 'Împărțirea între roluri', 'Stres hormonal subtil', 'Timp redus pentru sine', 'Sursă de copleșire', 'Pierderea vitalității'],
        approaches: [
          { title: 'Grijă Conștientă', desc: 'Rutine zilnice personalizate ce onorează ritmurile naturale și limitele.' },
          { title: 'Echilibru Emoțional', desc: 'Practici blânde de atenție pentru un calm interior durabil.' },
          { title: 'Armonie Vibrantă', desc: 'Practici holistice hrănitoare pentru menținerea energiei zilnice.' }
        ]
      },
      teen: {
        label: 'Tineri & Școală',
        title: 'Gestionarea Presiunii Școlare & a Suprasolicitării Digitale',
        italicPremise: 'Ușurează stresul examenelor. Deconectează excesul. Construiește încredere reală.',
        paragraph: 'Ghidarea adolescenților în fața așteptărilor școlare, suprasolicitării ecranelor și stresului emoțional prin pauze conștiente și rutine echilibrate.',
        checkmarks: [
          'Ameliorează stresul legat de note și presiunea performanței',
          'Restabilește limite sănătoase cu ecranele și rețelele sociale',
          'Construiește o stimă de sine autentică și reziliență emoțională',
          'Protejează somnul odihnitor și echilibrul social'
        ],
        experiences: ['Stresul examenelor', 'Oboseala ecranelor', 'Copleșire emoțională', 'Lipsă de motivație', 'Epuizare cronică', 'Îngrijorare pentru viitor'],
        approaches: [
          { title: 'Eliberarea Presiunii', desc: 'Instrumente practice pentru a gestiona cerințele de studiu fără epuizare.' },
          { title: 'Reset Digital', desc: 'Pauze sănătoase de la ecrane pentru claritate mentală.' },
          { title: 'Împământare Interioară', desc: 'Dezvoltarea valorii de sine și a calmului emoțional.' }
        ]
      },
      corporate: {
        label: 'Mediu Profesional',
        title: 'Calm la Locul de Muncă & Stres Corporativ',
        italicPremise: 'O versiune mai calmă a ta. Zile de muncă mai ușoare. Echilibru la birou.',
        paragraph: 'Ghidarea profesioniștilor și liderilor prin zile de lucru solicitante, oboseală decizională și cerințe mari prin resetări de 5 minute, limite clare și atenție concentrată.',
        checkmarks: [
          'Reduce presiunea termenelor limită, oboseala de ecran și supraîncărcarea',
          'Construiește micro-obiceiuri de 5 minute pentru a rămâne calm în momente critice',
          'Creează limite sănătoase, fără vinovăție, între carieră și viața personală',
          'Protejează concentrarea mentală zilnică și serile liniștite'
        ],
        experiences: ['Ședințe consecutive', 'Oboseală decizională', 'Timp continuu la ecran', 'Presiunea termenelor', 'Dificultate în deconectare', 'Neliniștea de duminică seară'],
        approaches: [
          { title: 'Resetări la Birou', desc: 'Exerciții simple de 5 minute de respirație și pauză între sarcini solicitante.' },
          { title: 'Focalizare Calmă', desc: 'Obiceiuri de împământare pentru a elibera agitația și a lua decizii sigure.' },
          { title: 'Limita de Seară', desc: 'Obiceiuri blânde de deconectare pentru a te bucura cu adevărat de serile libere.' }
        ]
      },
      subtle: {
        label: 'Echilibru Interior',
        title: 'Flux Energetic & Pace Interioară',
        italicPremise: 'Echilibrează nadi-urile. Aliniază chakrele. Trezește liniștea lăuntrică.',
        paragraph: 'Conectarea cu fluxul tău natural de energie – echilibrarea energiilor active și pasive și armonizarea celor 7 chakre pentru o liniște profundă.',
        checkmarks: [
          'Echilibrează fluxul intern de energie activă și regenerativă',
          'Restabilește alinierea energetică prin cele 7 chakre',
          'Eliberează blocajele subtile pentru o meditație firească',
          'Integrează durabil vitalitatea fizică cu pacea sufletească'
        ],
        experiences: ['Dorință de liniște adâncă', 'Plafonare în meditație', 'Dezechilibru energetic', 'Agitație mentală continuă', 'Căutarea alinierii interioare', 'Curiozitate spirituală'],
        approaches: [
          { title: 'Alinierea Chakrelor', desc: 'Contemplare ghidată pentru echilibrarea celor 7 centri energetici.' },
          { title: 'Armonizarea Nadi-urilor', desc: 'Echilibrarea energiei solare active cu cea lunară calmantă.' },
          { title: 'Realizare Interioară', desc: 'Ancorarea unei prezențe de neclintit în viața modernă.' }
        ]
      }
    },
    differentiators: {
      tag: 'DE CE SĂ LUCREZI CU DR. MAYANK',
      title: 'Abordarea Multidisciplinară',
      subtitle: 'Puntea rară între știința clară, înțelegerea empatică și meditația autentică.',
      learnMore: 'Află de ce contează →',
      showLess: 'Arată mai puțin ↑',
      items: [
        {
          tag: '🧠 Știință + Meditație',
          title: 'Dubla Perspectivă',
          body: 'Unirea științei medicale cu meditația pentru o înțelegere profundă a stării tale de bine.',
          detail: 'Rar găsești un medic instruit care onorează profund pacea spirituală, sau un ghid de meditație care înțelege fiziologia corpului.'
        },
        {
          tag: '🌿 Simplu & Împământat',
          title: 'Simplu & Clar',
          body: 'Fără teorii complicate. Doar îndrumare practică și ușor de aplicat în viața de zi cu zi.',
          detail: 'Îți respectăm convingerile fără dogme. Totul este blând, practic și orientat spre beneficii reale pe care le poți simți.'
        },
        {
          tag: '💫 Îndrumare Personalizată',
          title: 'Grijă Concepută Pentru Tine',
          body: 'Călătoria ta este unică. Primești îndrumare adaptată nevoilor, sentimentelor și obiectivelor tale.',
          detail: 'Fie că ai nevoie de respirație liniștitoare, eliberare emoțională sau concentrare clară, fiecare practică este adaptată ție.'
        },
        {
          tag: '🌱 Independență Durabilă',
          title: 'Autonomie pe Viață',
          body: 'Înveți instrumente simple și obiceiuri pe care le poți folosi cu încredere pe cont propriu.',
          detail: 'Vei finaliza sesiunile cu propriul ghid de calm și obiceiuri zilnice care te mențin centrat indiferent de agitația exterioară.'
        }
      ]
    }
  },
  ru: {
    tabs: {
      clinical: '🌱 Научная Основа',
      meditation: '🧘 Осознанная Практика',
      symbiosis: '🌿 План Гармонии'
    },
    programTabs: {
      clinical: {
        tag: 'ПРАКТИЧЕСКАЯ НАУКА И ПОНИМАНИЕ',
        title: 'Доктор Медицины (M.D.)',
        subtitle: 'Ясное понимание разума, мозга и тела',
        body: 'Доктор Маянк опирается на фундаментальную медицинскую базу, помогая вам понять, как мысли, стресс и привычки напрямую воздействуют на организм. Каждая сессия основана на безопасности, ясности и практических знаниях.',
        features: [
          { title: 'Доказательный подход', subtitle: 'Опора на реальную науку и физиологическое здоровье' },
          { title: 'Связь разума и тела', subtitle: 'Объединение ясности ума с естественным расслаблением тела' },
          { title: 'Обучение в своём темпе', subtitle: 'Персональное ведение, адаптированное под ваш график' }
        ],
        buttonText: 'Узнать больше о моем подходе →',
        floatingBadge: '🎓 Ясное понимание. Настоящий рост.'
      },
      meditation: {
        tag: 'МЕДИТАЦИЯ И ОСОЗНАННОСТЬ',
        title: 'Мастер Медитации и Ментор',
        subtitle: '15+ Лет практики тренировки ума',
        body: 'За пределами быстрых поверхностных методов: проверенные временем техники медитации, осознанное дыхание и глубокий внутренний покой, отточенные за 15+ лет личной практики.',
        features: [
          { title: 'Аутентичная медитация', subtitle: 'Дыхательные практики, осознанность и глубокое созерцание' },
          { title: 'Естественный рефлекс покоя', subtitle: 'Активация природной способности тела к расслаблению' },
          { title: 'Глубокая тишина ума', subtitle: 'Мягкое растворение навязчивых мыслей и тревожности' }
        ],
        buttonText: 'Исследовать медитации →',
        floatingBadge: '✨ Пробудить осознанность. Успокоить ум.'
      },
      symbiosis: {
        tag: 'ИНТЕГРАТИВНОЕ БЛАГОПОЛУЧИЕ',
        title: 'План Гармонии',
        subtitle: 'Единство разума, тела и тонкой энергии',
        body: 'Синтез медицинских знаний и энергетических практик. Персональное путешествие 1:1, помогающее преодолеть физическую усталость, эмоциональный стресс и выгорание.',
        features: [
          { title: 'Карта личного баланса', subtitle: 'Понимание ваших источников стресса и движения энергии' },
          { title: 'Снятие напряжения', subtitle: 'Освобождение от накопленного давления и зажимов в теле' },
          { title: 'Устойчивая автономия', subtitle: 'Умение самостоятельно сохранять душевное равновесие' }
        ],
        buttonText: 'Исследовать План Гармонии →',
        floatingBadge: '🌿 Восстановить энергию. Обрести гармонию.'
      }
    },
    explorer: {
      tag: 'ИНТЕРАКТИВНЫЙ НАВИГАТОР СОСТОЯНИЙ',
      title: 'Что Вы Чувствуете Прямо Сейчас?',
      subtitle: 'Выберите ваше текущее состояние, чтобы увидеть, как научное понимание и осознанные практики объединяются для возвращения гармонии.',
      calloutTitle: 'Не знаете, с чего начать?',
      calloutDesc: 'Выберите то, что вы ощущаете, чтобы узнать, как бережные практики помогут вам вернуть равновесие.',
      commonExperiences: 'ТИПИЧНЫЕ ОЩУЩЕНИЯ',
      ourApproach: 'НАШ ПОДХОД',
      explorePath: 'Исследовать этот путь →'
    },
    symptoms: {
      insomnia: {
        label: 'Здоровый Сон',
        title: 'Глубокий Сон и Спокойные Вечера',
        italicPremise: 'Лучшие привычки сна. Естественное расслабление. Свежая энергия дня.',
        paragraph: 'Насыщенные дни, яркие экраны до поздней ночи и рой мыслей мешают спокойному отдыху. Мы мягко настраиваем тело и ум на восстанавливающий сон с помощью вечерних ритуалов и дыхания.',
        checkmarks: [
          'Способствует глубокому, непрерывному и восстанавливающему сну',
          'Успокаивает вечернюю тревогу и мышечное беспокойство',
          'Создает приятные, устойчивые ритуалы перед сном',
          'Возвращает естественные биоритмы для бодрого утреннего пробуждения'
        ],
        experiences: ['Беспокойные ночи', 'Трудности с засыпанием', 'Поток мыслей перед сном', 'Утренняя разбитость', 'Прерывистый сон', 'Дневные спады энергии'],
        approaches: [
          { title: 'Вечерний Ритм', desc: 'Успокаивающие ритуалы, готовящие мозг и тело ко сну.' },
          { title: 'Мягкая Пранаяма', desc: 'Умиротворяющее дыхание для естественного снятия напряжения.' },
          { title: 'Восстановительная Тишина', desc: 'Мягкая релаксация для расслабления уставших мышц.' }
        ]
      },
      female: {
        label: 'Женское Здоровье',
        title: 'Забота о Себе, Баланс и Сияющая Уверенность',
        italicPremise: 'Поддерживать свой ритм. Вернуть уверенность. Излучать баланс.',
        paragraph: 'Чуткий, целостный подход к поддержке женской энергии, эмоционального спокойствия и устойчивых полезных привычек для долгосрочного здоровья и радости жизни.',
        checkmarks: [
          'Культивирует душевное равновесие и глубинную силу',
          'Укрепляет ежедневные ритуалы заботы о себе и наполняет силами',
          'Поддерживает здоровые природные циклы и эмоциональную легкость',
          'Возвращает радостную уверенность в себе и сияние'
        ],
        experiences: ['Эмоциональное выгорание', 'Множество социальных ролей', 'Гормональное напряжение', 'Нехватка времени на себя', 'Перегрузка впечатлениями', 'Потеря радости'],
        approaches: [
          { title: 'Осознанная Забота', desc: 'Индивидуальные ритуалы, уважающие природные циклы и границы.' },
          { title: 'Эмоциональный Баланс', desc: 'Мягкие практики осознанности для устойчивого душевного покоя.' },
          { title: 'Живая Гармония', desc: 'Наполняющие практики для поддержания ежедневной энергии.' }
        ]
      },
      teen: {
        label: 'Подростки и Учёба',
        title: 'Снятие Учебного Стресса и Цифровой Перегрузки',
        italicPremise: 'Снять груз экзаменов. Разгрузить мозг от экранов. Обрести веру в себя.',
        paragraph: 'Помощь подросткам в преодолении школьного давления, зависимости от гаджетов и эмоциональных качелей через осознанные паузы, здоровый сон и гармоничный режим.',
        checkmarks: [
          'Снимает страх перед экзаменами и давление оценок',
          'Помогает выстроить здоровые границы с гаджетами и соцсетями',
          'Укрепляет подлинную самооценку и внутреннюю устойчивость',
          'Защищает глубокий сон и эмоциональный покой'
        ],
        experiences: ['Страх экзаменов', 'Усталость от экранов', 'Эмоциональный раздрай', 'Потеря мотивации', 'Хроническая усталость', 'Тревога о будущем'],
        approaches: [
          { title: 'Снятие Давления', desc: 'Практические приемы для учебы без паники и истощения.' },
          { title: 'Цифровая Пауза', desc: 'Здоровая разгрузка от экранов для возвращения ясности ума.' },
          { title: 'Внутренняя Опора', desc: 'Укрепление самоценности, душевного баланса и спокойствия.' }
        ]
      },
      corporate: {
        label: 'Работа и Бизнес',
        title: 'Спокойствие в Работе и Корпоративный Стресс',
        italicPremise: 'Больше хладнокровия. Легче рабочий день. Душевное равновесие.',
        paragraph: 'Помощь руководителям и специалистам в преодолении тяжелых рабочих дней, усталости от принятия решений и выгорания через 5-минутные перезагрузки и фокус.',
        checkmarks: [
          'Снижает давление дедлайнов, зрительное утомление и перегрузку',
          'Формирует простые 5-минутные привычки для сохранения ясности в авралах',
          'Помогает провести четкую границу между работой и личной жизнью',
          'Защищает концентрацию ума и дарит спокойные вечера'
        ],
        experiences: ['Бесконечные совещания', 'Усталость от решений', 'Постоянный взгляд в экран', 'Давление сроков', 'Неумение переключиться', 'Тревога перед понедельником'],
        approaches: [
          { title: 'Перезагрузка на Работе', desc: 'Простые 5-минутные дыхательные паузы между сложными задачами.' },
          { title: 'Спокойный Фокус', desc: 'Привычки заземления для ясного мышления и взвешенных решений.' },
          { title: 'Вечерняя Граница', desc: 'Мягкие вечерние ритуалы для полноценного отдыха от работы.' }
        ]
      },
      subtle: {
        label: 'Внутренний Баланс',
        title: 'Поток Энергии и Внутренний Покой',
        italicPremise: 'Баланс нади. Гармония чакр. Пробуждение безмолвия внутри.',
        paragraph: 'Соединение с естественным потоком жизненной энергии – балансировка активных и созидательных сил, гармонизация 7 чакр для устойчивого покоя и осознанности.',
        checkmarks: [
          'Балансирует активную и восстанавливающую внутреннюю энергию',
          'Возвращает гармонию через сонастройку 7 энергетических центров',
          'Мягко устраняет зажимы для легкого погружения в медитацию',
          'Соединяет физическую бодрость с глубоким душевным миром'
        ],
        experiences: ['Жажда глубокой тишины', 'Застой в медитации', 'Энергетический дисбаланс', 'Хаос в мыслях', 'Поиск внутреннего стержня', 'Духовный поиск'],
        approaches: [
          { title: 'Гармония Чакр', desc: 'Медитативная сонастройка 7 тонких энергетических центров.' },
          { title: 'Баланс Нади', desc: 'Уравновешивание солнечной активности и лунного спокойствия.' },
          { title: 'Внутреннее Присутствие', desc: 'Укоренение нерушимого спокойствия в ритме современной жизни.' }
        ]
      }
    },
    differentiators: {
      tag: 'ПОЧЕМУ СТОИТ РАБОТАТЬ С ДОКТОРОМ МАЯНКОМ',
      title: 'Мультидисциплинарный Подход',
      subtitle: 'Редкий мост между доказательной наукой, бережным пониманием и подлинной медитацией.',
      learnMore: 'Узнать, почему это важно →',
      showLess: 'Свернуть ↑',
      items: [
        {
          tag: '🧠 Наука + Медитация',
          title: 'Двойной Взгляд',
          body: 'Объединение медицины и медитации для глубинного понимания вашего благополучия.',
          detail: 'Редко можно встретить врача, глубоко почитающего внутренний покой, или мастера медитации, досконально понимающего физиологию тела.'
        },
        {
          tag: '🌿 Просто и Применимо',
          title: 'Ясно и Практично',
          body: 'Никаких сложных абстрактных теорий. Только понятные рекомендации для реальной жизни.',
          detail: 'Мы уважаем ваши взгляды без навязывания догм. Все методы бережны, практичны и приносят ощутимое облегчение.'
        },
        {
          tag: '💫 Индивидуальная Забота',
          title: 'Забота, Созданная для Вас',
          body: 'Ваш путь уникален. Вы получаете ведение, созданное точно под ваши потребности и эмоции.',
          detail: 'Нужно ли вам успокоить дыхание, отпустить переживания или обрести ясность – каждая практика настраивается под вас.'
        },
        {
          tag: '🌱 Пожизненная Самостоятельность',
          title: 'Опора на Собственные Силы',
          body: 'Освойте простые инструменты, которые вы сможете уверенно применять самостоятельно.',
          detail: 'Вы завершите курс с личной картой спокойствия и ежедневными привычками, сохраняющими центрированность при любых бурях.'
        }
      ]
    }
  }
};

// 11. ABOUT SECTION ADDITIONS (Chapters, DualLens, Navigator Presets, DeepBenefits, MeditationPaths, UI labels)
const aboutChapters = {
  en: [
    { id: 'chapter-1', title: 'Threshold & Story' },
    { id: 'chapter-pillars', title: 'Science × Meditation × Spirit' },
    { id: 'chapter-2', title: 'The Dual Lens' },
    { id: 'chapter-3', title: 'Inner State Navigator' },
    { id: 'chapter-benefits', title: 'Real & Deep Benefits' },
    { id: 'chapter-4', title: 'Core Differentiators' },
    { id: 'chapter-5', title: 'Cinematic Stillness' },
    { id: 'chapter-6', title: 'Paths to Inner Balance' },
    { id: 'chapter-7', title: 'Session Formats' },
    { id: 'chapter-8', title: 'Culmination' }
  ],
  de: [
    { id: 'chapter-1', title: 'Schwelle & Geschichte' },
    { id: 'chapter-pillars', title: 'Wissenschaft × Meditation × Geist' },
    { id: 'chapter-2', title: 'Die Doppelte Perspektive' },
    { id: 'chapter-3', title: 'Innerer Zustands-Navigator' },
    { id: 'chapter-benefits', title: 'Echte & Tiefgehende Vorteile' },
    { id: 'chapter-4', title: 'Kerneigenschaften' },
    { id: 'chapter-5', title: 'Heilsame Stille' },
    { id: 'chapter-6', title: 'Wege zur Inneren Balance' },
    { id: 'chapter-7', title: 'Sitzungs-Formate' },
    { id: 'chapter-8', title: 'Rückkehr zu sich selbst' }
  ],
  fr: [
    { id: 'chapter-1', title: 'Seuil & Histoire' },
    { id: 'chapter-pillars', title: 'Science × Méditation × Esprit' },
    { id: 'chapter-2', title: 'Le Double Prisme' },
    { id: 'chapter-3', title: 'Navigateur d’État Intérieur' },
    { id: 'chapter-benefits', title: 'Bienfaits Réels & Profonds' },
    { id: 'chapter-4', title: 'Différenciateurs Clés' },
    { id: 'chapter-5', title: 'Tranquillité Cinématique' },
    { id: 'chapter-6', title: 'Voies vers l’Équilibre' },
    { id: 'chapter-7', title: 'Formats de Séances' },
    { id: 'chapter-8', title: 'Retour à Soi' }
  ],
  ro: [
    { id: 'chapter-1', title: 'Prag & Poveste' },
    { id: 'chapter-pillars', title: 'Știință × Meditație × Spirit' },
    { id: 'chapter-2', title: 'Dubla Perspectivă' },
    { id: 'chapter-3', title: 'Navigator de Stare Interioară' },
    { id: 'chapter-benefits', title: 'Beneficii Reale & Profunde' },
    { id: 'chapter-4', title: 'Diferențiatori Cheie' },
    { id: 'chapter-5', title: 'Liniște Cinematografică' },
    { id: 'chapter-6', title: 'Căi spre Echilibru Interior' },
    { id: 'chapter-7', title: 'Formate de Sesiuni' },
    { id: 'chapter-8', title: 'Întoarcerea la Tine' }
  ],
  ru: [
    { id: 'chapter-1', title: 'Порог и История' },
    { id: 'chapter-pillars', title: 'Наука × Медитация × Дух' },
    { id: 'chapter-2', title: 'Двойной Взгляд' },
    { id: 'chapter-3', title: 'Навигатор Внутренних Состояний' },
    { id: 'chapter-benefits', title: 'Глубокие и Реальные Результаты' },
    { id: 'chapter-4', title: 'Ключевые Отличия' },
    { id: 'chapter-5', title: 'Целительная Тишина' },
    { id: 'chapter-6', title: 'Пути к Внутреннему Балансу' },
    { id: 'chapter-7', title: 'Форматы Сессий' },
    { id: 'chapter-8', title: 'Возвращение к Себе' }
  ]
};

const aboutDualLens = {
  en: {
    tag: 'CHAPTER II • SCIENCE & CONTEMPLATIVE MASTERY',
    title: 'The Dual Lens: Science Meets Stillness',
    subtitle: 'A rare foundation uniting grounded scientific understanding with 15+ years of authentic ancient contemplative mastery.',
    badgeDoctor: 'PRACTICAL SCIENCE',
    card1Title: 'Doctor of Medicine (M.D.)',
    card1Desc: 'Scientific foundation understanding stress patterns, breathing, and how the body responds to everyday pressure.',
    card1Chips: ['🩺 Mind-Body Connection', '⚡ Natural Calming Reflex', '🧠 Deep Rest & Sleep Habits'],
    card1Expand: 'Explore how the body responds',
    card1Collapse: 'Hide how the body responds',
    card1Insight1Title: 'Personal Understanding:',
    card1Insight1Desc: 'Looking closely at how everyday stress, fatigue, and muscle tension build up in your body.',
    card1Insight2Title: 'Natural Reset:',
    card1Insight2Desc: 'Calming overactive stress reactions and supporting your body’s natural ability to rest, digest, and feel refreshed.',
    card1FooterFormat: 'Grounded, Evidence-Informed Framework',
    badgeMaster: '15+ YEARS MASTERY',
    card2Title: 'Meditation Master & Spiritual Journey',
    card2Desc: 'Over 15 years immersed in ancient contemplative traditions, mastering authentic breathwork, acoustic resonance, and subtle bio-energetic alignment.',
    card2Chips: ['🪷 Pranayama Breathwork', '☸️ 7-Chakra Frequency', '🔔 Vibrational Sound Resonance'],
    card2Expand: 'Explore contemplative traditions',
    card2Collapse: 'Hide contemplative traditions',
    card2Insight1Title: 'Subtle Energy Awakening:',
    card2Insight1Desc: 'Clearing stagnant energetic patterns from root to crown via sacred acoustic resonance, visualization, and breath.',
    card2Insight2Title: 'Pure Witness Presence:',
    card2Insight2Desc: 'Quieting continuous mental chatter to access direct stillness, emotional balance, and unshakeable inner peace.',
    card2FooterFormat: 'Authentic Lineage & Direct Practice',
    card3Badge: 'BESPOKE 1:1 SANCTUARY',
    card3Title: 'How Science and Stillness Meet in Your Session',
    card3Desc: 'In your personal session with Dr. Mayank, you never have to separate the physical body from the spirit. We look at where your body is holding tension and apply gentle, time-tested practices to bring your mind and body into peaceful harmony.',
    card3Steps: [
      { heading: 'Attentive Listening', body: 'Listening with warmth and clarity, understanding where tension is held in your mind, emotions, or body.' },
      { heading: 'Personalized Practices', body: 'Guided through gentle breathing exercises, calming sound, and energy balancing shaped around your needs.' },
      { heading: 'Daily Life Habits', body: 'Creating simple 5-minute daily habits so the peace you feel stays with you throughout your everyday life.' }
    ],
    card3FooterFormat: 'Completely Personalized 1:1 Guidance & Immersion',
    card3Cta: 'Book a Personal 1:1 Session',
    experienceSession: 'Experience in 1:1 Session'
  },
  de: {
    tag: 'KAPITEL II • WISSENSCHAFT & KONTEMPLATIVE MEISTERSCHAFT',
    title: 'Die Doppelte Perspektive: Wissenschaft Trifft Stille',
    subtitle: 'Ein seltenes Fundament, das fundiertes medizinisches Wissen mit über 15 Jahren authentischer Meditationspraxis vereint.',
    badgeDoctor: 'PRAKTISCHE WISSENSCHAFT',
    card1Title: 'Doktor der Medizin (M.D.)',
    card1Desc: 'Wissenschaftliches Verständnis von Stressmustern, Atmung und den natürlichen Reaktionen des Nervensystems.',
    card1Chips: ['🩺 Geist-Körper-Einheit', '⚡ Natürlicher Entspannungsreflex', '🧠 Tiefe Ruhe & Schlafrhythmus'],
    card1Expand: 'Reaktion des Körpers verstehen',
    card1Collapse: 'Details verbergen',
    card1Insight1Title: 'Individuelles Verständnis:',
    card1Insight1Desc: 'Genaues Erkennen, wo sich alltäglicher Stress, Erschöpfung und Muskelanspannung im Körper festsetzen.',
    card1Insight2Title: 'Natürlicher Reset:',
    card1Insight2Desc: 'Überaktive Stressreaktionen beruhigen und die körpereigene Fähigkeit zu Erholung und Regeneration stärken.',
    card1FooterFormat: 'Wissenschaftlich fundiertes Begleitkonzept',
    badgeMaster: '15+ JAHRE MEISTERSCHAFT',
    card2Title: 'Meditationsmeister & Spiritueller Weg',
    card2Desc: 'Über 15 Jahre Vertiefung in alten kontemplativen Traditionen, meisterhafte Atemarbeit, Klangresonanz und feine Energiearbeit.',
    card2Chips: ['🪷 Pranayama-Atemarbeit', '☸️ 7-Chakren-Harmonie', '🔔 Heilsame Klangschwingung'],
    card2Expand: 'Traditionen entdecken',
    card2Collapse: 'Traditionen verbergen',
    card2Insight1Title: 'Energetische Harmonie:',
    card2Insight1Desc: 'Lösen blockierter Energiemuster von der Wurzel bis zur Krone durch Klang, Visualisierung und Atem.',
    card2Insight2Title: 'Reine Gegenwärtigkeit:',
    card2Insight2Desc: 'Das Gedankenkarussell beruhigen, um zu direkter Stille, seelischem Gleichgewicht und Frieden zu finden.',
    card2FooterFormat: 'Authentische Linie & gelebte Erfahrung',
    card3Badge: 'PERSÖNLICHES 1:1 REFUGIUM',
    card3Title: 'Wie Wissenschaft und Stille in Ihrer Sitzung Zusammenfinden',
    card3Desc: 'In Ihrer persönlichen Sitzung mit Dr. Mayank trennen Sie den Körper niemals vom Geist. Wir betrachten Anspannungen ganzheitlich und bringen Körper und Seele in friedvolle Harmonie.',
    card3Steps: [
      { heading: 'Aufmerksames Zuhören', body: 'Warmherziges und klares Verstehen, wo Anspannung in Geist, Gefühlen oder Körper gehalten wird.' },
      { heading: 'Individuelle Übungen', body: 'Geführte sanfte Atemübungen, heilsamer Klang und Energieausgleich, abgestimmt auf Ihre Bedürfnisse.' },
      { heading: 'Einfache Alltagsrituale', body: 'Kleine 5-Minuten-Gewohnheiten für den Tag, damit der erfahrene Frieden Sie überallhin begleitet.' }
    ],
    card3FooterFormat: 'Vollständig personalisierte 1:1-Begleitung',
    card3Cta: 'Persönliche 1:1-Sitzung buchen',
    experienceSession: 'In 1:1-Sitzung erleben'
  },
  fr: {
    tag: 'CHAPITRE II • SCIENCE & MAÎTRISE CONTEMPLATIVE',
    title: 'Le Double Prisme : Quand la Science Rencontre le Silence',
    subtitle: 'Une alliance rare unissant une compréhension médicale rigoureuse à plus de 15 ans de pratique contemplative authentique.',
    badgeDoctor: 'SCIENCE PRATIQUE',
    card1Title: 'Docteur en Médecine (M.D.)',
    card1Desc: 'Compréhension scientifique des mécanismes du stress, de la respiration et des réponses physiologiques du corps.',
    card1Chips: ['🩺 Connexion Esprit-Corps', '⚡ Réflexe Naturel de Détente', '🧠 Repos Profond & Rythmes de Sommeil'],
    card1Expand: 'Comprendre la réponse du corps',
    card1Collapse: 'Masquer la réponse du corps',
    card1Insight1Title: 'Compréhension Personnelle :',
    card1Insight1Desc: 'Observer précisément comment le stress quotidien, la fatigue et les tensions musculaires s’accumulent.',
    card1Insight2Title: 'Réinitialisation Naturelle :',
    card1Insight2Desc: 'Apaiser les réactions de stress excessives et stimuler la capacité naturelle du corps à se régénérer.',
    card1FooterFormat: 'Cadre rigoureux et fondé sur les faits',
    badgeMaster: '15+ ANS DE MAÎTRISE',
    card2Title: 'Maître de Méditation & Chemin Intérieur',
    card2Desc: 'Plus de 15 ans d’immersion dans les traditions contemplatives, maîtrisant le souffle pranayama, la résonance acoustique et l’énergie subtile.',
    card2Chips: ['🪷 Souffle Pranayama', '☸️ Harmonie des 7 Chakras', '🔔 Résonance Sonore Vibratoire'],
    card2Expand: 'Explorer les traditions',
    card2Collapse: 'Masquer les traditions',
    card2Insight1Title: 'Éveil Énergétique Subtil :',
    card2Insight1Desc: 'Libérer les blocages de la racine au sommet par la résonance acoustique, la visualisation et le souffle.',
    card2Insight2Title: 'Présence Témoin Pure :',
    card2Insight2Desc: 'Apaiser le flux mental pour accéder au silence direct, à la paix intérieure et à l’équilibre.',
    card2FooterFormat: 'Lignée authentique et pratique directe',
    card3Badge: 'SANCTUAIRE SUR MESURE 1:1',
    card3Title: 'Comment Science et Sérénité se Rencontrent en Séance',
    card3Desc: 'Dans votre séance privée avec le Dr Mayank, le corps et l’esprit ne sont jamais séparés. Nous identifions vos tensions et appliquons des pratiques douces pour retrouver l’harmonie.',
    card3Steps: [
      { heading: 'Écoute Attentive', body: 'Comprendre avec bienveillance où se logent les tensions dans votre esprit, vos émotions ou votre corps.' },
      { heading: 'Pratiques Personnalisées', body: 'Guidance à travers des respirations douces, des sons apaisants et un rééquilibrage énergétique sur mesure.' },
      { heading: 'Habitudes Quotidiennes', body: 'Créer de petits rituels de 5 minutes pour que la paix ressentie vous accompagne dans votre vie.' }
    ],
    card3FooterFormat: 'Accompagnement 1:1 entièrement sur mesure',
    card3Cta: 'Réserver une Séance 1:1',
    experienceSession: 'Vivre en Séance 1:1'
  },
  ro: {
    tag: 'CAPITOLUL II • ȘTIINȚĂ & MĂIESTRIE CONTEMPLATIVĂ',
    title: 'Dubla Perspectivă: Știința Întâlnește Liniștea',
    subtitle: 'O fundație rară ce unește înțelegerea medicală solidă cu peste 15 ani de măiestrie contemplativă autentică.',
    badgeDoctor: 'ȘTIINȚĂ PRACTICĂ',
    card1Title: 'Doctor în Medicină (M.D.)',
    card1Desc: 'Bază științifică ce elucidează tiparele de stres, respirația și modul în care corpul răspunde la presiunea zilnică.',
    card1Chips: ['🩺 Conexiune Minte-Corp', '⚡ Reflex Natural de Calmare', '🧠 Odihnă Profundă & Ritm de Somn'],
    card1Expand: 'Înțelege răspunsul corpului',
    card1Collapse: 'Ascunde răspunsul corpului',
    card1Insight1Title: 'Înțelegere Personală:',
    card1Insight1Desc: 'Observarea atentă a modului în care stresul cotidian, oboseala și tensiunea musculară se acumulează.',
    card1Insight2Title: 'Resetare Naturală:',
    card1Insight2Desc: 'Calmarea reacțiilor exagerate de stres și sprijinirea capacității naturale a corpului de a se reface.',
    card1FooterFormat: 'Cadru fundamentat științific',
    badgeMaster: '15+ ANI DE MĂIESTRIE',
    card2Title: 'Maestru de Meditație & Călătorie Interioară',
    card2Desc: 'Peste 15 ani dedicați tradițiilor contemplative străvechi, stăpânind respirația pranayama, rezonanța acustică și alinierea energetică.',
    card2Chips: ['🪷 Respirație Pranayama', '☸️ Frecvența celor 7 Chakre', '🔔 Rezonanță Sonoră Vibratorie'],
    card2Expand: 'Explorează tradițiile',
    card2Collapse: 'Ascunde tradițiile',
    card2Insight1Title: 'Trezirea Energiei Subtile:',
    card2Insight1Desc: 'Curățarea blocajelor de la rădăcină la creștet prin sunet sacru, vizualizare și respirație conștientă.',
    card2Insight2Title: 'Prezență Conștientă:',
    card2Insight2Desc: 'Liniștirea agitației mentale pentru a accesa tăcerea directă, echilibrul emoțional și pacea profundă.',
    card2FooterFormat: 'Practică directă și tradiție autentică',
    card3Badge: 'SANCTUAR PERSONALIZAT 1:1',
    card3Title: 'Cum se Întâlnesc Știința și Liniștea în Sesiunea Ta',
    card3Desc: 'În sesiunea ta cu Dr. Mayank, nu separi niciodată corpul fizic de spirit. Identificăm unde este reținută tensiunea și aplicăm practici blânde pentru armonie totală.',
    card3Steps: [
      { heading: 'Ascultare Atentă', body: 'Ascultare cu căldură și claritate, înțelegând unde s-a acumulat tensiunea în minte, emoții sau corp.' },
      { heading: 'Practici Personalizate', body: 'Ghidare prin exerciții blânde de respirație, sunet terapeutic și echilibrare energetică adaptată nevoilor tale.' },
      { heading: 'Obiceiuri pentru Viața de Zi cu Zi', body: 'Crearea de mici obiceiuri de 5 minute, astfel încât pacea trăită să rămână cu tine mereu.' }
    ],
    card3FooterFormat: 'Ghidare 1:1 complet personalizată',
    card3Cta: 'Rezervă o Sesiune Privată 1:1',
    experienceSession: 'Experimentează în Sesiune 1:1'
  },
  ru: {
    tag: 'ГЛАВА II • НАУКА И СОЗЕРЦАТЕЛЬНОЕ МАСТЕРСТВО',
    title: 'Двойной Взгляд: Наука Встречает Безмолвие',
    subtitle: 'Редкий сплав доказательных медицинских знаний и более чем 15 лет подлинной практики созерцания.',
    badgeDoctor: 'ПРАКТИЧЕСКАЯ НАУКА',
    card1Title: 'Доктор Медицины (M.D.)',
    card1Desc: 'Научное понимание механизмов стресса, физиологии дыхания и реакций тела на перегрузки.',
    card1Chips: ['🩺 Связь Разума и Тела', '⚡ Природный Рефлекс Покоя', '🧠 Глубокий Отдых и Сон'],
    card1Expand: 'Понять реакцию тела',
    card1Collapse: 'Скрыть детали',
    card1Insight1Title: 'Индивидуальное Понимание:',
    card1Insight1Desc: 'Точное определение того, где в теле накапливаются стресс, переутомление и мышечные спазмы.',
    card1Insight2Title: 'Естественная Перезагрузка:',
    card1Insight2Desc: 'Снятие избыточных стрессовых реакций и поддержка способности тела к глубокому самовосстановлению.',
    card1FooterFormat: 'Научно обоснованная методика',
    badgeMaster: '15+ ЛЕТ МАСТЕРСТВА',
    card2Title: 'Мастер Медитации и Внутренний Путь',
    card2Desc: 'Более 15 лет погружения в древние созерцательные традиции, мастерство пранаямы, акустического резонанса и тонких энергий.',
    card2Chips: ['🪷 Дыхание Пранаямы', '☸️ Баланс 7 Чакр', '🔔 Исцеляющие Звуковые Вибрации'],
    card2Expand: 'Исследовать традиции',
    card2Collapse: 'Скрыть традиции',
    card2Insight1Title: 'Пробуждение Тонкой Энергии:',
    card2Insight1Desc: 'Мягкое снятие застойных блоков от муладхары до сахасрары через звук, визуализацию и дыхание.',
    card2Insight2Title: 'Чистое Присутствие:',
    card2Insight2Desc: 'Успокоение непрерывного мысленного шума для входа в состояние внутренней тишины и стабильного мира.',
    card2FooterFormat: 'Аутентичная традиция и личный опыт',
    card3Badge: 'ИНДИВИДУАЛЬНОЕ СВЯТИЛИЩЕ 1:1',
    card3Title: 'Как Наука и Покой Соединяются на Сессии',
    card3Desc: 'На личной консультации с доктором Маянком тело и дух никогда не разделяются. Мы бережно выявляем напряжение и гармонизируем физическое и внутреннее состояние.',
    card3Steps: [
      { heading: 'Внимательное Слушание', body: 'Чуткое понимание того, где именно заблокировано напряжение – в мыслях, эмоциях или теле.' },
      { heading: 'Индивидуальные Практики', body: 'Мягкие дыхательные техники, целительные звуки и энергетический баланс под ваш запрос.' },
      { heading: 'Привычки для Жизни', body: 'Простые 5-минутные микро-ритуалы, чтобы обретенный покой оставался с вами в суете каждого дня.' }
    ],
    card3FooterFormat: 'Полностью персональное ведение 1:1',
    card3Cta: 'Записаться на Сессию 1:1',
    experienceSession: 'Пройти на Сессии 1:1'
  }
};

const aboutProtocolPresets = {
  en: {
    stress: {
      id: 'stress',
      num: '01',
      duration: 'CALMING RESET',
      icon: '⚡',
      label: 'Stress & Overthinking',
      focusName: 'Calming the Mind & Restoring Inner Peace',
      target: 'Everyday Stress & Overwhelm',
      shortDesc: 'When constant pressure keeps your mind racing, it feels difficult to unwind and settle into calm.',
      beforeState: 'Overwhelmed & Restless',
      afterState: 'Deep Calm & Peaceful Rest',
      format: 'Quick Calming & Relaxation',
      medicalInsight: 'When stress builds up over time, it drains your daily focus, makes thoughts spin in circles, and makes it hard to unwind.',
      spiritualApproach: 'Gentle rhythmic breathing and peaceful guided stillness that help you naturally feel grounded, calm, and quiet inside.',
      transformation: 'Soothing relaxation, an end to racing thoughts, a reassuring sense of calm, and refreshing, natural rest.'
    },
    fatigue: {
      id: 'fatigue',
      num: '02',
      duration: 'NATURAL RECHARGE',
      icon: '🌧️',
      label: 'Tiredness & Burnout',
      focusName: 'Renewing Daily Vitality & Focus',
      target: 'Drained Energy & Overwhelm',
      shortDesc: 'Long days of endless tasks and non-stop rushing drain your energy, leaving you feeling weary and worn out.',
      beforeState: 'Drained & Foggy',
      afterState: 'Refreshed Calm & Clear Mind',
      format: 'Deep Energy Recharge',
      medicalInsight: 'Continuous pressure and everyday strain wear down your natural energy stores, leaving your focus foggy and stamina low.',
      spiritualApproach: 'Gentle energy balancing, deeply restful guided relaxation, and soothing sound harmonies to refresh your outlook.',
      transformation: 'Fresh mental clarity, an uplifting feeling of lightness, and a peaceful enthusiasm for your everyday life.'
    },
    blocks: {
      id: 'blocks',
      num: '03',
      duration: 'GENTLE RELEASE',
      icon: '🌀',
      label: 'Held Emotions & Lingering Stress',
      focusName: 'Gentle Relaxation & Letting Go',
      target: 'Unreleased Everyday Stress',
      shortDesc: 'Unresolved feelings and daily pressure often build up as quiet stress, leaving you feeling weighed down and uneasy.',
      beforeState: 'Weighed Down & Tense',
      afterState: 'Light, Free & Peaceful',
      format: 'Gentle Emotional Release',
      medicalInsight: 'Ongoing stress and heavy feelings can build up over time, creating a sense of heaviness, fatigue, and unease.',
      spiritualApproach: 'Calming visualization, gentle sound tones, and supportive, accepting guidance to help ease and release old stress.',
      transformation: 'A gentle release of heaviness, emotional freedom, clear peace of mind, and an effortless sense of ease.'
    },
    growth: {
      id: 'growth',
      num: '04',
      duration: 'INNER PEACE',
      icon: '🕊️',
      label: 'Inner Meaning & Deeper Calling',
      focusName: 'Quiet Stillness & Self-Discovery',
      target: 'Inner Peace & Direction',
      shortDesc: 'A desire for lasting inner quiet, a clear mind free from constant worry, and a direct connection to what truly matters.',
      beforeState: 'Feeling Lost & Disconnected',
      afterState: 'Clear Insight & Peaceful Stillness',
      format: 'Personal 1:1 Mentorship',
      medicalInsight: 'Quieting constant mental chatter and everyday noise allows your mind to rest in a rare, clear state of effortless focus and calm.',
      spiritualApproach: 'Direct 1:1 guidance in deep, quiet meditation, helping you return to your authentic inner self beyond everyday stress.',
      transformation: 'Crystal-clear direction, deep tranquility, freedom from inner conflict, and an unshakeable connection to who you truly are.'
    }
  },
  de: {
    stress: {
      id: 'stress',
      num: '01',
      duration: 'BERUHIGENDER RESET',
      icon: '⚡',
      label: 'Stress & Gedankenkreisen',
      focusName: 'Geist beruhigen & inneren Frieden wiederfinden',
      target: 'Alltagsstress & Überlastung',
      shortDesc: 'Wenn ständiger Druck die Gedanken rasen lässt, fällt es schwer, zur Ruhe zu kommen und Gelassenheit zu spüren.',
      beforeState: 'Überwältigt & Unruhig',
      afterState: 'Tiefe Ruhe & Gelassenheit',
      format: 'Sanfte Beruhigung & Entspannung',
      medicalInsight: 'Dauerhafter Stress schwächt die Konzentration, lässt Gedanken kreisen und verhindert echte Erholung.',
      spiritualApproach: 'Sanfte Atemrhythmen und geführte Stille, die Sie wieder im Hier und Jetzt verankern und Frieden schenken.',
      transformation: 'Wohltuende Entspannung, ein Ende des Gedankensturms und ein erfrischendes Gefühl natürlicher Leichtigkeit.'
    },
    fatigue: {
      id: 'fatigue',
      num: '02',
      duration: 'NATÜRLICHE REGENERATION',
      icon: '🌧️',
      label: 'Erschöpfung & Burnout',
      focusName: 'Vitalität & Fokus erneuern',
      target: 'Leere Energiespeicher & Erschöpfung',
      shortDesc: 'Lange Tage voller Aufgaben und ständige Hektik rauben die Energie und hinterlassen ein Gefühl von innerer Leere.',
      beforeState: 'Erschöpft & Kraftlos',
      afterState: 'Erfrischte Ruhe & Klarheit',
      format: 'Tiefgehende Energie-Regeneration',
      medicalInsight: 'Ständige Belastung verbraucht die körpereigenen Energiereserven, trübt den Geist und mindert die Ausdauer.',
      spiritualApproach: 'Sanfte Energie-Harmonisierung, tief entspannende Ruhephasen und heilsame Klänge zur Erneuerung der Lebenskraft.',
      transformation: 'Klare Gedanken, ein Gefühl von Leichtigkeit und neue, freudvolle Motivation für Ihren Alltag.'
    },
    blocks: {
      id: 'blocks',
      num: '03',
      duration: 'SANFTES LOSLASSEN',
      icon: '🌀',
      label: 'Gestautes & Emotionale Last',
      focusName: 'Sanftes Entspannen & Befreien',
      target: 'Angestaute emotionale Spannung',
      shortDesc: 'Ungelöste Gefühle und alltäglicher Druck stauen sich unbemerkt an und erzeugen ein Gefühl von Schwere.',
      beforeState: 'Belastet & Angespannt',
      afterState: 'Leicht, Frei & Friedvoll',
      format: 'Sanfte Emotionale Entlastung',
      medicalInsight: 'Chronische Anspannung und unterdrückte Gefühle führen zu körperlicher Steifheit und seelischer Bedrückung.',
      spiritualApproach: 'Beruhigende Visualisierung, weiche Klangschwingungen und annehmende Führung zum leichten Loslassen alter Lasten.',
      transformation: 'Spürbare Befreiung von Schwere, seelischer Frieden, innere Weite und ein Gefühl müheloser Leichtigkeit.'
    },
    growth: {
      id: 'growth',
      num: '04',
      duration: 'INNERER FRIEDEN',
      icon: '🕊️',
      label: 'Tieferer Sinn & Selbstfindung',
      focusName: 'Stille & Selbsterkenntnis',
      target: 'Innere Klarheit & Lebensausrichtung',
      shortDesc: 'Die Sehnsucht nach dauerhafter innerer Ruhe, einem klaren Geist und einer tiefen Verbindung zu dem, was wirklich zählt.',
      beforeState: 'Orientierungslos & Getrennt',
      afterState: 'Klare Einsicht & Tiefe Stille',
      format: 'Persönliches 1:1 Mentoring',
      medicalInsight: 'Das Beruhigen des ständigen Denkens ermöglicht es dem Gehirn, in einen Zustand müheloser Klarheit einzutauchen.',
      spiritualApproach: 'Direkte 1:1-Führung in tiefer Meditation, um zum wahren, unberührten Wesenskern zurückzufinden.',
      transformation: 'Glasklare Orientierung, tiefe Gelassenheit, Freiheit von inneren Konflikten und unerschütterlicher innerer Halt.'
    }
  },
  fr: {
    stress: {
      id: 'stress',
      num: '01',
      duration: 'RESET APAISANT',
      icon: '⚡',
      label: 'Stress & Pensées Envahissantes',
      focusName: 'Apaiser l’esprit & retrouver la paix',
      target: 'Stress quotidien & surcharge',
      shortDesc: 'Quand la pression permanente fait tourner l’esprit à plein régime, il devient difficile de décompresser.',
      beforeState: 'Submergé & Agité',
      afterState: 'Calme Profond & Repos Serein',
      format: 'Apaisement Rapide & Relaxation',
      medicalInsight: 'Le stress chronique épuise la concentration, génère des boucles de pensées et bloque la détente naturelle.',
      spiritualApproach: 'Respiration rythmée et calme guidé permettant de s’ancrer naturellement dans la paix intérieure.',
      transformation: 'Détente réparatrice, fin du tourbillon des pensées et sensation rassurante de sécurité et de repos.'
    },
    fatigue: {
      id: 'fatigue',
      num: '02',
      duration: 'RECHARGE NATURELLE',
      icon: '🌧️',
      label: 'Épuisement & Burnout',
      focusName: 'Renouveler l’énergie & le focus',
      target: 'Énergie épuisée & surcharge',
      shortDesc: 'Des journées sans fin et une course constante vident vos réserves et vous laissent las et vulnérable.',
      beforeState: 'Épuisé & Brouillé',
      afterState: 'Calme Rafraîchi & Esprit Clair',
      format: 'Recharge Énergétique Profonde',
      medicalInsight: 'La tension continue épuise les réserves cellulaires, altère la clarté mentale et diminue l’endurance.',
      spiritualApproach: 'Harmonisation énergétique douce, relaxation guidée et sons harmonieux pour renouveler votre vitalité.',
      transformation: 'Clarté d’esprit retrouvée, sensation d’allègement et enthousiasme paisible pour votre quotidien.'
    },
    blocks: {
      id: 'blocks',
      num: '03',
      duration: 'LIBÉRATION DOUCE',
      icon: '🌀',
      label: 'Émotions Retenues & Tensions',
      focusName: 'Relaxation Douce & Lâcher-Prise',
      target: 'Tensions émotionnelles accumulées',
      shortDesc: 'Les ressentis non exprimés et la pression s’accumulent en stress silencieux, créant une sensation de lourdeur.',
      beforeState: 'Alourdi & Tendu',
      afterState: 'Léger, Libre & En Paix',
      format: 'Libération Émotionnelle Douce',
      medicalInsight: 'Les émotions enfouies créent des tensions musculaires chroniques, de la fatigue et un inconfort diffus.',
      spiritualApproach: 'Visualisation apaisante, sons harmonisants et accompagnement bienveillant pour déposer les fardeaux.',
      transformation: 'Allègement immédiat, liberté émotionnelle, clarté d’esprit et sentiment d’aisance naturelle.'
    },
    growth: {
      id: 'growth',
      num: '04',
      duration: 'PAIX PROFONDE',
      icon: '🕊️',
      label: 'Sens Intérieur & Vocation',
      focusName: 'Silence Paisible & Découverte de Soi',
      target: 'Paix Intérieure & Orientation',
      shortDesc: 'L’aspiration à un calme durable, un esprit libéré des soucis et une connexion directe à ce qui compte vraiment.',
      beforeState: 'Perdu & Déconnecté',
      afterState: 'Vision Claire & Silence Paisible',
      format: 'Mentorat Privé 1:1',
      medicalInsight: 'Apaiser le bavardage mental permet au cerveau d’accéder à un état rare de présence et de focus serein.',
      spiritualApproach: 'Accompagnement 1:1 dans la méditation profonde pour revenir à votre être authentique au-delà du stress.',
      transformation: 'Direction limpide, grande sérénité, résolution des conflits internes et lien solide avec vous-même.'
    }
  },
  ro: {
    stress: {
      id: 'stress',
      num: '01',
      duration: 'RESET DE CALMARE',
      icon: '⚡',
      label: 'Stres & Gânduri Agitate',
      focusName: 'Liniștirea minții & regăsirea păcii',
      target: 'Stres cotidian & copleșire',
      shortDesc: 'Când presiunea constantă menține mintea într-o goană continuă, este greu să te destinzi și să te liniștești.',
      beforeState: 'Copleșit & Neliniștit',
      afterState: 'Calm Profund & Odihnă Senină',
      format: 'Calmare Rapidă & Relaxare',
      medicalInsight: 'Stresul cronic epuizează concentrarea, învârte gândurile în cerc și blochează relaxarea naturală.',
      spiritualApproach: 'Respirație ritmică blândă și tăcere ghidată care te ancorează firesc într-o stare de liniște lăuntrică.',
      transformation: 'Relaxare reconfortantă, oprirea agitației mentale și o senzație liniștitoare de siguranță și odihnă.'
    },
    fatigue: {
      id: 'fatigue',
      num: '02',
      duration: 'REÎNCĂRCARE NATURALĂ',
      icon: '🌧️',
      label: 'Oboseală & Epuizare',
      focusName: 'Reînnoirea vitalității & a clarității',
      target: 'Energie epuizată & suprasolicitare',
      shortDesc: 'Zilele lungi cu sarcini nesfârșite îți consumă energia, lăsându-te sleit de puteri și fără elan.',
      beforeState: 'Epuizat & Încețoșat',
      afterState: 'Calm Înviorat & Minte Clară',
      format: 'Reîncărcare Energetică Profundă',
      medicalInsight: 'Tensiunea prelungită golește resursele energetice celulare, provocând lipsă de concentrare și slăbiciune.',
      spiritualApproach: 'Echilibrare energetică blândă, relaxare profundă ghidată și armonii sonore pentru reînnoirea forțelor.',
      transformation: 'Claritate mentală proaspătă, o senzație de ușurință și entuziasm senin pentru viața de zi cu zi.'
    },
    blocks: {
      id: 'blocks',
      num: '03',
      duration: 'ELIBERARE BLÂNDĂ',
      icon: '🌀',
      label: 'Emoții Reținute & Tensiuni',
      focusName: 'Relaxare Blândă & Detașare',
      target: 'Stres emoțional neeliberat',
      shortDesc: 'Sentimentele neexprimate și presiunea zilnică se acumulează ca stres mut, lăsând o senzație de apăsare.',
      beforeState: 'Împovărat & Încordat',
      afterState: 'Ușor, Liber & Împăcat',
      format: 'Eliberare Emoțională Blândă',
      medicalInsight: 'Emoțiile captive creează rigiditate corporală, oboseală cronică și o neliniște apăsătoare.',
      spiritualApproach: 'Vizualizare calmantă, tonuri sonore fine și îndrumare empatică pentru a lăsa în urmă vechile poveri.',
      transformation: 'Eliberarea apăsării, libertate emoțională, claritate sufletească și o stare firească de ușurință.'
    },
    growth: {
      id: 'growth',
      num: '04',
      duration: 'PACE LĂUNTRICĂ',
      icon: '🕊️',
      label: 'Sens Interior & Chemare Profundă',
      focusName: 'Tăcere Liniștită & Autocunoaștere',
      target: 'Pace Interioară & Direcție Clară',
      shortDesc: 'Dorința de liniște durabilă, o minte eliberată de griji și o legătură directă cu ceea ce contează cu adevărat.',
      beforeState: 'Rătăcit & Deconectat',
      afterState: 'Perspectivă Clară & Tăcere Senină',
      format: 'Mentorare Privată 1:1',
      medicalInsight: 'Liniștirea dialogului interior permite creierului să acceseze o stare rară de prezență și atenție neforțată.',
      spiritualApproach: 'Ghidare 1:1 în meditație profundă pentru a reveni la sinele tău autentic, dincolo de stresul lumii.',
      transformation: 'Direcție clară ca lumina zilei, liniște adâncă, împăcare cu sine și o conexiune solidă cu cine ești.'
    }
  },
  ru: {
    stress: {
      id: 'stress',
      num: '01',
      duration: 'УСПОКАИВАЮЩИЙ РЕСЕТ',
      icon: '⚡',
      label: 'Стресс и Рой Мыслей',
      focusName: 'Успокоение ума и возвращение покоя',
      target: 'Повседневный стресс и перегрузка',
      shortDesc: 'Когда постоянное напряжение заставляет мысли метаться по кругу, становится тяжело расслабиться и обрести покой.',
      beforeState: 'Перегружен и Тревожен',
      afterState: 'Глубокий Покой и Умиротворение',
      format: 'Быстрое Успокоение и Релаксация',
      medicalInsight: 'Накопленный стресс истощает внимание, заставляет мысли ходить по кругу и не дает нервной системе восстановиться.',
      spiritualApproach: 'Мягкое ритмичное дыхание и ведомая тишина, возвращающие вас в состояние заземленности и мира.',
      transformation: 'Успокаивающее расслабление, тишина в голове, теплое чувство безопасности и естественный отдых.'
    },
    fatigue: {
      id: 'fatigue',
      num: '02',
      duration: 'ПРИРОДНАЯ ПОДЗАРЯДКА',
      icon: '🌧️',
      label: 'Усталость и Выгорание',
      focusName: 'Восстановление энергии и ясности',
      target: 'Истощение сил и апатия',
      shortDesc: 'Длинные дни бесконечных дел и суеты выжимают силы, оставляя чувство опустошенности и бессилия.',
      beforeState: 'Истощен и Обессилен',
      afterState: 'Свежий Покой и Ясный Ум',
      format: 'Глубокая Энергетическая Подпитка',
      medicalInsight: 'Непрерывное давление истощает запасы клеточной энергии, притупляет внимание и лишает выносливости.',
      spiritualApproach: 'Мягкий баланс энергии, глубокая релаксация и целительные звуковые гармонии для прилива свежих сил.',
      transformation: 'Свежая ясность ума, вдохновляющее чувство легкости и спокойный интерес к жизни.'
    },
    blocks: {
      id: 'blocks',
      num: '03',
      duration: 'БЕРЕЖНОЕ ОТПУСКАНИЕ',
      icon: '🌀',
      label: 'Зажатые Эмоции и Напряжение',
      focusName: 'Мягкое Расслабление и Освобождение',
      target: 'Накопленный скрытый стресс',
      shortDesc: 'Невыраженные переживания и груз забот оседают тихим напряжением, создавая чувство тяжести на душе.',
      beforeState: 'Сдавлен и Напряжен',
      afterState: 'Легкий, Свободный и Спокойный',
      format: 'Мягкое Эмоциональное Освобождение',
      medicalInsight: 'Застарелый стресс и подавленные чувства создают мышечные спазмы, хроническую усталость и тревогу.',
      spiritualApproach: 'Успокаивающая визуализация, звуковые тона и чуткое ведение для мягкого отпускания прошлого.',
      transformation: 'Снятие тяжести с плеч, эмоциональная свобода, светлый мир в душе и чувство естественной легкости.'
    },
    growth: {
      id: 'growth',
      num: '04',
      duration: 'ВНУТРЕННИЙ МИР',
      icon: '🕊️',
      label: 'Глубинный Смысл и Призвание',
      focusName: 'Тишина и Познание Себя',
      target: 'Внутренний Покой и Направление',
      shortDesc: 'Стремление к устойчивому внутреннему покою, чистому сознанию без тревог и связи с тем, что действительно важно.',
      beforeState: 'Растерян и Отчужден',
      afterState: 'Ясное Видение и Глубокая Тишина',
      format: 'Личное Наставничество 1:1',
      medicalInsight: 'Остановка бесконечного мыслительного диалога погружает мозг в состояние редкого кристального покоя и фокуса.',
      spiritualApproach: 'Индивидуальное ведение в медитацию для возвращения к истинному себе за пределами внешнего мира.',
      transformation: 'Кристальная ясность пути, нерушимое спокойствие, свобода от внутренних терзаний и гармония с собой.'
    }
  }
};

const aboutUiLabels = {
  en: {
    pathsInSessionLabel: '1:1 Sanctuary Guidance:',
    pathsRequestInSession: 'Request This in Your Session',
    pathsExpandPrompt: 'In-session practice guidance',
    pathsHidePrompt: 'Hide session guidance',
    pathsTechniqueLabel: 'Technique',
    pathsShiftLabel: 'Primary Shift',
    pathsExplore8: 'Explore 8 Mindful Practices',
    pathsCollapse8: 'Collapse 8 Mindful Practices',
    scrollExplore: 'Scroll to Explore The Journey',
    bookSessionWithDr: 'Book a Personal 1:1 Session with Dr. Mayank',
    rootFocus: 'Root Focus:',
    exploreProtocol: 'Explore 3-phase protocol',
    hideProtocol: 'Hide 3-phase protocol',
    step1Title: '1. What Is Happening',
    step2Title: '2. Dr. Mayank\'s Reset',
    step3Title: '3. What You Experience',
    experienceInSession: 'Experience in 1:1 Session'
  },
  de: {
    pathsInSessionLabel: '1:1 Begleitung im Refugium:',
    pathsRequestInSession: 'In Ihrer Sitzung anfragen',
    pathsExpandPrompt: 'Praxis-Begleitung in der Sitzung',
    pathsHidePrompt: 'Praxis-Begleitung ausblenden',
    pathsTechniqueLabel: 'Technik',
    pathsShiftLabel: 'Primäre Wirkung',
    pathsExplore8: '8 Achtsamkeitspraktiken entdecken',
    pathsCollapse8: '8 Achtsamkeitspraktiken ausblenden',
    scrollExplore: 'Scrollen, um die Reise zu erkunden',
    bookSessionWithDr: 'Persönliche 1:1-Sitzung mit Dr. Mayank buchen',
    rootFocus: 'Kern-Fokus:',
    exploreProtocol: '3-Phasen-Protokoll erkunden',
    hideProtocol: '3-Phasen-Protokoll ausblenden',
    step1Title: '1. Was geschieht',
    step2Title: '2. Dr. Mayanks Reset',
    step3Title: '3. Was Sie erleben',
    experienceInSession: 'In 1:1-Sitzung erleben'
  },
  fr: {
    pathsInSessionLabel: 'Guidance 1:1 au Sanctuaire :',
    pathsRequestInSession: 'Demander dans votre séance',
    pathsExpandPrompt: 'Guidance pratique en séance',
    pathsHidePrompt: 'Masquer la guidance',
    pathsTechniqueLabel: 'Technique',
    pathsShiftLabel: 'Effet Principal',
    pathsExplore8: 'Explorer les 8 pratiques attentives',
    pathsCollapse8: 'Masquer les 8 pratiques attentives',
    scrollExplore: 'Défiler pour explorer le voyage',
    bookSessionWithDr: 'Réserver une séance 1:1 avec le Dr Mayank',
    rootFocus: 'Focus Clé :',
    exploreProtocol: 'Explorer le protocole en 3 phases',
    hideProtocol: 'Masquer le protocole',
    step1Title: '1. Ce qui se passe',
    step2Title: '2. Le Reset du Dr Mayank',
    step3Title: '3. Ce que vous ressentez',
    experienceInSession: 'Vivre en Séance 1:1'
  },
  ro: {
    pathsInSessionLabel: 'Ghidare 1:1 în Sanctuar:',
    pathsRequestInSession: 'Solicită în sesiunea ta',
    pathsExpandPrompt: 'Ghidare practică în sesiune',
    pathsHidePrompt: 'Ascunde ghidarea',
    pathsTechniqueLabel: 'Tehnică',
    pathsShiftLabel: 'Efect Principal',
    pathsExplore8: 'Explorează 8 practici conștiente',
    pathsCollapse8: 'Ascunde 8 practici conștiente',
    scrollExplore: 'Derulează pentru a explora călătoria',
    bookSessionWithDr: 'Rezervă o sesiune 1:1 cu Dr. Mayank',
    rootFocus: 'Focalizare Cheie:',
    exploreProtocol: 'Explorează protocolul în 3 etape',
    hideProtocol: 'Ascunde protocolul',
    step1Title: '1. Ce se întâmplă',
    step2Title: '2. Resetarea Dr. Mayank',
    step3Title: '3. Ce experimentezi',
    experienceInSession: 'Experimentează în Sesiune 1:1'
  },
  ru: {
    pathsInSessionLabel: 'Индивидуальное ведение 1:1:',
    pathsRequestInSession: 'Запросить на своей сессии',
    pathsExpandPrompt: 'Как проходит практика на сессии',
    pathsHidePrompt: 'Скрыть описание практики',
    pathsTechniqueLabel: 'Техника',
    pathsShiftLabel: 'Ключевой Результат',
    pathsExplore8: 'Открыть 8 осознанных практик',
    pathsCollapse8: 'Свернуть 8 осознанных практик',
    scrollExplore: 'Листайте вниз, чтобы исследовать путь',
    bookSessionWithDr: 'Записаться на сессию 1:1 с доктором Маянком',
    rootFocus: 'Фокус практики:',
    exploreProtocol: 'Исследовать 3-этапный протокол',
    hideProtocol: 'Свернуть протокол',
    step1Title: '1. Что происходит',
    step2Title: '2. Перезагрузка доктора Маянка',
    step3Title: '3. Ваш результат',
    experienceInSession: 'Пройти на Сессии 1:1'
  }
};

// APPLY UPDATES TO ALL 5 JSON OBJECTS
const targetLangs = [
  { key: 'en', obj: en },
  { key: 'de', obj: de },
  { key: 'fr', obj: fr },
  { key: 'ro', obj: ro },
  { key: 'ru', obj: ru }
];

targetLangs.forEach(({ key, obj }) => {
  // Nav
  obj.nav = obj.nav || {};
  Object.assign(obj.nav, navAdditions[key]);

  // Hero
  obj.hero = obj.hero || {};
  Object.assign(obj.hero, heroAdditions[key]);

  // Pause
  obj.pause = pauseAdditions[key];

  // Wellness
  obj.wellness = wellnessAdditions[key];

  // NotFound
  obj.notFound = notFoundAdditions[key];

  // Faq reachout
  obj.faq = obj.faq || {};
  obj.faq.reachOut = faqAdditions[key].reachOut;

  // Gallery
  obj.gallery = obj.gallery || {};
  obj.gallery.viewMoment = galleryUiAdditions[key].viewMoment;
  obj.gallery.empty = galleryUiAdditions[key].empty;
  if (galleryLocalized[key]?.categories) {
    obj.gallery.categories = galleryLocalized[key].categories;
  }

  // Three Pillars
  obj.threePillars = threePillarsData[key];

  // About Preview
  obj.aboutPreview = aboutPreviewData[key];

  // About Details
  obj.about = obj.about || {};
  obj.about.chapters = aboutChapters[key];
  obj.about.dualLens = aboutDualLens[key];
  obj.about.protocolPresets = aboutProtocolPresets[key];
  obj.about.ui = aboutUiLabels[key];

  // Stillness extras
  obj.stillness = obj.stillness || {};
  if (key === 'de') {
    obj.stillness.pressToBegin = 'Klicken zum Starten';
    obj.stillness.restartCircle = 'Atemkreis neu starten';
  } else if (key === 'fr') {
    obj.stillness.pressToBegin = 'Appuyer pour commencer';
    obj.stillness.restartCircle = 'Recommencer le cycle';
  } else if (key === 'ro') {
    obj.stillness.pressToBegin = 'Apasă pentru a începe';
    obj.stillness.restartCircle = 'Reîncepe ciclul';
  } else if (key === 'ru') {
    obj.stillness.pressToBegin = 'Нажмите, чтобы начать';
    obj.stillness.restartCircle = 'Перезапустить цикл';
  } else {
    obj.stillness.pressToBegin = 'Press to begin';
    obj.stillness.restartCircle = 'Restart Circle';
  }

  // Write back to disk
  const filePath = path.join(contentDir, `${key}.json`);
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2), 'utf-8');
  console.log(`Successfully updated content/${key}.json`);
});
