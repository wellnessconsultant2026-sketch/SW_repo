const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '..', 'content');

const deDeepBenefits = {
  tag: 'MEHRDIMENSIONALE ENTLASTUNG',
  title: 'Echte und Tiefgehende Vorteile',
  subtitle: 'Wirkt sanft auf körperlicher, emotionaler, geistiger und seelischer Ebene, um Ihnen zu Ganzheit zu verhelfen.',
  quote: 'Diese Praktiken wirken auf allen Ebenen Ihres Seins – Geist, Gefühle, Körper und Seele – und schenken Erleichterung, Ausgeglichenheit und neue Kraft.',
  items: [
    {
      id: 'anxiety',
      dimension: 'mental',
      levelBadge: 'Geist & Innere Ruhe',
      icon: '🌿',
      title: 'Stress, Sorgen & Niedergeschlagenheit',
      desc: 'Hilft, kreisende Gedanken zu beruhigen und emotionale Balance wiederherzustellen, indem ständige innere Unruhe gelindert wird.',
      target: 'Mindernd bei mentaler Überlastung & ständigen Sorgen',
      quote: 'Beruhigt rasende Gedanken und schenkt friedvolle Ausgeglichenheit.',
      clinicalShift: 'Beruhigt mentale Unruhe und löst chronischen Stress, sodass Sie in tiefe Geborgenheit eintauchen können.'
    },
    {
      id: 'vitality',
      dimension: 'physical',
      levelBadge: 'Energie & Vitalität',
      icon: '⚡',
      title: 'Energiemangel, Unruhiger Schlaf & Erschöpfung',
      desc: 'Lindert Schlaflosigkeit und anhaltende Müdigkeit, fördert tiefen, erholsamen Schlaf und füllt die natürlichen Energiereserven auf.',
      target: 'Wiederherstellung von Lebensenergie & Schlafrhythmus',
      quote: 'Tiefe, natürliche Erholung, um morgens erfrischt aufzuwachen.',
      clinicalShift: 'Unterstützt den natürlichen Schlafrhythmus, fördert tiefe Schlafphasen und regeneriert die zellulären Energiereserven.'
    },
    {
      id: 'pain',
      dimension: 'physical',
      levelBadge: 'Körper & Physisches Wohlbefinden',
      icon: '🕊️',
      title: 'Alltägliche Körperliche Anspannung',
      desc: 'Hilft sanft, körperliche Verspannungen und Steifheit zu lösen, die durch langes Sitzen, Arbeitsdruck und Stress entstehen.',
      target: 'Lösen von angestauter Alltagsanspannung',
      quote: 'Löst sanft Verhärtungen und schenkt wohlige Entspannung.',
      clinicalShift: 'Entspannt festsitzende Muskulatur durch Tiefenentspannung und beruhigt das überreizte Nervensystem.'
    },
    {
      id: 'digestive',
      dimension: 'physical',
      levelBadge: 'Innere Balance & Wohlbehagen',
      icon: '🛡️',
      title: 'Innerer Komfort & Natürliches Gleichgewicht',
      desc: 'Unterstützt das allgemeine Wohlbefinden und die Vitalität, indem nervöse Unruhe und stressbedingte Anspannung gelindert werden.',
      target: 'Linderung stressbedingter innerer Unruhe',
      quote: 'Schenkt wohltuende Erleichterung und natürliche Leichtigkeit.',
      clinicalShift: 'Hilft dem Organismus, in den regenerativen Ruhemodus umzuschalten und die innere Balance zu harmonisieren.'
    },
    {
      id: 'chakras',
      dimension: 'spiritual',
      levelBadge: 'Innere Energie & Freude',
      icon: '☸️',
      title: 'Harmonisierung der 7 Energiezentren',
      desc: 'Schon ab der ersten Sitzung spüren Sie ein Lösen von Schwere, sodass die Energie wieder frei fließt. Eine Welle von Licht, Freude und Verbundenheit kehrt zurück.',
      target: 'Wiederherstellung des natürlichen Energieflusses',
      quote: 'Wie eine warme, erfrischende Lichtdusche für die Seele.',
      clinicalShift: 'Löst seelische Erschöpfung auf, erneuert das Energiefeld und weckt echte, ungetrübte Lebensfreude.'
    },
    {
      id: 'emotional',
      dimension: 'emotional',
      levelBadge: 'Seelischer Frieden & Loslassen',
      icon: '✨',
      title: 'Sanftes Loslassen Emotionaler Lasten',
      desc: 'Hilft Ihnen, alte Gefühle und schwere Lasten loszulassen, ohne alte Wunden wieder aufreißen zu müssen. Schenkt tiefe Erleichterung, Wärme und Frieden.',
      target: 'Befreiung von emotionaler Schwere der Vergangenheit',
      quote: 'Ein sanfter Ansatz, der Bereiche berührt, die andere Praktiken übersehen.',
      clinicalShift: 'Ermöglicht das behutsame Loslassen angestauter seelischer Lasten durch ruhiges Atmen und achtsame Präsenz.'
    }
  ]
};

