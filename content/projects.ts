export type Locale = 'es' | 'val' | 'en';

export type ProjectLocaleContent = {
  title: string;
  tagline: string;
  description: string;
  problem: string;
  decisions: string;
  challenges: string;
  outcome: string;
};

export type Project = {
  slug: string;
  github: string;
  demo?: string;
  stack: string[];
  tags: string[];
  color: string;
  es: ProjectLocaleContent;
  val: ProjectLocaleContent;
  en: ProjectLocaleContent;
};

export const projects: Project[] = [
  {
    slug: 'esportscoach',
    github: 'https://github.com/adriancc-dev/eSportsCoach',
    demo: 'https://e-sports-coach.vercel.app',
    stack: ['Flutter', 'Dart', 'Java', 'Spring Boot', 'REST API'],
    tags: ['Mobile', 'Full Stack'],
    color: '#F59E0B',
    es: {
      title: 'eSportsCoach',
      tagline: 'App móvil de coaching para eSports',
      description:
        'Aplicación multiplataforma con Flutter en el frontend y Java Spring Boot en el backend. Proyecto final del ciclo DAM.',
      problem:
        'Los jugadores competitivos de eSports no tienen herramientas accesibles para analizar su rendimiento y recibir orientación de coaching estructurada.',
      decisions:
        'Elegí Flutter para el frontend por su capacidad multiplataforma real (Android e iOS desde un solo código base), y Spring Boot para el backend por la robustez de su ecosistema Java y la facilidad de construir APIs REST bien estructuradas. La arquitectura separa completamente frontend y backend, comunicándose mediante REST.',
      challenges:
        'El mayor reto fue diseñar la arquitectura de la API para que fuera extensible desde el principio, y gestionar el estado en Flutter de forma coherente entre pantallas con distintos flujos de datos.',
      outcome:
        'App desplegada en Vercel con arquitectura frontend-backend desacoplada y funcional. El proyecto que me enseñó a construir un sistema completo de extremo a extremo desde cero.',
    },
    val: {
      title: 'eSportsCoach',
      tagline: 'App mòbil de coaching per a eSports',
      description:
        'Aplicació multiplataforma amb Flutter al frontend i Java Spring Boot al backend. Projecte final del cicle DAM.',
      problem:
        "Els jugadors competitius d'eSports no disposen d'eines accessibles per analitzar el seu rendiment i rebre orientació de coaching estructurada.",
      decisions:
        "Vaig triar Flutter per al frontend per la seua capacitat multiplataforma real (Android i iOS des d'un sol codi base), i Spring Boot per al backend per la robustesa del seu ecosistema Java. L'arquitectura separa completament frontend i backend, comunicant-se mitjançant REST.",
      challenges:
        "El major repte va ser dissenyar l'arquitectura de l'API perquè fos extensible des del principi, i gestionar l'estat en Flutter de forma coherent entre pantalles amb distints fluxos de dades.",
      outcome:
        "App desplegada en Vercel amb arquitectura frontend-backend desacoblada i funcional. El projecte que em va ensenyar a construir un sistema complet d'extrem a extrem des de zero.",
    },
    en: {
      title: 'eSportsCoach',
      tagline: 'Mobile coaching app for eSports',
      description:
        'Cross-platform app built with Flutter on the frontend and Java Spring Boot on the backend. Final project for the Multiplatform Application Development degree.',
      problem:
        'Competitive eSports players lack accessible tools to analyze their performance and receive structured coaching guidance.',
      decisions:
        'I chose Flutter for the frontend for its true cross-platform capability (Android and iOS from a single codebase), and Spring Boot for the backend for its robust Java ecosystem and ease of building well-structured REST APIs. The architecture fully decouples frontend and backend, communicating via REST.',
      challenges:
        'The biggest challenge was designing the API architecture to be extensible from the start, and managing Flutter state coherently across screens with different data flows.',
      outcome:
        'App deployed on Vercel with a fully decoupled frontend-backend architecture. The project that taught me how to build a complete system end-to-end from scratch.',
    },
  },
  {
    slug: 'la-llosa-website',
    github: 'https://github.com/adriancc-dev/la-llosa-website-portfolio',
    stack: ['Next.js', 'TypeScript', 'MongoDB', 'JWT', 'Nodemailer', 'Tailwind CSS'],
    tags: ['Web', 'Full Stack', 'Real Client'],
    color: '#3B82F6',
    es: {
      title: 'La Llosa Website',
      tagline: 'Plataforma de gestión de reservas deportivas municipales',
      description:
        'Aplicación web full stack para el Ayuntamiento de La Llosa. Sistema de reservas deportivas con autenticación, gestión de bonos y notificaciones por email.',
      problem:
        'El ayuntamiento gestionaba las reservas de instalaciones deportivas de forma manual, sin sistema digital que permitiera a los ciudadanos reservar online ni al personal administrativo gestionar el calendario de forma eficiente.',
      decisions:
        'Usé Next.js con App Router por su capacidad full stack (frontend + API routes en el mismo proyecto), MongoDB por la flexibilidad de su esquema para modelar reservas y bonos con distintas estructuras, y JWT para la autenticación sin sesiones en servidor.',
      challenges:
        'El mayor reto fue el análisis de requisitos con un cliente real no técnico: traducir sus necesidades en lógica de negocio concreta. También la gestión de los bonos deportivos, que tenía casos edge que no aparecían en la especificación inicial.',
      outcome:
        'Plataforma desplegada y en uso real por el municipio. Primera experiencia con un cliente real, requisitos cambiantes y responsabilidad de producción.',
    },
    val: {
      title: 'La Llosa Website',
      tagline: 'Plataforma de gestió de reserves esportives municipals',
      description:
        "Aplicació web full stack per a l'Ajuntament de la Llosa. Sistema de reserves esportives amb autenticació, gestió de bons i notificacions per correu.",
      problem:
        "L'ajuntament gestionava les reserves d'instal·lacions esportives de forma manual, sense sistema digital que permetés als ciutadans reservar en línia ni al personal administratiu gestionar el calendari de forma eficient.",
      decisions:
        "Vaig utilitzar Next.js amb App Router per la seua capacitat full stack, MongoDB per la flexibilitat del seu esquema i JWT per a l'autenticació sense sessions en servidor.",
      challenges:
        "El major repte va ser l'anàlisi de requisits amb un client real no tècnic: traduir les seues necessitats en lògica de negoci concreta. També la gestió de la lògica dels bons esportius, que tenia casos edge que no apareixien en l'especificació inicial.",
      outcome:
        'Plataforma desplegada i en ús real pel municipi. Primera experiència amb un client real, requisits canviants i responsabilitat de producció.',
    },
    en: {
      title: 'La Llosa Website',
      tagline: 'Municipal sports booking management platform',
      description:
        'Full stack web application for the La Llosa Town Hall. Sports booking system with authentication, voucher management, and email notifications.',
      problem:
        'The municipality managed sports facility bookings manually, with no digital system allowing citizens to book online or staff to manage the calendar efficiently.',
      decisions:
        'I used Next.js with App Router for its full stack capability (frontend + API routes in the same project), MongoDB for schema flexibility to model bookings and vouchers with different structures, and JWT for stateless authentication.',
      challenges:
        'The biggest challenge was requirements analysis with a real non-technical client: translating their needs into concrete business logic. Also managing the sports voucher logic, which had edge cases not covered in the initial specification.',
      outcome:
        'Platform deployed and in active use by the municipality. First experience with a real client, changing requirements, and production responsibility.',
    },
  },
  {
    slug: 'vr-bot',
    github: 'https://github.com/adriancc-dev/VR-BOT',
    stack: ['Python', 'discord.py', 'SQLAlchemy', 'SQLite', 'PostgreSQL', 'Docker'],
    tags: ['Backend', 'Bot', 'Community'],
    color: '#8B5CF6',
    es: {
      title: 'VR-BOT',
      tagline: 'Bot de Discord para gestión competitiva con +1.000 usuarios',
      description:
        'Sistema backend completo para gestión de partidas competitivas en la comunidad nacional española del videojuego Inazuma Eleven Victory Road.',
      problem:
        'La comunidad competitiva española del juego necesitaba un sistema justo y automatizado para organizar partidas, registrar resultados, mantener rankings y gestionar torneos — todo dentro de Discord, sin herramientas externas.',
      decisions:
        'Elegí discord.py por su madurez y soporte completo de slash commands. SQLAlchemy con SQLite en desarrollo y PostgreSQL en producción para portabilidad. El sistema ELO fue implementado desde cero con ajustes propios para el contexto de equipos. Docker para el despliegue en Fly.io.',
      challenges:
        'Diseñar un algoritmo ELO que funcionara correctamente para partidas por equipos (no individuales) fue el reto principal. También la gestión de concurrencia cuando varios usuarios interactúan con el bot simultáneamente, y la lógica de validación de resultados para evitar trampas.',
      outcome:
        'Bot en producción con +1.000 usuarios activos, generando ofertas económicas de hasta 1.000€ por el trabajo realizado. Sistema que opera de forma autónoma y continúa en mantenimiento activo.',
    },
    val: {
      title: 'VR-BOT',
      tagline: 'Bot de Discord per a gestió competitiva amb +1.000 usuaris',
      description:
        'Sistema backend complet per a gestió de partides competitives en la comunitat nacional espanyola del videojoc Inazuma Eleven Victory Road.',
      problem:
        "La comunitat competitiva espanyola del joc necessitava un sistema just i automatitzat per organitzar partides, registrar resultats, mantenir rànquings i gestionar tornejos — tot dins de Discord, sense eines externes.",
      decisions:
        "Vaig triar discord.py per la seua maduresa i suport complet de slash commands. SQLAlchemy amb SQLite en desenvolupament i PostgreSQL en producció. L'algoritme ELO va ser implementat des de zero amb ajustos propis per al context d'equips. Docker per al desplegament en Fly.io.",
      challenges:
        "Dissenyar un algoritme ELO que funcionés correctament per a partides per equips (no individuals) va ser el repte principal. També la gestió de la concurrència quan diversos usuaris interactuen amb el bot simultàniament.",
      outcome:
        "Bot en producció amb +1.000 usuaris actius, generant ofertes econòmiques de fins a 1.000€ pel treball realitzat. Sistema que opera de forma autònoma i continua en manteniment actiu.",
    },
    en: {
      title: 'VR-BOT',
      tagline: 'Discord bot for competitive management with 1,000+ users',
      description:
        'Full backend system for managing competitive matches in the Spanish national community of Inazuma Eleven Victory Road.',
      problem:
        "The game's Spanish competitive community needed a fair, automated system to organize matches, record results, maintain rankings, and manage tournaments — all within Discord, without external tools.",
      decisions:
        'I chose discord.py for its maturity and full slash command support. SQLAlchemy with SQLite in development and PostgreSQL in production for portability. The ELO algorithm was implemented from scratch with custom adjustments for team-based matches. Docker for deployment on Fly.io.',
      challenges:
        'Designing an ELO algorithm that worked correctly for team matches (not individual) was the main challenge. Also managing concurrency when multiple users interact with the bot simultaneously, and result validation logic to prevent cheating.',
      outcome:
        'Bot in production with 1,000+ active users, generating economic offers of up to €1,000 for the work done. System operating autonomously and under active maintenance.',
    },
  },
  {
    slug: 'datamind-retail',
    github: 'https://github.com/adriancc-dev/Proyecto-DataMind-Retail',
    stack: ['Python', 'PySpark', 'TensorFlow', 'scikit-learn', 'MLflow', 'Streamlit', 'Plotly'],
    tags: ['AI', 'Big Data', 'Machine Learning'],
    color: '#10B981',
    es: {
      title: 'DataMind Retail',
      tagline: 'Sistema de predicción de demanda para retail con IA',
      description:
        'Pipeline end-to-end de ciencia de datos para retail: generación de datos sintéticos, procesamiento con Spark, entrenamiento de 4 modelos de ML y dashboard interactivo.',
      problem:
        'Las empresas de retail pierden dinero por exceso o falta de stock. Sin predicciones fiables de demanda, la gestión de inventario se hace a ojo, generando pérdidas en ambos extremos.',
      decisions:
        'Arquitectura tipo Lambda: procesamiento batch con PySpark para grandes volúmenes, y modelos progresivos en complejidad (Media Móvil → Holt-Winters → Random Forest → LSTM) para comparar enfoques estadísticos vs ML vs Deep Learning. MLflow para tracking de experimentos. Streamlit para un dashboard que cualquiera puede usar sin código.',
      challenges:
        'Hacer que el pipeline fuera reproducible de extremo a extremo fue el mayor reto: desde la generación de datos sintéticos realistas hasta el dashboard final, pasando por el entrenamiento con MLflow. La configuración de PySpark en entorno local también requirió trabajo considerable.',
      outcome:
        'Sistema completo con el mejor modelo (Random Forest, MAPE 13.89%) registrado en MLflow y visualizable en dashboard Streamlit. Proyecto que demuestra dominio del ciclo completo de un proyecto de Data Science.',
    },
    val: {
      title: 'DataMind Retail',
      tagline: 'Sistema de predicció de demanda per a retail amb IA',
      description:
        'Pipeline end-to-end de ciència de dades per a retail: generació de dades sintètiques, processament amb Spark, entrenament de 4 models de ML i dashboard interactiu.',
      problem:
        "Les empreses de retail perden diners per excés o falta d'estoc. Sense prediccions fiables de demanda, la gestió d'inventari es fa a ull, generant pèrdues en ambdós extrems.",
      decisions:
        "Arquitectura tipus Lambda: processament batch amb PySpark, i models progressius en complexitat (Mitjana Mòbil → Holt-Winters → Random Forest → LSTM). MLflow per a tracking d'experiments. Streamlit per a un dashboard que qualsevol pot usar sense codi.",
      challenges:
        "Fer que el pipeline fos reproduïble d'extrem a extrem va ser el major repte. La configuració de PySpark en entorn local també va requerir treball considerable.",
      outcome:
        'Sistema complet amb el millor model (Random Forest, MAPE 13.89%) registrat en MLflow i visualitzable en dashboard Streamlit. Projecte que demostra domini del cicle complet d\'un projecte de Data Science.',
    },
    en: {
      title: 'DataMind Retail',
      tagline: 'AI-powered demand prediction system for retail',
      description:
        'End-to-end data science pipeline for retail: synthetic data generation, Spark processing, training 4 ML models, and an interactive dashboard.',
      problem:
        'Retail companies lose money from overstocking or stockouts. Without reliable demand forecasts, inventory management is guesswork, generating losses on both ends.',
      decisions:
        'Lambda-style architecture: batch processing with PySpark for large volumes, and progressively complex models (Moving Average → Holt-Winters → Random Forest → LSTM) to compare statistical vs ML vs Deep Learning approaches. MLflow for experiment tracking. Streamlit for a dashboard anyone can use without code.',
      challenges:
        'Making the pipeline reproducible end-to-end was the biggest challenge: from realistic synthetic data generation to the final dashboard, including MLflow training. Setting up PySpark in a local environment also required significant work.',
      outcome:
        'Complete system with the best model (Random Forest, MAPE 13.89%) logged in MLflow and visualizable in a Streamlit dashboard. Project demonstrating mastery of the full Data Science project lifecycle.',
    },
  },
  {
    slug: 'nextcorner',
    github: 'https://github.com/adriancc-dev/NextCorner',
    demo: 'https://mynextcorner.com',
    stack: ['Next.js 15', 'TypeScript', 'React 19', 'Supabase', 'Tailwind CSS 4', 'next-intl'],
    tags: ['Web', 'Full Stack', 'Production'],
    color: '#06B6D4',
    es: {
      title: 'NextCorner',
      tagline: 'Blog en producción con más de 100 artículos y 4 idiomas',
      description:
        'Plataforma de contenido multilingüe en producción en mynextcorner.com. Más de 100 artículos sobre tecnología, finanzas, salud y gaming. Gestión completa autónoma.',
      problem:
        'Quería un proyecto propio en producción real que me permitiera practicar el ciclo completo de desarrollo, mantenimiento y SEO, con usuarios reales y métricas reales.',
      decisions:
        'Next.js 15 con App Router por las ventajas de Server Components para SEO. Supabase (PostgreSQL) como base de datos por su DX excelente y tier gratuito generoso. next-intl para 4 idiomas (ES, EN, FR, IT) con traducción automática desde español. Tailwind CSS 4 por estar al día con las últimas versiones.',
      challenges:
        'El pipeline de traducción automática al crear artículos fue el mayor desafío técnico: hay que garantizar coherencia lingüística en 4 idiomas con una sola fuente de verdad. También la implementación del SEO avanzado (OpenGraph dinámico, sitemaps, hreflang) tomó mucho trabajo para hacerlo bien.',
      outcome:
        'Plataforma en producción activa con +100 artículos publicados, búsqueda de texto completo, marcadores, RSS, y gestión completa desde CMS propio. El proyecto que más me ha enseñado sobre el ciclo de vida completo de un producto web.',
    },
    val: {
      title: 'NextCorner',
      tagline: 'Blog en producció amb més de 100 articles i 4 idiomes',
      description:
        'Plataforma de contingut multilingüe en producció a mynextcorner.com. Més de 100 articles sobre tecnologia, finances, salut i gaming. Gestió completa autònoma.',
      problem:
        "Volia un projecte propi en producció real que em permetés practicar el cicle complet de desenvolupament, manteniment i SEO, amb usuaris reals i mètriques reals.",
      decisions:
        "Next.js 15 amb App Router per les avantatges de Server Components per a SEO. Supabase (PostgreSQL) com a base de dades. next-intl per a 4 idiomes amb traducció automàtica des d'espanyol. Tailwind CSS 4 per estar al dia amb les últimes versions.",
      challenges:
        "El pipeline de traducció automàtica en crear articles va ser el major desafiament tècnic: cal garantir coherència lingüística en 4 idiomes amb una sola font de veritat. També la implementació del SEO avançat va requerir molt de treball.",
      outcome:
        "Plataforma en producció activa amb +100 articles publicats, cerca de text complet, marcadors, RSS, i gestió completa des de CMS propi.",
    },
    en: {
      title: 'NextCorner',
      tagline: 'Production blog with 100+ articles in 4 languages',
      description:
        'Live multilingual content platform at mynextcorner.com. 100+ articles covering tech, finance, health, and gaming. Fully self-managed.',
      problem:
        'I wanted a real production project that would let me practice the complete cycle of development, maintenance, and SEO, with real users and real metrics.',
      decisions:
        'Next.js 15 with App Router for Server Components SEO advantages. Supabase (PostgreSQL) as the database for its excellent DX and generous free tier. next-intl for 4 languages (ES, EN, FR, IT) with automatic translation from Spanish. Tailwind CSS 4 to stay current.',
      challenges:
        'The automatic translation pipeline when creating articles was the biggest technical challenge: ensuring linguistic consistency across 4 languages with a single source of truth. Advanced SEO implementation (dynamic OpenGraph, sitemaps, hreflang) also took significant work to do properly.',
      outcome:
        'Live platform with 100+ published articles, full-text search, bookmarks, RSS, and full management from a custom CMS. The project that has taught me the most about the complete lifecycle of a web product.',
    },
  },
];
