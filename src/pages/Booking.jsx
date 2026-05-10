// src/pages/Booking.jsx

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import WagonSelector from "../components/WagonSelector";
import SeatMap from "../components/SeatMap";
import BookingForm from "../components/BookingForm";
import BookingService from "../services/BookingService";
import trains from "../data/trains";
import "../styles/Booking.css";

function Booking() {
  const { trainId } = useParams();
  const navigate = useNavigate();

  // Знаходимо потяг за id з URL
  const train = trains.find((t) => t.id === Number(trainId));

  const [selectedWagon, setSelectedWagon] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [extraBookedSeats, setExtraBookedSeats] = useState([]);

  // При виборі вагона — скидаємо обрані місця і підвантажуємо заброньовані з localStorage
  useEffect(() => {
    if (selectedWagon) {
      setSelectedSeats([]);
      const booked = BookingService.getBookedSeats(train.id, selectedWagon.id);
      setExtraBookedSeats(booked);
    }
  }, [selectedWagon, train.id]);

  // Якщо потяг не знайдено — повертаємо на головну
  if (!train) {
    return (
      <div className="booking__not-found">
        <p>Рейс не знайдено.</p>
        <button onClick={() => navigate("/")}>На головну</button>
      </div>
    );
  }

  function handleSeatClick(seatNumber) {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber) // знімаємо вибір
        : [...prev, seatNumber]                // додаємо вибір
    );
  }

  function handleBooking(formData) {
    const booking = {
      trainId: train.id,
      trainNumber: train.number,
      from: train.from,
      to: train.to,
      departure: train.departure,
      wagonId: selectedWagon.id,
      wagonNumber: selectedWagon.number,
      wagonType: selectedWagon.type,
      seats: selectedSeats,
      passenger: formData,
    };

    BookingService.saveBooking(booking);

    toast.success(
      `✅ Квиток заброньовано! Потяг ${train.number}, вагон ${selectedWagon.number}, місця: ${selectedSeats.sort((a,b)=>a-b).join(", ")}`,
      { autoClose: 4000 }
    );

    // Оновлюємо заброньовані місця і скидаємо вибір
    setExtraBookedSeats((prev) => [...prev, ...selectedSeats]);
    setSelectedSeats([]);
  }

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

  return (
    <div className="booking">
      <ToastContainer position="top-right" />

      <header className="booking__header">
        <button className="booking__back" onClick={() => navigate("/")}>
          ← Назад
        </button>
        <div className="booking__train-info">
          <span className="booking__train-number">Потяг № {train.number}</span>
          <span className="booking__train-route">
            {train.from} → {train.to}
          </span>
          <span className="booking__train-time">
            {formatDate(train.departure)}, {formatTime(train.departure)}
          </span>
        </div>
      </header>

      <main className="booking__content">
        <WagonSelector
          wagons={train.wagons}
          selectedWagon={selectedWagon}
          onSelect={setSelectedWagon}
        />

        {selectedWagon && (
          <>
            <SeatMap
              train={train}
              wagon={selectedWagon}
              selectedSeats={selectedSeats}
              onSeatClick={handleSeatClick}
              extraBookedSeats={extraBookedSeats}
            />

            <BookingForm
              onSubmit={handleBooking}
              disabled={selectedSeats.length === 0}
            />
          </>
        )}

        {!selectedWagon && (
          <div className="booking__hint">
            <span>👆</span>
            <p>Оберіть вагон, щоб побачити схему місць</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Booking;