const deMeditationPaths = {
  tag: 'MEIN ANSATZ',
  title: 'Wege zu Ihrer Natürlichen Inneren Balance',
  subtitle: 'Eine sorgfältig abgestimmte Verbindung alter Meditations- und Atemweisheit mit modernem Lebensstil für Ausgleich in Körper, Geist und Beruf.',
  items: [
    {
      num: '01',
      category: 'stillness',
      icon: '🧘',
      name: 'Einfache Anfänger-Konzentration',
      technique: 'Trataka & Fokussierter Ein-Punkt-Atem',
      outcome: 'Geistige Klarheit & Innere Ruhe',
      desc: 'Geerdete Einführung in die Stille, um zerstreute Gedanken zu sammeln, sanften Fokus zu bilden und eine mühelose Alltagsgewohnheit zu etablieren.',
      inSession: 'Dr. Mayank verankert Ihre Aufmerksamkeit Schritt für Schritt und nimmt den Druck, den Verstand krampfhaft stilllegen zu müssen.'
    },
    {
      num: '02',
      category: 'stillness',
      icon: '🔔',
      name: 'Mantra-Meditation',
      technique: 'Heilige Klangresonanz & Japa',
      outcome: 'Gedankenstille & Innere Resonanz',
      desc: 'Wiederholung heilsamer Klangschwingungen, die den rationalen Widerstand umgeht, innere Monologe beruhigt und in klangvoller Stille ruht.',
      inSession: 'Sie werden durch beruhigende Klangmuster geführt, die auf Ihre Natur abgestimmt sind und kreisende Gedanken auflösen.'
    },
    {
      num: '03',
      category: 'stillness',
      icon: '🍃',
      name: 'Achtsamkeit (Mindfulness)',
      technique: 'Achtsame Körper- & Atemwahrnehmung',
      outcome: 'Ruhige Präsenz & Gelassene Perspektive',
      desc: 'Verweilen im gegenwärtigen Moment, indem Sie Empfindungen, Gedanken und Gefühle ohne Bewertung oder Anhaftung wahrnehmen.',
      inSession: 'Lernen Sie, Alltagsstress und Körperanspannungen in Echtzeit gelassen zu beobachten, ohne in Sorgen abzugleiten.'
    },
    {
      num: '04',
      category: 'breath',
      icon: '🌬️',
      name: 'Pranayama & Atemarbeit',
      technique: 'Sanfter Tiefer Atem & Ausgleichende Wechselatmung',
      outcome: 'Augenblickliche Ruhe & Natürliche Balance',
      desc: 'Beruhigende Atemübungen, die das Nervensystem sofort besänftigen und Körper und Geist in Einklang bringen.',
      inSession: 'Individuell abgestimmte Atemtechniken (wie 4-7-8 und der harmonisierende Rhythmus) für schnelle Erdung und anhaltenden Frieden.'
    },
    {
      num: '05',
      category: 'breath',
      icon: '☸️',
      name: 'Chakra-Meditation',
      technique: 'Bija-Klänge & Farbfrequenzen der 7 Zentren',
      outcome: 'Freier Energiefluss & Vitalität',
      desc: 'Harmonisierung und Klärung der sieben Hauptenergiezentren durch gezielte Aufmerksamkeit, Atem und Lichtfrequenzen.',
      inSession: 'Schrittweise Ausrichtung von der Wurzel bis zur Krone, die Stauungen löst und die Lebensenergie erfrischt.'
    },
    {
      num: '06',
      category: 'breath',
      icon: '🌱',
      name: 'Ausgleich der Fünf Elemente',
      technique: 'Harmonisierung der 5 Naturelemente',
      outcome: 'Geerdet, Vollkommen & Zentriert',
      desc: 'Bringen Sie Erde, Wasser, Feuer, Luft und Raum in sich in Einklang, um Überarbeitung zu kühlen und die Lebenskraft zu erneuern.',
      inSession: 'Hilft Burnout abzukühlen und verstreute Gedanken zu sammeln, für ein tiefes, gesundes Gefühl von Geborgenheit.'
    },
    {
      num: '07',
      category: 'heart',
      icon: '💖',
      name: 'Liebe & Mitgefühl',
      technique: 'Metta Bhavana & Herz-Kohärenz',
      outcome: 'Auflösung von Selbstzweifeln & Herzenswärme',
      desc: 'Mildert innere Selbstkritik, nährt aufrichtiges Wohlwollen sich selbst gegenüber und lässt emotionale Wärme wieder aufleben.',
      inSession: 'Löst behutsam anhaltende seelische Verhärtungen und schafft ein sicheres Gefühl von mitfühlendem Frieden.'
    },
    {
      num: '08',
      category: 'heart',
      icon: '🌈',
      name: 'Geführte Visualisierung',
      technique: 'Heilsame Bilderreisen & Sanfter Körperscan',
      outcome: 'Klares Visionieren & Tiefes Vertrauen',
      desc: 'Beruhigende, aufbauende Vorstellungsbilder, die den Geist sanft von Sorgen weg und hin zu Schutz, Klarheit und Inspiration führen.',
      inSession: 'Unterstützt den Verstand dabei, Sorgenmuster durch erholsame Entspannung und Geborgenheit zu ersetzen.'
    },
    {
      num: '09',
      category: 'heart',
      icon: '🕊️',
      name: 'Dankbarkeit & Vergebung',
      technique: 'Ho’oponopono & Seelische Entlastung',
      outcome: 'Tiefe Befreiung & Friedvolle Klarheit',
      desc: 'Ein sanftes, tiefes Loslassen alter Vorwürfe, Kränkungen und seelischer Schwere zur Erneuerung Ihres inneren Geistes.',
      inSession: 'Ermöglicht es Ihnen, alte Puzzleteile abzulegen und Vergangenes in Frieden ruhen zu lassen, ohne Schmerz wiederholen zu müssen.'
    }
  ]
};

