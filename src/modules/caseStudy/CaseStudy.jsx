
import "./CaseStudy.css";

const projectDetails = [
    {
        number: "01",
        title: "THE CHALLENGE",
        description:
            "Определить визуальное направление бренда, понять задачи коммуникации и выстроить целостное присутствие в социальных сетях.",
    },
    {
        number: "02",
        title: "THE APPROACH",
        description:
            "Продумать контентные рубрики, визуальную подачу, форматы публикаций и принципы взаимодействия с аудиторией.",
    },
    {
        number: "03",
        title: "THE EXECUTION",
        description:
            "Подготовить контент, организовать съёмки и объединить публикации в единую визуальную концепцию.",
    },
];

export default function CaseStudy() {
    return (
        <section className="case-study" id="cases">
            <div className="case-study__header">
        <span className="case-study__eyebrow">
          04 / CASE STUDY
        </span>

                <span className="case-study__header-note">
          FROM STRATEGY TO CONTENT
        </span>
            </div>

            <div className="case-study__hero">
                <div className="case-study__hero-content">
          <span className="case-study__overline">
            BEHIND THE PROJECT
          </span>

                    <h2 className="case-study__title">
                        IDEAS INTO
                        <br />
                        IDENTITY<span>.</span>
                    </h2>

                    <p className="case-study__intro">
                        За каждым сильным визуалом стоит идея.
                        Показываю, как стратегия, контент и
                        эстетика объединяются в работе над брендом.
                    </p>

                    <span className="case-study__project-label">
            PROJECT BREAKDOWN / 001
          </span>
                </div>

                <div className="case-study__hero-visual">
                    <div className="case-study__visual-placeholder">
                        <span>PROJECT VISUAL</span>
                        <span className="case-study__visual-mark">AZ.</span>
                    </div>
                </div>
            </div>

            <div className="case-study__details">
                {projectDetails.map((detail) => (
                    <article
                        className="case-study__detail"
                        key={detail.number}
                    >
            <span className="case-study__detail-number">
              {detail.number}
            </span>

                        <h3>{detail.title}</h3>

                        <p>{detail.description}</p>
                    </article>
                ))}
            </div>

            <div className="case-study__outcome">
                <div className="case-study__outcome-heading">
          <span className="case-study__overline">
            THE RESULT
          </span>

                    <h3>
                        CONSISTENCY
                        <br />
                        IS EVERYTHING.
                    </h3>
                </div>

                <div className="case-study__outcome-content">
                    <p>
                        Итог работы оцениваем по реальным материалам
                        проекта и согласованным целям: качеству
                        визуальной коммуникации, регулярности контента
                        и показателям социальных сетей.
                    </p>

                    <span>
            Фактические результаты добавим после выбора
            конкретного проекта.
          </span>
                </div>
            </div>

            <div className="case-study__footer">
                <span>CONCEPT · CONTENT · COMMUNICATION</span>
                <a href="#contact">
                    ОБСУДИТЬ ПРОЕКТ <span>↗</span>
                </a>
            </div>
        </section>
    );
}
