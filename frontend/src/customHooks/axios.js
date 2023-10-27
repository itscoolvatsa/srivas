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

const getImage = async (url, successCode) => {
  try {
    const response = await axiosInstance(url, { responseType: "arraybuffer" });
    if (response.status === successCode) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(new Blob([response.data]));
      });
    } else {
      throw new Error(`Failed to fetch image. Status code: ${response.status}`);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export { axiosInstance, postRequest, getRequest, getImage };
