
import "./Qualifications.css";

const skills = [
    {
        number: "01",
        title: "SMM STRATEGY",
        description:
            "Позиционирование бренда, анализ аудитории и планирование контента.",
    },
    {
        number: "02",
        title: "CONTENT CREATION",
        description:
            "Идеи, сценарии, съёмка и создание контента для социальных сетей.",
    },
    {
        number: "03",
        title: "VISUAL IDENTITY",
        description:
            "Единый визуальный стиль, эстетика ленты и узнаваемость бренда.",
    },
    {
        number: "04",
        title: "VIDEO EDITING",
        description:
            "Монтаж коротких видео, Reels и вертикального контента.",
    },
];

const tools = [
    "Instagram",
    "Reels",
    "Canva",
    "Video Editing",
    "Content Planning",
    "iPhone Filming",
];

export default function Qualifications() {
    return (
        <section className="qualifications" id="qualifications">
            <div className="qualifications__header">
        <span className="qualifications__eyebrow">
          02 / EXPERTISE
        </span>

                <span className="qualifications__header-note">
          SKILLS & CREATIVE TOOLS
        </span>
            </div>

            <div className="qualifications__intro">
                <div className="qualifications__title-wrap">
          <span className="qualifications__overline">
            MY PROFESSIONAL PROFILE
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
            CREATIVE TOOLKIT
          </span>

                    <h3>TOOLS I WORK WITH</h3>
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
                <span>STRATEGY FIRST. CREATIVE ALWAYS.</span>
                <span>AZEM — SMM SPECIALIST</span>
            </div>
        </section>
    );
}
