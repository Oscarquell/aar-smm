import { useEffect, useState } from "react";
import PortfolioCard from "../../components/portfolio/PortfolioCard";
import { getPortfolio } from "../../services/portfolioApi";
import "./Portfolio.css";

export default function Portfolio() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;
        getPortfolio("/api/v1/portfolio/home")
            .then((items) => {
                if (active) setProjects(items);
            })
            .catch((requestError) => {
                if (active) setError(requestError.message);
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => { active = false; };
    }, []);

    return (
        <section className="portfolio" id="portfolio">
            <div className="portfolio__header">
                <span className="portfolio__eyebrow">03 / МОИ РАБОТЫ</span>
                <span className="portfolio__header-note">СТРАТЕГИЯ · КОНТЕНТ · ВИЗУАЛ</span>
            </div>

            <div className="portfolio__intro">
                <div>
                    <span className="portfolio__overline">ИЗБРАННЫЕ ПРОЕКТЫ</span>
                    <h2 className="portfolio__title">МОИ<br />РАБОТЫ<span>.</span></h2>
                </div>
                <p className="portfolio__description">
                    Два проекта, которые показывают мой подход к контенту,
                    визуальной подаче и задачам бизнеса.
                </p>
            </div>

            {loading && <p className="portfolio__status" role="status">Загружаю проекты…</p>}
            {!loading && error && <p className="portfolio__status" role="alert">{error}. Проверьте, запущен ли backend.</p>}
            {!loading && !error && projects.length === 0 && (
                <p className="portfolio__status">Скоро здесь появятся проекты.</p>
            )}

            {projects.length > 0 && (
                <div className="portfolio__grid">
                    {projects.slice(0, 2).map((project, index) => (
                        <PortfolioCard item={project} number={index + 1}
                            featured={index === 0} key={project.id} />
                    ))}
                </div>
            )}

            <div className="portfolio__footer portfolio__footer--all">
                <span>БОЛЬШЕ ПРОЕКТОВ, ФОТО И ВИДЕО</span>
                <a href="/portfolio">ПОСМОТРЕТЬ ВСЕ РАБОТЫ <span>↗</span></a>
            </div>
        </section>
    );
}
