import "./ErrorState.css";

export default function ErrorState() {
    return (
        <div className="error-state" role="alert">
            <span className="error-state__mark" aria-hidden="true">!</span>
            <div className="error-state__copy">
                <span className="error-state__eyebrow">УЖЕ РАБОТАЕМ НАД ЭТИМ</span>
                <h2>Ой, что-то пошло не так.</h2>
                <p>Мы уже исправляем. Попробуйте заглянуть сюда чуть позже.</p>
            </div>
            <span className="error-state__spark" aria-hidden="true">✳</span>
        </div>
    );
}
