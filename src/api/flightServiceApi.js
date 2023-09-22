import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL;

export function getFlightServices() {
  return fetch(baseUrl + "/services/")
    .then(handleResponse)
    .catch(handleError);
}

export function saveFlightService(flightService) {
  return fetch(baseUrl + "/services/" + (flightService.id || ""), {
    method: flightService.id ? "PATCH" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(flightService),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteFlightService(flightServiceId) {
  return fetch(baseUrl + "/services/" + flightServiceId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
