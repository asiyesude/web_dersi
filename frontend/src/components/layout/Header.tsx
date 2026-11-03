import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  let title = "Kampüs Etkinlikleri";
  let subtitle = "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.";

  if (location.pathname === "/events") {
    title = "Tüm Etkinlikler";
    subtitle = "Ekim ayında kampüste düzenlenen etkinlikler.";
  } else if (location.pathname.startsWith("/admin")) {
    title = "Etkinlik Yönetimi";
    subtitle = "";
  } else if (location.pathname === "/login" || location.pathname === "/forgot-password") {
    title = "Giriş Yap";
    subtitle = "";
  } else if (location.pathname === "/register") {
    title = "Kayıt Ol";
    subtitle = "";
  }

  return (
    <header>
      <div className="header-icerik">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </header>
  );
}