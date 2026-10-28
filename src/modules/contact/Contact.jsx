
import "./Contact.css";

const contacts = [
    {
        label: "TELEGRAM",
        value: "@sonder777aar",
        href: "https://t.me/sonder777aar",
        hint: "Открыть чат в Telegram",
    },
    {
        label: "WHATSAPP",
        value: "+996 509 38 57 77",
        href: "https://wa.me/996509385777",
        hint: "Написать в WhatsApp",
    },
    {
        label: "ТЕЛЕФОН",
        value: "+996 509 385 777",
        href: "tel:+996509385777",
        hint: "Позвонить",
    },
];

export default function Contact({ sectionNumber = "05 / 05" }) {
    return (
        <section className="contact" id="contact">
            <div className="contact__top">
        <span className="contact__eyebrow">
          HAVE A PROJECT IN MIND?
        </span>

                <span className="contact__number">{sectionNumber}</span>
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
                        Обсудим задачу, подберём формат работы и наметим
                        первые шаги для вашего бренда.
                    </p>

                    <p className="contact__invitation">
                        SMM · таргетированная реклама · контент под ключ
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
                                    target={item.label === "ТЕЛЕФОН" ? undefined : "_blank"}
                                    rel={item.label === "ТЕЛЕФОН" ? undefined : "noreferrer"}
                                    aria-label={`${item.hint}: ${item.value}`}
                                >
                                    {item.value}
                                    <span className="contact__link-action" aria-hidden="true">
                                        ↗
                                    </span>
                                </a>
                            ) : (
                                <span className="contact__link-value contact__link-value--placeholder">
                  {item.value}
                </span>
                            )}
                        </div>
                    ))}
                    {contacts.length === 0 && (
                        <div className="contact__link-item contact__link-item--note">
                            <span className="contact__link-label">СЛЕДУЮЩИЙ ШАГ</span>
                            <span className="contact__link-value">Выберите удобный канал связи</span>
                        </div>
                    )}
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
