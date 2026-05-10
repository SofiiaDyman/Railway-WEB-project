const STORAGE_KEY = "railway_bookings";

// Отримати всі бронювання з localStorage
function getBookings() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Зберегти нове бронювання
function saveBooking(booking) {
  const bookings = getBookings();
  const newBooking = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    ...booking,
  };
  bookings.push(newBooking);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  return newBooking;
}

// Отримати заброньовані місця для конкретного вагона конкретного потяга
function getBookedSeats(trainId, wagonId) {
  const bookings = getBookings();
  const seats = [];
  bookings.forEach((b) => {
    if (b.trainId === trainId && b.wagonId === wagonId) {
      seats.push(...b.seats);
    }
  });
  return seats;
}

export default { getBookings, saveBooking, getBookedSeats };