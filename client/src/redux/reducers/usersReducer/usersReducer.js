import { REGISTER_USER } from "../../actions/actionTypes/actionTypes";
const INITIAL_STATE = {
  currentUser: false,
  auth: null,
};

const usersReducer = (sate = INITIAL_STATE, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        currentUser: true,
        auth: action.payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
