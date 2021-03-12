const SET_RESULTS = "posts/setResults";

const setResults = (results) => {
  return {
    type: SET_RESULTS,
    payload: results,
  };
};

export const searchUsers = (searchTerm) => async (dispatch) => {
  const response = await fetch(`/api/search/${searchTerm}`);
  const results = await response.json();
  dispatch(setResults(results));
  return results;
};

const initialState = [];

const searchReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_RESULTS:
      newState = action.payload;
      return newState;

    default:
      return state;
  }
};

export default searchReducer;
