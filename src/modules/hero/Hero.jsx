
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
                        Помогаю брендам находить свой визуальный язык
                        и выстраивать коммуникацию с аудиторией.
                    </p>
                </div>

                <span className="hero__index">ПОРТФОЛИО — 2026</span>
            </div>

            <div className="hero__visual">
                <div className="hero__title">
                    <span className="hero__title-small">PERSONAL BRAND</span>
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
                <span className="hero__website">АЗЕМ / ПОРТФОЛИО</span>

                <a className="hero__scroll" href="#about">
                    ЛИСТАЙТЕ НИЖЕ <span>↓</span>
                </a>
            </div>
        </section>
    );
}
