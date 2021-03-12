import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import PlantMenu from "./PlantMenu";
import "./home.css";

const HomePage = () => {
  const [test, setTest] = useState("hidden");
  const tester = () => {
    if (test === "") {
      setTest("hidden");
    } else {
      setTest("");
    }
  };
  return (
    <>
      <div className="splash-container"></div>
      <div className="product-preview-container">
        <div className="product-preview">
          <div className="sample1">product sample</div>
          <div className="sample2">product sample</div>
          <div className="sample3">product sample</div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
