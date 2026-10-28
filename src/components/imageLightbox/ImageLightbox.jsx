import { useCallback, useEffect, useRef, useState } from "react";

export default function ImageLightbox({ image, title, alt, id, total, media, initialIndex = 0, onClose }) {
    const slides = media?.length ? media : [{ type: "IMAGE", url: image, altText: alt }];
    const [activeIndex, setActiveIndex] = useState(initialIndex);
    const touchStart = useRef(null);
    const activeMedia = slides[activeIndex] || slides[0];
    const hasCarousel = slides.length > 1;

    const goToSlide = useCallback((index) => {
        setActiveIndex((index + slides.length) % slides.length);
    }, [slides.length]);

    function handleTouchStart(event) {
        if (!hasCarousel || event.touches.length !== 1 || event.target.closest("video")) return;
        const touch = event.touches[0];
        touchStart.current = { x: touch.clientX, y: touch.clientY };
    }

    function handleTouchEnd(event) {
        if (!touchStart.current || event.changedTouches.length !== 1) return;
        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - touchStart.current.x;
        const deltaY = touch.clientY - touchStart.current.y;
        touchStart.current = null;

        if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return;
        goToSlide(activeIndex + (deltaX < 0 ? 1 : -1));
    }

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        function handleKeyDown(event) {
            if (event.key === "Escape") {
                onClose();
            } else if (hasCarousel && event.target?.tagName !== "VIDEO" && event.key === "ArrowLeft") {
                event.preventDefault();
                goToSlide(activeIndex - 1);
            } else if (hasCarousel && event.target?.tagName !== "VIDEO" && event.key === "ArrowRight") {
                event.preventDefault();
                goToSlide(activeIndex + 1);
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [activeIndex, goToSlide, hasCarousel, onClose]);

    return (
        <div className="portfolio-lightbox" onClick={onClose} role="presentation">
            <button type="button" className="portfolio-lightbox__close" onClick={onClose}
                aria-label="Закрыть просмотр">
                <span aria-hidden="true">×</span>
            </button>

            <div className="portfolio-lightbox__content" role="dialog" aria-modal="true"
                aria-label={"Просмотр медиа: " + title}
                onClick={(event) => event.stopPropagation()}>
                <div className="portfolio-lightbox__stage" onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd} onTouchCancel={() => { touchStart.current = null; }}>
                    {activeMedia.type === "VIDEO" ? (
                        <video className="portfolio-lightbox__video" controls playsInline preload="metadata"
                            poster={activeMedia.posterUrl || undefined}
                            aria-label={title + " — видео " + (activeIndex + 1)}>
                            <source src={activeMedia.url} />
                            Ваш браузер не поддерживает воспроизведение видео.
                        </video>
                    ) : (
                        <img className="portfolio-lightbox__image" src={activeMedia.url}
                            alt={activeMedia.altText || alt || (title + " — полноэкранный просмотр")} />
                    )}
                </div>

                <div className="portfolio-lightbox__caption">
                    <span>{title}</span>
                    <span>{hasCarousel
                        ? String(activeIndex + 1).padStart(2, "0") + " / " + String(slides.length).padStart(2, "0")
                        : id + " / " + total}</span>
                </div>

                {hasCarousel && (
                    <div className="portfolio-lightbox__pagination" role="group"
                        aria-label={title + ": выбрать медиа"}>
                        {slides.map((slide, index) => (
                            <button type="button" key={slide.id ?? index}
                                className={"portfolio-carousel__dot" + (index === activeIndex ? " is-active" : "")}
                                onClick={() => goToSlide(index)}
                                aria-label={"Слайд " + (index + 1) + (slide.type === "VIDEO" ? ", видео" : ", фото")}
                                aria-current={index === activeIndex ? "true" : undefined} />
                        ))}
                    </div>
                )}
            </div>

            {hasCarousel && (
                <>
                    <button type="button"
                        className="portfolio-lightbox__arrow portfolio-lightbox__arrow--previous"
                        onClick={(event) => { event.stopPropagation(); goToSlide(activeIndex - 1); }}
                        aria-label="Предыдущее медиа">
                        <span aria-hidden="true">‹</span>
                    </button>
                    <button type="button"
                        className="portfolio-lightbox__arrow portfolio-lightbox__arrow--next"
                        onClick={(event) => { event.stopPropagation(); goToSlide(activeIndex + 1); }}
                        aria-label="Следующее медиа">
                        <span aria-hidden="true">›</span>
                    </button>
                </>
            )}
        </div>
    );
}
