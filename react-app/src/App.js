import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import { authenticate } from "./services/auth";
import IndividualProduct from "./components/IndividualProduct";
import { useDispatch } from "react-redux";
import { addUser } from "./store/session";
import ProductPage from "./components/ProductPage";
import ShoppingCart from "./components/ShoppingCart";
import Checkout from "./components/Checkout";
import SearchResult from "./components/SearchResults";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(true);
  const dispatch = useDispatch();

  console.log("authenticated status on app", authenticated)

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        dispatch(addUser(user));
      }
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar  
      authenticated={authenticated}
      setAuthenticated={setAuthenticated}
      />
      <Switch>
        

        <Route path="/" exact={true}>
          <HomePage />
        </Route>
        <Route path="/products/:id" exact={true}>
          <IndividualProduct />
        </Route>
        <Route path="/tags/:id" exact={true}>
          <ProductPage />
        </Route>
        <Route path="/ShoppingCart" exact={true}>
          <ShoppingCart />
        </Route>
        <Route path="/checkout" exact={true}>
          <Checkout />
        </Route>
        <Route path="/search-results" exact={true}>
          <SearchResult />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
