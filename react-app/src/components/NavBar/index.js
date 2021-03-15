import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./NavBar.css";
import ProfileButton from "./ProfileButton";
// import PlantMenu from "../../components/HomePage/PlantMenu";
import { useDispatch } from "react-redux";
import { searchPlants } from "../../store/search";

const NavBar = ({ authenticated, setAuthenticated }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [link, setLink] = useState(false);

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
        <div className="tagLinks">
          <NavLink to="/tags/1">Nepenthes</NavLink>
          <NavLink to="/tags/2">Cephalotus</NavLink>
          <NavLink to="/tags/3">Venus Flytraps</NavLink>
          <NavLink to="/tags/4">Butterworts</NavLink>
          <NavLink to="/tags/5">Sundews</NavLink>
          <NavLink to="/tags/6">Sarracenias</NavLink>
          <NavLink to="/tags/7">Bladderworts</NavLink>
        </div>
      </div>
      {/* <div className="test">
        <PlantMenu />
      </div> */}
    </nav>
  );
};

export default NavBar;
