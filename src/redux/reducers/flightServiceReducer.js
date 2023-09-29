import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function flightServiceReducer(
  state = initialState.services,
  action
) {
  switch (action.type) {
    case types.CREATE_FLIGHT_SERVICE_SUCCESS:
      return [...state, { ...action.flightService }];
    case types.UPDATE_FLIGHT_SERVICE_SUCCESS:
      return state.map((services) =>
        services.id === action.flightService.id
          ? action.flightService
          : services
      );
    case types.LOAD_FLIGHT_SERVICES_SUCCESS:
      if (parseInt(action.filter.flight) > 0) {
        return action.flightServices.filter((item) => {
          return parseInt(action.filter.flight) !== parseInt(item.fid)
            ? false
            : true;
        });
      } else {
        return action.flightServices;
      }
    case types.DELETE_FLIGHT_SERVICE_OPTIMISTIC:
      return state.filter(
        (services) => services.id !== action.flightService.id
      );
    default:
      return state;
  }
}
