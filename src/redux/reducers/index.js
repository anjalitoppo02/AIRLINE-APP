import { combineReducers } from "redux";
import apiCallsInProgress from "./apiStatusReducer";
import passengers from "./passengerReducer";
import ancillaryServices from "./ancillaryServiceReducer";
import flights from "./flightListReducer";
import authReducer from "./authReducer";
import seats from "./seatDetailReducer";

const rootReducer = combineReducers({
  authReducer,
  apiCallsInProgress,
  passengers,
  ancillaryServices,
  flights,
  seats,
});

export default rootReducer;
