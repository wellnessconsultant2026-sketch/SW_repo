const fs = require('fs');
const path = require('path');

// ==========================================
// 1. ARTICLE CONTENTS (EN, DE, FR, RO, RU)
// ==========================================
const enArticles = JSON.parse(fs.readFileSync(path.join(__dirname, 'article_data_en.json'), 'utf-8'));

const deArticles = {
  'art-of-conscious-breathing': {
    sections: [
      {
        heading: 'Die Natürliche Kraft der Stille',
        p1: 'Im hektischen Alltag wird unsere Atmung oft flach und gehetzt, ohne dass wir es bemerken. Wenn sich der Atem beschleunigt, verharrt der Körper in ständiger, unterschwelliger Alarmbereitschaft und Anspannung.',
        p2: 'Bewusstes tiefes Atmen ist die unmittelbarste Brücke zwischen geistiger Klarheit und körperlicher Entspannung. Indem wir das Tempo des Atems sanft verlangsamen, führen wir den Organismus zurück in seinen natürlichen Zustand von Geborgenheit und tiefer Ruhe.'
      },
      {
        heading: 'Der 4-4-4-Rhythmus: Ruhe und Innere Balance Finden',
        quote: 'Ein ruhiger Atem ist das Fundament eines unerschütterlichen Geistes.',
        p1: 'Die Übung beginnt mit vollkommener Einfachheit: sanft durch die Nase auf vier Zähler einatmen, vier Zähler in der Stille verweilen und vier Zähler sanft ausatmen. Während der Pause halten wir keine Anspannung, sondern ruhen in wohliger Gegenwart.',
        p2: 'Bereits fünf Minuten dieses einfachen Rhythmus in stressigen Momenten klären den Geist und verankern Sie spürbar im Hier und Jetzt.'
      },
      {
        heading: 'Stille in den Alltag Tragen',
        p1: 'Meditation soll nicht auf das Meditationskissen beschränkt bleiben. Die wahre Kraft des Atems entfaltet sich in den Übergängen des Tages: vor einer dringenden Antwort, zwischen zwei Terminen oder in Momenten der Kontemplation.',
        p2: 'Durch diese kleinen täglichen Mikropausen erschaffen Sie sich einen inneren Zufluchtsort, der Sie überallhin begleitet.'
      }
    ]
  },
  'transformation-within': {
    sections: [
      {
        heading: 'Jenseits Äußerer Suche',
        p1: 'Viele Menschen suchen Harmonie in äußeren Umständen – in der Hoffnung, dass ein neuer Zeitplan, eine andere Umgebung oder ein veränderter Lebensstil dauerhaften Frieden bringt. Doch wahre Balance lässt sich nicht von außen aufbauen.',
        p2: 'Wenn wir unsere Aufmerksamkeit von äußerem Streben nach innen wenden, erkennen wir, dass Harmonie schon immer unsere wahre Natur war – verborgen unter Gedankenrauschen und emotionaler Anspannung.'
      },
      {
        heading: 'Die Fünf Dimensionen der Ganzheit',
        quote: 'Transformation bedeutet nicht, etwas Fremdes hinzuzufügen, sondern das liebevoll loszulassen, was Ihr Licht verdeckt.',
        p1: 'Durch das Zusammenspiel unserer fünf Säulen – Geist, Emotionen, Energie, Körper und Inneres Wachstum – schaffen wir stimmige Einheit. Wenn der Körper entspannt und der Atem weich wird, öffnen sich feine Energiebahnen ganz von selbst.',
        p2: 'Persönliche Meditation, Klangschwingung und achtsame Selbstbeobachtung verschmelzen diese fünf Dimensionen zu einem harmonischen Lebensgefühl.'
      },
      {
        heading: 'Der Schritt in die Bewusste Praxis',
        p1: 'Eine authentische Praxis erfordert keine heroischen Kraftakte. Sie beginnt mit der Entscheidung innezuhalten, die eigenen Gefühle vorurteilsfrei wahrzunehmen und Stille einzuladen.',
        p2: 'Unter erfahrener Begleitung lernen Sie, Gedanken zu beobachten, ohne sich von ihnen mitreißen zu lassen – und finden so zu stabiler innerer Ruhe.'
      }
    ]
  },
  'vagus-nerve-science': {
    sections: [
      {
        heading: 'Der Wandernde Nerv & Autonome Gesundheit',
        p1: 'Der Vagusnerv ist die zentrale Hauptader des parasympathischen Nervensystems. Er zieht vom Hirnstamm durch Hals, Herz, Lunge und Verdauungstrakt. Unter Dauerstress bleibt der sympathische Flucht-Kampf-Modus aktiv, was zu Entzündungen und Erschöpfung führt.',
        p2: 'Das Verständnis des Vagusnervs verwandelt Meditation von einer abstrakten Idee in präzise physiologische Wissenschaft. Verlängern wir bewusst die Ausatmung, feuert der Vagusnerv sofort, senkt den Puls und signalisiert dem Körper Sicherheit.'
      },
      {
        heading: 'Klinische Vagus-Tonisierungs-Protokolle',
        quote: 'Sicherheit ist die höchste Medizin. Wenn das Nervensystem echte Geborgenheit spürt, setzt spontane Heilung ein.',
        p1: 'Einfache tägliche Methoden – sanftes Summen in Resonanz, Zwerchfellatmung und weiche Stimmbildung – stimulieren mechanisch die laryngealen und aurikulären Äste des Vagusnervs.',
        p2: 'Schon sechs bis acht Minuten rhythmisches Vagus-Training zweimal täglich erhöhen die Herzfrequenzvariabilität (HRV) und die seelische Belastbarkeit spürbar.'
      },
      {
        heading: 'Die Innere Architektur der Geborgenheit',
        p1: 'Echte Meditation ist kein krampfhafter Kampf gegen Gedanken, sondern die natürliche Frucht eines regulierten Nervensystems. Fühlt sich der Körper sicher, beruhigt sich der mentale Lärm von allein.',
        p2: 'Indem wir neurosomatisches Wissen mit meditativer Stille vereinen, würdigen wir den physischen Körper und öffnen den Raum für tiefe Gegenwärtigkeit.'
      }
    ]
  },
  'circadian-sleep-architecture-article': {
    sections: [
      {
        heading: 'Die Biologie des Regenerativen Schlafs',
        p1: 'Schlaf ist nicht bloß die Abwesenheit von Aktivität, sondern eine meisterhaft koordinierte zelluläre Reinigung. Im Tiefschlaf spült das glymphatische System Stoffwechselrückstände aus dem Hirngewebe, während Hormone Muskeln und Nervenbahnen regenerieren.',
        p2: 'Künstliches Blaulicht, späte Mahlzeiten und abendliche Gedankenüberreizung entkoppeln unsere innere Uhr vom natürlichen Sonnenrhythmus und führen trotz vieler Stunden im Bett zu chronischer Erschöpfung.'
      },
      {
        heading: 'Abendliche Herunterregulierungs-Rituale',
        quote: 'Tiefer Schlaf wird am Tag gepflegt, am Abend verankert und in der Stille der Nacht geerntet.',
        p1: 'Die Vorbereitung auf erholsamen Schlaf beginnt 90 Minuten vor dem Zubettgehen. Warmes, gedämpftes Licht ermöglicht die natürliche Melatoninausschüttung ohne Medikamente.',
        p2: 'In Kombination mit sanften Dehnungen und körperlicher Tiefenentspannung (Yoga Nidra) wechselt das Nervensystem sanft von mentaler Wachsamkeit in parasympathische Nachtruhe.'
      },
      {
        heading: 'Erwachen mit Frischer Lebenskraft',
        p1: 'Wird die zirkadiane Schlafarchitektur respektiert, wandelt sich das Aufwachen von einem Kampf mit dem Wecker in ein natürliches Aufsteigen von Energie und Lebensfreude.',
        p2: 'Den eigenen Alltag mit biologischen Rhythmen in Einklang zu bringen, ehrt die Intelligenz der Natur und schenkt fokussierte, gelassene Tatkraft.'
      }
    ]
  },
  'chakras-and-physiology': {
    sections: [
      {
        heading: 'Die Sieben Feinstofflichen Energiezentren Entmystifiziert',
        p1: 'Über Jahrtausende hinweg kartierten kontemplative Traditionen sieben energetische Wirbel entlang der Wirbelsäule. Die moderne Neuroendokrinologie zeigt faszinierende Parallelen: Jedes klassische Chakra korrespondiert präzise mit einem autonomen Nervengeflecht und einer Hormondrüse.',
        p2: 'Vom Sakralplexus und den Nebennieren an der Basis bis zum Herzplexus und der Thymusdrüse im Brustraum ist unsere energetische Anatomie tief mit biochemischen Abläufen verwoben.'
      },
      {
        heading: 'Energetische Schwingung & Zelluläre Resonanz',
        quote: 'Der Körper ist ein Instrument, die Chakren sind seine Saiten. Durch Atem und Klang gestimmt, erklingt das Leben in vollkommener Harmonie.',
        p1: 'Jedes Zentrum besitzt eine optimale Resonanzfrequenz. Mit gezielten Keimlauten, Atemführung und bewusster Ausrichtung lösen sich energetische Stauungen, und bioelektrische Energie fließt wieder frei.',
        p2: 'Viele Klienten berichten vom Abfallen chronischer körperlicher Schwere, sobald blockierte Zentren ihre vitale Schwingung wiederfinden.'
      },
      {
        heading: 'Ganzheitliche Systemharmonie',
        p1: 'Geerdete Spiritualität erfordert weder das Leugnen der Wissenschaft noch das Ignorieren feinstofflicher Kräfte. Die tiefste Heilung geschieht dort, wo beides eins wird.',
        p2: 'Durch tägliche energetische Kohärenz entfalten Sie ein unerschütterliches Gefühl von Ganzheit, das jeden Gedanken und jedes Handeln durchdringt.'
      }
    ]
  },
  'emotional-deconditioning': {
    sections: [
      {
        heading: 'Die Anatomie Emotionaler Gewohnheiten',
        p1: 'Emotionen beginnen als flüchtige biochemische Reize, die biochemisch nur etwa 90 Sekunden im Blutkreislauf anhalten. Verknüpft der Verstand jedoch repetitive Geschichten und Vorwürfe damit, verfestigt sich die Empfindung zu einer chronischen Stimmung.',
        p2: 'Emotionale Entkonditionierung ist die Kunst, das reine Körpergefühl von der gedanklichen Storyline zu trennen – Gefühle dürfen aufsteigen, durchfließen und sich auflösen, ohne toxische Rückstände zu hinterlassen.'
      },
      {
        heading: 'Den Weiten Inneren Beobachter Kultivieren',
        quote: 'Sie sind nicht der Sturm in Ihrer Brust; Sie sind der weite Himmel, der ihn umschließt.',
        p1: 'Taucht Wut, Angst oder Trauer auf, greifen wir reflexartig zu Verdrängung oder schaukeln uns hoch. Ein dritter Weg ist der bewusste, mitfühlende Beobachter.',
        p2: 'Das ruhige Sitzen mit der körperlichen Vibration der Emotion im Hals- oder Solarplexusbereich ohne Bewertung ermöglicht es dem Nervensystem, gestaute Spannung natürlich zu entladen.'
      },
      {
        heading: 'Unerschütterliche Emotionale Freiheit',
        p1: 'Mit der Zeit erkennen Sie, dass Gefühle nicht mehr über Ihr Verhalten bestimmen. Sie antworten mit Besonnenheit statt aus automatischem Reflex heraus.',
        p2: 'Dieses innere Gleichgewicht ist der Eckpfeiler emotionaler Reife und spiritueller Freiheit.'
      }
    ]
  },
  'silence-as-medicine': {
    sections: [
      {
        heading: 'Die Epidemie des Mentalen Lärms',
        p1: 'Wir leben in einem Zeitalter unaufhörlicher akustischer und kognitiver Reizüberflutung. Benachrichtigungen, ständige Bewertungen und Grübeleien halten das Default Mode Network (DMN) des Gehirns in chronischer Reibung.',
        p2: 'So wie Verdauungsorgane Pausen zur Regeneration brauchen, benötigt unsere Denkarchitektur gezielte Phasen reiner, ungestörter Stille.'
      },
      {
        heading: 'Neurobiologie Edlen Schweigens',
        quote: 'Stille ist nicht die Abwesenheit von Klang, sondern die spürbare Gegenwart Ihres wahren Wesens.',
        p1: 'Neurowissenschaftliche Studien belegen, dass anhaltende Stille die Neurogenese im Hippocampus fördert und eine überaktive Amygdala beruhigt. In echter Stille setzen sich zerrissene Gedanken wie Schwebstoffe in klarem Wasser.',
        p2: '30 bis 60 Minuten kontemplative Stille am Tag erneuern geistige Ressourcen, schärfen die Intuition und lösen diffuse Ängste auf.'
      },
      {
        heading: 'Die Praxis der Stillen Stunde',
        p1: 'Beginnen Sie damit, sich morgens oder abends eine geschützte Stunde ohne Bildschirm, Lektüre oder Gespräche zu schenken. Sitzen Sie einfach da, atmen Sie und nehmen Sie die Welt empfangend wahr.',
        p2: 'In dieser heilsamen Einkehr berühren Sie jenen zeitlosen Frieden, der schon immer im Zentrum Ihres Wesens ruhte.'
      }
    ]
  },
  'workplace-burnout-executive-vitality': {
    sections: [
      {
        heading: 'Der Verborgene Preis Ständiger Überlastung',
        p1: 'Erfolgreiche Führungskräfte und Unternehmer verwechseln Adrenalinrausch häufig mit echter Begeisterung. Ein Leben im permanenten High-Beta-Wellenbereich leert Dopaminreserven und führt unausweichlich ins Burnout.',
        p2: 'Wahre Spitzenleistung misst sich nicht daran, wie hart man in Krisen kämpft, sondern wie rasch und souverän man das System wieder in ruhige Grundspannung herunterregelt.'
      },
      {
        heading: 'Strategische Somatische Mikropausen',
        quote: 'Der Meisterschütze lässt den Bogen nicht dauerhaft gespannt; zwischen den Zielen ruht die Sehne.',
        p1: 'Dreiminütige somatische Resets alle zwei Stunden – langsames Ausatmen durch die Nase, Entlastung der Schultern und ein weiter Panoramablick – verhindern das unbemerkte Anstauen von Cortisol im Tagesverlauf.',
        p2: 'Diese Übergänge bewahren scharfen Fokus, verhindern emotionale Reaktivität bei Teamgesprächen und sichern Energie für das private Leben.'
      },
      {
        heading: 'Führen mit Ruhiger Autorität',
        p1: 'Teams spiegeln instinktiv das Nervensystem ihrer Führungsfiguren. Hektik sät Verunsicherung; eine geerdete, zentrierte Präsenz hingegen strahlt Sicherheit aus und fördert Klarheit.',
        p2: 'Innere Stille ist daher kein privater Luxus, sondern der wirksamste strategische Vorteil moderner Führung.'
      }
    ]
  }
};

