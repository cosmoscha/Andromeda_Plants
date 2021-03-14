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

// export const completeOrder = (address) => async (dispatch) => {
//   let addressInfo = await fetch(`api/products/finish`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       address: address,
//     }),
//   });
//   addressInfo = addressInfo.json();
//   dispatch(checked_out(addressInfo));
//   return addressInfo;
// };

export const getForm = () => async (dispatch) => {
  let form = await fetch(`api/userProducts/finish`);
  console.log("form from wtfields", form);
  // form = await form.json();
  // console.log("form after conversion to JSON", form);
  // dispatch(checkout(form));
  return form;
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
