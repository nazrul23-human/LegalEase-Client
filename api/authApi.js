import axios from "axios";

const API = "http://localhost:5000/api/auth";

// REGISTER
export const registerUser = async (data) => {
    return await axios.post(`${API}/register`, data);
};

// LOGIN
export const loginUser = async (data) => {
    return await axios.post(`${API}/login`, data);
};