const frArticles = {
  'art-of-conscious-breathing': {
    sections: [
      {
        heading: 'La Puissance Naturelle du Calme',
        p1: 'Dans nos vies quotidiennes rythmées, la respiration devient souvent courte et précipitée sans que nous nous en rendions compte. Lorsque notre souffle s’accélère, le corps est maintenu dans un état de vigilance et de tension constante.',
        p2: 'La respiration profonde et consciente est notre pont le plus direct entre présence d’esprit et relâchement musculaire. En ralentissant doucement le rythme respiratoire, nous invitons le corps dans son état naturel de confort et de paix profonde.'
      },
      {
        heading: 'Le Rythme 4-4-4 : Retrouver Clarté et Équilibre Intérieur',
        quote: 'Une respiration apaisée est le fondement d’un esprit serein.',
        p1: 'La pratique commence avec une grande simplicité : inspirer doucement par le nez sur quatre temps, marquer une pause paisible pendant quatre temps, puis expirer avec fluidité sur quatre temps.',
        p2: 'Pratiquer ce rythme ne serait-ce que cinq minutes lors des moments d’agitation dissipe le brouillard mental et procure un ancrage immédiat.'
      },
      {
        heading: 'Intégrer le Calme dans le Quotidien',
        p1: 'La méditation n’est pas destinée à rester isolée sur un coussin. La puissance réelle du souffle conscient se révèle lorsqu’elle s’intègre aux transitions ordinaires : avant de répondre à un message urgent ou entre deux réunions.',
        p2: 'En cultivant cette micro-pratique chaque jour, vous bâtissez un sanctuaire intérieur inébranlable qui vous accompagne partout.'
      }
    ]
  },
  'transformation-within': {
    sections: [
      {
        heading: 'Au-Delà de la Quête Extérieure',
        p1: 'Beaucoup cherchent l’harmonie dans des éléments extérieurs — espérant qu’un changement de planning, d’environnement ou de mode de vie apportera une paix durable. Pourtant, le véritable équilibre ne peut être façonné uniquement par l’extérieur.',
        p2: 'Lorsque nous passons de l’effort extérieur à la conscience intérieure, nous découvrons que l’harmonie a toujours été notre nature fondamentale, prête à se dévoiler sous le tumulte mental.'
      },
      {
        heading: 'Les Cinq Dimensions de l’Être',
        quote: 'La transformation ne consiste pas à ajouter quelque chose d’extérieur, mais à relâcher délicatement ce qui masque votre lumière naturelle.',
        p1: 'Grâce à l’intégration de nos cinq piliers fondamentaux — Esprit, Émotions, Énergie, Corps et Éveil Intérieur — nous créons un alignement cohérent. Quand le corps se dépose et que le souffle s’adoucit, la clarté s’installe d’elle-même.',
        p2: 'Associer méditation personnalisée, résonance vibratoire et auto-observation contemplative permet à ces cinq dimensions de s’harmoniser.'
      },
      {
        heading: 'L’Entrée dans la Pratique Consciente',
        p1: 'Débuter une pratique authentique ne demande pas d’effort héroïque. Cela commence par le choix de faire une pause, d’accueillir vos ressentis sans jugement et d’inviter le silence.',
        p2: 'Sous une guidance bienveillante et experte, vous apprenez à observer les pensées sans vous laisser emporter, cultivant ainsi une paix inaltérable.'
      }
    ]
  },
  'vagus-nerve-science': {
    sections: [
      {
        heading: 'Le Nerf Vague & la Santé Autonome',
        p1: 'Le nerf vague est la voie maîtresse du système nerveux parasympathique, reliant le tronc cérébral au cœur, aux poumons et aux viscères. Sous stress chronique, la voie de survie reste enclenchée, entraînant inflammation et fatigue profonde.',
        p2: 'Comprendre le nerf vague transforme la méditation en une science physiologique exacte. Quand nous allongeons délibérément l’expiration, le nerf vague ralentit le cœur et envoie des signaux de sécurité à tout l’organisme.'
      },
      {
        heading: 'Protocoles Cliniques de Tonification Vagale',
        quote: 'La sécurité intérieure est la véritable thérapie. Dès que le système nerveux perçoit un apaisement authentique, la régénération commence.',
        p1: 'Des exercices simples — comme le bourdonnement sonore résonant, la respiration diaphragmatique et la vocalisation douce — stimulent mécaniquement les branches laryngées et auriculaires du vague.',
        p2: 'Six à huit minutes de stimulation vagale deux fois par jour rehaussent la variabilité de la fréquence cardiaque (VRC) et la résilience émotionnelle.'
      },
      {
        heading: 'L’Architecture Intérieure de la Sécurité',
        p1: 'La vraie méditation n’est pas une lutte contre les pensées, mais l’aboutissement naturel d’un système nerveux régulé. Quand le corps se sent en sécurité, l’agitation mentale s’éteint d’elle-même.',
        p2: 'En alliant neurosciences somatiques et sagesse contemplative, nous honorons le corps physique tout en révélant une présence infinie.'
      }
    ]
  },
  'circadian-sleep-architecture-article': {
    sections: [
      {
        heading: 'La Biologie du Sommeil Régénérateur',
        p1: 'Le sommeil n’est pas une simple suspension d’activité ; c’est un nettoyage cellulaire hautement orchestré. Pendant le sommeil profond, le système glymphatique draine les toxines cérébrales tandis que les hormones réparent tissus et nerfs.',
        p2: 'La lumière bleue artificielle, les repas tardifs et l’hyper-stimulation cognitive dissocient notre horloge biologique des cycles naturels, laissant des millions de personnes épuisées malgré de longues nuits au lit.'
      },
      {
        heading: 'Rituels Crépusculaires de Décompression',
        quote: 'Le sommeil profond se cultive le jour, s’ancre au crépuscule et se récolte dans le secret de la nuit.',
        p1: 'La préparation au repos réparateur débute 90 minutes avant le coucher. Remplacer les éclairages crus par une lumière chaude permet à la mélatonine de s’exprimer sans recours médicamenteux.',
        p2: 'En combinant cette pénombre bienfaisante à des étirements doux et au Yoga Nidra, le système nerveux quitte la vigilance pour s’abandonner au repos réparateur.'
      },
      {
        heading: 'S’Éveiller avec une Vitalité Claire',
        p1: 'Lorsque l’architecture du sommeil est respectée, le réveil cesse d’être un combat pour redevenir une montée naturelle d’énergie et de gratitude.',
        p2: 'Accorder ses journées aux rythmes biologiques nourrit une concentration sereine et une force tranquille.'
      }
    ]
  },
  'chakras-and-physiology': {
    sections: [
      {
        heading: 'Démystifier les Sept Centres Énergétiques',
        p1: 'Depuis des millénaires, les traditions d’Orient décrivent sept vortex énergétiques le long de la colonne vertébrale. La neuro-endocrinologie moderne révèle une correspondance anatomique remarquable : chaque chakra coïncide avec un plexus nerveux majeur et une glande endocrine.',
        p2: 'Du plexus sacré et des surrénales jusqu’au plexus cardiaque et au thymus, notre anatomie subtile est intimement liée à notre physiologie biochimique.'
      },
      {
        heading: 'Vibration Énergétique & Résonance Cellulaire',
        quote: 'Le corps est un instrument, les chakras sont ses cordes. Accordés par le souffle et le son, la vie résonne en parfaite harmonie.',
        p1: 'Chaque centre possède une fréquence de résonance privilégiée. Grâce aux sons racines, au souffle conscient et à la présence attentive, les tensions se libèrent et le flux bioélectrique circule librement.',
        p2: 'Les personnes accompagnées ressentent souvent la disparition d’une fatigue ancienne dès lors que les centres bloqués retrouvent leur dynamique naturelle.'
      },
      {
        heading: 'Harmonie Globale du Système',
        p1: 'Une spiritualité incarnée ne rejette ni la science contemporaine ni les dimensions subtiles. La guérison la plus complète s’épanouit là où les deux s’unissent.',
        p2: 'En cultivant cette cohérence chaque jour, vous réveillez une plénitude qui irradie dans chaque parole et chaque action.'
      }
    ]
  },
  'emotional-deconditioning': {
    sections: [
      {
        heading: 'L’Anatomie des Habitudes Émotionnelles',
        p1: 'Une émotion commence par une sensation physique éphémère ne durant que 90 secondes dans la circulation sanguine. Cependant, lorsque le mental y superpose des récits et des rancunes, elle se fige en humeur persistante.',
        p2: 'Le déconditionnement émotionnel consiste à dissocier la sensation corporelle brute de l’histoire mentale réactive, permettant aux émotions de traverser le corps et de se dissoudre sans laisser de traces.'
      },
      {
        heading: 'Développer le Témoin Intérieur Bienveillant',
        quote: 'Vous n’êtes pas la tempête qui traverse votre poitrine ; vous êtes le ciel infini qui la contient.',
        p1: 'Face à la peur, la colère ou la tristesse, le réflexe habituel est la fuite ou l’amplification. Une troisième voie existe : devenir le témoin conscient et compatissant.',
        p2: 'Demeurer quelques instants en silence avec la sensation physique dans la gorge ou le plexus, sans porter de jugement, permet à la charge émotionnelle de se libérer naturellement.'
      },
      {
        heading: 'Une Liberté Émotionnelle Inébranlable',
        p1: 'Avec la pratique, les émotions cessent de dicter votre comportement. Vous agissez avec discernement plutôt que par réaction impulsive.',
        p2: 'Cet équilibre intérieur constitue la clé de voûte de la maturité psychologique et de la liberté d’être.'
      }
    ]
  },
  'silence-as-medicine': {
    sections: [
      {
        heading: 'L’Épidémie du Bruit Mental',
        p1: 'Nous traversons une époque de bombardement auditif et cognitif permanent. Notifications incessantes et ruminations intérieures maintiennent le réseau par défaut (DMN) du cerveau sous tension chronique.',
        p2: 'Tout comme le système digestif a besoin de jeûnes périodiques pour assimiler, notre esprit a un besoin vital d’intervalles réguliers de silence pur et bienfaisant.'
      },
      {
        heading: 'Neurobiologie du Noble Silence',
        quote: 'Le silence n’est pas l’absence de son, mais la présence tangible de votre réalité la plus profonde.',
        p1: 'L’imagerie cérébrale démontre qu’un silence prolongé favorise la neurogenèse dans l’hippocampe et apaise l’amygdale. Dans le calme vrai, les pensées éparpillées se déposent naturellement comme le limon dans une eau tranquille.',
        p2: 'Accueillir 30 à 60 minutes de silence contemplatif par jour renouvelle les facultés cognitives, affine l’intuition et dissout l’anxiété diffuse.'
      },
      {
        heading: 'La Pratique de l’Heure de Silence',
        p1: 'Commencez par consacrer une heure chaque matin ou chaque soir sans écran, sans lecture et sans paroles. Asseyez-vous simplement, respirez et accueillez le monde avec réceptivité.',
        p2: 'Dans cette quiétude sacrée, vous rejoignez la paix intemporelle qui a toujours habité le cœur de votre âme.'
      }
    ]
  },
  'workplace-burnout-executive-vitality': {
    sections: [
      {
        heading: 'Le Coût Caché du Surmenage Permanent',
        p1: 'Dirigeants, soignants et entrepreneurs confondent régulièrement dépendance à l’adrénaline et passion sincère. Évoluer constamment en ondes cérébrales rapides épuise les réserves de dopamine et conduit inévitablement à l’épuisement professionnel.',
        p2: 'L’excellence durable ne se mesure pas à l’intensité déployée dans l’urgence, mais à la capacité de revenir rapidement à un calme intérieur équilibré.'
      },
      {
        heading: 'Micro-Pauses Somatiques Stratégiques',
        quote: 'L’archer émérite ne garde pas son arc tendu en continu ; entre chaque cible, la corde se repose.',
        p1: 'Intégrer trois minutes de recentrage toutes les deux heures — expiration lente par le nez, relâchement des épaules et regard panoramique — prévient l’accumulation de cortisol au fil de la journée.',
        p2: 'Ces micro-transitions préservent la lucidité, désamorcent les réactions épidermiques et permettent de rentrer chez soi avec une énergie préservée.'
      },
      {
        heading: 'Diriger avec une Sérénité Naturelle',
        p1: 'Les équipes s’accordent instinctivement sur le système nerveux de leurs dirigeants. L’angoisse engendre la confusion, alors qu’une présence stable inspire confiance et vision claire.',
        p2: 'Cultiver le calme intérieur n’est donc pas un loisir privé, mais le plus puissant atout de leadership moderne.'
      }
    ]
  }
};

