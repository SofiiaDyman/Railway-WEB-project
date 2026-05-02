// src/components/TrainList.jsx

import TrainCard from "./TrainCard";
import "../styles/TrainList.css";

function TrainList({ trains }) {
  if (trains.length === 0) {
    return (
      <div className="train-list__empty">
        <span className="train-list__empty-icon">🚉</span>
        <p>Рейсів не знайдено. Спробуйте інший запит.</p>
      </div>
    );
  }

  return (
    <ul className="train-list">
      {trains.map((train) => (
        <li key={train.id}>
          <TrainCard train={train} />
        </li>
      ))}
    </ul>
  );
}

export default TrainList;