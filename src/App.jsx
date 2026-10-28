import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import GetInvolved from "./pages/GetInvolved";
import Donate from "./pages/Donate";
import Gallery from "./pages/Gallery";
import News from "./pages/News";
import Contact from "./pages/Contact";
import Patients from "./pages/Patients";
import Admin from "./admin/Admin";

const ROUTES = {
  "/": Home,
  "/about": About,
  "/services": Services,
  "/patients": Patients,
  "/get-involved": GetInvolved,
  "/donate": Donate,
  "/gallery": Gallery,
  "/news": News,
  "/contact": Contact,
  "/donate":Donate
};

function getCurrentPath() {
  const pathname = window.location.pathname.replace(/\/$/, "") || "/";
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return "/admin";
  if (pathname !== "/") return pathname;
  const hash = window.location.hash.replace(/^#/, "");
  return hash || "/";
}

function setRobotsMeta(isAdmin) {
  let meta = document.querySelector('meta[name="robots"]');
  if (isAdmin && !meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "robots");
    document.head.appendChild(meta);
  }
  if (meta && isAdmin)
    meta.setAttribute("content", "noindex, nofollow, noarchive");
  if (meta && !isAdmin) meta.remove();
}

function App() {
  const [path, setPath] = useState(getCurrentPath);

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(getCurrentPath());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", handleLocationChange);
    window.addEventListener("popstate", handleLocationChange);
    return () => {
      window.removeEventListener("hashchange", handleLocationChange);
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  useEffect(() => {
    const isAdmin = path === "/admin";
    setRobotsMeta(isAdmin);
    if (isAdmin)
      document.title = "Admin Sign In | Shri Kanchan Dialysis Centre";
    else
      document.title =
        "Shri Kanchan Dialysis Centre | Patient-first dialysis care";
  }, [path]);

  if (path === "/admin") return <Admin />;
  const PageComponent = ROUTES[path] || Home;
  return (
    <>
      <Navbar currentPath={path} />
      <PageComponent />
      <Footer />
    </>
  );
}

export default App;
