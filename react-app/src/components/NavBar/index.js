import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./NavBar.css";
import ProfileButton from "./ProfileButton";
import PlantMenu from "../../components/HomePage/PlantMenu";

const NavBar = ({ authenticated, setAuthenticated }) => {
  // const history = useHistory();
  // const dispatch = useDispatch();

  const onSearch = async (e) => {
    e.preventDefault();
    //dispatch the search query
    //history.push('/search-results)
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
          <form onSubmit={onSearch}>
            <input placeholder="Search" className="searchbar" />
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
