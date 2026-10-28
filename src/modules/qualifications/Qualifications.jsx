
import "./Qualifications.css";

const skills = [
    {
        number: "01",
        title: "SMM-СТРАТЕГИЯ",
        description:
            "Анализ бренда и аудитории, позиционирование, рубрики и план продвижения.",
    },
    {
        number: "02",
        title: "ТАРГЕТ",
        description:
            "Подготовка рекламных креативов, настройка кампаний и оптимизация по результатам.",
    },
    {
        number: "03",
        title: "КОНТЕНТ-ПЛАН",
        description:
            "Идеи и сценарии публикаций, которые отвечают целям бренда и интересам аудитории.",
    },
    {
        number: "04",
        title: "СЪЁМКА И REELS",
        description:
            "Создание фото- и видеоконтента, монтаж коротких роликов и вертикальных видео.",
    },
    {
        number: "05",
        title: "ВИЗУАЛЬНЫЙ СТИЛЬ",
        description:
            "Единая визуальная система, оформление профиля и узнаваемая подача бренда.",
    },
    {
        number: "06",
        title: "АНАЛИТИКА И РОСТ",
        description:
            "Отслеживание ключевых показателей и корректировка контента и рекламы по данным.",
    },
];

const tools = [
    "Instagram",
    "Reels",
    "Canva",
    "Meta Ads",
    "TikTok",
    "Adobe Premiere Pro"
];

export default function Qualifications() {
    return (
        <section className="qualifications" id="qualifications">
            <div className="qualifications__header">
        <span className="qualifications__eyebrow">
          02 / КОМПЕТЕНЦИЯ
        </span>

                <span className="qualifications__header-note">
          СКИЛЛЫ & КРЕАТИВНЫЕ ИНСТРУМЕНТЫ
        </span>
            </div>

            <div className="qualifications__intro">
                <div className="qualifications__title-wrap">
          <span className="qualifications__overline">
            МОЙ ПРОФЕССИОНАЛЬНЫЙ ПРОФИЛЬ
          </span>

                    <h2 className="qualifications__title">УСЛУГИ<br />ДЛЯ БРЕНДА<span>.</span></h2>
                </div>

                <p className="qualifications__description">
                    Подключаюсь к проекту комплексно или закрываю отдельную задачу:
                    от стратегии и контент-съёмки до запуска таргетированной рекламы.
                </p>
            </div>

            <div className="qualifications__grid">
                {skills.map((skill) => (
                    <article
                        className="qualifications__card"
                        key={skill.number}
                    >
            <span className="qualifications__card-number">
              {skill.number}
            </span>

                        <div>
                            <h3>{skill.title}</h3>
                            <p>{skill.description}</p>
                        </div>

                        <span className="qualifications__card-arrow">
              ↗
            </span>
                    </article>
                ))}
            </div>

            <div className="qualifications__tools">
                <div className="qualifications__tools-heading">
          <span className="qualifications__overline">
            ТВОРЧЕСКИЙ ИНСТРУМЕНТАРИЙ
          </span>

                    <h3>ПЛАТФОРМЫ</h3>
                </div>

                <div className="qualifications__tags">
                    {tools.map((tool) => (
                        <span className="qualifications__tag" key={tool}>
              {tool}
            </span>
                    ))}
                </div>
            </div>

            <div className="qualifications__footer">
                <span>ПЕРВОНАЧАЛЬНО СТРАТЕГИЯ. КРЕАТИВ - ВСЕГДА.</span>
                <span>АЗЕМ — SMM СПЕЦИАЛИСТ</span>
            </div>
        </section>
    );
}
