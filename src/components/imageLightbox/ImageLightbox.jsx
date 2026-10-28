import { useEffect } from "react";

export default function ImageLightbox({ image, title, alt, id, total, onClose }) {
    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        function handleKeyDown(event) {
            if (event.key === "Escape") {
                onClose();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    return (
        <div
            className="portfolio-lightbox"
            onClick={onClose}
            role="presentation"
        >
            <button
                type="button"
                className="portfolio-lightbox__close"
                onClick={onClose}
                aria-label="Закрыть изображение"
            >
                <span aria-hidden="true">×</span>
            </button>

            <div
                className="portfolio-lightbox__content"
                role="dialog"
                aria-modal="true"
                aria-label={`Просмотр изображения: ${title}`}
                onClick={(event) => event.stopPropagation()}
            >
                <img
                    className="portfolio-lightbox__image"
                    src={image}
                    alt={alt || `${title} — полноэкранный просмотр`}
                />

                <div className="portfolio-lightbox__caption">
                    <span>{title}</span>
                    <span>{id} / {total}</span>
                </div>
            </div>
        </div>
    );
}
