import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL;

export function getFlights() {
  return fetch(baseUrl + "/flights/")
    .then(handleResponse)
    .catch(handleError);
}

export function getSeatDetails() {
  return fetch(baseUrl + "/seats/")
    .then(handleResponse)
    .catch(handleError);
}

export function updateSeatDetails(seat, flight) {
  return fetch(baseUrl + "/seats/" + (flight || ""), {
    method: flight ? "PATCH" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(seat),
  })
    .then(handleResponse)
    .catch(handleError);
}
