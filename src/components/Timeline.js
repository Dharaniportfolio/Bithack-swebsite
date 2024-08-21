import { useState } from "react";

export function Timeline() {
  const [current, setcurrent] = useState(0);
  const images = [
    "./assets/start.png",
    "./assets/middle.png",
    "./assets/close.png",
  ];
  function next() {
    setcurrent((previous) => (previous + 1) % images.length);
  }
  function previous() {
    setcurrent((previous) => (previous - 1 + images.length) % images.length);
  }

  return (
    <div className="timeline">
      <h2>TimeLine</h2>
      <div className="imageline">
        <img src={images[current]} alt={`images${current + 1}`} />
      </div>
      <div>
        <button className="prev" onClick={previous}>
          &#8249;
        </button>
        <button className="next" onClick={next}>
          &#8250;
        </button>
      </div>
    </div>
  );
}
export default Timeline;
