
import "./Hero.css";
import azemPortrait2 from "../../assets/images/azem-portrait-2.jpg";

export default function Hero() {
    return (
        <section className="hero" id="home">
            <div className="hero__top">
                <div className="hero__intro">
                    <span className="hero__eyebrow">
                        SMM СПЕЦИАЛИСТ / BISHKEK
                    </span>

                    <p>
                        SMM, таргет и контент для брендов, которым важно
                        не просто красиво выглядеть, а расти.
                    </p>
                    <a className="hero__cta" href="#contact">
                        ОБСУДИТЬ ПРОЕКТ <span aria-hidden="true">↗</span>
                    </a>
                </div>

                <span className="hero__index">ПОРТФОЛИО — 2026</span>
            </div>

            <div className="hero__visual">
                <div className="hero__title">
                    <span className="hero__title-small">SMM · CONTENT · ADS</span>
                    <h1>
                        <span className="hero__sr-only">
                            Азем — SMM-специалист в Бишкеке.{" "}
                        </span>
                        SOCIAL
                        <br />
                        MEDIA
                    </h1>
                </div>

                <div className="hero__portrait">
                    <img
                        src={azemPortrait2}
                        alt="Азем, SMM-специалист из Бишкека"
                        className="hero__portrait-image"
                        fetchPriority="high"
                    />
                </div>

                <span className="hero__script">Manager.</span>

                <span className="hero__vertical-label">
                    СТРАТЕГИЯ · КОНТЕНТ · ЭСТЕТИКА
                </span>
            </div>

            <div className="hero__bottom">
                <a className="hero__website" href="#contact">АЗЕМ / ОБСУДИТЬ ПРОЕКТ ↗</a>

                <a className="hero__scroll" href="#about">
                    ЛИСТАЙТЕ НИЖЕ <span>↓</span>
                </a>
            </div>
        </section>
    );
}
