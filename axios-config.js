// axios-config.js

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // adjust the base URL according to your server
});

export default axiosInstance;
