import axios from 'axios';

// Create Axios instance with your API base URL
const instance = axios.create({
  baseURL: 'http://192.168.1.143:8085/api', // Adjust if needed
});

// Request Interceptor to attach Bearer token
instance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;  // Ensure Bearer prefix
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Global error handling with Response Interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      alert("Session expired or unauthorized. Please log in again.");
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default instance;
