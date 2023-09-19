import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function authReducer(state = initialState.username, action) {
  switch (action.type) {
    case types.LOG_IN:
      return [...state, { ...action.user }];
    case types.LOG_OUT:
      return [...state, {}];
    default:
      return state;
  }
}