const frDeepBenefits = {
  tag: 'SOULAGEMENT MULTIDIMENSIONNEL',
  title: 'Bienfaits Réels et Profonds',
  subtitle: 'Agissant avec douceur sur les plans physique, émotionnel, mental et spirituel pour restaurer votre plénitude.',
  quote: 'Ces pratiques de bien-être agissent sur l’ensemble de votre être – esprit, émotions, corps et âme – vous apportant réconfort, équilibre et vitalité.',
  items: [
    {
      id: 'anxiety',
      dimension: 'mental',
      levelBadge: 'Esprit & Calme Intérieur',
      icon: '🌿',
      title: 'Stress, Inquiétude & Baisse de Moral',
      desc: 'Aide à apaiser le flot des pensées et rétablit l’équilibre émotionnel, calmant les ruminations constantes.',
      target: 'Alléger la surcharge mentale & les soucis continus',
      quote: 'Apaise les pensées galopantes et restaure la sérénité.',
      clinicalShift: 'Calme l’agitation mentale et dissipe le stress continu, permettant de goûter à une paix réconfortante.'
    },
    {
      id: 'vitality',
      dimension: 'physical',
      levelBadge: 'Énergie & Vitalité',
      icon: '⚡',
      title: 'Baisse d’Énergie, Sommeil Agité & Épuisement',
      desc: 'Atténue l’insomnie et la fatigue chronique, encourage un sommeil réparateur et recharge vos réserves vitales.',
      target: 'Restaurer l’énergie épuisée & les rythmes de sommeil',
      quote: 'Recharge naturelle et profonde pour des réveils revigorés.',
      clinicalShift: 'Soutient vos cycles naturels de repos et régénère vos réserves d’énergie cellulaire.'
    },
    {
      id: 'pain',
      dimension: 'physical',
      levelBadge: 'Corps & Confort Physique',
      icon: '🕊️',
      title: 'Tensions Corporelles du Quotidien',
      desc: 'Aide à dénouer en douceur les raideurs physiques provoquées par de longues heures de travail et le stress accumulé.',
      target: 'Libération des tensions physiques quotidiennes',
      quote: 'Relâchement délicat des crispations et profonde relaxation.',
      clinicalShift: 'Détend les zones de crispation corporelle par une relaxation profonde qui désactive les signaux d’alerte.'
    },
    {
      id: 'digestive',
      dimension: 'physical',
      levelBadge: 'Confort Intérieur & Équilibre Naturel',
      icon: '🛡️',
      title: 'Confort Intérieur & Harmonie Naturelle',
      desc: 'Favorise le bien-être global et la vitalité en calmant la fébrilité nerveuse causée par les tensions quotidiennes.',
      target: 'Apaisement de la nervosité liée au stress',
      quote: 'Apporte un soulagement bienfaisant et une aisance naturelle.',
      clinicalShift: 'Bascule l’organisme en mode parasympathique réparateur, dissolvant l’irritabilité nerveuse.'
    },
    {
      id: 'chakras',
      dimension: 'spiritual',
      levelBadge: 'Énergie Intérieure & Joie',
      icon: '☸️',
      title: 'Harmonisation des 7 Centres Énergétiques',
      desc: 'Dès la première séance, la lourdeur se dissipe et l’énergie circule avec fluidité. Une vague de lumière et de joie renaît.',
      target: 'Restauration de votre flux énergétique naturel',
      quote: 'Comme une douche de lumière chaude et régénérante pour l’âme.',
      clinicalShift: 'Dissipe la fatigue émotionnelle accumulée et réveille une joie de vivre authentique.'
    },
    {
      id: 'emotional',
      dimension: 'emotional',
      levelBadge: 'Paix Émotionnelle & Libération',
      icon: '✨',
      title: 'Dépôt Bienveillant du Poids Émotionnel',
      desc: 'Vous aide à vous délester des fardeaux et émotions anciennes sans avoir à revivre les épreuves passées.',
      target: 'Libération de la lourdeur émotionnelle du passé',
      quote: 'Une approche délicate touchant des zones profondes souvent ignorées.',
      clinicalShift: 'Permet de relâcher les tensions accumulées grâce au souffle conscient et à une présence bienveillante.'
    }
  ]
};

