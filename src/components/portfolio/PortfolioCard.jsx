import { useState } from "react";
import ImageLightbox from "../imageLightbox/ImageLightbox";
import { getMediaUrl } from "../../services/portfolioApi";

function PortfolioMedia({ item, media, index, onOpen }) {
    const mediaUrl = getMediaUrl(media.url);
    const posterUrl = getMediaUrl(media.posterUrl);

    if (media.type === "VIDEO") {
        return (
            <video className="portfolio-feed-card__video" controls playsInline preload="none"
                poster={posterUrl || undefined} aria-label={`${item.title} — видео ${index + 1}`}>
                <source src={mediaUrl} />
                Ваш браузер не поддерживает воспроизведение видео.
            </video>
        );
    }

    return (
        <button type="button" className="portfolio-card__image-button portfolio-feed-card__image-button"
            onClick={() => onOpen({ ...media, url: mediaUrl, index })}
            aria-label={`Открыть изображение ${index + 1}: ${item.title}`}>
            <img src={mediaUrl} alt={media.altText || `${item.title} — портфолио Азем`} loading="lazy" />
            <span className="portfolio-card__zoom" aria-hidden="true">⤢</span>
        </button>
    );
}

export default function PortfolioCard({ item, number, featured = false, showAllMedia = false }) {
    const [activeImage, setActiveImage] = useState(null);
    const [activeSlide, setActiveSlide] = useState(0);
    const allMedia = item.media || [];
    const showCarousel = allMedia.length >= 2;
    const carouselSlide = allMedia[activeSlide] || allMedia[0];
    const media = showCarousel
        ? (carouselSlide ? [carouselSlide] : [])
        : showAllMedia ? allMedia : allMedia.slice(0, 1);
    const externalUrl = (() => {
        try {
            const url = new URL(item.externalUrl);
            return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
        } catch {
            return null;
        }
    })();

    function goToSlide(index) {
        setActiveSlide((index + allMedia.length) % allMedia.length);
    }

    return (
        <article className={`portfolio-card portfolio-feed-card${featured ? " portfolio-card--featured" : ""}`}>
            <div className={`portfolio-feed-card__media${showCarousel ? " portfolio-feed-card__media--carousel" : ""}`}>
                {media.map((entry, index) => (
                    <div className="portfolio-feed-card__media-item" key={entry.id}>
                        <PortfolioMedia item={item} media={entry} index={showCarousel ? activeSlide : index} onOpen={setActiveImage} />
                    </div>
                ))}
                <span className="portfolio-card__visual-index">
                    {showCarousel
                        ? `${String(activeSlide + 1).padStart(2, "0")} / ${String(allMedia.length).padStart(2, "0")}`
                        : `${String(number).padStart(2, "0")} / ${String(allMedia.length).padStart(2, "0")}`}
                </span>
                {showCarousel && (
                    <>
                        <button type="button" className="portfolio-carousel__arrow portfolio-carousel__arrow--previous"
                            onClick={() => goToSlide(activeSlide - 1)} aria-label={`Предыдущее медиа: ${item.title}`}>
                            <span aria-hidden="true">‹</span>
                        </button>
                        <button type="button" className="portfolio-carousel__arrow portfolio-carousel__arrow--next"
                            onClick={() => goToSlide(activeSlide + 1)} aria-label={`Следующее медиа: ${item.title}`}>
                            <span aria-hidden="true">›</span>
                        </button>
                        <div className="portfolio-carousel__pagination" role="group" aria-label={`${item.title}: выбрать слайд`}>
                            {allMedia.map((entry, index) => (
                                <button type="button" key={entry.id}
                                    className={`portfolio-carousel__dot${index === activeSlide ? " is-active" : ""}`}
                                    onClick={() => goToSlide(index)}
                                    aria-label={`Слайд ${index + 1}${entry.type === "VIDEO" ? ", видео" : ", фото"}`}
                                    aria-current={index === activeSlide ? "true" : undefined} />
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className="portfolio-card__content">
                <div className="portfolio-card__meta">
                    <span>{item.category}</span>
                    <span>{item.type === "CASE_STUDY" ? "КЕЙС" : "ПРОЕКТ"}</span>
                </div>
                <h3>{item.title}</h3>
                <p className="portfolio-card__description">{item.description}</p>
                {item.serviceTags?.length > 0 && (
                    <div className="portfolio-card__services">
                        {item.serviceTags.map((service) => <span key={service}>{service}</span>)}
                    </div>
                )}
                {externalUrl && (
                    <a className="portfolio-card__external-link" href={externalUrl}
                        target="_blank" rel="noopener noreferrer">
                        <span>ПОСМОТРЕТЬ СТРАНИЦУ</span><span aria-hidden="true">↗</span>
                    </a>
                )}
            </div>

            {activeImage && (
                <ImageLightbox image={activeImage.url} title={item.title}
                    alt={activeImage.altText || `${item.title} — портфолио Азем`}
                    media={allMedia.map((entry) => ({
                        ...entry,
                        url: getMediaUrl(entry.url),
                        posterUrl: getMediaUrl(entry.posterUrl),
                    }))}
                    initialIndex={activeImage.index}
                    onClose={() => setActiveImage(null)} />
            )}
        </article>
    );
}
