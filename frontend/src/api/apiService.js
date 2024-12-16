import axiosInstance from "./axiosConfig";
import axios from "axios";
export let API_URL = "http://localhost:8081/api";

function callApi(endpoint, method = "GET", body, params) {
  const token = localStorage.getItem("authToken");
  console.log("authToken:", token);
  const queryString = new URLSearchParams(params).toString();
  const url = `${endpoint}?${queryString}`;

  const config = {
    method,
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    data: body ? JSON.stringify(body) : null,
  };

  console.log("callApi url: ", url);
  console.log("callApi token: ", token);

  return axiosInstance(config)
    .then((response) => response.data)
    .catch((error) => {
      console.error("API call error:", error);
      throw error;
    });
}

export const SEARCH_PRODUCTS = (query) => {
  const token = localStorage.getItem("authToken");
  console.log("search token", token);
  return axios.get(`${API_URL}/public/products/keyword/${query}`, {
    body: {
      pageNumber: 0,
      pageSize: 2,
      totalElements: 1,
      totalPages: 1,
      lastPage: true,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export function GET_ALL(endpoint, params) {
  return callApi(endpoint, "GET", null, params);
}
export function GET_ID(endpoint, id) {
  return callApi(endpoint + "/" + id, "GET");
}

export function POST_ADD(endpoint, data) {
  return callApi(endpoint, "POST", data);
}

export function PUT_EDIT(endpoint, data) {
  return callApi(endpoint, "PUT", data);
}

export function DELETE_ID(endpoint) {
  return callApi(endpoint, "DELETE");
}
export function GET_IMG(endpoint, imgName) {
  return `${API_URL}/${endpoint}/image/${imgName}`;
}
export function GET_LOGO(endpoint, imgName) {
  return `${API_URL}/${endpoint}/logo/${imgName}`;
}
export function LOGIN(body) {
  const API_URL_LOGIN = "http://localhost:8081/api/login";
  return axiosInstance
    .post(API_URL_LOGIN, body, {
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
    })

    .then((response) => response)
    .catch((error) => {
      console.log(error);
      throw error;
    });
}