const roArticles = {
  'art-of-conscious-breathing': {
    sections: [
      {
        heading: 'Puterea Naturală a Liniștii',
        p1: 'În ritmul alert al vieții cotidiene, respirația devine adesea superficială și grăbită fără să ne dăm seama. Când respirația se accelerează, corpul rămâne într-o stare de alertă continuă și tensiune ascunsă.',
        p2: 'Respirația profundă conștientă este puntea cea mai directă între claritatea minții și relaxarea fizică. Încetinind ritmul respirației, invităm corpul în starea sa naturală de confort și tihnă profundă.'
      },
      {
        heading: 'Ritmul 4-4-4: Regăsirea Calmului și Echilibrului Interior',
        quote: 'O respirație liniștită este temelia unei minți neclintite.',
        p1: 'Practica începe cu o simplitate firească: inspiri ușor pe nas numărând până la patru, păstrezi o pauză liniștită timp de patru secunde și expiri lin pe parcursul a patru secunde.',
        p2: 'Exersarea acestui ritm timp de numai cinci minute în momentele solicitante risipește agitația mentală și readuce centrarea lăuntrică.'
      },
      {
        heading: 'Aducerea Liniștii în Viața de Zi cu Zi',
        p1: 'Meditația nu este menită să rămână izolată pe o pernă de practică. Adevărata putere a respirației conștiente se manifestă în tranzițiile cotidiene: înainte de a răspunde la un mesaj urgent sau între întâlniri.',
        p2: 'Cultivând această micro-practică în fiecare zi, clădești un sanctuar interior stabil care te însoțește oriunde mergi.'
      }
    ]
  },
  'transformation-within': {
    sections: [
      {
        heading: 'Dincolo de Căutarea Exterioară',
        p1: 'Mulți oameni caută armonia în circumstanțe exterioare — sperând că o schimbare de program, loc sau stil de viață va aduce brusc o pace durabilă. Însă echilibrul veritabil nu se poate construi doar din exterior.',
        p2: 'Când ne mutăm atenția de la efortul exterior către conștiința interioară, descoperim că armonia a fost întotdeauna natura noastră profundă, așteptând să fie dezvăluită dincolo de zgomotul gândurilor.'
      },
      {
        heading: 'Cele Cinci Dimensiuni ale Întregului',
        quote: 'Transformarea nu este adăugarea a ceva străin, ci eliberarea blândă a ceea ce întunecă lumina ta naturală.',
        p1: 'Prin integrarea celor cinci piloni fundamentali — Minte, Emoții, Energie, Corp și Creștere Interioară — realizăm o aliniere coerentă. Când corpul se odihnește și respirația se liniștește, canalele energetice subtile se deschid firesc.',
        p2: 'Lucrul prin meditație personalizată, vibrație sonoră și auto-observare contemplativă armonizează aceste cinci dimensiuni într-o experiență de viață unitară.'
      },
      {
        heading: 'Pasul spre Practica Conștientă',
        p1: 'Începutul unei practici autentice nu cere eforturi eroice. Începe cu decizia de a face o pauză, de a-ți privi trăirile fără judecată și de a primi liniștea în clipa prezentă.',
        p2: 'Sub o ghidare experimentată, înveți să observi tiparele mentale fără a fi copleșit de ele, cultivând o oază de pace și reziliență.'
      }
    ]
  },
  'vagus-nerve-science': {
    sections: [
      {
        heading: 'Nervul Rătăcitor și Sănătatea Autonomă',
        p1: 'Nervul vag este principala cale a sistemului nervos parasimpatic, coborând de la trunchiul cerebral prin gât, inimă, plămâni și tractul digestiv. În condiții de stres cronic, reacția de luptă sau fugă rămâne blocată, generând inflamație și epuizare.',
        p2: 'Înțelegerea nervului vag transformă meditația dintr-o idee abstractă într-o știință fiziologică precisă. Când prelungim deliberat expirația, nervul vag reduce ritmul cardiac și transmite întregului organism semnale de siguranță.'
      },
      {
        heading: 'Protocoale Clinice de Tonifiere Vagale',
        quote: 'Siguranța interioară este terapia supremă. Când sistemul nervos simte ocrotire reală, vindecarea spontană începe.',
        p1: 'Tehnici simple zilnice — fredonatul cu rezonanță profundă, respirația diafragmatică și vocalizarea blândă — stimulează ramurile laringiene și auriculare ale nervului vag.',
        p2: 'Doar șase până la opt minute de stimulare de două ori pe zi creează o bază fiziologică rezistentă, sporind variabilitatea ritmului cardiac (HRV) și calmul emoțional.'
      },
      {
        heading: 'Arhitectura Interioară a Siguranței',
        p1: 'Adevărata meditație nu este o luptă pentru oprirea gândurilor, ci consecința naturală a unui sistem nervos reglat. Când corpul se simte în siguranță, dialogul interior se domolește de la sine.',
        p2: 'Unind cunoașterea neuro-somatică cu practica contemplativă clasică, onorăm templul fizic și trezim o prezență interioară luminoasă.'
      }
    ]
  },
  'circadian-sleep-architecture-article': {
    sections: [
      {
        heading: 'Biologia Somnului Regenerator',
        p1: 'Somnul nu este o simplă lipsă de activitate, ci o curățare celulară coordonată cu precizie. În timpul somnului profund, sistemul glimfatic elimină reziduurile metabolice din creier, iar hormonii refac țesuturile și fibrele nervoase.',
        p2: 'Lumina albastră a ecranelor, mesele târzii și agitația mentală de seară dereglează ceasul biologic, lăsând milioane de oameni obosiți în ciuda orelor petrecute în pat.'
      },
      {
        heading: 'Protocoale de Relaxare la Căderea Nopții',
        quote: 'Somnul profund se cultivă ziua, se ancorează în amurg și se culege în tăcerea nopții.',
        p1: 'Pregătirea pentru un somn odihnitor începe cu 90 de minute înainte de culcare. Înlocuirea luminilor puternice cu o lumină caldă permite secreția naturală a melatoninei fără ajutor medicamentos.',
        p2: 'Împreună cu întinderi ușoare și relaxare progresivă (Yoga Nidra), sistemul nervos trece de la vigilență la odihna profundă a parasimpaticului.'
      },
      {
        heading: 'Trezirea cu Energie Clară',
        p1: 'Când respectăm arhitectura somnului circadian, trezirea nu mai este o povară cu ceasul deșteptător, ci o revărsare firească de energie și recunoștință.',
        p2: 'Alinierea zilelor cu ritmurile naturii onorează înțelepciunea biologică din tine, oferind claritate și concentrare calmă.'
      }
    ]
  },
  'chakras-and-physiology': {
    sections: [
      {
        heading: 'Demistificarea Celor Șapte Centri Energetici',
        p1: 'De mii de ani, tradițiile meditative au descris șapte vortexuri primare de-a lungul coloanei vertebrale. Neuro-endocrinologia modernă arată o corespondență anatomică remarcabilă: fiecare chakră clasică se aliniază cu un plex nervos și o glandă endocrină.',
        p2: 'De la plexul sacrat și glandele suprarenale până la plexul cardiac și timus, anatomia noastră energetică este strâns împletită cu biologia corpului.'
      },
      {
        heading: 'Vibrație Energetică și Rezonanță Celulară',
        quote: 'Corpul este un instrument, chakrele sunt corzile sale. Acordate prin respirație și sunet, viața cântă în perfectă armonie.',
        p1: 'Fiecare centru deține o frecvență de rezonanță optimă. Folosind sunete fundamentale, respirație conștientă și atenție focalizată, dizolvăm blocajele și restabilim fluxul bioelectric liber.',
        p2: 'Oamenii resimt frecvent eliberarea unei oboseli cronice vechi odată ce centrii blocați își recapătă vibrația vitală.'
      },
      {
        heading: 'Armonia Integrativă a Întregului Sistem',
        p1: 'O viață spirituală autentică nu respinge știința modernă și nu ignoră energia subtilă. Vindecarea cea mai profundă se naște acolo unde cele două se unesc armonios.',
        p2: 'Cultivând coerența energetică zilnic, trezești un sentiment veritabil de întregire ce radiază în fiecare gând și acțiune.'
      }
    ]
  },
  'emotional-deconditioning': {
    sections: [
      {
        heading: 'Anatomia Obiceiurilor Emoționale',
        p1: 'Emoțiile încep ca simple senzații fiziologice trecătoare ce durează circa 90 de secunde în sânge. Totuși, când mintea asociază povești repetitive și nemulțumiri vechi, senzația se transformă într-o stare cronică reactivă.',
        p2: 'Decondiționarea emoțională este arta de a separa senzația fizică pură de narațiunea mentală, permițând trăirilor să treacă și să se dizolve fără a lăsa urme toxice.'
      },
      {
        heading: 'Cultivarea Martorului Interior Liniștit',
        quote: 'Nu ești furtuna care trece prin pieptul tău; ești cerul nesfârșit care o cuprinde.',
        p1: 'Când apar frica, furia sau tristețea, reacția obișnuită este suprimarea sau agitarea. Există o a treia cale: a deveni martorul conștient și plin de compasiune.',
        p2: 'A rămâne liniștit în fața senzației din gât sau din plexul solar, fără a o eticheta, permite energiei acumulate să se elibereze în mod firesc.'
      },
      {
        heading: 'Libertate Emoțională Neclintită',
        p1: 'În timp, descoperi că emoțiile nu-ți mai dictează comportamentul. Răspunzi cu înțelepciune limpede, nu din impuls automat.',
        p2: 'Acest echilibru interior reprezintă piatra de temelie a maturității emoționale și a libertății spirituale.'
      }
    ]
  },
  'silence-as-medicine': {
    sections: [
      {
        heading: 'Epidemia Zgomotului Mental',
        p1: 'Trăim într-o eră a bombardamentului auditiv și informațional continuu. Notificările constante și dialogul interior neîncetat mențin rețeaua cerebrală de fond într-o tensiune cronică.',
        p2: 'Așa cum organele digestive au nevoie de pauze pentru a se reface, arhitectura cognitivă cere intervale regulate de tăcere curată și neîntreruptă.'
      },
      {
        heading: 'Neurobiologia Tăcerii Nobile',
        quote: 'Liniștea nu este absența sunetului, ci prezența vie a realității tale celei mai profunde.',
        p1: 'Studiile neuroimagistice confirmă că liniștea susținută stimulează neurogeneza în hipocamp și calmează amigdala cerebrală. În tăcere adevărată, gândurile fragmentate se așază ca sedimentele într-o apă limpede.',
        p2: '30 până la 60 de minute de contemplație tăcută pe zi reînnoiesc resursele mentale, ascut intuiția și alungă anxietatea difuză.'
      },
      {
        heading: 'Practica Orei de Liniște',
        p1: 'Începe prin a rezerva o oră dedicată dimineața sau seara, fără ecrane, lectură sau conversații. Pur și simplu stai, respiră și privește lumea cu deschidere liniștită.',
        p2: 'În această tihnă binefăcătoare, atingi acea pace netrecătoare care a locuit dintotdeauna în adâncul sufletului tău.'
      }
    ]
  },
  'workplace-burnout-executive-vitality': {
    sections: [
      {
        heading: 'Prețul Ascuns al Suprasolicitării Continue',
        p1: 'Liderii, medicii și antreprenorii confundă adesea dependența de adrenalină cu pasiunea durabilă. Funcționarea permanentă pe frecvențe cerebrale înalte epuizează dopamina și conduce inevitabil la burnout.',
        p2: 'Adevărata performanță nu se definește prin forțarea continuă în crize, ci prin abilitatea de a coborî rapid și sigur la starea de calm de bază.'
      },
      {
        heading: 'Micro-Pauze Somatice Strategice',
        quote: 'Arcașul iscusit nu ține arcul încordat neîncetat; între ținte, coarda se odihnește.',
        p1: 'Integrarea a trei minute de resetare somatică la fiecare două ore — expirații prelungite pe nas, coborârea umerilor și privire panoramică — împiedică acumularea cortizolului de-a lungul zilei.',
        p2: 'Aceste scurte tranziții păstrează luciditatea, previn reacțiile impulsive cu echipa și garantează că ajungi acasă cu energie vitală neștirbită.'
      },
      {
        heading: 'Leadership cu Autoritate Calmă',
        p1: 'Echipele reflectă instinctiv starea sistemului nervos al liderilor lor. Tensiunea creează nesiguranță, în timp ce o prezență centrată inspiră claritate și încredere.',
        p2: 'Cultivarea liniștii lăuntrice nu este un lux privat, ci cel mai valoros avantaj strategic în conducerea modernă.'
      }
    ]
  }
};

