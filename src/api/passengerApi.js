import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/passengers/";

export function getPassengers() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function savePassenger(passenger) {
  return fetch(baseUrl + (passenger.id || ""), {
    method: passenger.id ? "PATCH" : "POST", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(passenger),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deletePassenger(passengerId) {
  return fetch(baseUrl + passengerId, { method: "DELETE" })
    .then(handleResponse)
    .catch(handleError);
}
