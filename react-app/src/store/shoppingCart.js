const CHECKOUT = "shoppingCart/checkout";
const CHECKED_OUT = "shoppingCart/checkedout";
const REMOVE = "shoppingCart/removeItem";
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

// const removeItem = (product) => {
//   return {
//     type: REMOVE,
//     payload: product,
//   };
// };

export const buyProducts = (getItems) => async (dispatch) => {
  dispatch(checkout(getItems));
  return getItems;
};

// export const removeProduct = (itemId) => async (dispatch) => {
//   dispatch(removeItem(itemId));
// };

export const completeOrder = (address) => async (dispatch) => {
  const formData = new FormData();
  formData.append("street_address", address.streetAddress);
  formData.append("city", address.city);
  formData.append("zip_code", address.zipCode);
  console.log("new form data", formData);

  console.log("whatyou send to server", address);
  let addressInfo = await fetch(`api/userProducts/finish`, {
    method: "POST",
    body: formData,
  });
  console.log("addressInfo", addressInfo);
  addressInfo = await addressInfo.json();
  console.log("addressInfo", addressInfo);
  dispatch(checked_out(addressInfo));
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
    // case REMOVE:
    //   return {
    //     ...state,
    //     products: [...state.splice(action.payload, 1)],
    //   };

    //   newState = state.filter((val) => val.productId !== action.payload);
    //   return newState;
    default:
      return state;
  }
};

export default checkoutReducer;