const ruArticles = {
  'art-of-conscious-breathing': {
    sections: [
      {
        heading: 'Естественная сила тишины',
        p1: 'В стремительном ритме повседневности наше дыхание незаметно становится поверхностным и частым. При ускоренном дыхании тело находится в состоянии постоянного скрытого напряжения и тревожной настороженности.',
        p2: 'Осознанное глубокое дыхание — это прямой и естественный мост между ясностью ума и физическим расслаблением. Мягко замедляя дыхательный ритм, мы возвращаем организм в состояние глубокого покоя, комфорта и умиротворения.'
      },
      {
        heading: 'Ритм 4-4-4: Обретение внутреннего покоя и равновесия',
        quote: 'Спокойное дыхание — незыблемый фундамент безмятежного ума.',
        p1: 'Практика предельно проста: мягкий вдох через нос на четыре счета, комфортная пауза в тишине на четыре счета и плавный выдох на четыре счета. Во время паузы мы не задерживаем напряжение, а пребываем в расслабленном присутствии.',
        p2: 'Всего пять минут такого ритма в моменты стресса и перегрузки рассеивают ментальный туман и возвращают внутреннюю устойчивость.'
      },
      {
        heading: 'Вплетение тишины в повседневность',
        p1: 'Медитация не должна ограничиваться лишь сидением на подушке. Истинная сила дыхания раскрывается в естественных паузах дня: перед ответом на важное сообщение, между встречами или в минуты созерцания.',
        p2: 'Развивая эту простую микропрактику каждый день, вы создаете внутри себя непоколебимый оазис тишины, который всегда с вами.'
      }
    ]
  },
  'transformation-within': {
    sections: [
      {
        heading: 'За пределами внешнего поиска',
        p1: 'Многие ищут гармонию во внешних изменениях — надеясь, что новое расписание, смена обстановки или привычек мгновенно принесут долгожданный мир. Однако подлинный баланс невозможно выстроить лишь из внешних условий.',
        p2: 'Когда внимание смещается от внешних усилий к внутреннему присутствию, мы осознаем, что гармония всегда была нашей истинной природой, сокрытой за шумом мыслей и грузом накопленных эмоций.'
      },
      {
        heading: 'Пять измерений целостности',
        quote: 'Трансформация — это не добавление чего-то чуждого, а бережное освобождение от всего, что скрывает ваш естественный свет.',
        p1: 'Объединяя пять ключевых опор — Разум, Эмоции, Энергию, Тело и Внутренний рост — мы выстраиваем целостное звучание существа. Когда тело расслабляется, а дыхание смягчается, ум проясняется сам собой.',
        p2: 'Персонализированная медитация, звуковые вибрации и вдумчивое самонаблюдение соединяют эти сферы в единый гармоничный поток жизни.'
      },
      {
        heading: 'Шаг к осознанной практике',
        p1: 'Начало подлинной практики не требует титанических усилий. Достаточно сделать осознанную паузу, безоценочно принять свое текущее состояние и впустить тишину в настоящий момент.',
        p2: 'Под чутким профессиональным руководством вы научитесь наблюдать за мыслями, не вовлекаясь в них, и обретете глубокую внутреннюю стойкость.'
      }
    ]
  },
  'vagus-nerve-science': {
    sections: [
      {
        heading: 'Блуждающий нерв и вегетативное здоровье',
        p1: 'Блуждающий нерв — главная магистраль парасимпатической нервной системы, идущая от ствола мозга через гортань, сердце, легкие и пищеварительный тракт. При хроническом стрессе режим «бей или беги» не выключается, вызывая воспаление и истощение.',
        p2: 'Понимание роли блуждающего нерва превращает медитацию из абстрактной концепции в строгую физиологическую науку. Удлиняя выдох, мы мгновенно активируем вагус, замедляем пульс и посылаем телу сигнал полной безопасности.'
      },
      {
        heading: 'Клинические протоколы стимуляции блуждающего нерва',
        quote: 'Ощущение безопасности — высшая терапия. Когда нервная система чувствует покой, включается естественное самовосстановление.',
        p1: 'Простые ежедневные техники — низкое резонансное гудение, диафрагмальное дыхание и мягкое голосовое звучание — механически стимулируют ветви блуждающего нерва.',
        p2: 'Всего 6–8 минут таких упражнений дважды в день повышают вариабельность сердечного ритма (ВСР) и укрепляют эмоциональный резерв.'
      },
      {
        heading: 'Внутренняя архитектура безопасности',
        p1: 'Истинная медитация — это не борьба с мыслями, а естественное следствие сбалансированной нервной системы. Когда тело физиологически ощущает безопасность, ментальный шум затихает сам собой.',
        p2: 'Сочетая соматические знания нейробиологии с древними созерцательными практиками, мы исцеляем тело и раскрываем безграничный внутренний покой.'
      }
    ]
  },
  'circadian-sleep-architecture-article': {
    sections: [
      {
        heading: 'Биология глубокого восстанавливающего сна',
        p1: 'Сон — это не просто выключение активности, а тонко слаженное клеточное очищение. Во время глубоких фаз глимфатическая система вымывает метаболические отходы из тканей мозга, а гормоны восстанавливают мышцы и нейронные волокна.',
        p2: 'Искусственный синий свет, поздние приемы пищи и вечерняя мыслительная суета сбивают биологические часы, приводя к хронической усталости даже после многих часов в постели.'
      },
      {
        heading: 'Вечерние ритуалы замедления',
        quote: 'Глубокий сон взращивается днем, закрепляется в сумерках и собирается в ночной тишине.',
        p1: 'Подготовка ко сну начинается за 90 минут до отдыха. Замена ярких ламп теплым приглушенным светом запускает естественный синтез мелатонина без снотворных препаратов.',
        p2: 'Мягкая растяжка позвоночника в сочетании с осознанным расслаблением (йога-нидра) плавно переводит вегетативный баланс из режима тревоги в глубокий ночной покой.'
      },
      {
        heading: 'Пробуждение с чистой энергией',
        p1: 'Когда циркадная архитектура уважается, пробуждение перестает быть борьбой с будильником и становится естественным приливом бодрости и благодарности.',
        p2: 'Синхронизация жизни с природными биоритмами наполняет день спокойной сосредоточенностью и высокой продуктивностью.'
      }
    ]
  },
  'chakras-and-physiology': {
    sections: [
      {
        heading: 'Научный взгляд на семь энергетических центров',
        p1: 'На протяжении тысячелетий созерцательные школы описывали семь главных энергетических центров вдоль оси позвоночника. Современная нейроэндокринология подтверждает эту карту: каждая чакра анатомически соответствует крупному нервному сплетению и эндокринной железе.',
        p2: 'От крестцового сплетения и надпочечников у основания до сердечного сплетения и тимуса в груди — наша энергетическая анатомия тесно переплетена с биохимией.'
      },
      {
        heading: 'Энергетические вибрации и клеточный резонанс',
        quote: 'Тело — это инструмент, а чакры — его струны. Настроенные дыханием и звуком, они звучат в гармонии с жизнью.',
        p1: 'Каждый центр имеет свою резонансную частоту. Используя сакральные звуковые частоты, пранаяму и направленное внимание, мы растворяем застарелые зажимы и восстанавливаем свободный ток энергии.',
        p2: 'Клиенты часто отмечают освобождение от многолетней тяжести в теле, как только заблокированные зоны возвращаются к естественной вибрации.'
      },
      {
        heading: 'Целостная гармония организма',
        p1: 'Зрелый духовный путь не отвергает науку и не игнорирует тонкие энергии. Самое глубокое исцеление рождается там, где обе традиции соединяются воедино.',
        p2: 'Поддерживая ежедневную энергетическую слаженность, вы обретаете глубокую целостность, наполняющую каждое действие и мысль.'
      }
    ]
  },
  'emotional-deconditioning': {
    sections: [
      {
        heading: 'Анатомия эмоциональных привычек',
        p1: 'Любая эмоция зарождается как кратковременная физиологическая волна, циркулирующая в крови всего около 90 секунд. Однако когда ум привязывает к ней привычные обиды и сюжеты, эмоция застывает в хроническое настроение.',
        p2: 'Эмоциональное растождествление — это искусство отделять чистые телесные ощущения от мыслительных историй, позволяя переживанию пройти сквозь тело и раствориться без токсичного следа.'
      },
      {
        heading: 'Воспитание просторного внутреннего свидетеля',
        quote: 'Вы — не буря, бушующая в груди; вы — бескрайнее небо, вмещающее ее.',
        p1: 'Когда накатывает гнев, тревога или грусть, привычный рефлекс толкает нас либо подавлять их, либо раскручивать драму. Есть третий путь: стать чутким и спокойным свидетелем.',
        p2: 'Несколько минут безмолвного пребывания с физическим ощущением в горле или солнечном сплетении без оценок позволяют напряжению безопасно разрядиться.'
      },
      {
        heading: 'Непоколебимая эмоциональная свобода',
        p1: 'Со временем вы замечаете, что эмоции больше не управляют вашими решениями. Вы действуете из точки осознанной мудрости, а не слепого автоматизма.',
        p2: 'Это внутреннее равновесие является фундаментом психологической зрелости и подлинной духовной свободы.'
      }
    ]
  },
  'silence-as-medicine': {
    sections: [
      {
        heading: 'Эпидемия ментального шума',
        p1: 'Мы живем в эпоху беспрерывной информационной и звуковой бомбардировки. Всплывающие уведомления, поток новостей и внутренний диалог держат дефолт-систему мозга в состоянии непрерывного трения.',
        p2: 'Подобно тому как пищеварительная система нуждается в паузах для усвоения, наш ум жизненно нуждается в регулярных периодах абсолютной, чистой тишины.'
      },
      {
        heading: 'Нейробиология благородного безмолвия',
        quote: 'Тишина — это не отсутствие звука, а осязаемое присутствие вашей глубочайшей сути.',
        p1: 'Нейробиологические исследования подтверждают, что регулярное погружение в тишину стимулирует нейрогенез в гиппокампе и снижает гиперактивность миндалевидного тела. В тишине фрагментарные мысли оседают, как взвесь в прозрачной воде.',
        p2: '30–60 минут созерцательного безмолвия в день восстанавливают когнитивные ресурсы, обостряют интуицию и растворяют тревожность.'
      },
      {
        heading: 'Практика часа тишины',
        p1: 'Выделите один час утром или вечером без экранов, книг и разговоров. Просто посидите, подышите и созерцайте мир в чутком спокойствии.',
        p2: 'В этой священной тишине вы соприкасаетесь с вечным покоем, который всегда пребывал в самом центре вашей души.'
      }
    ]
  },
  'workplace-burnout-executive-vitality': {
    sections: [
      {
        heading: 'Скрытая цена непрерывной гонки',
        p1: 'Успешные лидеры, врачи и предприниматели часто путают адреналиновую зависимость с подлинным вдохновением. Постоянная работа на высоких бета-ритмах истощает дофаминовые депо и неизбежно ведет к выгоранию.',
        p2: 'Истинная продуктивность определяется не тем, как яростно вы действуете в кризис, а тем, насколько быстро и легко вы возвращаетесь в спокойное базовое состояние.'
      },
      {
        heading: 'Стратегические соматические микропаузы',
        quote: 'Мастер стрельбы из лука не держит тетиву натянутой вечно; между выстрелами она отдыхает.',
        p1: 'Трехминутные перезагрузки каждые два часа — медленный выдох через нос, расслабление плеч и панорамный расфокусированный взгляд — предотвращают накопление кортизола в течение дня.',
        p2: 'Эти короткие переходы сохраняют остроту ума, уберегают от импульсивных реакций в коллективе и оставляют запас сил для личной жизни.'
      },
      {
        heading: 'Лидерство из точки спокойной силы',
        p1: 'Команда бессознательно считывает состояние нервной системы своего руководителя. Суета сеет неуверенность, тогда как устойчивое, центрированное присутствие вселяет спокойствие и ясность.',
        p2: 'Внутренняя тишина — это не отвлеченное хобби, а самое мощное конкурентное преимущество современного лидера.'
      }
    ]
  }
};

