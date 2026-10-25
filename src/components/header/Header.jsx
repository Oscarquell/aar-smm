
import { useState } from "react";
import "./Header.css";

const navLinks = [
    { label: "ОБО МНЕ", href: "#about" },
    { label: "МОИ РАБОТЫ", href: "#portfolio" },
    { label: "КЕЙСЫ", href: "#cases" },
    { label: "КОНТАКТЫ", href: "#contact" },
];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="header">
            <div className="header__inner">
                <a
                    className="header__logo"
                    href="#home"
                    onClick={closeMenu}
                    aria-label="Азем — на главную"
                >
                    AZEM<span>.</span>
                </a>

                <nav
                    className={`header__nav ${menuOpen ? "header__nav--open" : ""}`}
                    id="main-navigation"
                    aria-label="Главная навигация"
                >
                    {navLinks.map((link) => (
                        <a
                            className="header__link"
                            href={link.href}
                            key={link.href}
                            onClick={closeMenu}
                        >
                            {link.label}
                        </a>
                    ))}

                    <a
                        className="header__mobile-cta"
                        href="#contact"
                        onClick={closeMenu}
                    >
                        ОБСУДИТЬ ПРОЕКТ ↗
                    </a>
                </nav>

                <a className="header__cta" href="#contact">
                    ОБСУДИТЬ ПРОЕКТ <span>↗</span>
                </a>

                <button
                    className={`header__menu-button ${
                        menuOpen ? "header__menu-button--open" : ""
                    }`}
                    type="button"
                    aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
                    aria-expanded={menuOpen}
                    aria-controls="main-navigation"
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    <span />
                    <span />
                </button>
            </div>
        </header>
    );
}
