import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = email.includes("@") ? "" : "Geçerli bir e-posta girin.";
    setError(found);
    setSent(found === "");
  }

  return (
    <div style={{ marginTop: "30px" }}> {/* h2 başlığını sildik */}
      <p style={{ marginBottom: "1rem", color: "#666" }}>
        Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.
      </p>

      {sent && (
        <p className="mesaj mesaj-basari" style={{ padding: "15px", background: "#e8f5e9", color: "#2e7d32", border: "1px solid #c8e6c9", borderRadius: "8px", marginBottom: "15px" }}>
          Bağlantı {email} adresine gönderildi (demo).
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>E-posta</label>
          <input
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            aria-invalid={error ? true : undefined}
          />
          {error && <span className="hata-metni">{error}</span>}
        </div>
        <button type="submit" className="buton">Bağlantı gönder</button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <Link to="/login">&larr; Girişe dön</Link>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;