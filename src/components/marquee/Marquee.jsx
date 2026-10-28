import "./Marquee.css";

const phrases = [
    "SMM-СТРАТЕГИЯ",
    "КОНТЕНТ ДЛЯ БРЕНДОВ",
    "ВИЗУАЛЬНЫЕ ИСТОРИИ",
    "БИШКЕК · 2026",
];

function MarqueeTrack({ tone = "light", reverse = false }) {
    const className = [
        "marquee__row",
        `marquee__row--${tone}`,
        reverse ? "marquee__row--reverse" : "",
    ].filter(Boolean).join(" ");

    return (
        <div className={className} aria-hidden="true">
            <div className="marquee__track">
                {[0, 1].map((copy) => (
                    <div className="marquee__group" key={copy}>
                        {phrases.map((phrase) => (
                            <span className="marquee__item" key={`${copy}-${phrase}`}>
                                {phrase}<span className="marquee__dot">✳</span>
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Marquee() {
    return (
        <section className="marquee" aria-label="Услуги и направления работы Азем">
            <MarqueeTrack />
            <MarqueeTrack tone="accent" reverse />
        </section>
    );
}
