import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import productsReducer from "./products";
import searchReducer from "./search";
import userProductsReducer from "./userProducts";
import tagsReducer from "./tags";
import checkoutReducer from "./shoppingCart";

const rootReducer = combineReducers({
  session: sessionReducer,
  products: productsReducer,
  search: searchReducer,
  userProducts: userProductsReducer,
  tags: tagsReducer,
  checkout: checkoutReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
