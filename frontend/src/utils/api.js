import axios from "axios";
import { API_URL } from "./constants";

export const postData = async (endpoint, data, headers) => {
  try {
    let response;
    if (headers) {
      response = await axios.post(`${API_URL}/${endpoint}`, data, {
        headers: headers,
      });
    } else {
      response = await axios.post(`${API_URL}/${endpoint}`, data);
    }
    return response;
  } catch (err) {
    return err.response;
  }
};

export const fetchData = async (endpoint, headers) => {
  try {
    let response;
    if (headers) {
      response = await axios.get(`${API_URL}/${endpoint}`, {
        headers: headers,
      });
    } else {
      response = await axios.get(`${API_URL}/${endpoint}`);
    }
    return response;
  } catch (err) {
    return err.response;
  }
};
