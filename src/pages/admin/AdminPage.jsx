import { useCallback, useEffect, useMemo, useState } from "react";
import { getMediaUrl } from "../../services/portfolioApi";
import "./AdminPage.css";

const API_BASE_URL = (process.env.REACT_APP_API_BASE_URL || "http://localhost:8080").replace(/\/$/, "");
const EMPTY_FORM = {
    type: "PROJECT",
    slug: "",
    title: "",
    category: "",
    description: "",
    serviceTags: "",
    externalUrl: "",
    featuredOnHome: false,
    published: false,
    sortOrder: 0,
};

function makeAuthorization(username, password) {
    const bytes = new TextEncoder().encode(`${username}:${password}`);
    let binary = "";
    bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
    return `Basic ${window.btoa(binary)}`;
}

function itemToForm(item) {
    return {
        type: item.type || "PROJECT",
        slug: item.slug || "",
        title: item.title || "",
        category: item.category || "",
        description: item.description || "",
        serviceTags: (item.serviceTags || []).join(", "),
        externalUrl: item.externalUrl || "",
        featuredOnHome: Boolean(item.featuredOnHome),
        published: Boolean(item.published),
        sortOrder: item.sortOrder ?? 0,
    };
}

function ErrorMessage({ children }) {
    return children ? <p className="admin-notice admin-notice--error" role="alert">{children}</p> : null;
}