const fullArticlesData = {
  en: enArticles,
  de: deArticles,
  fr: frArticles,
  ro: roArticles,
  ru: ruArticles
};

fs.writeFileSync(
  path.join(__dirname, '../src/data/articleContents.js'),
  'export const articleContents = ' + JSON.stringify(fullArticlesData, null, 2) + ';\n',
  'utf-8'
);
console.log('✓ Wrote src/data/articleContents.js');

// ==========================================
// 2. TRANSLATIONS FOR CONTENT JSONs
// ==========================================
const localizedPillars = {
  de: [
    {
      id: "all",
      name: "Alle Angebote",
      icon: "✦",
      tagline: "Alle Zufluchts-Praktiken",
      subcategories: [
        "Individuelle Beratung",
        "Meditationssitzung",
        "Stressabbau-Sitzung",
        "Chakren- & Energieausgleich",
        "Spirituelle Lebensbegleitung",
        "Emotionale Ausgeglichenheit",
        "Atemarbeit & Tiefenentspannung",
        "Retreats & Gruppenprogramme"
      ]
    },
    {
      id: "meditation",
      name: "Meditation",
      icon: "🧘",
      tagline: "Achtsamkeit & Edle Stille",
      subcategories: [
        "Geführte Meditation",
        "Achtsamer Atem",
        "Gegenwärtiges Gewahrsein",
        "Innere Stille"
      ]
    },
    {
      id: "calm",
      name: "Entspannung",
      icon: "🌿",
      tagline: "Ruhe & Erholsames Leben",
      subcategories: [
        "Lösung von Verspannungen",
        "Beruhigender Atem",
        "Abendliches Herunterfahren",
        "Erholsamer Schlaf"
      ]
    },
    {
      id: "balance",
      name: "Energie & Balance",
      icon: "✨",
      tagline: "Zentrierung & Freier Fluss",
      subcategories: [
        "Zentrierende Praxis",
        "Klang- & Schwingungsresonanz",
        "Fließende Lebenskraft",
        "Erneuerte Vitalität"
      ]
    },
    {
      id: "growth",
      name: "Inneres Wachstum",
      icon: "🌱",
      tagline: "Selbsterkenntnis & Sinn",
      subcategories: [
        "Selbsterkenntnis",
        "Lebensausrichtung",
        "Tägliche Erdung",
        "Emotionale Reife"
      ]
    }
  ],
  fr: [
    {
      id: "all",
      name: "Toutes les Séances",
      icon: "✦",
      tagline: "Toutes nos Modalités",
      subcategories: [
        "Consultation Personnelle",
        "Séance de Méditation",
        "Séance Anti-Stress",
        "Harmonisation Énergétique",
        "Accompagnement Spirituel",
        "Équilibre Émotionnel",
        "Respiration & Relaxation",
        "Retraites & Ateliers Collectifs"
      ]
    },
    {
      id: "meditation",
      name: "Méditation",
      icon: "🧘",
      tagline: "Pleine Conscience & Silence",
      subcategories: [
        "Méditation Guidée",
        "Souffle Conscient",
        "Présence Immédiate",
        "Silence Intérieur"
      ]
    },
    {
      id: "calm",
      name: "Relaxation",
      icon: "🌿",
      tagline: "Calme & Sérénité au Quotidien",
      subcategories: [
        "Dénouement des Tensions",
        "Souffle Apaisant",
        "Rituel du Soir",
        "Sommeil Réparateur"
      ]
    },
    {
      id: "balance",
      name: "Énergie & Équilibre",
      icon: "✨",
      tagline: "Centrage & Flux Naturel",
      subcategories: [
        "Pratique de Centrage",
        "Résonance Acoustique",
        "Fluidité Vitale",
        "Vitalité Renouvelée"
      ]
    },
    {
      id: "growth",
      name: "Épanouissement Intérieur",
      icon: "🌱",
      tagline: "Connaissance de Soi & Sens",
      subcategories: [
        "Connaissance de Soi",
        "Direction de Vie",
        "Ancrage Quotidien",
        "Maturité Émotionnelle"
      ]
    }
  ],
  ro: [
    {
      id: "all",
      name: "Toate Sesiunile",
      icon: "✦",
      tagline: "Toate Practicile Sanctuarului",
      subcategories: [
        "Consultanță Individuală",
        "Sesiune de Meditație",
        "Sesiune Anti-Stres",
        "Echilibrare Energetică",
        "Ghidare Spirituală",
        "Echilibru Emoțional",
        "Respirație & Relaxare",
        "Retrageri & Programe de Grup"
      ]
    },
    {
      id: "meditation",
      name: "Meditație",
      icon: "🧘",
      tagline: "Mindfulness & Liniște Nobilă",
      subcategories: [
        "Meditație Ghidată",
        "Respirație Conștientă",
        "Prezență în Acum",
        "Liniște Lăuntrică"
      ]
    },
    {
      id: "calm",
      name: "Relaxare",
      icon: "🌿",
      tagline: "Calm & Tihnă Profundă",
      subcategories: [
        "Eliberarea Tensiunii",
        "Respirație Calmantă",
        "Liniștire de Seară",
        "Somn Odihnitor"
      ]
    },
    {
      id: "balance",
      name: "Energie & Echilibru",
      icon: "✨",
      tagline: "Centrare & Flux Vital",
      subcategories: [
        "Practică de Centrare",
        "Rezonanță Sonoră",
        "Fluiditate Energetică",
        "Vitalitate Reînnoită"
      ]
    },
    {
      id: "growth",
      name: "Creștere Interioară",
      icon: "🌱",
      tagline: "Autocunoaștere & Rost",
      subcategories: [
        "Autocunoaștere",
        "Orientare în Viață",
        "Împământare Zilnică",
        "Maturitate Emoțională"
      ]
    }
  ],
  ru: [
    {
      id: "all",
      name: "Все сессии",
      icon: "✦",
      tagline: "Все практики санктуария",
      subcategories: [
        "Индивидуальная консультация",
        "Сессия медитации",
        "Снятие стресса и напряжения",
        "Энергетический баланс чакр",
        "Духовное наставничество",
        "Эмоциональное благополучие",
        "Дыхание и расслабление",
        "Ретриты и групповые программы"
      ]
    },
    {
      id: "meditation",
      name: "Медитация",
      icon: "🧘",
      tagline: "Осознанность и благородная тишина",
      subcategories: [
        "Направляемая медитация",
        "Осознанное дыхание",
        "Присутствие в моменте",
        "Внутренний покой"
      ]
    },
    {
      id: "calm",
      name: "Релаксация",
      icon: "🌿",
      tagline: "Глубокий покой и отдых",
      subcategories: [
        "Снятие зажимов",
        "Успокаивающее дыхание",
        "Вечернее замедление",
        "Восстанавливающий сон"
      ]
    },
    {
      id: "balance",
      name: "Энергия и баланс",
      icon: "✨",
      tagline: "Центрирование и жизненный ток",
      subcategories: [
        "Центрирующая практика",
        "Звуковой резонанс",
        "Свободный ток энергии",
        "Обновленная витальность"
      ]
    },
    {
      id: "growth",
      name: "Внутренний рост",
      icon: "🌱",
      tagline: "Самопознание и смысл",
      subcategories: [
        "Самопознание",
        "Жизненные ориентиры",
        "Ежедневное заземление",
        "Эмоциональная зрелость"
      ]
    }
  ]
};

