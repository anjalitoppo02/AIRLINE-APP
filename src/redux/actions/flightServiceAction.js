import * as types from "./actionTypes";
import * as flightServiceApi from "../../api/flightServiceApi";
import { apiCallError } from "./apiStatusAction";

export function loadFlightServicesSuccess(flightServices, filter) {
  return { type: types.LOAD_FLIGHT_SERVICES_SUCCESS, flightServices, filter };
}

export function createFlightServiceSuccess(flightService) {
  return { type: types.CREATE_FLIGHT_SERVICE_SUCCESS, flightService };
}

export function updateFlightServiceSuccess(flightService) {
  return { type: types.UPDATE_FLIGHT_SERVICE_SUCCESS, flightService };
}

export function deleteFlightServiceOptimistic(flightService) {
  return { type: types.DELETE_FLIGHT_SERVICE_OPTIMISTIC, flightService };
}
export function loadFlightServices(filter = { flight: 12233 }) {
  return function (dispatch) {
    return flightServiceApi
      .getFlightServices()
      .then((flightServices) => {
        dispatch(loadFlightServicesSuccess(flightServices, filter));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
      });
  };
}

export function saveFlightService(flightService) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    // dispatch(beginApiCall());
    return flightServiceApi
      .saveFlightService(flightService)
      .then((savedFlightService) => {
        flightService.id
          ? dispatch(updateFlightServiceSuccess(savedFlightService))
          : dispatch(createFlightServiceSuccess(savedFlightService));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
      });
  };
}

export function deleteFlightService(flightService) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    // dispatch(deleteFlightServiceOptimistic(flightService));
    return flightServiceApi.deleteFlightService(flightService.id).then(() => {
      dispatch(deleteFlightServiceOptimistic(flightService));
    });
  };
}
