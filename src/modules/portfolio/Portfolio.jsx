
import { useState } from "react";

import auraHomeKgz from "../../assets/projects/aura.homekgz.jpg";
import onStudyPrep from "../../assets/projects/onstudy.prep.jpg";
import buketo from "../../assets/projects/buketto.jpg";
import baipak from "../../assets/projects/baipak.jpg";
import ImageLightbox from "../../components/imageLightbox/ImageLightbox";

import "./Portfolio.css";

const projects = [
    {
        id: "01",
        category: "SOCIAL MEDIA",
        title: "Aura Home",
        description:
            "Визуальное оформление контента для бренда товаров для дома и аксессуаров. Работа с фактурами, деталями продукта, гармоничной цветовой палитрой и единой эстетикой Instagram.",
        services: [
            "VISUAL CONTENT",
            "PRODUCT STYLING",
            "INSTAGRAM",
            "REELS",
        ],
        image: auraHomeKgz,
        className: "portfolio-card--featured",
        featured: true,
    },
    {
        id: "02",
        category: "EDUCATION · CONTENT",
        title: "OnStudy Prep",
        description:
            "Экспертный контент о подготовке к IELTS и SAT, результатах учеников и образовательных продуктах.",
        services: ["CONTENT", "VISUAL DESIGN", "INSTAGRAM"],
        image: onStudyPrep,
        className: "",
    },
    {
        id: "03",
        category: "REELS & VIDEO",
        title: "Buketto Flowers",
        description:
            "Живой контент для цветочного бренда: от эстетики букетов и закулисья флористики до мероприятий и команды. Через Reels, динамичный монтаж и визуальный сторителлинг раскрывается атмосфера бренда, его продукты и люди за кадром.",
        services: [
            "REELS",
            "VIDEO EDITING",
            "PRODUCT CONTENT",
            "BRAND STORYTELLING",
        ],
        image: buketo,
        className: "",
    },
    {
        id: "04",
        category: "RETAIL · SMM CONTENT",
        title: "Baipak Kids",
        description:
            "Визуальный контент для магазина детских товаров: презентация ассортимента, акцент на качестве продукции и понятная коммуникация для родителей. Контент помогает раскрыть преимущества товаров, передать ценности бренда и сделать выбор для малышей проще.",
        services: [
            "PRODUCT CONTENT",
            "VISUAL DESIGN",
            "BRAND COMMUNICATION",
        ],
        image: baipak,
        className: "",
    },
];

function ProjectVisual({ image, title, id, onOpen }) {
    return (
        <div
            className={`portfolio-card__visual ${
                image
                    ? ""
                    : `portfolio-card__visual--placeholder portfolio-card__visual--${id}`
            }`}
        >
            {image ? (
                <button
                    type="button"
                    className="portfolio-card__image-button"
                    onClick={() => onOpen({ image, title, id })}
                    aria-label={`Открыть изображение проекта ${title}`}
                >
                    <img
                        src={image}
                        alt={`${title} — портфолио SMM-специалиста: визуальный контент и продвижение`}
                        loading="lazy"
                    />

                    <span className="portfolio-card__zoom" aria-hidden="true">
            ⤢
          </span>
                </button>
            ) : (
                <span className="portfolio-card__placeholder-label">
          PROJECT {id}
        </span>
            )}

            <span className="portfolio-card__visual-index">
        {id} / 04
      </span>
        </div>
    );
}

function ProjectServices({ services }) {
    return (
        <div className="portfolio-card__services">
            {services.map((service) => (
                <span key={service}>{service}</span>
            ))}
        </div>
    );
}

function FeaturedContent({ project }) {
    return (
        <>
            <p className="portfolio-card__lead">
                Красивый продукт заслуживает контента, который
                хочется рассматривать.
            </p>

            <p className="portfolio-card__description">
                В Aura Home акцент на деталях, фактурах, композиции
                и оттенках. Визуальная подача помогает раскрыть
                характер продукта и поддерживать целостный образ
                бренда в социальных сетях.
            </p>

            <div className="portfolio-card__approach">
        <span className="portfolio-card__approach-title">
          MY APPROACH
        </span>

                <div className="portfolio-card__approach-item">
                    <span>01</span>
                    <div>
                        <strong>VISUAL STORYTELLING</strong>
                        <p>
                            Передавать настроение бренда через детали
                            и предметную съёмку.
                        </p>
                    </div>
                </div>

                <div className="portfolio-card__approach-item">
                    <span>02</span>
                    <div>
                        <strong>CONTENT CREATION</strong>
                        <p>
                            Создавать визуальный контент, который
                            подчёркивает достоинства продукта.
                        </p>
                    </div>
                </div>

                <div className="portfolio-card__approach-item">
                    <span>03</span>
                    <div>
                        <strong>VISUAL CONSISTENCY</strong>
                        <p>
                            Поддерживать единую эстетику и узнаваемость
                            профиля.
                        </p>
                    </div>
                </div>
            </div>

            <ProjectServices services={project.services} />

            <a className="portfolio-card__cta" href="#contact">
                <span>LET’S GROW YOUR BRAND</span>
                <span aria-hidden="true">↗</span>
            </a>
        </>
    );
}

function StandardContent({ project }) {
    return (
        <>
            <p className="portfolio-card__description">
                {project.description}
            </p>

            <ProjectServices services={project.services} />
        </>
    );
}

export default function Portfolio() {
    const [activeImage, setActiveImage] = useState(null);

    const closeLightbox = () => {
        setActiveImage(null);
    };

    return (
        <section className="portfolio" id="portfolio">
            <div className="portfolio__header">
        <span className="portfolio__eyebrow">
          03 / МОИ РАБОТЫ
        </span>

                <span className="portfolio__header-note">
          СТРАТЕГИЯ · КОНТЕНТ · ВИЗУАЛ
        </span>
            </div>

            <div className="portfolio__intro">
                <div>
          <span className="portfolio__overline">
            SELECTED PROJECTS
          </span>

                    <h2 className="portfolio__title">
                        MY WORK
                        <br />
                        INCLUDES<span>.</span>
                    </h2>
                </div>

                <p className="portfolio__description">
                    Проекты в разных нишах: SMM-контент, визуальное оформление
                    Instagram, Reels и коммуникация бренда с аудиторией.
                    В каждом проекте — внимание к продукту, эстетике
                    и задачам бизнеса.
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
                            onOpen={setActiveImage}
                        />

                        <div className="portfolio-card__content">
                            <div className="portfolio-card__meta">
                                <span>{project.category}</span>
                                <span>{project.id}</span>
                            </div>

                            <h3>{project.title}</h3>

                            {project.featured ? (
                                <FeaturedContent project={project} />
                            ) : (
                                <StandardContent project={project} />
                            )}
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

            {activeImage && (
                <ImageLightbox
                    image={activeImage.image}
                    title={activeImage.title}
                    alt={`${activeImage.title} — портфолио SMM-специалиста`}
                    id={activeImage.id}
                    total={String(projects.length).padStart(2, "0")}
                    onClose={closeLightbox}
                />
            )}
        </section>
    );
}
