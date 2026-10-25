
import "./Portfolio.css";

const projects = [
    {
        id: "01",
        category: "SOCIAL MEDIA",
        title: "Brand Identity",
        description:
            "Визуальная концепция, оформление профиля и единый стиль коммуникации бренда.",
        image: null,
        className: "portfolio-card--large",
    },
    {
        id: "02",
        category: "CONTENT CREATION",
        title: "Content Production",
        description:
            "Фото- и видеоконтент для социальных сетей: от идеи до готовой публикации.",
        image: null,
        className: "",
    },
    {
        id: "03",
        category: "REELS & VIDEO",
        title: "Short-form Content",
        description:
            "Вертикальные видео, сценарии и монтаж для привлечения внимания аудитории.",
        image: null,
        className: "",
    },
    {
        id: "04",
        category: "SMM STRATEGY",
        title: "Content Strategy",
        description:
            "Рубрикатор, контент-план и визуальное направление коммуникации.",
        image: null,
        className: "portfolio-card--wide",
    },
];

function ProjectVisual({ image, title, id }) {
    if (image) {
        return (
            <div className="portfolio-card__visual">
                <img src={image} alt={title} loading="lazy" />
                <span className="portfolio-card__visual-index">{id} / 04</span>
            </div>
        );
    }

    return (
        <div
            className={`portfolio-card__visual portfolio-card__visual--placeholder portfolio-card__visual--${id}`}
            aria-label={`Изображение проекта ${title}`}
        >
      <span className="portfolio-card__placeholder-label">
        PROJECT IMAGE
      </span>
            <span className="portfolio-card__visual-index">{id} / 04</span>
        </div>
    );
}

export default function Portfolio() {
    return (
        <section className="portfolio" id="portfolio">
            <div className="portfolio__header">
        <span className="portfolio__eyebrow">
          03 / SELECTED WORK
        </span>
                <span className="portfolio__header-note">
          STRATEGY · CONTENT · VISUALS
        </span>
            </div>

            <div className="portfolio__intro">
                <div>
          <span className="portfolio__overline">
            A SELECTION OF MY WORK
          </span>

                    <h2 className="portfolio__title">
                        MY WORK
                        <br />
                        INCLUDES<span>.</span>
                    </h2>
                </div>

                <p className="portfolio__description">
                    Каждый проект начинается с идеи и понимания бренда.
                    Здесь собраны направления моей работы с контентом,
                    визуальной идентичностью и SMM-коммуникацией.
                </p>
            </div>

            <div className="portfolio__grid">
                {projects.map((project) => (
                    <article
                        className={`portfolio-card ${project.className}`}
                        key={project.id}
                    >
                        <ProjectVisual
                            image={project.image}
                            title={project.title}
                            id={project.id}
                        />

                        <div className="portfolio-card__content">
                            <div className="portfolio-card__meta">
                                <span>{project.category}</span>
                                <span>{project.id}</span>
                            </div>

                            <h3>{project.title}</h3>

                            <p>{project.description}</p>
                        </div>
                    </article>
                ))}
            </div>

            <div className="portfolio__footer">
                <span>CREATED WITH PURPOSE.</span>
                <a href="#cases">
                    EXPLORE CASE STUDIES <span>↗</span>
                </a>
            </div>
        </section>
    );
}
