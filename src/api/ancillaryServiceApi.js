import { handleResponse, handleError } from "./apiUtils";
const baseUrl = 'http://localhost:3001/ancillaryServices/';

export function getAncillaryServices() {
    return fetch(baseUrl).then(handleResponse).catch(handleError)
}

export function saveAncillaryService(ancillaryService) {
    return fetch(baseUrl + (ancillaryService.id || ''), {
        method: ancillaryService.id ? 'PUT' : 'POST', // POST for create, PUT to update when id already exists.
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(ancillaryService),
    })
        .then(handleResponse)
        .catch(handleError)
}

export function deleteAncillaryService(ancillaryServiceId) {
    return fetch(baseUrl + ancillaryServiceId, { method: 'DELETE' })
        .then(handleResponse)
        .catch(handleError)
}
