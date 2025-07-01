import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://user-new-app-staging.internal.haat.delivery/api/',
  timeout: 1000,
  headers: { 'Authorization': 'Bearer for implementing autentification if needed' }
});

apiClient.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default apiClient;