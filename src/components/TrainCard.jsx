// src/components/TrainCard.jsx

import "../styles/TrainCard.css";

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString("uk-UA", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatPrice(amount) {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    maximumFractionDigits: 0,
  }).format(amount);
}

function TrainCard({ train, onBook }) {
  const { id, number, from, to, departure, arrival, duration, type, wagons, price } = train;

  const totalSeats = wagons.reduce((sum, w) => sum + w.totalSeats, 0);
  const bookedSeats = wagons.reduce((sum, w) => sum + w.bookedSeats.length, 0);
  const availableSeats = totalSeats - bookedSeats;
  const isLowSeats = availableSeats <= 10;

  return (
    <div className="train-card">
      <div className="train-card__header">
        <div>
          <span className="train-card__number">Потяг № {number}</span>
          <span className="train-card__price">Від {formatPrice(price)}</span>
        </div>
        <span className={`train-card__type train-card__type--${type.replace(/[^а-яА-ЯіІїЇ]/g, "").toLowerCase()}`}>
          {type}
        </span>
      </div>

      <div className="train-card__route">
        <div className="train-card__city">
          <span className="train-card__time">{formatTime(departure)}</span>
          <span className="train-card__city-name">{from}</span>
        </div>

        <div className="train-card__track">
          <span className="train-card__duration">{duration}</span>
          <div className="train-card__line">
            <span className="train-card__dot train-card__dot--left" />
            <span className="train-card__dot train-card__dot--right" />
          </div>
        </div>

        <div className="train-card__city">
          <span className="train-card__time">{formatTime(arrival)}</span>
          <span className="train-card__city-name">{to}</span>
        </div>
      </div>

      <div className="train-card__footer">
        <span className="train-card__date">📅 {formatDate(departure)}</span>
        <div className="train-card__meta">
          <span className="train-card__wagons">🚃 {wagons.length} вагонів</span>
          <span className={`train-card__seats ${isLowSeats ? "train-card__seats--low" : ""}`}>
            {isLowSeats ? "🔴" : "🟢"} {availableSeats} місць
          </span>
        </div>
      </div>

      <button
        className="train-card__book-btn"
        onClick={() => onBook(id)}
      >
        Обрати місця →
      </button>
    </div>
  );
}

export default TrainCard;