import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { completeOrder, getForm } from "../../store/shoppingCart";
import { usePlacesAutocomplete } from "./AutoCompleteHook";

import "./Checkout.css";
const Checkout = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const loaded = useSelector((state) => state.session.loaded);
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("")
  const [zipCode, setZipCode] = useState("");

  // const [selectedPrediction, setSelectedPrediction] = useState(null)
  // const [searchValue, setSearchValue] = useState("")
  // const predictions = usePlacesAutocomplete(searchValue)

  // const handlePredictionSelection = (e, prediction) => {
  //   e.preventDefault()
  //   setSelectedPrediction(prediction)
  // }

  const completeOrders = (e) => {
    e.preventDefault();
    const address = {
      streetAddress: streetAddress,
      city: city,
      zipCode: zipCode,
      state: state,
    };
    console.log("state", state)
    console.log("addddddy", address);

    dispatch(completeOrder(address));
  };

  const statesArr = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

  return loaded && user ? (
    <>
      <div className="checkout-container">
        <div>
          <form onSubmit={completeOrders}>
            <input
              onChange={(e) => setStreetAddress(e.target.value)}
              placeholder="street"
              value={streetAddress}
            ></input>
            <input
              onChange={(e) => setCity(e.target.value)}
              placeholder="city"
              value={city}
            ></input>
            <select
            onChange={(e) => setState(e.target.value)}
            value={state}
            >
              {statesArr.map((state) => (
                <option value={state} key={state}>
                  {state}
                </option>
              ))}
            </select>
            <input
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="zip"
              value={zipCode}
            ></input>
            <button id={streetAddress.id} type="submit">
              complete your order
            </button>
          </form>
        </div>
      </div>

      {/* <form  className="checkout-container">
        <input
          name="predictionSearch"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        <img
          src="https://developers.google.com/maps/documentation/images/powered_by_google_on_white.png"
          alt="Powered by Google"
        />
        <ul>
          {predictions?.map(prediction => (
            <li key={prediction?.place_id}>
              <button
                onClick={e => handlePredictionSelection(e, prediction)}
                onKeyDown={e => handlePredictionSelection(e, prediction)}
              >
                {prediction?.structured_formatting?.main_text || "Not found"}
              </button>
            </li>
          ))}
        </ul>
        <h3>You searched for: {searchValue}</h3>
        <h3>
          You selected:{" "}
          {selectedPrediction?.structured_formatting?.main_text || "None"}
        </h3>
      </form> */}
    </>
  ) : loaded ? (
    <Redirect to="/login" />
  ) : null;
};
export default Checkout;
