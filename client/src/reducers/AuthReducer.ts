import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: false,
  userName: null,
  userId: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userName: action.payload.userName, userId: action.payload.userId };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userName: null, userId: null };
    default:
      return state;
  }
};
