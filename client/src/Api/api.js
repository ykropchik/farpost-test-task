import axios from "axios";
import CONFIG from "../config";

export function getBreefs() {
    return axios.get(CONFIG.API_BASE_URL + '/get')
}

export function sendBreefs() {
    return axios.post(CONFIG.API_BASE_URL + '/send')
}