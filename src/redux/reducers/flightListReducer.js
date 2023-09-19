import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function flightListReducer(
  state = initialState.flights,
  action
) {
  switch (action.type) {
    case types.LOAD_FLIGHTS_SUCCESS:
      console.log(action.filter);
      if (action.filter.flight > 0) {
        return action.flights.filter((item) => {
          return parseInt(action.filter.flight) !== parseInt(item.id)
            ? false
            : true;
        });
      } else {
        return action.flights;
      }
    default:
      return state;
  }
}
