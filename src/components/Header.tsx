import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className="menu">
      <div
        className="logo"
        onClick={() => {
          navigate("/movies");
        }}
      >
        FindMovie
      </div>
      <div className="menu__space"></div>
      <div className="menu__category">
        <NavLink to="/movies">Поиск</NavLink>
        <NavLink to="/favorite">Избранное</NavLink>
      </div>
    </div>
  );
}
