import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
const PlantMenu = ({ setAuthenticated }) => {
  const [showMenu, setShowMenu] = useState(false);

  let menuButtons = (
    <div className="sidebar-buttons">
      <NavLink to="/tags/1">Nepenthes</NavLink>
      <NavLink to="/tags/2">Cephalotus</NavLink>
      <NavLink to="/tags/3">Venus Flytraps</NavLink>
      <NavLink to="/tags/4">Butterworts</NavLink>
      <NavLink to="/tags/5">Sundews</NavLink>
      <NavLink to="/tags/6">Sarracenias</NavLink>
      <NavLink to="/tags/7">Bladderworts</NavLink>
    </div>
  );
  return (
    <>
      <div className="side-container">
        <button
          onClick={() => setShowMenu(showMenu === true ? false : true)}
          className="sidebar-button-menu"
        >
          menu
        </button>
        {showMenu && menuButtons}
      </div>
    </>
  );
};

export default PlantMenu;
