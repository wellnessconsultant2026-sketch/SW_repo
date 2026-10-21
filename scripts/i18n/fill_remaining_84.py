import json
import os

root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
content_dir = os.path.join(root_dir, 'content')

with open(os.path.join(content_dir, 'it.json'), 'r', encoding='utf-8') as f:
    it = json.load(f)
with open(os.path.join(content_dir, 'es.json'), 'r', encoding='utf-8') as f:
    es = json.load(f)

it_84 = {
    "about.ui.navigatorTag": "CAPITOLO III • NAVIGATORE DEGLI STATI INTERIORI",
    "about.ui.navigatorTitle": "Cosa Stai Provando in Questo Momento?",
    "about.ui.navigatorSubtitle": "Seleziona uno stato per scoprire come l'unione tra scienza chiara e meditazione serena del Dr. Mayank ti riconduce all'equilibrio:",
    "about.ui.badgeDoctor": "🩺 Dottore in Medicina (M.D.)",
    "about.ui.badgeMaster": "🪷 15+ Anni Maestro di Meditazione",
    "about.ui.badgePrivate": "✨ Guida Privata 1:1",
    "about.ui.dimensionAll": "Tutti i Livelli",
    "about.ui.dimensionPhysical": "Livello Fisico",
    "about.ui.dimensionEmotional": "Livello Emotivo",
    "about.ui.dimensionMental": "Livello Mentale",
    "about.ui.dimensionSpiritual": "Livello Spirituale",
    "about.ui.benefitDrawerTag": "Come lo Applica il Dr. Mayank:",
    "about.ui.benefitDrawerCta": "Sperimenta Questo nella Tua Sessione",
    "about.ui.benefitsBannerShift": "Cambiamento Naturale & Tangibile:",
    "about.ui.benefitsBannerText": "Fin dalla prima seduta si avverte lo sblocco delle tensioni e la vitalità ricomincia a fluire.",
    "about.ui.benefitsBannerCta": "Sperimenta il Benessere Multidimensionale",
    "about.ui.diffShowLess": "Riduci ↑",
    "about.ui.diffDiscoverWhy": "Scopri perché fa la differenza →",
    "about.ui.pathsFilterAll": "Tutte le 9 Vie Meditative",
    "about.ui.pathsFilterStillness": "Silenzio & Concentrazione",
    "about.ui.pathsFilterBreath": "Respiro & Prana",
    "about.ui.pathsFilterHeart": "Cuore, Compassione & Rilascio",
    "services.filterAll": "Tutte le Sessioni",
    "services.viewAll": "Panoramica di Tutti i Servizi",
    "services.exploreAll": "Esplora Tutti i Servizi",
    "stillness.quoteCard.quoteLine1": "Una versione più calma di te",
    "stillness.quoteCard.quoteLine2": "è una versione più luminosa.",
    "stillness.quoteCard.tagline": "RESPIRA • RIGENERA • RIPETI",
    "stillness.phases.in": "Inspira",
    "stillness.phases.holdIn": "Trattieni",
    "stillness.phases.out": "Espira",
    "stillness.phases.holdOut": "Trattieni",
    "programs.faqTag": "DOMANDE FREQUENTI",
    "programs.faqHeadline": "Domande Comuni sui Nostri Percorsi",
    "programs.faqSubhead": "Tutto quello che c'è da sapere su iscrizioni, orari e partecipazione alle coorti.",
    "articles.newsletterSubhead": "Riflessioni discrete sulla fisiologia della meditazione, sul sistema nervoso e sulla vita consapevole direttamente nella tua casella.",
    "articles.newsletterCta": "Prenota una Sessione nel Santuario",
    "contact.orEmail": "Oppure scrivi a",
    "footer.disclaimer": "Nota Informativa & Consenso.\n\nI metodi olistici, quali pratiche energetiche, spirituali e meditative, sono intesi a fornire un supporto integrativo al tuo benessere personale.\nNon intendono sostituire diagnosi, consulenze o cure mediche, psicologiche o sanitarie tradizionali.\n\nCiascuna persona è unica e le risposte possono variare. Ti incoraggiamo a fare sempre affidamento sul tuo discernimento e, in caso di dubbi, a consultare professionisti sanitari qualificati.\n\nCONSENSO INFORMATO\nPartecipando a questo percorso di benessere, confermi di aver letto e compreso i presenti termini, applicando le conoscenze acquisite con consapevolezza e rispetto per te stesso e per gli altri.",
    "modal.successTitle": "La Tua Richiesta è Stata Ricevuta con Cura",
    "modal.successMsg": "Il Dr. Mayank Ahooja esaminerà il tuo messaggio con dedizione. Ti contatteremo entro 24 ore.",
    "modal.close": "Chiudi",
    "modal.languageNoticeBadge": "NOTA SULLA LINGUA",
    "modal.languageNoticeTitle": "Lingua di Svolgimento della Sessione",
    "modal.languageNoticeText": "Tutte le sessioni individuali e i percorsi si svolgono in lingua inglese e russa.",
    "modal.languageNoticeSubtext": "Ti preghiamo di confermare che ti trovi a tuo agio a svolgere la consulenza in inglese o in russo prima di procedere alla prenotazione.",
    "modal.languageAcceptBtn": "Ho Compreso & Accetto",
    "modal.languageCancelBtn": "Annulla",
    "modal.tag": "APPUNTAMENTO NEL SANTUARIO",
    "modal.trustText": "Requisito di sessione obbligatorio • Accettazione richiesta per procedere",
    "service.readyTitle": "Inizia la Tua Pratica con il Dr. Mayank",
    "service.readyDesc": "Le sessioni sono disponibili sia virtualmente in tutto il mondo che nel nostro silenzioso santuario. Prenota il tuo dialogo privato.",
    "service.relatedTitle": "Pratiche Complementari",
    "service.exploreModality": "Esplora",
    "aboutPreview.programTabs.clinical.buttonText": "Scopri il Mio Approccio →",
    "aboutPreview.programTabs.clinical.floatingBadge": "🎓 Comprensione chiara. Crescita autentica.",
    "aboutPreview.programTabs.meditation.buttonText": "Esplora le Sessioni di Meditazione →",
    "aboutPreview.programTabs.meditation.floatingBadge": "✨ Risveglia la consapevolezza. Cheta la mente.",
    "aboutPreview.programTabs.symbiosis.buttonText": "Esplora il Piano di Armonia →",
    "aboutPreview.programTabs.symbiosis.floatingBadge": "🌿 Ristabilisci l'energia. Vivi l'armonia.",
    "aboutPreview.explorer.calloutTitle": "Non sai da dove cominciare?",
    "aboutPreview.explorer.calloutDesc": "Scegli ciò che stai provando per scoprire come comprensione medica e pratiche meditative ti aiutano a ritrovare serenità.",
    "aboutPreview.explorer.commonExperiences": "ESPERIENZE COMUNI",
    "aboutPreview.explorer.ourApproach": "IL NOSTRO APPROCCIO",
    "aboutPreview.explorer.explorePath": "Esplora Questo Cammino →",
    "aboutPreview.symptoms.insomnia.label": "Sonno Ristoratore",
    "aboutPreview.symptoms.insomnia.italicPremise": "Migliori abitudini di riposo. Rilassamento naturale. Nuova vitalità al mattino.",
    "aboutPreview.symptoms.insomnia.paragraph": "Giornate frenetiche, schermi accesi fino a tardi e pensieri incessanti lasciano un senso di irrequietezza serale. Accompagniamo corpo e mente verso un riposo dolce con rituali serali distensivi e abitudini che favoriscono il sonno naturale.",
    "aboutPreview.symptoms.female.label": "Benessere Femminile",
    "aboutPreview.symptoms.female.italicPremise": "Onora il tuo ritmo. Riconquista sicurezza. Irradia armonia interiore.",
    "aboutPreview.symptoms.female.paragraph": "Un approccio olistico e premuroso a supporto della vitalità femminile, dell'equilibrio emotivo e di sane abitudini per un benessere autentico e duraturo.",
    "aboutPreview.symptoms.teen.label": "Benessere Giovanile",
    "aboutPreview.symptoms.teen.italicPremise": "Allevia l'ansia scolastica. Scollegati dal sovraccarico. Sviluppa vera sicurezza.",
    "aboutPreview.symptoms.teen.paragraph": "Guidare adolescenti e giovani ad affrontare aspettative di studio, sovraccarico da smartphone e stress emotivo attraverso pause consapevoli e ritmi equilibrati.",
    "aboutPreview.symptoms.corporate.label": "Equilibrio nel Lavoro",
    "aboutPreview.symptoms.corporate.italicPremise": "Più calma per te. Giornate lavorative più serene. Meno fatica decisionale.",
    "aboutPreview.symptoms.corporate.paragraph": "Guidare dirigenti, professionisti e imprenditori ad affrontare giornate intense, fatica mentale e responsabilità attraverso micro-pause di 5 minuti e concentrazione radicata.",
    "aboutPreview.symptoms.subtle.label": "Equilibrio Interiore",
    "aboutPreview.symptoms.subtle.italicPremise": "Equilibra i canali nadi. Armonizza i chakra. Risveglia la quiete interiore.",
    "aboutPreview.symptoms.subtle.paragraph": "Connettiti al tuo flusso naturale di energia vitale: bilanciando le forze attive e ristoratrici e armonizzando i 7 chakra per una pace profonda e stabile.",
    "aboutPreview.differentiators.tag": "PERCHÉ SCEGLIERE IL DR. MAYANK",
    "aboutPreview.differentiators.subtitle": "Unire scienza medica pratica, ascolto attento e autentica maestria meditativa.",
    "aboutPreview.differentiators.learnMore": "Scopri perché fa la differenza →",
    "aboutPreview.differentiators.showLess": "Riduci ↑"
}