const frMeditationPaths = {
  tag: 'MON APPROCHE',
  title: 'Voies vers Votre Équilibre Intérieur Naturel',
  subtitle: 'Une combinaison harmonieuse de sagesse méditative ancienne et de travail respiratoire adaptée au style de vie moderne.',
  items: [
    {
      num: '01',
      category: 'stillness',
      icon: '🧘',
      name: 'Concentration Simple pour Débutants',
      technique: 'Trataka & Souffle Focalisé à Point Unique',
      outcome: 'Clarté Mentale & Silence Intérieur',
      desc: 'Une entrée posée dans le silence pour canaliser les pensées éparpillées et instaurer une habitude quotidienne fluide.',
      inSession: 'Le Dr Mayank stabilise progressivement votre attention, dissipant l’effort vain de chercher à faire taire l’esprit par la force.'
    },
    {
      num: '02',
      category: 'stillness',
      icon: '🔔',
      name: 'Méditation par les Mantras',
      technique: 'Résonance Acoustique Sacrée & Japa',
      outcome: 'Cessation des Pensées & Résonance Interne',
      desc: 'La répétition de vibrations sonores apaisantes qui contourne la résistance mentale et dépose l’être dans le silence.',
      inSession: 'Vous êtes guidé par des phonétiques acoustiques accordées à votre énergie, calmant le flux incessant du bavardage mental.'
    },
    {
      num: '03',
      category: 'stillness',
      icon: '🍃',
      name: 'Pleine Conscience (Mindfulness)',
      technique: 'Observation Attentive du Corps & du Souffle',
      outcome: 'Présence Paisible & Recul Émotionnel',
      desc: 'S’ancrer dans l’instant présent en observant les sensations et émotions sans jugement ni réaction d’attachement.',
      inSession: 'Apprenez à observer le stress et les tensions en temps réel sans être emporté dans l’inquiétude automatique.'
    },
    {
      num: '04',
      category: 'breath',
      icon: '🌬️',
      name: 'Méditation par le Souffle (Breathwork)',
      technique: 'Respiration Profonde & Équilibrage Narinaire',
      outcome: 'Calme Immédiat & Souffle Naturel',
      desc: 'Exercices respiratoires apaisants pour détendre le corps en profondeur et rééquilibrer le système nerveux.',
      inSession: 'Respirations personnalisées (comme le 4-7-8 et le rythme cohérent) conçues pour installer rapidement une paix stable.'
    },
    {
      num: '05',
      category: 'breath',
      icon: '☸️',
      name: 'Méditation des Chakras',
      technique: 'Sons Bija & Fréquences Lumineuses des 7 Centres',
      outcome: 'Flux d’Énergie Libre & Vitalité',
      desc: 'Harmoniser et libérer les sept centres d’énergie principaux par l’attention concentrée, le souffle et les fréquences de couleur.',
      inSession: 'Alignement vibratoire du bas vers le haut, dissolvant les lourdeurs et réactivant l’énergie vitale.'
    },
    {
      num: '06',
      category: 'breath',
      icon: '🌱',
      name: 'Harmonisation des Cinq Éléments',
      technique: 'Équilibrage Naturel Terre, Eau, Feu, Air, Espace',
      outcome: 'Ancrage, Plénitude & Sérénité',
      desc: 'Équilibrer les éléments en soi pour refroidir le surmenage, calmer la dispersion mentale et renouveler l’élan vital.',
      inSession: 'Aide à apaiser le burnout et les pensées anxieuses, rétablissant une sensation saine et solide d’enracinement.'
    },
    {
      num: '07',
      category: 'heart',
      icon: '💖',
      name: 'Amour & Compassion',
      technique: 'Metta Bhavana & Cohérence Cardiaque',
      outcome: 'Dissolution de l’Autocritique & Chaleur',
      desc: 'Adoucir le jugement intérieur, cultiver une bienveillance sincère envers soi et renouer avec la tendresse du cœur.',
      inSession: 'Dénoue avec délicatesse les nœuds émotionnels pour vous installer dans une paix compatissante et sécurisante.'
    },
    {
      num: '08',
      category: 'heart',
      icon: '🌈',
      name: 'Visualisation Guidée',
      technique: 'Imagerie Apaisante & Balayage Corporel',
      outcome: 'Vision Claire & Paix Intérieure',
      desc: 'Images mentales inspirantes et lumineuses pour orienter l’esprit vers le réconfort, la sécurité et la sérénité.',
      inSession: 'Aide votre mental à remplacer l’inquiétude récurrente par une détente régénératrice et une sécurité intérieure.'
    },
    {
      num: '09',
      category: 'heart',
      icon: '🕊️',
      name: 'Gratitude & Pardon',
      technique: 'Ho’oponopono & Allègement Émotionnel',
      outcome: 'Grande Liberté & Clarté Paisible',
      desc: 'Une libération profonde des ressentiments tenaces et des charges pesantes pour régénérer votre esprit.',
      inSession: 'Vous permet de déposer de lourds fardeaux sans devoir revivre les souvenirs douloureux.'
    }
  ]
};

