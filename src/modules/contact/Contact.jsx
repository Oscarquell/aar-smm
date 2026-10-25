
import "./Contact.css";

const contacts = [
    {
        label: "INSTAGRAM",
        value: "@yourusername",
        href: null,
    },
    {
        label: "TELEGRAM",
        value: "Написать мне",
        href: null,
    },
    {
        label: "WHATSAPP",
        value: "Обсудить проект",
        href: null,
    },
];

export default function Contact() {
    return (
        <section className="contact" id="contact">
            <div className="contact__top">
        <span className="contact__eyebrow">
          HAVE A PROJECT IN MIND?
        </span>

                <span className="contact__number">07 / 07</span>
            </div>

            <div className="contact__main">
                <h2 className="contact__title">
                    LET’S MAKE
                    <br />
                    SOMETHING
                    <br />
                    <span>MATTER.</span>
                </h2>

                <div className="contact__message">
                    <span className="contact__asterisk">✳</span>

                    <p>
                        Создадим визуал, который привлекает внимание,
                        передаёт характер бренда и помогает ему расти.
                    </p>

                    <p className="contact__invitation">
                        Открыта к интересным проектам и сотрудничеству.
                    </p>
                </div>
            </div>

            <div className="contact__bottom">
                <div className="contact__links">
                    {contacts.map((item) => (
                        <div className="contact__link-item" key={item.label}>
              <span className="contact__link-label">
                {item.label}
              </span>

                            {item.href ? (
                                <a
                                    className="contact__link-value"
                                    href={item.href}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {item.value}
                                    <span aria-hidden="true"> ↗</span>
                                </a>
                            ) : (
                                <span className="contact__link-value contact__link-value--placeholder">
                  {item.value}
                </span>
                            )}
                        </div>
                    ))}
                </div>

                <a className="contact__back-to-top" href="#home">
                    BACK TO TOP ↑
                </a>
            </div>

            <div className="contact__footer">
                <span>AZEM — SMM & VISUAL CONTENT</span>
                <span>MADE WITH INTENTION © 2026</span>
            </div>
        </section>
    );
}
