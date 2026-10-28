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
    const media = showAllMedia ? item.media : item.media.slice(0, 1);

    return (
        <article className={`portfolio-card portfolio-feed-card${featured ? " portfolio-card--featured" : ""}`}>
            <div className="portfolio-feed-card__media">
                {media.map((entry, index) => (
                    <div className="portfolio-feed-card__media-item" key={entry.id}>
                        <PortfolioMedia item={item} media={entry} index={index} onOpen={setActiveImage} />
                    </div>
                ))}
                <span className="portfolio-card__visual-index">
                    {String(number).padStart(2, "0")} / {String(item.media.length).padStart(2, "0")}
                </span>
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
            </div>

            {activeImage && (
                <ImageLightbox image={activeImage.url} title={item.title}
                    alt={activeImage.altText || `${item.title} — портфолио Азем`}
                    id={String(activeImage.index + 1).padStart(2, "0")}
                    total={String(item.media.filter((entry) => entry.type === "IMAGE").length).padStart(2, "0")}
                    onClose={() => setActiveImage(null)} />
            )}
        </article>
    );
}
