import axios from "axios";
import { API_URL } from "./var";

export const postData = async (endpoint, data) => {
  try {
    const response = await axios.post(`${API_URL}/${endpoint}`, data);
    return response;
  } catch (err) {
    return err.response;
  }
};
