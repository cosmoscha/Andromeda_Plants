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
  console.log("this is what you send to the server", getItems);
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
  console.log("bought products", boughtProducts);
  dispatch(checkout(boughtProducts));
  return boughtProducts;
};

export const checkedout = (getItems) => async (dispatch) => {
  let checkoutItems = await fetch(`api/products/checkedout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      products: getItems,
    }),
  });
  checkoutItems = await checkoutItems.json();
  dispatch(checked_out(checkoutItems));
  return checkoutItems;
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
