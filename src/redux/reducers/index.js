import { combineReducers } from "redux";
import apiCallsInProgress from "./apiStatusReducer";
import passengers from "./passengerReducer";
import services from "./flightServiceReducer";
import flights from "./flightListReducer";
import authReducer from "./authReducer";
import seats from "./seatDetailReducer";

const rootReducer = combineReducers({
  authReducer,
  apiCallsInProgress,
  passengers,
  services,
  flights,
  seats,
});

export default rootReducer;
