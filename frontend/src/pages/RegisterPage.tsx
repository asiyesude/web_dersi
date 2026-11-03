import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";

interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  password2?: string;
}

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found: RegisterErrors = {};

    if (name.trim().length < 3) found.name = "Ad soyad en az 3 karakter olmalı.";
    if (!email.includes("@")) found.email = "Geçerli bir e-posta girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    if (password2 !== password) found.password2 = "Şifreler aynı değil.";

    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <div style={{ marginTop: "30px" }}> {/* h2 başlığını sildik */}
      {sent ? (
        <div style={{ padding: "20px", background: "#e8f5e9", color: "#2e7d32", borderRadius: "8px" }}>
          Kayıt başarılı (demo). Gerçek kayıt Sprint 10'da.
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label>Ad Soyad</label>
            <input
              type="text"
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              aria-invalid={errors.name ? true : undefined}
            />
            {errors.name && <span className="hata-metni">{errors.name}</span>}
          </div>

          <div>
            <label>E-posta</label>
            <input
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              aria-invalid={errors.email ? true : undefined}
            />
            {errors.email && <span className="hata-metni">{errors.email}</span>}
          </div>

          <div>
            <label>Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              aria-invalid={errors.password ? true : undefined}
            />
            {errors.password && <span className="hata-metni">{errors.password}</span>}
          </div>

          <div>
            <label>Şifre (tekrar)</label>
            <input
              type="password"
              value={password2}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword2(e.target.value)}
              aria-invalid={errors.password2 ? true : undefined}
            />
            {errors.password2 && <span className="hata-metni">{errors.password2}</span>}
          </div>

          <button type="submit" className="buton">Kayıt Ol</button>
        </form>
      )}

      <div style={{ marginTop: "20px" }}>
        <Link to="/login">Zaten hesabın var mı? Giriş yap</Link>
      </div>
    </div>
  );
}

export default RegisterPage;