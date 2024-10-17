import { Link } from "react-router-dom";
export function Tracks() {
  return (
    <div className="category-bar">
      <h2>Tracks</h2>
      <h3>
        Embark on a journey where the boundaries of possibility are pushed to
        new horizons.
      </h3>
      <div className="buttons">
        <Link to="/domain">
        <button>Software</button>
        </Link>
        <button>Hardware</button>
        <button>Open Innovation</button>
      </div>
    </div>
  );
}
export default Tracks;