const localizedServicesItems = {
  de: [
    {
      id: "individual-consultation",
      num: "01",
      tag: "1:1 BEGLEITUNG",
      badge: "🌿 1:1 BEGLEITUNG",
      title: "Individuelle Beratung",
      subtitle: "Achtsames Leben & Persönliche Balance",
      shortDesc: "Ein vertrauensvolles 1:1-Gespräch zur Analyse Ihrer Gewohnheiten, Stressfaktoren und Lebensziele. Gestaltung eines praxistauglichen Rhythmus für dauerhafte innere Ruhe.",
      fullDesc: "Eine geschützte Einzelsitzung zur Klärung Ihrer Lebensgewohnheiten, Minderung chronischer Anspannung und Entwicklung einer maßgeschneiderten Entspannungsroutine.",
      pillars: ["BALANCE", "GROWTH", "CALM"],
      focusAreas: ["Tagesrhythmus", "Achtsame Lebensführung", "Ruhe-Routinen", "Selbstwahrnehmung"],
      duration: "60 Minuten",
      format: "Vor Ort im Refugium oder Online",
      image: "/images/services/service-personal-consultation.jpg",
      featured: true,
      visible: true,
      order: 1
    },
    {
      id: "meditation",
      num: "02",
      tag: "ACHTSAMKEIT",
      badge: "🧘 ACHTSAMKEIT",
      title: "Meditationssitzung",
      subtitle: "Stille & Gegenwärtiges Gewahrsein",
      shortDesc: "Geführte Meditation und Atemachtsamkeit zur Beruhigung kreisender Gedanken, Förderung klarer Gegenwärtigkeit und wohltuender innerer Stille.",
      fullDesc: "Erlernen Sie fundierte Meditation, Atembeobachtung und praxiserprobte Wege, um den Verstand sanft zur Ruhe zu führen.",
      pillars: ["MEDITATION", "CALM"],
      focusAreas: ["Geführte Meditation", "Achtsamer Atem", "Präsenz im Hier & Jetzt", "Innere Stille"],
      duration: "60 Minuten",
      format: "1:1 Praxis & Begleitung",
      image: "/images/services/service-meditation-session.jpg",
      featured: true,
      visible: true,
      order: 2
    },
    {
      id: "stress-mental-wellness",
      num: "03",
      tag: "ENTSPANNUNG",
      badge: "🌿 ENTSPANNUNG",
      title: "Stressabbau & Mentale Entlastung",
      subtitle: "Leichtigkeit & Inneren Freiraum Wiederfinden",
      shortDesc: "Sanfte somatische Entspannungsübungen zur Minderung von Berufs- und Alltagsstress, Lösung von Nervenanspannung und Rückkehr zu gelassener Klarheit.",
      fullDesc: "Gezielte Mikropausen und körperorientierte Entspannungsmethoden, die das sympathische Nervensystem sanft drosseln und Klarheit schenken.",
      pillars: ["CALM", "MEDITATION"],
      focusAreas: ["Lösung von Verspannungen", "Mentale Stille", "Work-Life-Balance", "Fokussierte Gelassenheit"],
      duration: "60 Minuten",
      format: "Regenerative Reset-Sitzung",
      image: "/images/services/service-stress-relief.jpg",
      featured: true,
      visible: true,
      order: 3
    },
    {
      id: "energy-chakra-wellness",
      num: "04",
      tag: "HARMONIE",
      badge: "✨ HARMONIE",
      title: "Chakren- & Energieausgleich",
      subtitle: "Sanfte Lebenskraft & Natürlicher Fluss",
      shortDesc: "Feinstoffliche Energiearbeit, therapeutische Klangschalen und geführte Farbvisualisierung zur Lösung von Blockaden und ganzheitlicher Erdung.",
      fullDesc: "Harmonisierung der sieben Energiezentren durch Klangfrequenzen und energetische Lenkung für spürbare Frische und Vitalität.",
      pillars: ["BALANCE", "CALM"],
      focusAreas: ["Zentrierende Praxis", "Klangschalen-Resonanz", "Fließende Energie", "Vitalitätsstärkung"],
      duration: "60 Minuten",
      format: "Klang- & Energiepraxis",
      image: "/images/services/service-energy-balancing.jpg",
      featured: true,
      visible: true,
      order: 4
    },
    {
      id: "spiritual-coaching",
      num: "05",
      tag: "INNERES WACHSTUM",
      badge: "🌱 INNERES WACHSTUM",
      title: "Spirituelle Lebensbegleitung",
      subtitle: "Klarheit, Sinn & Innere Ausrichtung",
      shortDesc: "Tiefgründige Einzelgespräche zur Selbsterforschung, Klärung persönlicher Werte und harmonischen Neuausrichtung in wichtigen Lebensphasen.",
      fullDesc: "Einfühlsame Begleitung auf dem Weg zu wahrhaftiger Selbsterkenntnis, innerem Frieden und stimmigen Lebensentscheidungen.",
      pillars: ["GROWTH", "BALANCE"],
      focusAreas: ["Selbsterkenntnis", "Lebenssinn & Richtung", "Achtsame Entscheidungen", "Innere Stabilität"],
      duration: "60 Minuten",
      format: "Persönlicher Dialog & Mentoring",
      image: "/images/services/service-life-guidance.jpg",
      featured: true,
      visible: true,
      order: 5
    },
    {
      id: "positive-mindset-emotional-balance",
      num: "06",
      tag: "SELBSTBEWUSSTSEIN",
      badge: "💎 SELBSTBEWUSSTSEIN",
      title: "Emotionale Ausgeglichenheit",
      subtitle: "Innere Weite & Gelassenheit im Wandel",
      shortDesc: "Aufbau stabiler Gewohnheiten und somatischer Achtsamkeit, um emotionale Hochs und Tiefs mit Geduld, Klarheit und Mitgefühl zu durchleben.",
      fullDesc: "Lernen Sie, Gefühle ohne Verdrängung wahrzunehmen, alte Stressspiralen aufzulösen und in sich selbst geborgen zu ruhen.",
      pillars: ["GROWTH", "CALM"],
      focusAreas: ["Emotionale Reife", "Tägliche Erdung", "Geduld & Nachsicht", "Ganzheitliche Balance"],
      duration: "60 Minuten",
      format: "Gewohnheits- & Mindset-Praxis",
      image: "/images/services/service-emotional-wellbeing.jpg",
      featured: false,
      visible: true,
      order: 6
    },
    {
      id: "breathing-relaxation",
      num: "07",
      tag: "ATEM & NACHTRUHE",
      badge: "🌬️ ATEM & NACHTRUHE",
      title: "Atemarbeit & Tiefenentspannung",
      subtitle: "Ruhige Abende & Heilsamer Tiefschlaf",
      shortDesc: "Fundierte Pranayama-Techniken und abendliche Beruhigungsrituale zur Abschaltung des Gedankenkarussells und Vorbereitung auf tiefen Schlaf.",
      fullDesc: "Beruhigende Atemführung und Entspannungsrituale (Yoga Nidra), um körperliche Anspannung abzugeben und regenerativen Schlaf zu finden.",
      pillars: ["CALM", "MEDITATION"],
      focusAreas: ["Abendliche Entschleunigung", "Beruhigender Atem", "Stille Rituale", "Erholsamer Tiefschlaf"],
      duration: "45–60 Minuten",
      format: "Geführte Atem- & Ruhepraxis",
      image: "/images/services/service-breathwork-relaxation.jpg",
      featured: false,
      visible: true,
      order: 7
    },
    {
      id: "programs-workshops",
      num: "08",
      tag: "GRUPPENSEMINARE",
      badge: "🏛️ GRUPPENSEMINARE",
      title: "Retreats & Gruppenprogramme",
      subtitle: "Gemeinsame Stille & Ganzheitliches Lernen",
      shortDesc: "Gruppenmeditationen, vertiefende Workshops und Retreats im Refugium zur Förderung kollektiver Ruhe, Verbundenheit und persönlicher Erneuerung.",
      fullDesc: "Gruppenformate und Firmen-Workshops zur Förderung von Achtsamkeit, Teamharmonie und nachhaltiger Stresskompetenz.",
      pillars: ["GROWTH", "MEDITATION", "BALANCE"],
      focusAreas: ["Gruppenmeditation", "Achtsame Teamkultur", "Wellness-Workshops", "Gemeinsame Praxis"],
      duration: "Halbtag / Mehrtägig",
      format: "Seminare & Refugium-Retreats",
      image: "/images/services/service-retreats-group.jpg",
      featured: false,
      visible: true,
      order: 8
    }
  ],
  fr: [
    {
      id: "individual-consultation",
      num: "01",
      tag: "GUIDANCE 1:1",
      badge: "🌿 GUIDANCE 1:1",
      title: "Consultation Personnelle",
      subtitle: "Vie Consciente & Équilibre Personnel",
      shortDesc: "Une séance individuelle approfondie pour explorer vos habitudes, votre rythme de vie et vos besoins de sérénité. Co-création d'un rythme quotidien équilibré.",
      fullDesc: "Un espace confidentiel pour apaiser la charge mentale, dénouer les tensions accumulées et bâtir un sanctuaire intérieur au quotidien.",
      pillars: ["BALANCE", "GROWTH", "CALM"],
      focusAreas: ["Rythme Quotidien", "Vie Consciente", "Routines Paisibles", "Conscience de Soi"],
      duration: "60 minutes",
      format: "En Présentiel au Sanctuaire ou en Ligne",
      image: "/images/services/service-personal-consultation.jpg",
      featured: true,
      visible: true,
      order: 1
    },
    {
      id: "meditation",
      num: "02",
      tag: "PLEINE CONSCIENCE",
      badge: "🧘 PLEINE CONSCIENCE",
      title: "Séance de Méditation",
      subtitle: "Silence & Présence Immédiate",
      shortDesc: "Pratiques guidées de méditation et d'attention au souffle conçues pour apaiser un esprit agité et instaurer une paix intérieure durable.",
      fullDesc: "Apprenez la présence attentive, l'écoute du souffle et des méthodes simples pour dissoudre le flot incessant des pensées.",
      pillars: ["MEDITATION", "CALM"],
      focusAreas: ["Méditation Guidée", "Respiration Consciente", "Présence Immédiate", "Silence Intérieur"],
      duration: "60 minutes",
      format: "Pratique & Accompagnement 1:1",
      image: "/images/services/service-meditation-session.jpg",
      featured: true,
      visible: true,
      order: 2
    },
    {
      id: "stress-mental-wellness",
      num: "03",
      tag: "RELAXATION",
      badge: "🌿 RELAXATION",
      title: "Séance Anti-Stress & Apaisement",
      subtitle: "Retrouver Légèreté & Espace Mental",
      shortDesc: "Pratiques douces de décompression somatique et outils de pleine conscience pour dissiper la fatigue nerveuse et renouer avec la clarté.",
      fullDesc: "Un protocole apaisant conçu pour désactiver le mode alerte de l'organisme et régénérer le système nerveux en douceur.",
      pillars: ["CALM", "MEDITATION"],
      focusAreas: ["Relâchement Musculaire", "Silence Mental", "Équilibre Vie Pro-Perso", "Calme Concentré"],
      duration: "60 minutes",
      format: "Séance de Réinitialisation Nerveuse",
      image: "/images/services/service-stress-relief.jpg",
      featured: true,
      visible: true,
      order: 3
    },
    {
      id: "energy-chakra-wellness",
      num: "04",
      tag: "HARMONIE",
      badge: "✨ HARMONIE",
      title: "Harmonisation Énergétique",
      subtitle: "Fluidité Vitale & Ancrage Profond",
      shortDesc: "Sensibilisation énergétique, résonance acoustique aux bols thérapeutiques et visualisation guidée pour vous sentir ancré et revigoré.",
      fullDesc: "Harmonisez vos sept centres énergétiques grâce au son et à l'attention focalisée pour libérer votre vitalité naturelle.",
      pillars: ["BALANCE", "CALM"],
      focusAreas: ["Centrage Somatique", "Bains Sonores", "Circulation d'Énergie", "Vitalité Renouvelée"],
      duration: "60 minutes",
      format: "Pratique Vibratoire & Énergétique",
      image: "/images/services/service-energy-balancing.jpg",
      featured: true,
      visible: true,
      order: 4
    },
    {
      id: "spiritual-coaching",
      num: "05",
      tag: "ÉPANOUISSEMENT",
      badge: "🌱 ÉPANOUISSEMENT",
      title: "Accompagnement Spirituel",
      subtitle: "Clarté, Sens & Direction de Vie",
      shortDesc: "Dialogues personnalisés pour éclairer vos valeurs fondamentales, surmonter les carrefours de vie et trouver une boussole intérieure.",
      fullDesc: "Un mentorat bienveillant pour aligner vos choix quotidiens avec votre véritable essence et cultiver la sagesse.",
      pillars: ["GROWTH", "BALANCE"],
      focusAreas: ["Connaissance de Soi", "Orientation de Vie", "Choix Conscients", "Équilibre d'Être"],
      duration: "60 minutes",
      format: "Dialogue Individuel & Mentorat",
      image: "/images/services/service-life-guidance.jpg",
      featured: true,
      visible: true,
      order: 5
    },
    {
      id: "positive-mindset-emotional-balance",
      num: "06",
      tag: "LUCIDITÉ",
      badge: "💎 LUCIDITÉ",
      title: "Équilibre Émotionnel",
      subtitle: "Patience, Ancrage & Bienveillance",
      shortDesc: "Développez l'art de traverser les vagues émotionnelles avec calme, autonomie et discernement au cœur du quotidien.",
      fullDesc: "Libérez-vous des automatismes réactifs et cultivez la présence du témoin compatissant pour vivre en paix avec vos émotions.",
      pillars: ["GROWTH", "CALM"],
      focusAreas: ["Conscience Émotionnelle", "Ancrage Quotidien", "Douceur & Patience", "Harmonie Intérieure"],
      duration: "60 minutes",
      format: "Séance d'Intégration & Habitudes",
      image: "/images/services/service-emotional-wellbeing.jpg",
      featured: false,
      visible: true,
      order: 6
    },
    {
      id: "breathing-relaxation",
      num: "07",
      tag: "SOUFFLE & REPOS",
      badge: "🌬️ SOUFFLE & REPOS",
      title: "Respiration & Relaxation Profonde",
      subtitle: "Soirées Sereines & Sommeil Réparateur",
      shortDesc: "Techniques de respiration rythmée et relaxation crépusculaire pour apaiser le flux mental et préparer un sommeil profond.",
      fullDesc: "Des exercices respiratoires doux combinés au Yoga Nidra pour relâcher l'organisme et savourer des nuits régénératrices.",
      pillars: ["CALM", "MEDITATION"],
      focusAreas: ["Décélération du Soir", "Souffle Apaisant", "Rituels de Silence", "Sommeil Régénérateur"],
      duration: "45–60 minutes",
      format: "Pratique Guidée du Souffle",
      image: "/images/services/service-breathwork-relaxation.jpg",
      featured: false,
      visible: true,
      order: 7
    },
    {
      id: "programs-workshops",
      num: "08",
      tag: "SÉANCES DE GROUPE",
      badge: "🏛️ SÉANCES DE GROUPE",
      title: "Retraites & Ateliers Collectifs",
      subtitle: "Silence Partagé & Apprentissage Vivant",
      shortDesc: "Méditations en groupe, cercles d'immersion et retraites résidentielles pour cultiver la sérénité collective et le renouveau intérieur.",
      fullDesc: "Des formats pour petits groupes et entreprises favorisant la cohésion d'équipe, la pleine conscience et la résilience collective.",
      pillars: ["GROWTH", "MEDITATION", "BALANCE"],
      focusAreas: ["Méditation Collective", "Cohésion Consciente", "Ateliers Thématiques", "Pratique Partagée"],
      duration: "Demi-Journée / Séries",
      format: "Ateliers & Retraites de Sanctuaire",
      image: "/images/services/service-retreats-group.jpg",
      featured: false,
      visible: true,
      order: 8
    }
  ],
  ro: [
    {
      id: "individual-consultation",
      num: "01",
      tag: "GHIDARE 1:1",
      badge: "🌿 GHIDARE 1:1",
      title: "Consultanță Individuală",
      subtitle: "Viață Conștientă & Echilibru Personal",
      shortDesc: "O sesiune personalizată pentru a analiza ritmul tău zilnic, factorii de stres și obiectivele de bine. Crearea unui ritm armonios de viață.",
      fullDesc: "Un spațiu confidențial și cald pentru a elibera presiunea zilnică, a aduce claritate și a construi o rutină durabilă de calm.",
      pillars: ["BALANCE", "GROWTH", "CALM"],
      focusAreas: ["Ritm Zilnic", "Trăire Conștientă", "Rutine de Calm", "Conștiință de Sine"],
      duration: "60 minute",
      format: "În Sanctuar sau Online Global",
      image: "/images/services/service-personal-consultation.jpg",
      featured: true,
      visible: true,
      order: 1
    },
    {
      id: "meditation",
      num: "02",
      tag: "MINDFULNESS",
      badge: "🧘 MINDFULNESS",
      title: "Sesiune de Meditație",
      subtitle: "Liniște & Prezență în Acum",
      shortDesc: "Meditație ghidată și conștientizarea respirației pentru a domoli o minte agitată și a cultiva o stare de prezență limpede.",
      fullDesc: "Învață tehnici sigure de atenție conștientă și observare a respirației pentru a dizolva zgomotul gândurilor.",
      pillars: ["MEDITATION", "CALM"],
      focusAreas: ["Meditație Ghidată", "Respirație Conștientă", "Prezență în Acum", "Liniște Lăuntrică"],
      duration: "60 minute",
      format: "Practică & Ghidare 1:1",
      image: "/images/services/service-meditation-session.jpg",
      featured: true,
      visible: true,
      order: 2
    },
    {
      id: "stress-mental-wellness",
      num: "03",
      tag: "RELAXARE",
      badge: "🌿 RELAXARE",
      title: "Sesiune Anti-Stres & Decompresie",
      subtitle: "Regăsirea Spațiului Mental & Tihnei",
      shortDesc: "Practici blânde de relaxare somatică și tehnici de mindfulness pentru a elibera epuizarea cotidiană și a reinstaura calmul natural.",
      fullDesc: "Exerciții concepute special pentru a regla sistemul nervos, a curăța agitația mentală și a reda pacea lăuntrică.",
      pillars: ["CALM", "MEDITATION"],
      focusAreas: ["Eliberarea Tensiunii", "Liniște Mentală", "Echilibru Muncă-Viață", "Concentrare Calină"],
      duration: "60 minute",
      format: "Sesiune de Resetare Nervoasă",
      image: "/images/services/service-stress-relief.jpg",
      featured: true,
      visible: true,
      order: 3
    },
    {
      id: "energy-chakra-wellness",
      num: "04",
      tag: "ARMONIE",
      badge: "✨ ARMONIE",
      title: "Echilibrare Energetică & Chakre",
      subtitle: "Vitalitate Subtilă & Flux Firesc",
      shortDesc: "Conștientizare energetică, boluri sonore terapeutice și vizualizare ghidată pentru a te simți centrat, revitalizat și în armonie profundă.",
      fullDesc: "Armonizează cei șapte centri subtili prin rezonanță acustică și focalizare intenționată pentru a reactiva energia vitală.",
      pillars: ["BALANCE", "CALM"],
      focusAreas: ["Practică de Centrare", "Rezonanță Sonoră", "Flux Energetic Liber", "Vitalitate Reînnoită"],
      duration: "60 minute",
      format: "Practică Energetică & Sonoră",
      image: "/images/services/service-energy-balancing.jpg",
      featured: true,
      visible: true,
      order: 4
    },
    {
      id: "spiritual-coaching",
      num: "05",
      tag: "CREȘTERE INTERIOARĂ",
      badge: "🌱 CREȘTERE INTERIOARĂ",
      title: "Ghidare Spirituală & Orientare",
      subtitle: "Claritate, Direcție & Rost",
      shortDesc: "Dialoguri profunde 1:1 dedicate autocunoașterii, clarificării valorilor de viață și regăsirii unei direcții luminoase de viitor.",
      fullDesc: "Mentorat empatic pentru a lua decizii din spațiul înțelepciunii interioare și a trăi în aliniere autentică cu sine.",
      pillars: ["GROWTH", "BALANCE"],
      focusAreas: ["Autocunoaștere", "Direcție de Viață", "Alegeri Conștiente", "Echilibru Cotidian"],
      duration: "60 minute",
      format: "Dialog Individual & Mentorat",
      image: "/images/services/service-life-guidance.jpg",
      featured: true,
      visible: true,
      order: 5
    },
    {
      id: "positive-mindset-emotional-balance",
      num: "06",
      tag: "CONȘTIINȚĂ",
      badge: "💎 CONȘTIINȚĂ",
      title: "Echilibru Emoțional",
      subtitle: "Pace Lăuntrică & Stabilitate Durabilă",
      shortDesc: "Dezvoltă obiceiuri sănătoase și conștientizare corporală pentru a traversa suișurile și coborâșurile vieții cu răbdare și libertate interioară.",
      fullDesc: "Învață să eliberezi contracturile emoționale vechi și să cultivi martorul interior senin în fața oricărei încercări.",
      pillars: ["GROWTH", "CALM"],
      focusAreas: ["Conștiință Emoțională", "Împământare Zilnică", "Răbdare & Blândețe", "Echilibru Profund"],
      duration: "60 minute",
      format: "Practică de Mindset & Obiceiuri",
      image: "/images/services/service-emotional-wellbeing.jpg",
      featured: false,
      visible: true,
      order: 6
    },
    {
      id: "breathing-relaxation",
      num: "07",
      tag: "RESPIRAȚIE & ODIHNĂ",
      badge: "🌬️ RESPIRAȚIE & ODIHNĂ",
      title: "Respirație & Relaxare Profundă",
      subtitle: "Seri Liniștite & Somn Odihnitor",
      shortDesc: "Tehnici ritmice de pranayama și relaxare de seară pentru a deconecta mintea de la griji și a pregăti un somn adânc și vindecător.",
      fullDesc: "Exerciții de respirație profundă combinate cu Yoga Nidra pentru a elibera corpul de tensiuni și a readuce odihna sănătoasă.",
      pillars: ["CALM", "MEDITATION"],
      focusAreas: ["Liniștire de Seară", "Respirație Calmantă", "Ritualuri de Tăcere", "Somn Regenerator"],
      duration: "45–60 minute",
      format: "Ghidare prin Respirație & Repaus",
      image: "/images/services/service-breathwork-relaxation.jpg",
      featured: false,
      visible: true,
      order: 7
    },
    {
      id: "programs-workshops",
      num: "08",
      tag: "SESIUNI DE GRUP",
      badge: "🏛️ SESIUNI DE GRUP",
      title: "Retrageri & Programe de Grup",
      subtitle: "Liniște Împărtășită & Creștere Comună",
      shortDesc: "Meditații de grup, ateliere tematice și retrageri rezidențiale pentru a susține calmul colectiv, reflecția profundă și reînnoirea sufletească.",
      fullDesc: "Programe pentru comunități și echipe corporative axate pe mindfulness, colaborare armonioasă și reziliență la stres.",
      pillars: ["GROWTH", "MEDITATION", "BALANCE"],
      focusAreas: ["Meditație de Grup", "Colaborare Conștientă", "Ateliere de Sanctuar", "Practică Comună"],
      duration: "Jumătate de Zi / Serii",
      format: "Ateliere & Retrageri de Sanctuar",
      image: "/images/services/service-retreats-group.jpg",
      featured: false,
      visible: true,
      order: 8
    }
  ],
  ru: [
    {
      id: "individual-consultation",
      num: "01",
      tag: "ИНДИВИДУАЛЬНО 1:1",
      badge: "🌿 ИНДИВИДУАЛЬНО 1:1",
      title: "Индивидуальная консультация",
      subtitle: "Осознанная жизнь и внутренний баланс",
      shortDesc: "Персональная беседа один на один для анализа привычек, снижения фонового напряжения и создания устойчивого ритма гармоничной жизни.",
      fullDesc: "Индивидуальная сессия для выявления скрытых источников стресса, восстановления сил и построения экологичного режима покоя.",
      pillars: ["BALANCE", "GROWTH", "CALM"],
      focusAreas: ["Ритм дня", "Осознанность", "Практики покоя", "Самопознание"],
      duration: "60 минут",
      format: "Очно в Санктуарии или онлайн",
      image: "/images/services/service-personal-consultation.jpg",
      featured: true,
      visible: true,
      order: 1
    },
    {
      id: "meditation",
      num: "02",
      tag: "ОСОЗНАННОСТЬ",
      badge: "🧘 ОСОЗНАННОСТЬ",
      title: "Сессия медитации",
      subtitle: "Тишина и присутствие в моменте",
      shortDesc: "Направляемая медитация и дыхательные техники для остановки непрерывного потока мыслей и обретения глубокой внутренней устойчивости.",
      fullDesc: "Освойте доказательные методы медитации, наблюдение за дыханием и навыки мгновенного возвращения в ресурсное состояние покоя.",
      pillars: ["MEDITATION", "CALM"],
      focusAreas: ["Направляемая медитация", "Осознанное дыхание", "Присутствие в моменте", "Внутренний покой"],
      duration: "60 минут",
      format: "Практика и наставничество 1:1",
      image: "/images/services/service-meditation-session.jpg",
      featured: true,
      visible: true,
      order: 2
    },
    {
      id: "stress-mental-wellness",
      num: "03",
      tag: "РЕЛАКСАЦИЯ",
      badge: "🌿 РЕЛАКСАЦИЯ",
      title: "Снятие стресса и антивыгорание",
      subtitle: "Возвращение легкости и ментального пространства",
      shortDesc: "Мягкие соматические практики расслабления и инструменты антистресса для устранения перегрузок на работе и восстановления ясности.",
      fullDesc: "Комплекс телесных и дыхательных упражнений для бережного перевода нервной системы из режима тревоги в режим безопасности.",
      pillars: ["CALM", "MEDITATION"],
      focusAreas: ["Снятие напряжения", "Ментальная тишина", "Баланс работы и жизни", "Спокойная ясность"],
      duration: "60 минут",
      format: "Сессия глубокой перезагрузки",
      image: "/images/services/service-stress-relief.jpg",
      featured: true,
      visible: true,
      order: 3
    },
    {
      id: "energy-chakra-wellness",
      num: "04",
      tag: "ГАРМОНИЯ",
      badge: "✨ ГАРМОНИЯ",
      title: "Энергетический баланс чакр",
      subtitle: "Естественный ток жизненной силы",
      shortDesc: "Энергетические практики, резонанс поющих тибетских чаш и визуализация для заземления, очищения блоков и обновления сил.",
      fullDesc: "Гармонизация семи энергетических центров через звуковые частоты и направленное внимание для восстановления витальности.",
      pillars: ["BALANCE", "CALM"],
      focusAreas: ["Центрирование", "Звуковой резонанс", "Свободный ток энергии", "Обновление сил"],
      duration: "60 минут",
      format: "Звуковая и энергетическая практика",
      image: "/images/services/service-energy-balancing.jpg",
      featured: true,
      visible: true,
      order: 4
    },
    {
      id: "spiritual-coaching",
      num: "05",
      tag: "ВНУТРЕННИЙ РОСТ",
      badge: "🌱 ВНУТРЕННИЙ РОСТ",
      title: "Духовное наставничество",
      subtitle: "Ясность, смысл и жизненные ориентиры",
      shortDesc: "Глубокие индивидуальные беседы для самопостижения, прояснения истинных ценностей и нахождения верного направления в жизни.",
      fullDesc: "Чуткое наставничество, помогающее принимать решения из состояния внутренней зрелости, мудрости и душевного покоя.",
      pillars: ["GROWTH", "BALANCE"],
      focusAreas: ["Самопознание", "Жизненные ориентиры", "Осознанные решения", "Внутренний баланс"],
      duration: "60 минут",
      format: "Личный диалог и наставничество",
      image: "/images/services/service-life-guidance.jpg",
      featured: true,
      visible: true,
      order: 5
    },
    {
      id: "positive-mindset-emotional-balance",
      num: "06",
      tag: "ОСОЗНАНИЕ",
      badge: "💎 ОСОЗНАНИЕ",
      title: "Эмоциональное благополучие",
      subtitle: "Внутренняя опора и невозмутимость",
      shortDesc: "Формирование здоровых эмоциональных привычек для спокойного прохождения жизненных кризисов с терпением и добротой к себе.",
      fullDesc: "Освобождение от старых реактивных программ и воспитание мудрого внутреннего свидетеля для жизни в мире с собой.",
      pillars: ["GROWTH", "CALM"],
      focusAreas: ["Эмоциональная зрелость", "Заземление", "Терпение и покой", "Душевное равновесие"],
      duration: "60 минут",
      format: "Работа с паттернами и привычками",
      image: "/images/services/service-emotional-wellbeing.jpg",
      featured: false,
      visible: true,
      order: 6
    },
    {
      id: "breathing-relaxation",
      num: "07",
      tag: "ДЫХАНИЕ И СОН",
      badge: "🌬️ ДЫХАНИЕ И СОН",
      title: "Дыхание и глубокая релаксация",
      subtitle: "Спокойный вечер и целительный сон",
      shortDesc: "Дыхательные техники и вечерние ритуалы расслабления, успокаивающие непрерывные мысли и возвращающие глубокий ночной сон.",
      fullDesc: "Мягкая дыхательная гимнастика и элементы йога-нидры для быстрого физического расслабления и легкого засыпания.",
      pillars: ["CALM", "MEDITATION"],
      focusAreas: ["Вечернее замедление", "Успокаивающее дыхание", "Ритуалы тишины", "Глубокий сон"],
      duration: "45–60 минут",
      format: "Практика дыхания и расслабления",
      image: "/images/services/service-breathwork-relaxation.jpg",
      featured: false,
      visible: true,
      order: 7
    },
    {
      id: "programs-workshops",
      num: "08",
      tag: "ГРУППОВЫЕ ПРОГРАММЫ",
      badge: "🏛️ ГРУППОВЫЕ ПРОГРАММЫ",
      title: "Ретриты и мастер-классы",
      subtitle: "Общая тишина и совместное развитие",
      shortDesc: "Групповые медитации, тематические воркшопы и ретриты в Санктуарии для созидания коллективного покоя и обновления сил.",
      fullDesc: "Форматы для малых групп и корпоративных команд, направленные на сплочение, осознанность и профилактику выгорания.",
      pillars: ["GROWTH", "MEDITATION", "BALANCE"],
      focusAreas: ["Групповая медитация", "Осознанное взаимодействие", "Воркшопы Санктуария", "Общая практика"],
      duration: "Полдня / Цикл встреч",
      format: "Мастер-классы и ретриты",
      image: "/images/services/service-retreats-group.jpg",
      featured: false,
      visible: true,
      order: 8
    }
  ]
};

