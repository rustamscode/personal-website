import { ExperienceItem, SocialLink, Project, Achievement, Article } from './types.ts';

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "LinkedIn",
    username: "rustamscodes",
    url: "https://linkedin.com/in/rustamscodes",
    iconName: "Linkedin"
  },
  {
    platform: "GitHub",
    username: "rustamscode",
    url: "https://github.com/rustamscode",
    iconName: "Github"
  },
  {
    platform: "Telegram",
    username: "@rustamscode",
    url: "https://t.me/rustamscode",
    iconName: "Send"
  },
  {
    platform: "YouTube",
    username: "rustamscode",
    url: "https://youtube.com/@rustamscode",
    iconName: "Youtube"
  },
  {
    platform: "Medium",
    username: "rustamscode",
    url: "https://medium.com/@rustamscode",
    iconName: "BookOpen"
  },
  {
    platform: "Habr",
    username: "rustamscode",
    url: "https://habr.com/ru/users/rustamscode",
    iconName: "BookOpen"
  },
  {
    platform: "Email",
    username: "rustamscode@gmail.com",
    url: "mailto:rustamscode@gmail.com",
    iconName: "Mail"
  }
];

export const TECH_STACK = [
  "Java", "Kotlin", "Spring Boot", "Microservices", 
  "PostgreSQL", "Docker", "Kubernetes", "Kafka", 
  "Redis", "CI/CD", "System Design"
];

const DATA_EN = {
    header: {
        role: "Senior Java & Kotlin Engineer",
        bio: "I build scalable, high-performance backend systems. Currently creating efficient solutions at VK.",
        cta: "Get In Touch"
    },
    about: {
        bio: [
            "Back in 2018, I started my journey in the corporate world at Citibank, diving deep into the rigorous standards of fintech. Since then, I've navigated through a Tier-1 Bank (NDA) and now VK, constantly refining my craft in the JVM ecosystem.",
            "My main focus these days is engineering accessible, resilient, and performant backend services. I enjoy the challenge of high-load systems—optimizing database queries, tuning garbage collectors, and ensuring microservices talk to each other politely.",
            "When I'm not writing Java or Kotlin, I'm usually sharing my knowledge on YouTube or writing articles on Medium to help others navigate the complex world of software engineering."
        ],
        highlights: [
            { title: "Experience", value: "6+ Years", desc: "Building complex enterprise systems in Fintech & Social.", icon: "Briefcase" },
            { title: "Impact", value: "50k+ Reads", desc: "On my technical articles about JVM & Spring Boot.", icon: "Users" },
            { title: "Focus", value: "High Load", desc: "Distributed systems, Microservices & Performance.", icon: "Server" },
            { title: "Location", value: "Global", desc: "Open to remote opportunities and relocation.", icon: "Globe" }
        ]
    },
    experience: [
        {
            company: "VK",
            role: "Java Backend Developer",
            duration: "2022 — Present",
            description: "Architecting high-load social interactions and messaging services. Optimized internal microservices reducing latency by 40%. Migrated legacy monolithic modules to Kotlin-based microservices.",
            skills: ["Java", "Kotlin", "Spring Boot", "Kafka", "PostgreSQL"],
            logo: "https://placehold.co/200x200/0077FF/ffffff?text=VK"
        },
        {
            company: "Tier-1 Bank (NDA)",
            role: "Java Backend Developer",
            duration: "2020 — 2022",
            description: "Developed core banking transaction processing systems. Implemented secure API gateways for mobile banking integration. Championed unit testing coverage increase from 40% to 85%.",
            skills: ["Java", "Spring Security", "Oracle DB", "Docker", "Jenkins"],
            logo: "https://placehold.co/200x200/10b981/ffffff?text=NDA"
        },
        {
            company: "Citibank",
            role: "Java Backend Developer",
            duration: "2018 — 2020",
            description: "Maintained and enhanced global wealth management platforms. Collaborated with cross-functional teams to deliver regulatory compliance features.",
            skills: ["Java EE", "Hibernate", "SQL", "Rest API"],
            logo: "https://placehold.co/200x200/003b70/ffffff?text=Citi"
        }
    ],
    projects: [
        {
            title: "High-Throughput Message Broker",
            description: "Designed a custom wrapper around Kafka to handle 50k+ events per second with guaranteed delivery and ordering for a social platform. Implemented dead-letter queues and automatic retry policies.",
            tech: ["Java", "Kafka", "Spring Boot", "Protobuf"],
            link: "https://github.com/rustamscode",
            imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1744&auto=format&fit=crop"
        },
        {
            title: "Distributed Rate Limiter",
            description: "Built a distributed rate limiting library using Redis and Lua scripts to protect internal microservices from DDOS attacks. Integrated seamlessly with Spring Security filter chains.",
            tech: ["Kotlin", "Redis", "Spring AOP", "Lua"],
            link: "https://github.com/rustamscode",
            imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1740&auto=format&fit=crop"
        },
        {
            title: "Secure Banking API Gateway",
            description: "Developed a secure API Gateway for mobile banking clients, handling OAuth2 authentication and request validation. Reduced latency by 15% using non-blocking I/O with Netty.",
            tech: ["Java", "Spring Cloud Gateway", "Netty", "OAuth2"],
            link: "https://github.com/rustamscode",
            imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1740&auto=format&fit=crop"
        }
    ],
    achievements: [
        {
            title: "VK Internal Hackathon Winner",
            organization: "VK Tech",
            year: "2023",
            description: "Led a team of 4 to build a real-time sentiment analysis microservice for chat streams. Secured 1st place out of 30+ teams."
        },
        {
            title: "Oracle Certified Professional",
            organization: "Oracle University",
            year: "2022",
            description: "Java SE 11 Developer Certification. Validated advanced proficiency in modularity, functional programming, and concurrency."
        },
        {
            title: "Top Technical Writer",
            organization: "Medium / Habr",
            year: "2021",
            description: "Authored a series of articles on 'Spring Boot Performance Tuning' which garnered over 50k views."
        }
    ],
    articles: [
        {
            title: "Optimizing PostgreSQL for High Load",
            platform: "Habr",
            date: "Jan 2024",
            description: "Advanced indexing strategies, partitioning, and query tuning techniques that reduced query time by 60%.",
            link: "https://habr.com/ru/users/rustamscode",
        },
        {
            title: "Scaling Spring Boot Microservices",
            platform: "Medium",
            date: "Dec 2023",
            description: "Strategies for optimizing JVM memory usage and garbage collection in high-throughput containerized environments.",
            link: "https://medium.com/@rustamscode",
        },
        {
            title: "From Java 8 to Kotlin: A Migration Story",
            platform: "Habr",
            date: "Sep 2023",
            description: "Lessons learned migrating a legacy payment gateway. Handling null-safety, coroutines adoption, and team upskilling.",
            link: "https://habr.com/ru/users/rustamscode",
        },
        {
            title: "Event-Driven Architecture Patterns",
            platform: "Dev.to",
            date: "Jul 2023",
            description: "Deep dive into idempotency, dead letter queues, and event ordering guarantees using Kafka and Spring Cloud Stream.",
            link: "https://dev.to/rustamscode",
        }
    ],
    ui: {
        about: "About",
        experience: "Experience",
        projects: "Projects",
        achievements: "Achievements",
        writing: "Writing",
        contact: "Get In Touch",
        techStack: "Tech Stack",
        viewResume: "View Full Resumé",
        technologies: "Technologies",
        readArticle: "Read Article",
        sendEmail: "Send me an email",
        contactDesc: "",
        footer: ""
    }
};

