import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found: { email?: string; password?: string } = {};
    
    if (!email.includes("@")) {
      found.email = "Geçerli bir e-posta girin.";
    }
    if (password.length < 6) {
      found.password = "Şifre en az 6 karakter olmalı.";
    }
    
    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <div style={{ marginTop: "30px" }}> {/* h2'yi sildik, yerine form için boşluk verdik */}
      {sent ? (
        <div style={{ padding: "20px", background: "#e8f5e9", color: "#2e7d32", borderRadius: "8px" }}>
          Gerçek giriş Sprint 10'da yapılacak. (Form geçerli!)
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="email">E-posta</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              aria-invalid={errors.email ? true : undefined}
            />
            {errors.email && <span className="hata-metni">{errors.email}</span>}
          </div>

          <div>
            <label htmlFor="password">Şifre</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              aria-invalid={errors.password ? true : undefined}
            />
            {errors.password && <span className="hata-metni">{errors.password}</span>}
          </div>

          <button type="submit" className="buton">Giriş yap</button>
        </form>
      )}

      <div style={{ marginTop: "20px", display: "flex", gap: "15px" }}>
        <Link to="/forgot-password">Şifremi unuttum</Link>
        <Link to="/register">Hesabın yok mu? Kayıt ol</Link>
      </div>
    </div>
  );
}

export default LoginPage;