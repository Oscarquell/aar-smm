
import "./About.css";
import azemPortrait from "../../assets/images/azem-portrait.jpg";

const highlights = [
    {
        value: "SMM",
        label: "Стратегия и продвижение",
    },
    {
        value: "КОНТЕНТ",
        label: "Фото, видео и Reels",
    },
    {
        value: "ВИЗУАЛ",
        label: "Эстетика и стиль бренда",
    },
];

export default function About() {
    return (
        <section className="about" id="about">
            <div className="about__heading">
                <span className="about__eyebrow">01 / ОБО МНЕ</span>
                <span className="about__heading-note">
          ЧЕЛОВЕК КОНТЕНТА
        </span>
            </div>

            <div className="about__grid">
                <div className="about__content">
                    <span className="about__label">ПРИВЕТ, Я АЗЕМ!</span>

                    <h2 className="about__title">
                        BEHIND
                        <br />
                        THE BRAND<span>.</span>
                    </h2>

                    <p className="about__description">
                        Я SMM-специалист, который объединяет стратегическое
                        мышление, визуальную эстетику и создание контента,
                        чтобы помогать брендам формировать узнаваемый образ
                        и выстраивать отношения со своей аудиторией.
                    </p>

                    <p className="about__description about__description--muted">
                        Мой подход — не просто публиковать контент,
                        а понимать характер бренда, его аудиторию
                        и задачи бизнеса.
                    </p>

                    <a className="about__link" href="#portfolio">
                        СМОТРЕТЬ МОИ ПРОЕКТЫ <span>↗</span>
                    </a>
                </div>

                <div className="about__visual">
                    <div className="about__image-wrap">
                        <img
                            src={azemPortrait}
                            alt="Азем, SMM-специалист"
                            loading="lazy"
                        />
                        <span className="about__image-index">AZ / 001</span>
                    </div>

                    <span className="about__signature">creative mind.</span>
                </div>
            </div>

            <div className="about__highlights">
                {highlights.map((item, index) => (
                    <article className="about__highlight" key={item.value}>
            <span className="about__highlight-number">
              0{index + 1}
            </span>

                        <h3>{item.value}</h3>
                        <p>{item.label}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
