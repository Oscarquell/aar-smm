
import { useState } from "react";
import ImageLightbox from "../../components/imageLightbox/ImageLightbox";
import "./Photography.css";
import auraHome from "../../assets/projects/aura.homekgz.jpg";
import onStudy from "../../assets/projects/onstudy.prep.jpg";
import buketto from "../../assets/projects/buketto.jpg";
import baipak from "../../assets/projects/baipak.jpg";

const galleryItems = [
    {
        id: "01",
        category: "PRODUCT PHOTOGRAPHY",
        title: "Details that matter.",
        className: "photography__item--large",
        image: auraHome,
        tone: "rose",
    },
    {
        id: "02",
        category: "CREATIVE DIRECTION",
        title: "A visual story.",
        className: "",
        image: onStudy,
        tone: "sand",
    },
    {
        id: "03",
        category: "BEHIND THE SCENES",
        title: "The process.",
        className: "",
        image: buketto,
        tone: "dark",
    },
    {
        id: "04",
        category: "CONTENT PRODUCTION",
        title: "Made for the feed.",
        className: "photography__item--wide",
        image: baipak,
        tone: "light",
    },
];

function GalleryItem({ item, onOpen }) {
    return (
        <article
            className={`photography__item ${item.className}`}
        >
            <div
                className={`photography__visual photography__visual--${item.tone}`}
            >
                {item.image ? (
                    <>
                        <button
                            type="button"
                            className="portfolio-card__image-button"
                            onClick={() => onOpen(item)}
                            aria-label={`Открыть изображение: ${item.title}`}
                        >
                            <img
                                src={item.image}
                                alt={`${item.title} — пример контента для социальных сетей`}
                                loading="lazy"
                            />
                            <span className="portfolio-card__zoom" aria-hidden="true">⤢</span>
                        </button>
                    </>
                ) : null}

                <span className="photography__index">
          {item.id}
        </span>
            </div>

            <div className="photography__caption">
                <div>
          <span className="photography__category">
            {item.category}
          </span>

                    <h3>{item.title}</h3>
                </div>

                <span className="photography__arrow" aria-hidden="true">
          ↗
        </span>
            </div>
        </article>
    );
}

export default function Photography() {
    const [activeImage, setActiveImage] = useState(null);

    return (
        <section className="photography" id="photography">
            <div className="photography__header">
        <span className="photography__eyebrow">
          05 / VISUAL DIARY
        </span>

                <span className="photography__header-note">
          PHOTOGRAPHY · CONTENT · DETAILS
        </span>
            </div>

            <div className="photography__intro">
                <div>
          <span className="photography__overline">
            THROUGH MY LENS
          </span>

                    <h2 className="photography__title">
                        THE ART OF
                        <br />
                        VISUALS<span>.</span>
                    </h2>
                </div>

                <p className="photography__description">
                    Визуальный контент — это способ передать
                    характер бренда без лишних слов. Здесь
                    собраны моменты, детали и идеи, из которых
                    складывается визуальная история.
                </p>
            </div>

            <div className="photography__grid">
                {galleryItems.map((item) => (
                    <GalleryItem item={item} onOpen={setActiveImage} key={item.id} />
                ))}
            </div>

            <div className="photography__footer">
                <span>OBSERVE. CREATE. TELL A STORY.</span>

                <a href="#contact">
                    СОЗДАТЬ ЧТО-ТО ВМЕСТЕ <span>↗</span>
                </a>
            </div>

            {activeImage && (
                <ImageLightbox
                    image={activeImage.image}
                    title={activeImage.title}
                    alt={`${activeImage.title} — пример контента для социальных сетей`}
                    id={activeImage.id}
                    total={String(galleryItems.length).padStart(2, "0")}
                    onClose={() => setActiveImage(null)}
                />
            )}
        </section>
    );
}
