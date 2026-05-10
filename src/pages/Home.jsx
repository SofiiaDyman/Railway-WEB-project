// src/pages/Home.jsx

import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import TrainList from "../components/TrainList";
import trains from "../data/trains";
import "../styles/Home.css";

function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filteredTrains = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return trains;
    return trains.filter(
      (t) =>
        t.from.toLowerCase().includes(q) ||
        t.to.toLowerCase().includes(q) ||
        t.number.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="home">
      <header className="home__hero">
        <p className="home__label">🇺🇦 Укрзалізниця</p>
        <h1 className="home__title">Залізничні квитки</h1>
        <p className="home__subtitle">Знайдіть зручний рейс та оберіть місця</p>
      </header>

      <main className="home__content">
        <div className="home__search-wrapper">
          <input
            className="home__search"
            type="text"
            placeholder="🔍  Пошук за містом або номером потяга..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <p className="home__count">
          Знайдено рейсів: <strong>{filteredTrains.length}</strong>
        </p>

        <TrainList
          trains={filteredTrains}
          onBook={(trainId) => navigate(`/booking/${trainId}`)}
        />
      </main>
    </div>
  );
}

export default Home;