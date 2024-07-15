const initialState = {
  data: {},
  isAuthenticated: false
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_AUTH':
      return {
        data: action.payload,
        isAuthenticated: true
      };
    case 'DELETE_USERS_DATA':
      return {
        data: {},
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default userReducer;
