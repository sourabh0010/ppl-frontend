const initialState = {
  data: {},
  error:{}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOGED_IN_USER_DATA":
      return {
        ...state,
        data: action.userData.data,
      };
    case "LOGGED_OUT":
        console.log("logged out")
      return {
        ...state,
        data: {},
      };
      case 'HANDLEERROR':
          return{
              ...state,
              error:action.loginError
          }
    default:
      return { ...state };
  }
};
export default reducer;
