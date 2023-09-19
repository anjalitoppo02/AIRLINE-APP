import * as types from "./actionTypes";
import * as ancillaryServiceApi from "../../api/ancillaryServiceApi";
import { apiCallError } from "./apiStatusAction";

export function loadAncillaryServicesSuccess(ancillaryServices) {
  return { type: types.LOAD_ANCILLARY_SERVICES_SUCCESS, ancillaryServices };
}

export function createAncillaryServiceSuccess(ancillaryService) {
  return { type: types.CREATE_ANCILLARY_SERVICE_SUCCESS, ancillaryService };
}

export function updateAncillaryServiceSuccess(ancillaryService) {
  return { type: types.UPDATE_ANCILLARY_SERVICE_SUCCESS, ancillaryService };
}

export function deleteAncillaryServiceOptimistic(ancillaryService) {
  return { type: types.DELETE_ANCILLARY_SERVICE_OPTIMISTIC, ancillaryService };
}
export function loadAncillaryServices() {
  return function (dispatch) {
    return ancillaryServiceApi
      .getAncillaryServices()
      .then((ancillaryServices) => {
        dispatch(loadAncillaryServicesSuccess(ancillaryServices));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
      });
  };
}

export function saveAncillaryService(ancillaryService) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    // dispatch(beginApiCall());
    return ancillaryServiceApi
      .saveAncillaryService(ancillaryService)
      .then((savedAncillaryService) => {
        ancillaryService.id
          ? dispatch(updateAncillaryServiceSuccess(savedAncillaryService))
          : dispatch(createAncillaryServiceSuccess(savedAncillaryService));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
      });
  };
}

export function deleteAncillaryService(ancillaryService) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    // dispatch(deleteAncillaryServiceOptimistic(ancillaryService));
    return ancillaryServiceApi
      .deleteAncillaryService(ancillaryService.id)
      .then(() => {
        dispatch(deleteAncillaryServiceOptimistic(ancillaryService));
      });
  };
}
