import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function ancillaryServiceReducer( state = initialState.ancillaryServices, action ) {
    switch (action.type) {
      case types.CREATE_ANCILLARY_SERVICE_SUCCESS:
        return [...state, { ...action.ancillaryService }];
      case types.UPDATE_ANCILLARY_SERVICE_SUCCESS:
        return state.map((ancillaryService) =>
          ancillaryService.id === action.ancillaryService.id
            ? action.ancillaryService
            : ancillaryService
        );
      case types.LOAD_ANCILLARY_SERVICES_SUCCESS:
        return action.ancillaryServices;
      case types.DELETE_ANCILLARY_SERVICE_OPTIMISTIC:
        return state.filter(
          (ancillaryService) => ancillaryService.id !== action.ancillaryService.id
        );
      default:
        return state;
    }
}