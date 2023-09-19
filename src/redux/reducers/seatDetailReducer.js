import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function seatDetailReducer(state = initialState.seats, action) {
  switch (action.type) {
    case types.LOAD_SEAT_DETAILS_SUCCESS:
      if (parseInt(action.filter.flight) > 0) {
        return action.seat.filter((item) => {
          return parseInt(action.filter.flight) !== parseInt(item.id)
            ? false
            : true;
        });
      } else {
        return action.seat;
      }
    case types.UPDATE_SEAT_DETAILS_SUCCESS:
      console.log(action.filter);
      return state.map((seat) =>
        seat.id === action.seat.id ? action.seat : seat
      );
    default:
      return state;
  }
}