es_84 = {
    "about.ui.navigatorTag": "CAPÍTULO III • NAVEGADOR DE ESTADOS INTERIORES",
    "about.ui.navigatorTitle": "¿Qué Estás Sintiendo en Este Momento?",
    "about.ui.navigatorSubtitle": "Selecciona cualquier estado para descubrir cómo la síntesis de ciencia clara y meditación serena del Dr. Mayank te devuelve al equilibrio:",
    "about.ui.badgeDoctor": "🩺 Doctor en Medicina (M.D.)",
    "about.ui.badgeMaster": "🪷 15+ Años Maestro de Meditación",
    "about.ui.badgePrivate": "✨ Acompañamiento Privado 1:1",
    "about.ui.dimensionAll": "Todos los Niveles",
    "about.ui.dimensionPhysical": "Nivel Físico",
    "about.ui.dimensionEmotional": "Nivel Emocional",
    "about.ui.dimensionMental": "Nivel Mental",
    "about.ui.dimensionSpiritual": "Nivel Espiritual",
    "about.ui.benefitDrawerTag": "Cómo lo Aplica el Dr. Mayank:",
    "about.ui.benefitDrawerCta": "Experimenta Esto en Tu Sesión",
    "about.ui.benefitsBannerShift": "Cambio Natural y Perceptible:",
    "about.ui.benefitsBannerText": "Desde la primera sesión se percibe una liberación de tensiones y la vitalidad vuelve a fluir con naturalidad.",
    "about.ui.benefitsBannerCta": "Experimenta un Alivio Multidimensional",
    "about.ui.diffShowLess": "Ver menos ↑",
    "about.ui.diffDiscoverWhy": "Descubre por qué es importante →",
    "about.ui.pathsFilterAll": "Las 9 Vías Meditativas",
    "about.ui.pathsFilterStillness": "Quietud y Concentración",
    "about.ui.pathsFilterBreath": "Aliento y Prana Vital",
    "about.ui.pathsFilterHeart": "Corazón, Compasión y Desapego",
    "services.filterAll": "Todas las Sesiones",
    "services.viewAll": "Resumen de Todos los Servicios",
    "services.exploreAll": "Explorar Todos los Servicios",
    "stillness.quoteCard.quoteLine1": "Una versión más serena de ti",
    "stillness.quoteCard.quoteLine2": "es una versión más luminosa.",
    "stillness.quoteCard.tagline": "RESPIRA • REINICIA • REPITE",
    "stillness.phases.in": "Inhala",
    "stillness.phases.holdIn": "Pausa",
    "stillness.phases.out": "Exhala",
    "stillness.phases.holdOut": "Pausa",
    "programs.faqTag": "PREGUNTAS FRECUENTES",
    "programs.faqHeadline": "Consultas Habituales Sobre Nuestros Programas",
    "programs.faqSubhead": "Todo lo que necesitas conocer sobre matriculación, calendarios y dinámica de cohortes.",
    "articles.newsletterSubhead": "Orientación sobria sobre fisiología de la meditación, equilibrio del sistema nervioso y vida consciente directo en tu correo.",
    "articles.newsletterCta": "Reservar Sesión en el Santuario",
    "contact.orEmail": "O escribe a",
    "footer.disclaimer": "Nota Informativa y Consentimiento.\n\nLos métodos holísticos, tales como las prácticas energéticas, espirituales y meditativas, tienen como fin ofrecer un soporte adicional a tu bienestar personal.\nNo pretenden sustituir diagnósticos, consultas ni tratamientos médicos, psicológicos o de profesionales sanitarios colegiados.\n\nCada persona es única y las respuestas pueden diferir. Recomendamos confiar siempre en tu propio discernimiento y, ante cualquier duda, consultar con un profesional de la salud.\n\nCONSENTIMIENTO INFORMADO\nAl participar en este programa de bienestar, manifiestas haber leído y comprendido los términos de este descargo, aplicando los conocimientos adquiridos con responsabilidad y respeto hacia ti y los demás.",
    "modal.successTitle": "Tu Solicitud Ha Sido Recibida con Aprecio",
    "modal.successMsg": "El Dr. Mayank Ahooja atenderá tu mensaje con dedicación. Nos comunicaremos contigo en un plazo de 24 horas.",
    "modal.close": "Cerrar",
    "modal.languageNoticeBadge": "AVISO SOBRE EL IDIOMA",
    "modal.languageNoticeTitle": "Idioma de Realización de la Sesión",
    "modal.languageNoticeText": "Todas las consultas y sesiones se imparten en idioma inglés y ruso.",
    "modal.languageNoticeSubtext": "Por favor, confirma que te sientes cómodo realizando tu consulta en inglés o en ruso antes de proceder con la reserva.",
    "modal.languageAcceptBtn": "Entiendo y Acepto",
    "modal.languageCancelBtn": "Cancelar",
    "modal.tag": "CITA EN EL SANTUARIO",
    "modal.trustText": "Requisito obligatorio de la sesión • Aceptación requerida para continuar",
    "service.readyTitle": "Inicia Tu Práctica con el Dr. Mayank",
    "service.readyDesc": "Las citas se ofrecen de forma virtual a nivel internacional y en nuestro apacible santuario. Reserva tu diálogo privado.",
    "service.relatedTitle": "Prácticas Complementarias",
    "service.exploreModality": "Explorar",
    "aboutPreview.programTabs.clinical.buttonText": "Explorar Mi Enfoque →",
    "aboutPreview.programTabs.clinical.floatingBadge": "🎓 Comprensión diáfana. Evolución con sentido.",
    "aboutPreview.programTabs.meditation.buttonText": "Explorar Sesiones de Meditación →",
    "aboutPreview.programTabs.meditation.floatingBadge": "✨ Despierta la conciencia. Calma tu mente.",
    "aboutPreview.programTabs.symbiosis.buttonText": "Explorar El Plan de Armonía →",
    "aboutPreview.programTabs.symbiosis.floatingBadge": "🌿 Restaura tu energía. Vive en armonía.",
    "aboutPreview.explorer.calloutTitle": "¿No tienes certeza de por dónde comenzar?",
    "aboutPreview.explorer.calloutDesc": "Elige lo que estás sintiendo para ver cómo la comprensión rigurosa y las prácticas de mindfulness te devuelven el sosiego.",
    "aboutPreview.explorer.commonExperiences": "VIVENCIAS HABITUALES",
    "aboutPreview.explorer.ourApproach": "NUESTRO ENFOQUE",
    "aboutPreview.explorer.explorePath": "Explorar Esta Vía →",
    "aboutPreview.symptoms.insomnia.label": "Sueño Reparador",
    "aboutPreview.symptoms.insomnia.italicPremise": "Mejores hábitos nocturnos. Relajación orgánica. Vitalidad despierta cada mañana.",
    "aboutPreview.symptoms.insomnia.paragraph": "Jornadas sobrecargadas, pantallas hasta tarde y pensamientos continuos pueden provocar agitación nocturna. Guiamos la mente y el cuerpo hacia un descanso plácido mediante pautas serenas y respiración consciente.",
    "aboutPreview.symptoms.female.label": "Bienestar Femenino",
    "aboutPreview.symptoms.female.italicPremise": "Armoniza tus ciclos. Recupera la seguridad. Irradia serenidad interior.",
    "aboutPreview.symptoms.female.paragraph": "Una mirada integradora y cercana para cuidar la vitalidad femenina, el balance emocional y rutinas enraizadas de autocuidado y plenitud cotidiana.",
    "aboutPreview.symptoms.teen.label": "Bienestar Juvenil",
    "aboutPreview.symptoms.teen.italicPremise": "Mitigar la ansiedad académica. Desconectar de la sobrecarga. Forjar confianza real.",
    "aboutPreview.symptoms.teen.paragraph": "Acompañamiento a adolescentes para gestionar exigencias de estudio, saturación digital y estrés emocional mediante desconexión consciente y hábitos equilibrados.",
    "aboutPreview.symptoms.corporate.label": "Bienestar Laboral",
    "aboutPreview.symptoms.corporate.italicPremise": "Mayor templanza. Días laborales más despejados. Menos fatiga en la toma de decisiones.",
    "aboutPreview.symptoms.corporate.paragraph": "Acompañamiento a líderes y profesionales para afrontar exigencias elevadas y responsabilidades mediante micro-pausas de 5 minutos y atención serena.",
    "aboutPreview.symptoms.subtle.label": "Equilibrio Interior",
    "aboutPreview.symptoms.subtle.italicPremise": "Alinear los canales sutiles. Armonizar los chakras. Despertar la quietud interior.",
    "aboutPreview.symptoms.subtle.paragraph": "Sintonizar con tu flujo de energía esencial: equilibrando las fuerzas activas y las reparadoras para afianzar una paz sólida y consciente.",
    "aboutPreview.differentiators.tag": "POR QUÉ TRABAJAR CON EL DR. MAYANK",
    "aboutPreview.differentiators.subtitle": "Integrando ciencia médica práctica, escucha reflexiva y genuina maestría contemplativa.",
    "aboutPreview.differentiators.learnMore": "Descubre por qué es importante →",
    "aboutPreview.differentiators.showLess": "Ver menos ↑"
}

def set_deep(d, path, val):
    parts = path.split('.')
    cur = d
    for p in parts[:-1]:
        if p not in cur or not isinstance(cur[p], dict):
            cur[p] = {}
        cur = cur[p]
    cur[parts[-1]] = val

for k, val in it_84.items():
    set_deep(it, k, val)

for k, val in es_84.items():
    set_deep(es, k, val)

with open(os.path.join(content_dir, 'it.json'), 'w', encoding='utf-8') as f:
    json.dump(it, f, ensure_ascii=False, indent=2)
print("[OK] Complete it.json with all 84 granular keys")

with open(os.path.join(content_dir, 'es.json'), 'w', encoding='utf-8') as f:
    json.dump(es, f, ensure_ascii=False, indent=2)
print("[OK] Complete es.json with all 84 granular keys")