const roDeepBenefits = {
  tag: 'ALINARE MULTIDIMENSIONALĂ',
  title: 'Beneficii Reale și Profunde',
  subtitle: 'Acționând blând pe planurile fizic, emoțional, mental și spiritual pentru a-ți reda întregirea.',
  quote: 'Aceste practici de bunăstare acționează asupra întregii tale ființe – minte, emoții, corp și spirit – oferind alinare, echilibru și energie reînnoită.',
  items: [
    {
      id: 'anxiety',
      dimension: 'mental',
      levelBadge: 'Minte & Calm Interior',
      icon: '🌿',
      title: 'Stres, Îngrijorare & Stări Apsate',
      desc: 'Ajută la liniștirea gândurilor agitate și readuce echilibrul emoțional, domolind îngrijorarea continuă.',
      target: 'Ușurarea supraîncărcării mentale & a grijilor',
      quote: 'Liniștește gândurile accelerate și redă echilibrul senin.',
      clinicalShift: 'Calmează agitația minții și dizolvă stresul cronic, permițându-ți să te așezi într-o stare de profundă siguranță.'
    },
    {
      id: 'vitality',
      dimension: 'physical',
      levelBadge: 'Energie & Vitalitate',
      icon: '⚡',
      title: 'Energie Scăzută, Somn Agitat & Epuizare',
      desc: 'Ameliorează insomnia și oboseala cronică, încurajând un somn profund și refăcând rezervele naturale de vitalitate.',
      target: 'Restabilirea energiei & a ritmului natural de somn',
      quote: 'Reîncărcare profundă și naturală pentru treziri pline de viață.',
      clinicalShift: 'Sprijină ritmul natural de somn, stimulează fazele de odihnă profundă și reîmprospătează rezervele celulare.'
    },
    {
      id: 'pain',
      dimension: 'physical',
      levelBadge: 'Corp & Confort Fizic',
      icon: '🕊️',
      title: 'Tensiuni Corporale Cotidiene',
      desc: 'Ajută la eliberarea blândă a tensiunilor musculare cauzate de orele lungi de lucru și de stresul acumulat.',
      target: 'Eliberarea tensiunilor fizice acumulate',
      quote: 'Relaxare blândă a încordărilor și stare de destindere.',
      clinicalShift: 'Relaxează mușchii încordați prin destindere profundă, liniștind reflexul automat de alertă.'
    },
    {
      id: 'digestive',
      dimension: 'physical',
      levelBadge: 'Confort Interior & Echilibru',
      icon: '🛡️',
      title: 'Confort Lăuntric & Echilibru Natural',
      desc: 'Susține starea generală de bine și vitalitatea prin calmarea agitației nervoase cauzate de presiunea cotidiană.',
      target: 'Calmarea neliniștii asociate stresului',
      quote: 'Aduce alinare reconfortantă și o stare firească de ușurință.',
      clinicalShift: 'Ajută sistemul să treacă în starea regenerativă de repaus, liniștind tensiunea nervoasă internă.'
    },
    {
      id: 'chakras',
      dimension: 'spiritual',
      levelBadge: 'Energie Lăuntrică & Bucurie',
      icon: '☸️',
      title: 'Armonizarea celor 7 Centre Energetice',
      desc: 'Încă de la prima sesiune se simte o eliberare a apăsării, iar energia curge din nou fluid. O undă de lumină și bucurie se întoarce.',
      target: 'Restabilirea fluxului energetic natural',
      quote: 'Se simte ca un duș cald și reconfortant de lumină pentru suflet.',
      clinicalShift: 'Îndepărtează oboseala emoțională apăsătoare, reîmprospătând câmpul energetic și trezind bucuria curată de a trăi.'
    },
    {
      id: 'emotional',
      dimension: 'emotional',
      levelBadge: 'Pace Emoțională & Eliberare',
      icon: '✨',
      title: 'Eliberarea Blândă a Poverilor Emoționale',
      desc: 'Te ajută să eliberezi sentimente vechi și apăsări fără a fi nevoie să retrăiești suferințele din trecut.',
      target: 'Eliberarea greutății emoționale din trecut',
      quote: 'O abordare empatică ce atinge zone profunde pe care alte practici le omit.',
      clinicalShift: 'Permite desprinderea de stresul acumulat prin respirație calmă și prezență conștientă primitoare.'
    }
  ]
};

