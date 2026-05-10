// src/components/WagonSelector.jsx

import "../styles/WagonSelector.css";

function WagonSelector({ wagons, selectedWagon, onSelect }) {
  return (
    <div className="wagon-selector">
      <h3 className="wagon-selector__title">Оберіть вагон</h3>
      <div className="wagon-selector__list">
        {wagons.map((wagon) => (
          <button
            key={wagon.id}
            className={`wagon-selector__btn ${
              selectedWagon?.id === wagon.id ? "wagon-selector__btn--active" : ""
            }`}
            onClick={() => onSelect(wagon)}
          >
            <span className="wagon-selector__num">№ {wagon.number}</span>
            <span className="wagon-selector__type">{wagon.type}</span>
            <span className="wagon-selector__price">{wagon.price} ₴</span>
            <span className="wagon-selector__seats">
              {wagon.totalSeats - wagon.bookedSeats.length} місць
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default WagonSelector;