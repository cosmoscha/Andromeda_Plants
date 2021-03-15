import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./NavBar.css";
import ProfileButton from "./ProfileButton";
import PlantMenu from "../../components/HomePage/PlantMenu";
import { useDispatch } from "react-redux";
import { searchPlants } from "../../store/search";

const NavBar = ({ authenticated, setAuthenticated }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const searchThings = async (e) => {
    e.preventDefault();
    dispatch(searchPlants(search));
    history.push("/search-results");
  };
  return (
    <nav>
      <div className="menu">
        <div className="icon-container">
          <NavLink to="/" exact={true} activeClassName="active">
            <img
              src="https://andromedaplants.s3.amazonaws.com/plonts/yuccado.jpg"
              className="home-icon"
            />
          </NavLink>
          <div className="banner"> Andromeda Plants</div>
        </div>
        <div className="search-container">
          <form onSubmit={searchThings}>
            <input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search a plant"
              className="searchbar"
            />
          </form>
        </div>
        <div className="nav-group">
          <div className="buttonWrapper">
            <ProfileButton
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
            />
          </div>
        </div>
      </div>
      <div className="test">
        <PlantMenu />
      </div>
    </nav>
  );
};

export default NavBar;