const roMeditationPaths = {
  tag: 'ABORDAREA MEA',
  title: 'Căi spre Echilibrul Tău Interior Natural',
  subtitle: 'O combinație atent structurată între înțelepciunea meditației străvechi și stilul de viață modern pentru armonie trupească și sufletească.',
  items: [
    {
      num: '01',
      category: 'stillness',
      icon: '🧘',
      name: 'Concentrare Simplă pentru Începători',
      technique: 'Trataka & Respirație Într-un Singur Punct',
      outcome: 'Claritate Mentală & Liniște Interioară',
      desc: 'O introducere temeinică în liniște pentru a aduna gândurile împrăștiate și a stabili un obicei zilnic fără efort.',
      inSession: 'Dr. Mayank îți ancorează treptat atenția, înlăturând zbuciumul de a încerca să forțezi mintea să tacă.'
    },
    {
      num: '02',
      category: 'stillness',
      icon: '🔔',
      name: 'Meditație cu Mantre',
      technique: 'Rezonanță Acustică Sacră & Japa',
      outcome: 'Oprirea Gândurilor & Rezonanță Lăuntrică',
      desc: 'Repetarea unor sunete sacre liniștitoare ce ocolesc rezistența minții, liniștind dialogul intern într-o tăcere plină de vibrație.',
      inSession: 'Ești ghidat prin tipare fonetice acustice acordate la structura ta energetică, domolind agitația mentală.'
    },
    {
      num: '03',
      category: 'stillness',
      icon: '🍃',
      name: 'Atenție Conștientă (Mindfulness)',
      technique: 'Observarea Corpului & a Respirației',
      outcome: 'Prezență Calmă & Perspectivă Senină',
      desc: 'Ancorarea în clipa prezentă prin observarea senzațiilor și emoțiilor fără judecată sau reacții automate.',
      inSession: 'Înveți să observi stresul și încordarea corporală în timp real, fără a aluneca în griji automate.'
    },
    {
      num: '04',
      category: 'breath',
      icon: '🌬️',
      name: 'Respirație Conștientă (Breathwork)',
      technique: 'Respirație Profundă & Echilibrare Nazală Alternată',
      outcome: 'Calm Imediat & Respirație Armonioasă',
      desc: 'Exerciții respiratorii blânde pentru a liniști rapid sistemul nervos și a readuce corpul într-o stare de siguranță.',
      inSession: 'Respirații personalizate (precum ritmul 4-7-8 și respirația coerentă) concepute pentru a aduce pace stabilă.'
    },
    {
      num: '05',
      category: 'breath',
      icon: '☸️',
      name: 'Meditația Chakrelor',
      technique: 'Sunete Bija & Frecvențe Luminoase ale celor 7 Centre',
      outcome: 'Flux Liber de Energie & Vitalitate',
      desc: 'Armonizarea celor șapte centri energetici majori prin atenție concentrată, respirație și culori luminoase.',
      inSession: 'Aliniere energetică de jos în sus, eliberând stările persistente de greutate și oboseală.'
    },
    {
      num: '06',
      category: 'breath',
      icon: '🌱',
      name: 'Alinierea celor Cinci Elemente',
      technique: 'Echilibrarea Elementelor Pământ, Apă, Foc, Aer, Spațiu',
      outcome: 'Stare Împământată, Centrată & Reînnoită',
      desc: 'Armonizarea elementelor în viața ta pentru a răcori epuizarea, a liniști mintea împrăștiată și a reînnoi forța vitală.',
      inSession: 'Ajută la temperarea burnout-ului și a gândurilor agitate, restabilind o senzație sănătoasă de siguranță.'
    },
    {
      num: '07',
      category: 'heart',
      icon: '💖',
      name: 'Iubire & Compasiune',
      technique: 'Metta Bhavana & Coerență a Inimii',
      outcome: 'Dizolvarea Autocriticii & Căldură Sufletească',
      desc: 'Îndulcirea criticii interioare, cultivarea blândeții autentice față de sine și redescoperirea căldurii emoționale.',
      inSession: 'Dizolvă cu delicatețe tensiunile sufletești, creând un spațiu sigur de pace compasivă.'
    },
    {
      num: '08',
      category: 'heart',
      icon: '🌈',
      name: 'Vizualizare Ghidată',
      technique: 'Imagini Liniștitoare & Scanare Corporală',
      outcome: 'Viziune Limpede & Pace Profundă',
      desc: 'Imagini mentale calde și înălțătoare care orientează mintea departe de îngrijorare, spre siguranță și claritate.',
      inSession: 'Îți ajută mintea să înlocuiască gândurile de îngrijorare cu o relaxare profundă și un sentiment de adăpost.'
    },
    {
      num: '09',
      category: 'heart',
      icon: '🕊️',
      name: 'Recunoștință & Iertare',
      technique: 'Ho’oponopono & Despovărare Emoțională',
      outcome: 'Libertate Profundă & Claritate Senină',
      desc: 'O eliberare profundă a resentimentelor și a poverilor emoționale vechi pentru reînnoirea spiritului interior.',
      inSession: 'Îți permite să lași jos poverile grele și să renunți la supărări fără a retrăi amintiri dureroase.'
    }
  ]
};

