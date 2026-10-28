
import Header from "../../components/header/Header";
import Hero from "../../modules/hero/Hero";
import About from "../../modules/about/About";

import "./Home.css";
import Qualifications from "../../modules/qualifications/Qualifications";
import Portfolio from "../../modules/portfolio/Portfolio";
import CaseStudy from "../../modules/caseStudy/CaseStudy";
import Photography from "../../modules/photography/Photography";
import Contact from "../../modules/contact/Contact";

// const sections = [
//     {
//         id: "qualifications",
//         number: "02",
//         title: "QUALIFICATIONS",
//         variant: "burgundy",
//     },
//     {
//         id: "portfolio",
//         number: "03",
//         title: "MY WORK INCLUDES",
//         variant: "light",
//     },
//     {
//         id: "cases",
//         number: "04",
//         title: "CASE STUDY",
//         variant: "burgundy",
//     },
//     {
//         id: "photography",
//         number: "05",
//         title: "PHOTOGRAPHY",
//         variant: "light",
//     },
//     {
//         id: "contact",
//         number: "06",
//         title: "LET'S CONNECT",
//         variant: "burgundy",
//     },
// ];

export default function Home() {
    return (
        <>
            <Header />

            <main className="home">
                <Hero />

                <About />

                <Qualifications />

                <Portfolio />

                <CaseStudy />

                <Photography />

                <Contact />

              {/*  <div className="home__sections">*/}
              {/*      {sections.map((section) => (*/}
              {/*          <section*/}
              {/*              className={`home__section ${*/}
              {/*                  section.variant === "burgundy"*/}
              {/*                      ? "home__section--burgundy"*/}
              {/*                      : ""*/}
              {/*              }`}*/}
              {/*              id={section.id}*/}
              {/*              key={section.id}*/}
              {/*          >*/}
              {/*<span className="home__section-number">*/}
              {/*  {section.number} / PORTFOLIO*/}
              {/*</span>*/}

              {/*              <h2>{section.title}</h2>*/}

              {/*              <span className="home__section-note">*/}
              {/*  AZEM — SOCIAL MEDIA SPECIALIST*/}
              {/*</span>*/}
              {/*          </section>*/}
              {/*      ))}*/}
              {/*  </div>*/}
            </main>
        </>
    );
}
