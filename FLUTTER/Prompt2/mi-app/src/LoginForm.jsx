import React, { useState } from "react";
import "./LoginForm.css";

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });

  const emailError =
    touched.email && !validateEmail(email)
      ? "Introduce un email válido."
      : "";
  const passwordError =
    touched.password && password.length < 8
      ? "La contraseña debe tener al menos 8 caracteres."
      : "";

  const isFormValid = validateEmail(email) && password.length >= 8;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("¡Bienvenido a EVIL!");
  };

  return (
    <div className="evil-login-bg">
      <form
        className="evil-login-form"
        onSubmit={handleSubmit}
        aria-label="Formulario de inicio de sesión para EVIL"
      >
        <div className="evil-title">EVIL</div>
        <label htmlFor="email" className="evil-label">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="evil-input"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, email: true }))}
          aria-invalid={!!emailError}
          aria-describedby="email-error"
        />
        {emailError && (
          <div
            id="email-error"
            className="evil-error"
            role="alert"
          >
            {emailError}
          </div>
        )}
        <label htmlFor="password" className="evil-label">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          className="evil-input"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onBlur={() => setTouched(t => ({ ...t, password: true }))}
          aria-invalid={!!passwordError}
          aria-describedby="password-error"
        />
        {passwordError && (
          <div
            id="password-error"
            className="evil-error"
            role="alert"
          >
            {passwordError}
          </div>
        )}
        <button
          type="submit"
          className="evil-btn"
          disabled={!isFormValid}
          aria-disabled={!isFormValid}
        >
          Iniciar sesión
        </button>
        <div className="evil-footer">
          ¡Prepárate para la aventura en EVIL!
        </div>
      </form>
    </div>
  );
}