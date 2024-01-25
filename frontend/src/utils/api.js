import axios from "axios";
import { API_URL } from "./var";

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
