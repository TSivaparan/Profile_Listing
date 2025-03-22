import axios from "axios";

const API_URL = "https://backend.graycorp.io:9000/mymate/api/v1/tempClients";


export const fetchProfilesApi = async (page = 1, limit = 10) => {
  const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
  return response.data;
};


export const fetchProfileByIdApi = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
