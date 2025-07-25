import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

// Optional: Global error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized");
      // redirect to login if needed
    }
    return Promise.reject(error);
  }
);

// API ENDPOINTS
export const login = (data) => api.post("/api/user/login", data);
export const register = (data) => api.post("/api/user/register", data);
export const getUserData = () => api.get("/api/user");
export const logout = () => api.post("/api/user/logout");

export const addTable = (data) => api.post("/api/table" , data);
export const getTable = () => api.get("/api/table");
export const updateTable = ({tableId , ...tableData}) => api.put(`/api/table/${tableId}` , tableData);

// payment endpoints
export const createOrderRazorpay = (data) => api.post('/api/payment' , data)
export const verifyPaymentRazorpay = (data) => api.post('/api/payment/verify-payment' , data)
export const getAllPayments = () => api.get("/api/payment/");

//order
export const addOrder = (data) => api.post("/api/order/" , data)
export const getOrder = () => api.get("/api/order")
export const updateOrder = ({ orderId, orderStatus, paymentStatus }) => api.put(`/api/order/${orderId}`, { orderStatus, paymentStatus });

// Menu endpoints (categories and dishes)
export const addCategory = (data) => api.post("/api/menu/", data);
export const getAllCategory = () => api.get("/api/menu/");

// Menu endpoint
export const getMenu = () => api.get("/api/menu");
export const addDish = (data) => api.post("/api/menu/dish", data);