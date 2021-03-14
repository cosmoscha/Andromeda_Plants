const CHECKOUT = "shoppingCart/checkout";
const CHECKED_OUT = "shoppingCart/checkedout";
const checkout = (products) => {
  return {
    type: CHECKOUT,
    payload: products,
  };
};

const checked_out = (products) => {
  return {
    type: CHECKED_OUT,
    payload: products,
  };
};

export const buyProducts = (getItems) => async (dispatch) => {
  let boughtProducts = await fetch(`/api/products/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      getItems: getItems,
    }),
  });
  boughtProducts = await boughtProducts.json();

  dispatch(checkout(boughtProducts));
  return boughtProducts;
};

export const completeOrder = (street, city, zipcode) => async (dispatch) => {
  let addressInfo = await fetch(`api/products/finish`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      street: street,
      city: city,
      zipcode: zipcode,
    }),
  });
  addressInfo = addressInfo.json();
  console.log("addressInfo", addressInfo);
  // dispatch(checked_out(addressInfo));
  return addressInfo;
};
const initialState = [];

const checkoutReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case CHECKOUT:
      newState = action.payload;
      return newState;
    case CHECKED_OUT:
      newState = null;
      return newState;
    default:
      return state;
  }
};

export default checkoutReducer;