const ruDeepBenefits = {
  tag: 'МНОГОМЕРНОЕ ОБЛЕГЧЕНИЕ',
  title: 'Реальные и Глубокие Результаты',
  subtitle: 'Мягкое воздействие на физический, эмоциональный, ментальный и духовный уровни для восстановления целостности.',
  quote: 'Эти оздоровительные практики работают со всем вашим существом – разумом, эмоциями, телом и душой – даря облегчение, баланс и свежие силы.',
  items: [
    {
      id: 'anxiety',
      dimension: 'mental',
      levelBadge: 'Разум и Внутренний Покой',
      icon: '🌿',
      title: 'Стресс, Тревога и Упадок Сил',
      desc: 'Успокаивает бег мыслей и возвращает эмоциональное равновесие, снимая постоянный внутренний шум и напряжение.',
      target: 'Снятие ментальной перегрузки и постоянных тревог',
      quote: 'Успокаивает мысли и возвращает безмятежное равновесие.',
      clinicalShift: 'Снимает ментальное беспокойство и рассеивает хронический стресс, позволяя погрузиться в глубокое чувство безопасности.'
    },
    {
      id: 'vitality',
      dimension: 'physical',
      levelBadge: 'Энергия и Жизненная Сила',
      icon: '⚡',
      title: 'Нехватка Энергии, Чуткий Сон и Истощение',
      desc: 'Облегчает бессонницу и хроническую усталость, способствует глубокому целебному сну и восполняет запасы сил.',
      target: 'Восстановление растраченной энергии и ритмов сна',
      quote: 'Глубокая естественная перезагрузка для бодрых утренних пробуждений.',
      clinicalShift: 'Поддерживает естественный ритм сна, удлиняет восстановительные фазы ночного отдыха и наполняет клетки энергией.'
    },
    {
      id: 'pain',
      dimension: 'physical',
      levelBadge: 'Тело и Физический Комфорт',
      icon: '🕊️',
      title: 'Повседневное Мышечное Напряжение',
      desc: 'Мягко снимает зажимы и зажатость в теле, вызванные долгими часами работы, сидячим режимом и стрессом.',
      target: 'Освобождение от накопленного мышечного напряжения',
      quote: 'Мягкое снятие зажимов и приятное мышечное расслабление.',
      clinicalShift: 'Расслабляет закрепощенные мышцы посредством глубокой релаксации, снимая сигнал тревоги с нервной системы.'
    },
    {
      id: 'digestive',
      dimension: 'physical',
      levelBadge: 'Внутренний Баланс и Комфорт',
      icon: '🛡️',
      title: 'Внутренний Комфорт и Природный Баланс',
      desc: 'Поддерживает общее самочувствие и бодрость, снимая нервное напряжение и спазмы, вызванные спешкой.',
      target: 'Устранение нервного напряжения в теле',
      quote: 'Приносит долгожданное облегчение и природную легкость.',
      clinicalShift: 'Переключает организм в восстановительный парасимпатический режим, гармонизируя естественный баланс.'
    },
    {
      id: 'chakras',
      dimension: 'spiritual',
      levelBadge: 'Внутренняя Энергия и Радость',
      icon: '☸️',
      title: 'Гармонизация 7 Энергетических Центров',
      desc: 'С первой же сессии ощущается освобождение от тяжести, и энергия снова начинает течь свободно. Возвращаются свет, радость и вдохновение.',
      target: 'Восстановление естественного потока энергии',
      quote: 'Ощущается как теплый, освежающий душ света для вашей души.',
      clinicalShift: 'Растворяет накопившуюся эмоциональную усталость, обновляя ауру и пробуждая искреннюю радость жизни.'
    },
    {
      id: 'emotional',
      dimension: 'emotional',
      levelBadge: 'Душевный Покой и Освобождение',
      icon: '✨',
      title: 'Бережное Отпускание Душевного Груза',
      desc: 'Помогает отпустить старые переживания и тяжелые обиды без необходимости заново проживать прошлую боль.',
      target: 'Освобождение от эмоциональной тяжести прошлого',
      quote: 'Чуткий метод, достигающий глубин, недоступных обычным практикам.',
      clinicalShift: 'Помогает мягко отпустить застарелый груз через спокойное дыхание и поддерживающее осознанное присутствие.'
    }
  ]
};

