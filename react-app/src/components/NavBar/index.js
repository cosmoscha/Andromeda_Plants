import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./NavBar.css";
import ProfileButton from "./ProfileButton";
// import PlantMenu from "../../components/HomePage/PlantMenu";
import { useDispatch, useSelector } from "react-redux";
import { searchPlants } from "../../store/search";
import { getProductTag } from "../../store/tags";

const NavBar = ({ authenticated, setAuthenticated }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [link, setLink] = useState(false);
  const user = useSelector((state) => state.session.user);

  const searchThings = async (e) => {
    e.preventDefault();
    dispatch(searchPlants(search));
    history.push("/search-results");
  };

  const navigator = (e) => {
    dispatch(getProductTag(e.target.value));
    history.push(`/tags/${e.target.value}`);
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
        
            <ProfileButton
              authenticated={authenticated}
              setAuthenticated={setAuthenticated}
              />
          
              {user && (
            <img src={user.profilePhotoUrl} style={{width:"50px", height:"50px"}}/>

          )}
        </div>
        <div className="tagLinks">
          <button onClick={navigator} value="1">
            Nepenthes
          </button>
          <button onClick={navigator} value="2">
            Cephalotus
          </button>
          <button onClick={navigator} value="3">
            Venus Flytraps
          </button>
          <button onClick={navigator} value="4">
            Butterworts
          </button>
          <button onClick={navigator} value="5">
            Sundews
          </button>
          <button onClick={navigator} value="6">
            Sarracenias
          </button>
          <button onClick={navigator} value="7">
            Bladderworts
          </button>
        </div>
      </div>
      {/* <div className="test">
        <PlantMenu />
      </div> */}
    </nav>
  );
};

export default NavBar;
