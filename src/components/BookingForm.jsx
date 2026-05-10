// src/components/BookingForm.jsx

import { useState } from "react";
import "../styles/BookingForm.css";

function BookingForm({ onSubmit, disabled }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Введіть ім'я";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Ім'я має бути не менше 2 символів";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Введіть номер телефону";
    } else if (!/^\+?[\d\s\-()]{10,15}$/.test(form.phone.trim())) {
      newErrors.phone = "Невірний формат телефону";
    }

    if (!form.email.trim()) {
      newErrors.email = "Введіть email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Невірний формат email";
    }

    return newErrors;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Прибираємо помилку поля при введенні
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(form);
    setForm({ name: "", phone: "", email: "" });
    setErrors({});
  }

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate>
      <h3 className="booking-form__title">Дані пасажира</h3>

      <div className="booking-form__field">
        <label className="booking-form__label" htmlFor="name">
          Ім'я та прізвище
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className={`booking-form__input ${errors.name ? "booking-form__input--error" : ""}`}
          placeholder="Іван Іваненко"
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <span className="booking-form__error">{errors.name}</span>}
      </div>

      <div className="booking-form__field">
        <label className="booking-form__label" htmlFor="phone">
          Телефон
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className={`booking-form__input ${errors.phone ? "booking-form__input--error" : ""}`}
          placeholder="+380991234567"
          value={form.phone}
          onChange={handleChange}
        />
        {errors.phone && <span className="booking-form__error">{errors.phone}</span>}
      </div>

      <div className="booking-form__field">
        <label className="booking-form__label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={`booking-form__input ${errors.email ? "booking-form__input--error" : ""}`}
          placeholder="example@email.com"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <span className="booking-form__error">{errors.email}</span>}
      </div>

      <button
        type="submit"
        className="booking-form__btn"
        disabled={disabled}
      >
        {disabled ? "Оберіть місця" : "Забронювати квиток"}
      </button>
    </form>
  );
}

export default BookingForm;