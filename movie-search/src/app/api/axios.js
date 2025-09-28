import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.tvmaze.com',
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error?.response?.data || error.message)
);

export default axiosInstance;
