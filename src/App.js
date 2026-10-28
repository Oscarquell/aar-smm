
import Home from "./pages/home/Home";
import PortfolioPage from "./pages/portfolio/PortfolioPage";
import AdminPage from "./pages/admin/AdminPage";
import "./App.css";

export default function App() {
    const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
    if (pathname === "/admin") return <AdminPage />;
    return pathname === "/portfolio" ? <PortfolioPage /> : <Home />;
}
