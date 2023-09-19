import * as types from "./actionTypes";
export function login(user) {
  return {
    type: types.LOG_IN,
    user
  };
}

export function logout() {
  return {
    type: types.LOG_OUT
  };
}