const DATA_RU = {
    header: {
        role: "Senior Java & Kotlin Разработчик",
        bio: "Разрабатываю масштабируемые и высокопроизводительные бэкенд-системы. В настоящее время создаю эффективные решения в VK.",
        cta: "Связаться"
    },
    about: {
        bio: [
            "В 2018 году я начал свой путь в корпоративном мире в Citibank, погрузившись в строгие стандарты финтеха. С тех пор я работал в крупном банке (NDA), а сейчас в VK, постоянно совершенствуя свои навыки в экосистеме JVM.",
            "Сейчас я сосредоточен на разработке доступных, отказоустойчивых и производительных бэкенд-сервисов. Мне нравятся задачи high-load систем — оптимизация запросов к БД, настройка GC и обеспечение корректного взаимодействия микросервисов.",
            "Когда я не пишу код на Java или Kotlin, я обычно делюсь знаниями на YouTube или пишу статьи на Medium, помогая другим ориентироваться в сложном мире разработки ПО."
        ],
        highlights: [
            { title: "Опыт", value: "6+ Лет", desc: "Разработки сложных корпоративных систем в Финтехе и Соцсетях.", icon: "Briefcase" },
            { title: "Влияние", value: "50k+ Читателей", desc: "Моих технических статей про JVM и Spring Boot.", icon: "Users" },
            { title: "Фокус", value: "High Load", desc: "Распределенные системы, Микросервисы и Производительность.", icon: "Server" },
            { title: "Локация", value: "Мир", desc: "Открыт к удаленной работе и релокации.", icon: "Globe" }
        ]
    },
    experience: [
        {
            company: "VK",
            role: "Java Backend Developer",
            duration: "2022 — Наст. время",
            description: "Проектирование высоконагруженных сервисов для соцсетей. Оптимизировал внутренние микросервисы, снизив задержки на 40%. Мигрировал монолитные модули на микросервисы Kotlin.",
            skills: ["Java", "Kotlin", "Spring Boot", "Kafka", "PostgreSQL"],
            logo: "https://placehold.co/200x200/0077FF/ffffff?text=VK"
        },
        {
            company: "Банк Топ-1 (NDA)",
            role: "Java Backend Developer",
            duration: "2020 — 2022",
            description: "Разработка систем процессинга банковских транзакций. Внедрил безопасные API-шлюзы для мобильного банкинга. Увеличил покрытие юнит-тестами с 40% до 85%.",
            skills: ["Java", "Spring Security", "Oracle DB", "Docker", "Jenkins"],
            logo: "https://placehold.co/200x200/10b981/ffffff?text=NDA"
        },
        {
            company: "Citibank",
            role: "Java Backend Developer",
            duration: "2018 — 2020",
            description: "Поддержка и развитие глобальных платформ управления капиталом. Сотрудничал с кросс-функциональными командами для реализации требований регуляторов.",
            skills: ["Java EE", "Hibernate", "SQL", "Rest API"],
            logo: "https://placehold.co/200x200/003b70/ffffff?text=Citi"
        }
    ],
    projects: [
        {
            title: "High-Throughput Message Broker",
            description: "Разработал кастомную обертку над Kafka для обработки 50k+ событий в секунду с гарантией доставки для социальной платформы. Реализовал DLQ и политики повторных попыток.",
            tech: ["Java", "Kafka", "Spring Boot", "Protobuf"],
            link: "https://github.com/rustamscode",
            imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1744&auto=format&fit=crop"
        },
        {
            title: "Distributed Rate Limiter",
            description: "Создал библиотеку распределенного ограничения скорости с использованием Redis и Lua для защиты микросервисов от DDOS. Интегрировано в цепочки фильтров Spring Security.",
            tech: ["Kotlin", "Redis", "Spring AOP", "Lua"],
            link: "https://github.com/rustamscode",
            imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1740&auto=format&fit=crop"
        },
        {
            title: "Secure Banking API Gateway",
            description: "Разработал безопасный API Gateway для мобильного банкинга с OAuth2 аутентификацией. Снизил задержку на 15% за счет использования неблокирующего I/O на Netty.",
            tech: ["Java", "Spring Cloud Gateway", "Netty", "OAuth2"],
            link: "https://github.com/rustamscode",
            imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1740&auto=format&fit=crop"
        }
    ],
    achievements: [
        {
            title: "Победитель хакатона VK",
            organization: "VK Tech",
            year: "2023",
            description: "Возглавил команду из 4 человек для создания микросервиса анализа настроений чатов в реальном времени. 1-е место среди 30+ команд."
        },
        {
            title: "Oracle Certified Professional",
            organization: "Oracle University",
            year: "2022",
            description: "Сертификация Java SE 11. Подтверждение продвинутых навыков модульности, функционального программирования и многопоточности."
        },
        {
            title: "Топ Технический Автор",
            organization: "Medium / Habr",
            year: "2021",
            description: "Автор серии статей по 'Spring Boot Performance Tuning', собравших более 50k просмотров."
        }
    ],
    articles: [
        {
            title: "Оптимизация PostgreSQL под высокие нагрузки",
            platform: "Habr",
            date: "Янв 2024",
            description: "Продвинутые стратегии индексирования, партиционирование и тюнинг запросов, сократившие время выполнения на 60%.",
            link: "https://habr.com/ru/users/rustamscode",
        },
        {
            title: "Масштабирование Spring Boot микросервисов",
            platform: "Medium",
            date: "Дек 2023",
            description: "Стратегии оптимизации памяти JVM и сборки мусора в высоконагруженных контейнеризированных средах.",
            link: "https://medium.com/@rustamscode",
        },
        {
            title: "От Java 8 к Kotlin: История миграции",
            platform: "Habr",
            date: "Сен 2023",
            description: "Уроки, извлеченные при миграции легаси платежного шлюза. Null-safety, внедрение корутин и обучение команды.",
            link: "https://habr.com/ru/users/rustamscode",
        },
        {
            title: "Паттерны событийно-ориентированной архитектуры",
            platform: "Dev.to",
            date: "Июл 2023",
            description: "Глубокое погружение в идемпотентность, DLQ и гарантии порядка событий с использованием Kafka и Spring Cloud Stream.",
            link: "https://dev.to/rustamscode",
        }
    ],
    ui: {
        about: "Обо мне",
        experience: "Опыт",
        projects: "Проекты",
        achievements: "Достижения",
        writing: "Статьи",
        contact: "Связаться",
        techStack: "Стек Технологий",
        viewResume: "Посмотреть резюме",
        technologies: "Технологии",
        readArticle: "Читать статью",
        sendEmail: "Написать на почту",
        contactDesc: "",
        footer: ""
    }
};

export const CONTENT = {
    en: DATA_EN,
    ru: DATA_RU
};