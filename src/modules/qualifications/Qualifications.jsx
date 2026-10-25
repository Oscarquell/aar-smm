
import "./Qualifications.css";

const skills = [
    {
        number: "01",
        title: "СТРАТЕГИЯ SMM",
        description:
            "Позиционирование бренда, анализ аудитории и планирование контента.",
    },
    {
        number: "02",
        title: "СОЗДАНИЕ КОНТЕНТА",
        description:
            "Идеи, сценарии, съёмка и создание контента для социальных сетей.",
    },
    {
        number: "03",
        title: "ВИЗУАЛЬНЫЙ СТИЛЬ",
        description:
            "Единый визуальный стиль, эстетика ленты и узнаваемость бренда.",
    },
    {
        number: "04",
        title: "СОЗДАНИЕ ВИДЕО",
        description:
            "Монтаж коротких видео, Reels и вертикального контента.",
    },
];

const tools = [
    "Instagram",
    "Reels",
    "Canva",
    "Facebook",
    "Tik-Tok",
    "Adobe Premier Pro"
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

                    <h2 className="qualifications__title">
                        SKILLS &
                        <br />
                        EXPERTISE<span>.</span>
                    </h2>
                </div>

                <p className="qualifications__description">
                    От идеи и стратегии до визуального контента —
                    объединяю творческий подход и понимание задач
                    бренда, чтобы создавать целостную коммуникацию.
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
