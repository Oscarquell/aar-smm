
import ladvina from "../../assets/projects/ladvina.jpg";
import "./CaseStudy.css";

const steps = [
    {
        number: "01",
        title: "ПРОДУКТ",
        description:
            "Подчёркиваю фактуры, детали изделий и особенности коллекции.",
    },
    {
        number: "02",
        title: "КОНТЕНТ",
        description:
            "Сочетаю предметные кадры, образы и публикации в единой концепции.",
    },
    {
        number: "03",
        title: "СТИЛЬ БРЕНДА",
        description:
            "Формирую целостную визуальную подачу, соответствующую характеру бренда.",
    },
];

export default function CaseStudy() {
    return (
        <section className="case-study" id="cases">
            <div className="case-study__header">
                <span>04 / ВЫБРАННЫЙ КЕЙС</span>
                <span>МОДА · НИЖНЕЕ БЕЛЬЁ · ВИЗУАЛ</span>
            </div>

            <div className="case-study__hero">
                <div className="case-study__visual">
                    <img
                        src={ladvina}
                        alt="Визуальная подборка контента LaDiva Lingerie"
                        loading="lazy"
                    />

                    <span className="case-study__visual-label">
            LA DIVA / VISUAL STORY
          </span>

                    <span className="case-study__visual-index">01</span>
                </div>

                <div className="case-study__intro">
          <span className="case-study__eyebrow">
            INSIDE THE BRAND
          </span>

                    <h2 className="case-study__title">
                        MORE THAN
                        <br />
                        <span>LINGERIE.</span>
                    </h2>

                    <div className="case-study__project-name">
                        <span>BRAND PROJECT / 001</span>
                        <h3>LA DIVA</h3>
                    </div>

                    <p className="case-study__description">
                        Нижнее бельё — это не только продукт, но и
                        настроение, эстетика и внимание к деталям.
                        Визуальная подача LaDiva раскрывает красоту
                        изделий через выразительные фактуры, оттенки
                        и гармоничную композицию.
                    </p>

                    <div className="case-study__tags">
                        <span>PRODUCT VISUALS</span>
                        <span>FASHION CONTENT</span>
                        <span>INSTAGRAM</span>
                    </div>

                    <a className="case-study__link" href="#portfolio">
                        СМОТРЕТЬ ПОРТФОЛИО
                        <span aria-hidden="true">↗</span>
                    </a>
                </div>
            </div>

            <div className="case-study__process">
                <div className="case-study__process-heading">
          <span className="case-study__eyebrow">
            ТВОРЧЕСКИЙ ПОДХОД
          </span>

                    <h3>
                        ОТ ИДЕИ
                        <br />
                        ДО <span>ВИЗУАЛА.</span>
                    </h3>

                    <p>
                        Каждый элемент контента работает на образ бренда —
                        от первого кадра до оформления всей ленты.
                    </p>
                </div>

                <div className="case-study__steps">
                    {steps.map((step) => (
                        <article
                            className="case-study__step"
                            key={step.number}
                        >
              <span className="case-study__step-number">
                {step.number}
              </span>

                            <h4>{step.title}</h4>

                            <p>{step.description}</p>
                        </article>
                    ))}
                </div>
            </div>

            <div className="case-study__bottom">
                <div>
          <span className="case-study__eyebrow">
            YOUR BRAND DESERVES A POINT OF VIEW
          </span>

                    <h3>
                        LET’S MAKE
                        <br />
                        YOUR BRAND <span>STAND OUT.</span>
                    </h3>
                </div>

                <a href="#contact" className="case-study__cta">
                    ОБСУДИТЬ ПРОЕКТ
                    <span aria-hidden="true">↗</span>
                </a>
            </div>

            <div className="case-study__footer">
                <span>ВИЗУАЛ · КОНТЕНТ · ИСТОРИЯ БРЕНДА</span>
                <span>AZEM / SMM PORTFOLIO</span>
            </div>
        </section>
    );
}
