
import "./Photography.css";

const galleryItems = [
    {
        id: "01",
        category: "PRODUCT PHOTOGRAPHY",
        title: "Details that matter.",
        className: "photography__item--large",
        image: null,
        tone: "rose",
    },
    {
        id: "02",
        category: "CREATIVE DIRECTION",
        title: "A visual story.",
        className: "",
        image: null,
        tone: "sand",
    },
    {
        id: "03",
        category: "BEHIND THE SCENES",
        title: "The process.",
        className: "",
        image: null,
        tone: "dark",
    },
    {
        id: "04",
        category: "CONTENT PRODUCTION",
        title: "Made for the feed.",
        className: "photography__item--wide",
        image: null,
        tone: "light",
    },
];

function GalleryItem({ item }) {
    return (
        <article
            className={`photography__item ${item.className}`}
        >
            <div
                className={`photography__visual photography__visual--${item.tone}`}
            >
                {item.image ? (
                    <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                    />
                ) : (
                    <div className="photography__placeholder">
            <span className="photography__placeholder-mark">
              AZ.
            </span>
                        <span className="photography__placeholder-label">
              ADD YOUR PHOTO
            </span>
                    </div>
                )}

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
                    <GalleryItem item={item} key={item.id} />
                ))}
            </div>

            <div className="photography__footer">
                <span>OBSERVE. CREATE. TELL A STORY.</span>

                <a href="#contact">
                    СОЗДАТЬ ЧТО-ТО ВМЕСТЕ <span>↗</span>
                </a>
            </div>
        </section>
    );
}
