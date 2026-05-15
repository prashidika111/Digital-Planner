import React, { useState, useEffect } from 'react';

export default function FlipClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  let hours = time.getHours();
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? "PM" : "AM";
  
  hours = hours % 12;
  hours = hours ? hours : 12;
  const hourStr = String(hours).padStart(2, '0');

  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  const dateStr = time.toLocaleDateString('en-US', options).toLowerCase();

  return (
    <div id="flip-watch-container">
      <div className="date-display" id="currentDate">{dateStr}</div>

      <div className="flip-watch">
        <FlipCard value={hourStr} id="hourCard" />
        <div className="sep">:</div>
        <FlipCard value={minutes} id="minCard" />
        <div className="ampm" id="ampmDisplay">{ampm}</div>
      </div>
    </div>
  );
}

function FlipCard({ value, id }) {
  const [prev, setPrev] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setFlipping(true);
      const to = setTimeout(() => {
        setPrev(value);
        setFlipping(false);
      }, 600);
      return () => clearTimeout(to);
    }
  }, [value, prev]);

  return (
    <div className={`flip-card ${flipping ? 'flipping' : ''}`} id={id}>
      <div className="top">{flipping ? value : prev}</div>
      <div className="bottom">{prev}</div>
    </div>
  );
}
