import type { PageName } from "../../types/page";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

export default function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav>
      <a href="#" aria-current={current === "home" ? "page" : undefined} onClick={(e) => { e.preventDefault(); onNavigate("home"); }}>Ana Sayfa</a>
      <a href="#" aria-current={current === "events" ? "page" : undefined} onClick={(e) => { e.preventDefault(); onNavigate("events"); }}>Etkinlikler</a>
      <a href="#" aria-current={current === "add" ? "page" : undefined} onClick={(e) => { e.preventDefault(); onNavigate("add"); }}>Ekle</a>
    </nav>
  );
}