export default function AdminPage() {
    const [authorization, setAuthorization] = useState(() => sessionStorage.getItem("azem-admin-auth") || "");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [items, setItems] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [upload, setUpload] = useState({ file: null, altText: "", sortOrder: 0 });
    const [loading, setLoading] = useState(Boolean(authorization));
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");

    useEffect(() => {
        document.title = "Управление портфолио — AZEM.";
        const robots = document.querySelector('meta[name="robots"]');
        if (robots) robots.setAttribute("content", "noindex, nofollow, noarchive");
        return () => {
            document.title = "SMM, таргет и создание контента в Бишкеке — Азем";
            if (robots) robots.setAttribute("content", "index, follow, max-image-preview:large");
        };
    }, []);

    const selectedItem = useMemo(
        () => items.find((item) => item.id === selectedId) || null,
        [items, selectedId]
    );

    const request = useCallback(async (path, options = {}) => {
        const response = await fetch(`${API_BASE_URL}${path}`, {
            ...options,
            headers: {
                Authorization: authorization,
                ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
                ...options.headers,
            },
        });
        if (response.status === 401 || response.status === 403) {
            sessionStorage.removeItem("azem-admin-auth");
            setAuthorization("");
            throw new Error("Доступ не подтверждён. Проверьте имя пользователя и пароль.");
        }
        if (!response.ok) {
            const body = await response.json().catch(() => null);
            throw new Error(body?.detail || body?.message || `Запрос не выполнен (HTTP ${response.status})`);
        }
        if (response.status === 204) return null;
        return response.json();
    }, [authorization]);

    const refreshItems = useCallback(async (preferredId = selectedId) => {
        const data = await request("/api/v1/admin/portfolio");
        setItems(data);
        const nextId = data.some((item) => item.id === preferredId) ? preferredId : (data[0]?.id ?? null);
        setSelectedId(nextId);
        const nextItem = data.find((item) => item.id === nextId);
        setForm(nextItem ? itemToForm(nextItem) : EMPTY_FORM);
    }, [request, selectedId]);

    useEffect(() => {
        if (!authorization) {
            setLoading(false);
            return undefined;
        }
        let active = true;
        setLoading(true);
        request("/api/v1/admin/portfolio")
            .then((data) => {
                if (!active) return;
                setItems(data);
                setSelectedId(data[0]?.id ?? null);
                setForm(data[0] ? itemToForm(data[0]) : EMPTY_FORM);
                setError("");
            })
            .catch((requestError) => { if (active) setError(requestError.message); })
            .finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, [authorization, request]);

    function beginNew() {
        setSelectedId(null);
        setForm(EMPTY_FORM);
        setNotice("");
        setError("");
    }

    function selectItem(item) {
        setSelectedId(item.id);
        setForm(itemToForm(item));
        setNotice("");
        setError("");
    }

    async function handleLogin(event) {
        event.preventDefault();
        setLoading(true);
        setError("");
        const nextAuthorization = makeAuthorization(username.trim(), password);
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/admin/portfolio`, {
                headers: { Authorization: nextAuthorization },
            });
            if (!response.ok) throw new Error(response.status === 401 || response.status === 403
                ? "Неверное имя пользователя или пароль."
                : `Backend ответил с ошибкой (HTTP ${response.status}).`);
            sessionStorage.setItem("azem-admin-auth", nextAuthorization);
            setItems(await response.json());
            setSelectedId(null);
            setForm(EMPTY_FORM);
            setAuthorization(nextAuthorization);
        } catch (loginError) {
            setError(loginError.message || "Не удалось подключиться к backend.");
        } finally {
            setLoading(false);
        }
    }

    async function handleSave(event) {
        event.preventDefault();
        setSaving(true);
        setError("");
        setNotice("");
        const payload = {
            ...form,
            externalUrl: form.externalUrl.trim() || null,
            sortOrder: Number(form.sortOrder),
            serviceTags: form.serviceTags.split(",").map((tag) => tag.trim()).filter(Boolean),
        };
        try {
            const saved = await request(
                selectedId ? `/api/v1/admin/portfolio/${selectedId}` : "/api/v1/admin/portfolio",
                { method: selectedId ? "PUT" : "POST", body: JSON.stringify(payload) }
            );
            await refreshItems(saved.id);
            setNotice(selectedId ? "Изменения сохранены." : "Работа добавлена.");
        } catch (saveError) {
            setError(saveError.message || "Не удалось сохранить работу.");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete() {
        if (!selectedItem || !window.confirm(`Удалить работу «${selectedItem.title}» и все её медиафайлы?`)) return;
        setSaving(true);
        setError("");
        try {
            await request(`/api/v1/admin/portfolio/${selectedItem.id}`, { method: "DELETE" });
            await refreshItems(null);
            setNotice("Работа удалена.");
        } catch (deleteError) {
            setError(deleteError.message || "Не удалось удалить работу.");
        } finally {
            setSaving(false);
        }
    }

    async function handleUpload(event) {
        event.preventDefault();
        if (!selectedItem || !upload.file) return;
        setSaving(true);
        setError("");
        setNotice("");
        const data = new FormData();
        data.append("file", upload.file);
        data.append("altText", upload.altText);
        data.append("sortOrder", String(upload.sortOrder));
        try {
            await request(`/api/v1/admin/portfolio/${selectedItem.id}/media`, { method: "POST", body: data });
            await refreshItems(selectedItem.id);
            setUpload({ file: null, altText: "", sortOrder: 0 });
            event.target.reset();
            setNotice("Файл добавлен в работу.");
        } catch (uploadError) {
            setError(uploadError.message || "Не удалось загрузить файл.");
        } finally {
            setSaving(false);
        }
    }

    async function updateMedia(media, values) {
        setSaving(true);
        setError("");
        try {
            await request(`/api/v1/admin/portfolio/${selectedItem.id}/media/${media.id}`, {
                method: "PUT",
                body: JSON.stringify({ ...values, sortOrder: Number(values.sortOrder) }),
            });
            await refreshItems(selectedItem.id);
            setNotice("Параметры медиа сохранены.");
        } catch (mediaError) {
            setError(mediaError.message || "Не удалось сохранить медиа.");
        } finally {
            setSaving(false);
        }
    }

    async function deleteMedia(media) {
        if (!window.confirm("Удалить этот файл из работы?")) return;
        setSaving(true);
        setError("");
        try {
            await request(`/api/v1/admin/portfolio/${selectedItem.id}/media/${media.id}`, { method: "DELETE" });
            await refreshItems(selectedItem.id);
            setNotice("Файл удалён.");
        } catch (mediaError) {
            setError(mediaError.message || "Не удалось удалить файл.");
        } finally {
            setSaving(false);
        }
    }

    function logout() {
        sessionStorage.removeItem("azem-admin-auth");
        setAuthorization("");
        setItems([]);
        setSelectedId(null);
        setForm(EMPTY_FORM);
        setError("");
        setNotice("");
    }

    if (!authorization) {
        return (
            <main className="admin-login-shell">
                <form className="admin-login" onSubmit={handleLogin}>
                    <a className="admin-brand" href="/" aria-label="AZEM, на главную">AZEM<span>.</span></a>
                    <span className="admin-kicker">ПРОСТРАНСТВО АЗЕМ</span>
                    <h1>Управление<br />портфолио<span>.</span></h1>
                    <p>Войдите, чтобы редактировать проекты, кейсы и медиа на сайте.</p>
                    <label>Имя пользователя<input autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} required /></label>
                    <label>Пароль<input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
                    <ErrorMessage>{error}</ErrorMessage>
                    <button className="admin-primary-button" type="submit" disabled={loading}>{loading ? "ПРОВЕРЯЮ ДОСТУП…" : "ВОЙТИ В ПАНЕЛЬ"}<span>↗</span></button>
                    <a className="admin-back-link" href="/">← Вернуться на сайт</a>
                </form>
            </main>
        );
    }

    return (
        <main className="admin-shell">
            <header className="admin-topbar">
                <a className="admin-brand" href="/" aria-label="AZEM, на главную">AZEM<span>.</span></a>
                <div className="admin-topbar__right"><span><i />ПАНЕЛЬ УПРАВЛЕНИЯ</span><a href="/" target="_blank" rel="noreferrer">ОТКРЫТЬ САЙТ ↗</a><button type="button" onClick={logout}>ВЫЙТИ</button></div>
            </header>
            <div className="admin-workspace">
                <aside className="admin-sidebar">
                    <div className="admin-sidebar__heading"><span className="admin-kicker">СОДЕРЖИМОЕ</span><button type="button" onClick={beginNew} aria-label="Добавить работу">＋</button></div>
                    <p className="admin-sidebar__count">{items.length} {items.length === 1 ? "РАБОТА" : "РАБОТ"}</p>
                    {loading ? <p className="admin-sidebar__empty">Загружаю…</p> : items.map((item, index) => (
                        <button type="button" key={item.id} className={`admin-item-link${selectedId === item.id ? " is-active" : ""}`} onClick={() => selectItem(item)}>
                            <span className="admin-item-link__number">{String(index + 1).padStart(2, "0")}</span>
                            <span className="admin-item-link__text"><strong>{item.title}</strong><small>{item.type === "CASE_STUDY" ? "КЕЙС" : "ПРОЕКТ"} · {item.published ? "ОПУБЛИКОВАНО" : "ЧЕРНОВИК"}</small></span>
                            <span className="admin-item-link__arrow">↗</span>
                        </button>
                    ))}
                    {!loading && !items.length && <p className="admin-sidebar__empty">Список пока пуст. Создайте первую работу.</p>}
                    <button className="admin-add-button" type="button" onClick={beginNew}>＋ <span>ДОБАВИТЬ РАБОТУ</span></button>
                </aside>

                <section className="admin-editor">
                    <div className="admin-editor__heading">
                        <div><span className="admin-kicker">{selectedItem ? `РЕДАКТИРОВАНИЕ · ${String(selectedId).padStart(2, "0")}` : "НОВЫЙ МАТЕРИАЛ"}</span><h1>{selectedItem ? selectedItem.title : "Новая работа"}<span>.</span></h1></div>
                        {selectedItem && <button type="button" className="admin-delete-button" onClick={handleDelete} disabled={saving}>УДАЛИТЬ РАБОТУ</button>}
                    </div>
                    <ErrorMessage>{error}</ErrorMessage>
                    {notice && <p className="admin-notice admin-notice--success" role="status">{notice}</p>}

                    <form className="admin-form" onSubmit={handleSave}>
                        <div className="admin-form__row admin-form__row--three">
                            <label>ТИП РАБОТЫ<select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value, featuredOnHome: event.target.value === "PROJECT" ? form.featuredOnHome : false })}><option value="PROJECT">Проект</option><option value="CASE_STUDY">Кейс</option></select></label>
                            <label>ПОРЯДОК<input type="number" min="0" value={form.sortOrder} onChange={(event) => setForm({ ...form, sortOrder: event.target.value })} /></label>
                            <label>SLUG<input value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-") })} placeholder="brand-project" required /></label>
                        </div>
                        <div className="admin-form__row admin-form__row--two">
                            <label>НАЗВАНИЕ<input maxLength="180" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required /></label>
                            <label>КАТЕГОРИЯ<input maxLength="180" value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} placeholder="SMM · Бишкек" required /></label>
                        </div>
                        <label>ОПИСАНИЕ<textarea maxLength="5000" rows="4" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} required /></label>
                        <label>УСЛУГИ <span className="admin-field-hint">через запятую</span><input value={form.serviceTags} onChange={(event) => setForm({ ...form, serviceTags: event.target.value })} placeholder="SMM, контент, таргет" required /></label>
                        <label>ССЫЛКА НА СТРАНИЦУ ПРОЕКТА <span className="admin-field-hint">Instagram, TikTok или сайт · необязательно</span><input type="url" maxLength="2048" value={form.externalUrl} onChange={(event) => setForm({ ...form, externalUrl: event.target.value })} placeholder="https://www.instagram.com/brand/" /></label>
                        <div className="admin-switches">
                            <label className="admin-switch"><input type="checkbox" checked={form.published} onChange={(event) => setForm({ ...form, published: event.target.checked })} /><span className="admin-switch__track" /><span><strong>Опубликовать</strong><small>Работа появится в публичном портфолио</small></span></label>
                            <label className={`admin-switch${form.type !== "PROJECT" ? " is-disabled" : ""}`}><input type="checkbox" checked={form.featuredOnHome} disabled={form.type !== "PROJECT"} onChange={(event) => setForm({ ...form, featuredOnHome: event.target.checked })} /><span className="admin-switch__track" /><span><strong>Показать на главной</strong><small>В избранное можно добавить не больше двух проектов</small></span></label>
                        </div>
                        <div className="admin-form__footer"><span>* Все поля с данными работы нужно заполнить</span><button className="admin-primary-button" type="submit" disabled={saving}>{saving ? "СОХРАНЯЮ…" : "СОХРАНИТЬ ИЗМЕНЕНИЯ"}<span>↗</span></button></div>
                    </form>

                    {selectedItem && <section className="admin-media-section">
                        <div className="admin-media-section__heading"><div><span className="admin-kicker">ГАЛЕРЕЯ РАБОТЫ</span><h2>Фото и видео <span>({selectedItem.media?.length || 0})</span></h2><p className="admin-field-hint">Меньший порядок показывается раньше. Первое медиа — превью карусели.</p></div><span className="admin-field-hint">JPG · PNG · WEBP · MP4 · WEBM / до 50 МБ</span></div>
                        <form className="admin-upload" onSubmit={handleUpload}>
                            <label className="admin-file-picker">{upload.file ? upload.file.name : "＋ ВЫБРАТЬ ФОТО ИЛИ ВИДЕО"}<input type="file" accept="image/jpeg,image/png,image/webp,video/mp4,video/webm" onChange={(event) => setUpload({ ...upload, file: event.target.files?.[0] || null })} /></label>
                            <input aria-label="Описание медиа" placeholder="Описание для доступности и SEO" value={upload.altText} onChange={(event) => setUpload({ ...upload, altText: event.target.value })} />
                            <button type="submit" disabled={saving || !upload.file}>ЗАГРУЗИТЬ ↗</button>
                        </form>
                        <div className="admin-media-grid">
                            {(selectedItem.media || []).map((media) => <MediaEditor key={media.id} media={media} disabled={saving} onSave={updateMedia} onDelete={deleteMedia} />)}
                            {!selectedItem.media?.length && <p className="admin-media-empty">Добавьте первое фото или видео — оно появится в карточке работы.</p>}
                        </div>
                    </section>}
                </section>
            </div>
        </main>
    );
}

function MediaEditor({ media, disabled, onSave, onDelete }) {
    const [altText, setAltText] = useState(media.altText || "");
    const [sortOrder, setSortOrder] = useState(media.sortOrder ?? 0);
    return (
        <article className="admin-media-card">
            {media.type === "VIDEO" ? <video src={getMediaUrl(media.url)} controls playsInline preload="metadata" /> : <img src={getMediaUrl(media.url)} alt={media.altText || "Изображение портфолио"} />}
            <label>ALT / ОПИСАНИЕ<input maxLength="300" value={altText} onChange={(event) => setAltText(event.target.value)} /></label>
            <div className="admin-media-card__actions"><label>ПОРЯДОК<input type="number" min="0" value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} /></label><button type="button" disabled={disabled} onClick={() => onSave(media, { altText, posterUrl: media.posterUrl || "", sortOrder })}>СОХРАНИТЬ</button><button type="button" className="admin-media-card__delete" disabled={disabled} onClick={() => onDelete(media)} aria-label="Удалить файл">×</button></div>
        </article>
    );
}
