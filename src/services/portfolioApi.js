const API_BASE_URL = (
    // process.env.REACT_APP_API_BASE_URL || "http://localhost:8080"
    process.env.REACT_APP_API_BASE_URL || "https://api.azem-smm.site"
).replace(/\/$/, "");

export async function getPortfolio(path = "/api/v1/portfolio") {
    const response = await fetch(`${API_BASE_URL}${path}`);

    if (!response.ok) {
        throw new Error(`Не удалось загрузить работы (HTTP ${response.status})`);
    }

    return response.json();
}

export function getMediaUrl(path) {
    if (!path) return "";
    if (/^https?:\/\//i.test(path)) return path;
    return new URL(path, `${API_BASE_URL}/`).toString();
}
