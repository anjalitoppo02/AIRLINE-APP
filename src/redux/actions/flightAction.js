import * as types from "./actionTypes";
import * as flightApi from "../../api/flightApi";
import { apiCallError } from "./apiStatusAction";

export function loadFlightsSuccess(flights, filter) {
  return { type: types.LOAD_FLIGHTS_SUCCESS, flights, filter };
}

export function loadSeatDetaisSuccess(seat, filter) {
  return { type: types.LOAD_SEAT_DETAILS_SUCCESS, seat, filter };
}

export function createSeatDetailsSuccess(seat) {
  return { type: types.CREATE_SEAT_DETAILS_SUCCESS, seat };
}

export function updateSeatDetailsSuccess(seat) {
  return { type: types.UPDATE_SEAT_DETAILS_SUCCESS, seat };
}

export function loadFlights(filter = { flight: 12233 }) {
  return function (dispatch) {
    return flightApi
      .getFlights()
      .then((flights) => {
        dispatch(loadFlightsSuccess(flights, filter));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
      });
  };
}

export function loadSeatDetails(filter = { flight: 12233 }) {
  return function (dispatch) {
    return flightApi
      .getSeatDetails()
      .then((seat) => {
        dispatch(loadSeatDetaisSuccess(seat, filter));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
      });
  };
}

export function updateSeatDetails(seat, flight) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    // dispatch(beginApiCall());
    return flightApi
      .updateSeatDetails(seat, flight)
      .then((seat) => {
        flight
          ? dispatch(updateSeatDetailsSuccess(seat))
          : dispatch(createSeatDetailsSuccess(seat));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
      });
  };
}
