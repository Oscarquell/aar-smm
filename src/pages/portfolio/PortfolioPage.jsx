import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import PortfolioCard from "../../components/portfolio/PortfolioCard";
import ErrorState from "../../components/feedback/ErrorState";
import Contact from "../../modules/contact/Contact";
import { getPortfolio } from "../../services/portfolioApi";
import "../../modules/portfolio/Portfolio.css";
import "./PortfolioPage.css";

function setMeta(selector, attribute, value) {
    const element = document.querySelector(selector);
    if (element) element.setAttribute(attribute, value);
}

export default function PortfolioPage() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "Портфолио SMM и контента — Азем, Бишкек";
        setMeta('meta[name="description"]', "content", "Все проекты Азем: SMM, создание контента, визуальная подача, фото и видео для брендов.");
        setMeta('link[rel="canonical"]', "href", "https://www.azem-smm.site/portfolio");
        setMeta('meta[property="og:url"]', "content", "https://www.azem-smm.site/portfolio");
        setMeta('meta[property="og:title"]', "content", document.title);
        setMeta('meta[property="og:description"]', "content", "Все проекты Азем: SMM, создание контента, визуальная подача, фото и видео для брендов.");
        setMeta('meta[name="twitter:title"]', "content", document.title);
        setMeta('meta[name="twitter:description"]', "content", "Все проекты Азем: SMM, создание контента, визуальная подача, фото и видео для брендов.");
    }, []);

    useEffect(() => {
        let active = true;
        getPortfolio()
            .then((portfolioItems) => {
                if (active) setItems(portfolioItems);
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
        <>
            <Header />
            <main className="home portfolio-page">
                <section className="portfolio">
                    <div className="portfolio__header">
                        <span className="portfolio__eyebrow">ПОРТФОЛИО / 2026</span>
                        <a className="portfolio-page__home-link" href="/">← НА ГЛАВНУЮ</a>
                    </div>
                    <div className="portfolio__intro">
                        <div>
                            <span className="portfolio__overline">ПРОЕКТЫ · КЕЙСЫ · МЕДИА</span>
                            <h1 className="portfolio__title">ВСЕ<br />РАБОТЫ<span>.</span></h1>
                        </div>
                        <p className="portfolio__description">
                            SMM-проекты, контент-съёмки и визуальные истории брендов.
                            Откройте изображение или включите видео, чтобы рассмотреть работу.
                        </p>
                    </div>

                    {loading && <p className="portfolio__status" role="status">Загружаю работы…</p>}
                    {!loading && error && <ErrorState />}
                    {!loading && !error && items.length === 0 && (
                        <p className="portfolio__status">Работы скоро появятся.</p>
                    )}
                    {items.length > 0 && (
                        <div className="portfolio__grid">
                            {items.map((item, index) => (
                                <PortfolioCard item={item} number={index + 1}
                                    featured={index === 0} showAllMedia key={item.id} />
                            ))}
                        </div>
                    )}
                </section>
                <Contact sectionNumber="02 / 02" />
            </main>
        </>
    );
}
