import axios from "axios";

export const apiUrl = "http://localhost:5000/name";

export const sendRequest = async (route, body, method) => {
    return axios({
        method: `${method}`,
        url: `${apiUrl}/${route}`,
        contentType: "application/json",
        responseType: "json",
        data: body
    });
}