// UI Keys for service detail, contact, modal, articles
const localizedExtraKeys = {
  en: {
    serviceDetail: {
      keyFocusAreas: "Key Dimensions & Practices",
      journey: "Structured 3-Stage Experience",
      step1Title: "Arrival & Centering",
      step1Desc: "Settle into a peaceful space. We talk through your personal goals, discuss how you are feeling, and bring a natural sense of calm and ease.",
      step2Title: "Guided Practice",
      step2Desc: "Gentle guidance through peaceful meditation, sound harmonies, mindful breathing, or supportive conversation.",
      step3Title: "Integration & Sustained Calm",
      step3Desc: "Grounding reflections with practical simple habits for maintaining stillness and balance in daily modern life.",
      readyTitle: "Begin Your Practice With Dr. Mayank",
      readyDesc: "Appointments are offered virtually worldwide and in our tranquil sanctuary. Reserve your private dialogue.",
      relatedTitle: "Complementary Practices",
      exploreModality: "Explore"
    },
    servicesUI: {
      learnMore: "Learn More",
      bookSession: "Book a Session"
    },
    contactUI: {
      detailsTitle: "Sanctuary Details",
      detailsDesc: "Whether visiting our sanctuary in person or joining our global virtual community, we provide a peaceful, grounded space for your inner transformation.",
      locationLabel: "Sanctuary Location",
      hoursLabel: "Consultation Hours",
      emailLabel: "Direct Email",
      phoneLabel: "Phone / WhatsApp"
    },
    modalUI: {
      optgroupServices: "Wellness Services",
      optgroupPrograms: "Workshops & Guided Programs"
    },
    articlesUI: {
      newsletterCta: "Reserve Sanctuary Session",
      detailCta: "Explore personalized guidance in meditation, breathwork, and energetic alignment.",
      authorTitle: "Doctor of Medicine | Meditation Master | Spiritual Coach | Motivational Speaker",
      keyTakeaways: "Key Clinical & Contemplative Insights",
      exploreMore: "Explore More Essays"
    },
    programsUI: {
      signature: "★ Signature",
      inquire: "Inquire About Next Cohort"
    }
  },
  de: {
    serviceDetail: {
      keyFocusAreas: "Zentrale Dimensionen & Praktiken",
      journey: "Strukturierter 3-Stufen-Weg",
      step1Title: "Ankommen & Zentrieren",
      step1Desc: "Ankommen in geschützter Atmosphäre. Wir besprechen Ihre persönlichen Anliegen, analysieren den aktuellen Zustand und leiten erste Ruhe ein.",
      step2Title: "Geführte Praxis",
      step2Desc: "Individuelle Anleitung durch Meditation, Klangschwingung, Pranayama-Atemtechnik oder klärende Gespräche.",
      step3Title: "Integration & Anhaltende Ruhe",
      step3Desc: "Reflexion und einfache somatische Gewohnheiten, um die erfahrene Stille und Gelassenheit verlässlich im Alltag zu verankern.",
      readyTitle: "Beginnen Sie Ihren Weg mit Dr. Mayank",
      readyDesc: "Sitzungen werden weltweit online sowie in unserem ruhigen Refugium angeboten. Vereinbaren Sie Ihr persönliches Gespräch.",
      relatedTitle: "Ergänzende Heilsame Praktiken",
      exploreModality: "Erkunden"
    },
    servicesUI: {
      learnMore: "Mehr erfahren",
      bookSession: "Sitzung buchen"
    },
    contactUI: {
      detailsTitle: "Informationen zum Refugium",
      detailsDesc: "Ob persönlich in unserem Refugium oder über unser globales virtuelles Angebot: Wir bieten einen geschützten, geerdeten Raum für Ihre innere Wandlung.",
      locationLabel: "Standort des Refugiums",
      hoursLabel: "Beratungszeiten",
      emailLabel: "Direkte E-Mail",
      phoneLabel: "Telefon / WhatsApp"
    },
    modalUI: {
      optgroupServices: "Heilsame Angebote & Sitzungen",
      optgroupPrograms: "Programme & Workshops"
    },
    articlesUI: {
      newsletterCta: "Platz im Refugium Reservieren",
      detailCta: "Erfahren Sie individuelle Begleitung in Meditation, Atemarbeit und energetischer Harmonie.",
      authorTitle: "Doktor der Medizin | Meditationsmeister | Spiritueller Coach | Motivationsredner",
      keyTakeaways: "Klinische & Kontemplative Kernaussagen",
      exploreMore: "Weitere Essays Entdecken"
    },
    programsUI: {
      signature: "★ Signatur",
      inquire: "Platz für nächste Gruppe anfragen"
    }
  },
  fr: {
    serviceDetail: {
      keyFocusAreas: "Dimensions Clés & Pratiques",
      journey: "Parcours Structuré en 3 Étapes",
      step1Title: "Accueil & Centrage",
      step1Desc: "Déposez-vous dans un espace serein. Nous échangeons sur vos ressentis et vos intentions pour installer un calme immédiat.",
      step2Title: "Pratique Guidée",
      step2Desc: "Accompagnement bienveillant à travers la méditation, la résonance sonore, la respiration consciente ou le dialogue constructif.",
      step3Title: "Intégration & Sérénité Durable",
      step3Desc: "Ancrage des ressentis et micro-habitudes simples pour préserver cette paix intérieure dans votre vie moderne.",
      readyTitle: "Commencez Votre Pratique avec le Dr Mayank",
      readyDesc: "Les consultations sont proposées en ligne partout dans le monde et dans notre sanctuaire paisible. Réservez votre entretien.",
      relatedTitle: "Pratiques Complémentaires",
      exploreModality: "Découvrir"
    },
    servicesUI: {
      learnMore: "En savoir plus",
      bookSession: "Réserver une séance"
    },
    contactUI: {
      detailsTitle: "Détails du Sanctuaire",
      detailsDesc: "Que vous veniez en personne dans notre sanctuaire ou que vous nous rejoigniez en ligne, nous vous offrons un espace chaleureux et sécurisant.",
      locationLabel: "Localisation du Sanctuaire",
      hoursLabel: "Heures de Consultation",
      emailLabel: "Courriel Direct",
      phoneLabel: "Téléphone / WhatsApp"
    },
    modalUI: {
      optgroupServices: "Services de Bien-Être & Séances",
      optgroupPrograms: "Ateliers & Programmes Guidés"
    },
    articlesUI: {
      newsletterCta: "Réserver une Séance au Sanctuaire",
      detailCta: "Découvrez un accompagnement personnalisé en méditation, respiration et réalignement énergétique.",
      authorTitle: "Docteur en Médecine | Maître de Méditation | Coach Spirituel | Conférencier",
      keyTakeaways: "Points Clés Cliniques & Contemplatifs",
      exploreMore: "Explorer d'Autres Essais"
    },
    programsUI: {
      signature: "★ Signature",
      inquire: "S'inscrire à la prochaine session"
    }
  },
  ro: {
    serviceDetail: {
      keyFocusAreas: "Dimensiuni & Practici Esențiale",
      journey: "Călătorie Structurată în 3 Etape",
      step1Title: "Sosire & Centrare",
      step1Desc: "Așază-te într-un spațiu liniștit. Discutăm despre starea ta actuală, intenții și aducem o relaxare firească.",
      step2Title: "Practică Ghidată",
      step2Desc: "Ghidare atentă prin meditație profundă, armonie sonoră, respirație conștientă sau dialog suportiv.",
      step3Title: "Integrare & Liniște Durabilă",
      step3Desc: "Reflecții de împământare și obiceiuri practice simple pentru a menține pacea lăuntrică în viața de zi cu zi.",
      readyTitle: "Începe Practica Ta cu Dr. Mayank",
      readyDesc: "Programările sunt oferite online la nivel global și în sanctuarul nostru primitor. Rezervă-ți dialogul privat.",
      relatedTitle: "Practici Complementare",
      exploreModality: "Explorează"
    },
    servicesUI: {
      learnMore: "Află mai multe",
      bookSession: "Programează o sesiune"
    },
    contactUI: {
      detailsTitle: "Detalii Sanctuar",
      detailsDesc: "Fie că vizitezi sanctuarul nostru în persoană sau participi online, îți punem la dispoziție un spațiu senin pentru transformarea ta.",
      locationLabel: "Locația Sanctuarului",
      hoursLabel: "Ore de Consultație",
      emailLabel: "Email Direct",
      phoneLabel: "Telefon / WhatsApp"
    },
    modalUI: {
      optgroupServices: "Servicii de Sanctuar & Sesiuni",
      optgroupPrograms: "Programe & Ateliere Ghidate"
    },
    articlesUI: {
      newsletterCta: "Rezervă o Sesiune în Sanctuar",
      detailCta: "Descoperă ghidarea personalizată în meditație, respirație și aliniere energetică.",
      authorTitle: "Doctor în Medicină | Maestru în Meditație | Coach Spiritual | Vorbitor Motivațional",
      keyTakeaways: "Perspective Clinice & Contemplative Esențiale",
      exploreMore: "Explorează Mai Multe Eseuri"
    },
    programsUI: {
      signature: "★ Semnătură",
      inquire: "Solicită detalii despre următoarea grupă"
    }
  },
  ru: {
    serviceDetail: {
      keyFocusAreas: "Ключевые направления и практики",
      journey: "Структурированный путь из 3 этапов",
      step1Title: "Встреча и центрирование",
      step1Desc: "Погружение в спокойную атмосферу. Мы обсуждаем ваше состояние, текущие задачи и создаем ощущение естественного покоя.",
      step2Title: "Направляемая практика",
      step2Desc: "Индивидуальная практика медитации, звукового резонанса, осознанного дыхания или поддерживающей беседы.",
      step3Title: "Интеграция и устойчивый покой",
      step3Desc: "Закрепление полученного опыта и простые привычки для сохранения внутренней тишины в повседневной жизни.",
      readyTitle: "Начните свой путь с доктором Маянком",
      readyDesc: "Сессии проводятся онлайн по всему миру и очно в нашем уютном Санктуарии. Забронируйте персональную встречу.",
      relatedTitle: "Дополняющие практики",
      exploreModality: "Подробнее"
    },
    servicesUI: {
      learnMore: "Подробнее",
      bookSession: "Записаться на сессию"
    },
    contactUI: {
      detailsTitle: "О Санктуарии",
      detailsDesc: "При личном визите в наш Санктуарий или при онлайн-участии мы создаем безопасное пространство для вашей глубокой трансформации.",
      locationLabel: "Адрес Санктуария",
      hoursLabel: "Часы консультаций",
      emailLabel: "Прямой email",
      phoneLabel: "Телефон / WhatsApp"
    },
    modalUI: {
      optgroupServices: "Оздоровительные сессии",
      optgroupPrograms: "Программы и мастер-классы"
    },
    articlesUI: {
      newsletterCta: "Забронировать сессию в Санктуарии",
      detailCta: "Индивидуальное сопровождение в медитации, дыхании и энергетическом балансе.",
      authorTitle: "Доктор медицины | Мастер медитации | Духовный наставник | Спикер",
      keyTakeaways: "Ключевые клинические и созерцательные выводы",
      exploreMore: "Другие статьи и эссе"
    },
    programsUI: {
      signature: "★ Фирменная программа",
      inquire: "Узнать о наборе в следующую группу"
    }
  }
};

