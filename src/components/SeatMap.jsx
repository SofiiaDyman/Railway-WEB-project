// src/components/SeatMap.jsx

import "../styles/SeatMap.css";

function SeatMap({ wagon, selectedSeats, onSeatClick, extraBookedSeats = [] }) {
  const allBookedSeats = [...wagon.bookedSeats, ...extraBookedSeats];

  function getSeatStatus(seatNumber) {
    if (allBookedSeats.includes(seatNumber)) return "booked";
    if (selectedSeats.includes(seatNumber)) return "selected";
    return "free";
  }

  const seats = Array.from({ length: wagon.totalSeats }, (_, i) => i + 1);

  return (
    <div className="seat-map">
      <h3 className="seat-map__title">
        Схема місць — Вагон № {wagon.number} ({wagon.type})
      </h3>

      <div className="seat-map__legend">
        <span className="seat-map__legend-item">
          <span className="seat-map__dot seat-map__dot--free" /> Вільне
        </span>
        <span className="seat-map__legend-item">
          <span className="seat-map__dot seat-map__dot--selected" /> Обране
        </span>
        <span className="seat-map__legend-item">
          <span className="seat-map__dot seat-map__dot--booked" /> Заброньоване
        </span>
      </div>

      <div className="seat-map__grid">
        {seats.map((seatNumber) => {
          const status = getSeatStatus(seatNumber);
          return (
            <button
              key={seatNumber}
              className={`seat-map__seat seat-map__seat--${status}`}
              onClick={() => status !== "booked" && onSeatClick(seatNumber)}
              disabled={status === "booked"}
              title={`Місце ${seatNumber}`}
            >
              {seatNumber}
            </button>
          );
        })}
      </div>

      {selectedSeats.length > 0 && (
        <p className="seat-map__selected-info">
          Обрані місця: <strong>{selectedSeats.sort((a, b) => a - b).join(", ")}</strong>
        </p>
      )}
    </div>
  );
}

export default SeatMap;