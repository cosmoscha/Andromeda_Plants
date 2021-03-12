const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const addUser = (user) => async (dispatch) => {
  dispatch(setUser(user));
  return user;
};

export const logoutUser = () => async (dispatch) => {
  dispatch(removeUser());
  sessionStorage.clear();
  return "Logged out";
};

const initialState = { user: null, loaded: false };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      newState.loaded = true;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      newState.loaded = true;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