// ==========================================
// 3. APPLY UPDATES TO CONTENT JSON FILES
// ==========================================
['en', 'de', 'fr', 'ro', 'ru'].forEach(lang => {
  const filePath = path.join(__dirname, '../content', `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const extra = localizedExtraKeys[lang];

  // Update pillars if localized
  if (localizedPillars[lang]) {
    data.pillars = localizedPillars[lang];
  }

  // Update services items if localized
  if (localizedServicesItems[lang]) {
    data.services.items = localizedServicesItems[lang];
  }

  // Ensure services UI buttons
  data.services.learnMore = extra.servicesUI.learnMore;
  data.services.bookSession = extra.servicesUI.bookSession;

  // Add service detail UI keys
  data.service = {
    ...(data.service || {}),
    ...extra.serviceDetail
  };

  // Add contact UI details
  data.contact = {
    ...(data.contact || {}),
    detailsTitle: extra.contactUI.detailsTitle,
    detailsDesc: extra.contactUI.detailsDesc,
    locationLabel: extra.contactUI.locationLabel,
    hoursLabel: extra.contactUI.hoursLabel,
    emailLabel: extra.contactUI.emailLabel,
    phoneLabel: extra.contactUI.phoneLabel
  };

  // Add modal optgroup labels
  data.modal = {
    ...(data.modal || {}),
    optgroupServices: extra.modalUI.optgroupServices,
    optgroupPrograms: extra.modalUI.optgroupPrograms
  };

  // Add articles UI keys
  data.articles = {
    ...(data.articles || {}),
    newsletterCta: extra.articlesUI.newsletterCta,
    detailCta: extra.articlesUI.detailCta,
    authorTitle: extra.articlesUI.authorTitle,
    keyTakeaways: extra.articlesUI.keyTakeaways,
    exploreMore: extra.articlesUI.exploreMore
  };

  // Add programs UI keys
  data.programs = {
    ...(data.programs || {}),
    signature: extra.programsUI.signature,
    inquire: extra.programsUI.inquire
  };

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`✓ Updated content/${lang}.json`);
});

console.log('All multilingual updates complete!');
