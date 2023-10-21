import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
});

const postRequest = async (body, url, status) => {
  let response;
  let error;
  let res = axiosInstance({
    data: body,
    url: url,
    method: "POST",
  });

  await res
    .then((data) => {
      if (data["status"] === status) {
        response = data["data"];
        error = null;
      }
    })
    .catch((err) => {
      error = err["response"];
      response = null;
    });
  return [response, error];
};

const getRequest = async (url, successCode) => {
  let response;
  let error;
  let res = axiosInstance({
    url: url,
    method: "GET",
  });

  await res
    .then((data) => {
      if (data["status"] === successCode) {
        response = data["data"];
        error = null;
      }
    })
    .catch((err) => {
      error = err["response"];
      response = null;
    });
  return [response, error];
};

export { axiosInstance, postRequest, getRequest };