const ruMeditationPaths = {
  tag: 'МОЙ ПОДХОД',
  title: 'Пути к Вашему Естественному Внутреннему Балансу',
  subtitle: 'Продуманный синтез древней мудрости медитации, дыхания и современного образа жизни для равновесия тела, ума и работы.',
  items: [
    {
      num: '01',
      category: 'stillness',
      icon: '🧘',
      name: 'Простая Концентрация для Начинающих',
      technique: 'Тратака и Однонаправленное Дыхание',
      outcome: 'Ясность Мыслей и Внутренняя Тишина',
      desc: 'Заземляющее введение в безмолвие для сбора рассеянных мыслей, развития мягкой фокусировки и формирования легкой привычки.',
      inSession: 'Доктор Маянк бережно якорит ваше внимание, снимая мучительную необходимость силой заставлять ум замолчать.'
    },
    {
      num: '02',
      category: 'stillness',
      icon: '🔔',
      name: 'Мантра-Медитация',
      technique: 'Священный Акустический Резонанс и Джапа',
      outcome: 'Остановка Мыслей и Внутренний Резонанс',
      desc: 'Повторение гармонизирующих звуковых вибраций, обходящее ментальное сопротивление и погружающее в вибрирующую тишину.',
      inSession: 'Вас ведут через индивидуальные акустические частоты, созвучные вашей природе, мягко останавливая внутренний диалог.'
    },
    {
      num: '03',
      category: 'stillness',
      icon: '🍃',
      name: 'Осознанность (Майндфулнесс)',
      technique: 'Осознанное Наблюдение Тела и Дыхания',
      outcome: 'Спокойное Присутствие и Равновесие',
      desc: 'Укоренение в настоящем моменте через безоценочное наблюдение ощущений, мыслей и чувств без вовлечения в драму.',
      inSession: 'Учитесь замечать стресс и напряжение в реальном времени, не проваливаясь в автоматическую тревогу.'
    },
    {
      num: '04',
      category: 'breath',
      icon: '🌬️',
      name: 'Дыхательная Медитация (Пранаяма)',
      technique: 'Глубокое Дыхание и Попеременное Дыхание Ноздрями',
      outcome: 'Мгновенное Успокоение и Ровное Дыхание',
      desc: 'Умиротворяющие дыхательные техники, возвращающие тело и мозг в состояние безопасности и природного покоя.',
      inSession: 'Персонально подобранный ритм дыхания (например, 4-7-8 и когерентное дыхание) для быстрого снятия напряжения.'
    },
    {
      num: '05',
      category: 'breath',
      icon: '☸️',
      name: 'Медитация на Чакры',
      technique: 'Биджа-Звуки и Цветовые Частоты 7 Центров',
      outcome: 'Свободное Движение Энергии и Бодрость',
      desc: 'Гармонизация и очищение семи ключевых центров через сфокусированное внимание, дыхание и световые частоты.',
      inSession: 'Поэтапная вибрационная сонастройка снизу вверх, снимающая застои и освежающая поток жизненных сил.'
    },
    {
      num: '06',
      category: 'breath',
      icon: '🌱',
      name: 'Гармонизация Пяти Элементов',
      technique: 'Балансировка Земли, Воды, Огня, Воздуха и Пространства',
      outcome: 'Заземленность, Целостность и Центрированность',
      desc: 'Сонастройка природных первоэлементов внутри вас для охлаждения выгорания, успокоения хаоса в мыслях и обновления сил.',
      inSession: 'Помогает остудить нервное истощение и собрать расфокусированный ум, возвращая прочную почву под ногами.'
    },
    {
      num: '07',
      category: 'heart',
      icon: '💖',
      name: 'Любовь и Сострадание',
      technique: 'Метта Бхавана и Сердечная Когерентность',
      outcome: 'Растворение Самокритики и Сердечное Тепло',
      desc: 'Смягчение внутреннего критика, взращивание искренней доброты к себе и возвращение эмоциональной теплоты.',
      inSession: 'Мягко растворяет застарелые душевные обиды, создавая ощущение безопасного, сострадательного мира.'
    },
    {
      num: '08',
      category: 'heart',
      icon: '🌈',
      name: 'Управляемая Визуализация',
      technique: 'Целебные Образы и Мягкое Сканирование Тела',
      outcome: 'Ясное Видение и Глубокий Покой',
      desc: 'Светлые, вдохновляющие мыслеобразы, уводящие ум от тревог в пространство уюта, безопасности и ясности.',
      inSession: 'Помогает сознанию заменить навязчивые тревоги восстанавливающим покоем и чувством защищенности.'
    },
    {
      num: '09',
      category: 'heart',
      icon: '🕊️',
      name: 'Благодарность и Прощение',
      technique: 'Хо’опонопоно и Душевное Облегчение',
      outcome: 'Глубокая Свобода и Безмятежная Ясность',
      desc: 'Глубокое отпускание застарелых обид, претензий и тяжелых чувств для возрождения вашего внутреннего духа.',
      inSession: 'Позволяет сбросить тяжкий груз прошлого без необходимости заново переживать болезненные события.'
    }
  ]
};

// Update de, fr, ro, ru JSON files with deepBenefits & meditationPaths
const updates = [
  { lang: 'de', benefits: deDeepBenefits, paths: deMeditationPaths },
  { lang: 'fr', benefits: frDeepBenefits, paths: frMeditationPaths },
  { lang: 'ro', benefits: roDeepBenefits, paths: roMeditationPaths },
  { lang: 'ru', benefits: ruDeepBenefits, paths: ruMeditationPaths }
];

updates.forEach(({ lang, benefits, paths }) => {
  const filePath = path.join(contentDir, `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  data.about = data.about || {};
  data.about.deepBenefits = benefits;
  data.about.meditationPaths = paths;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  console.log(`Added deepBenefits & meditationPaths to ${lang}.json`);
});
