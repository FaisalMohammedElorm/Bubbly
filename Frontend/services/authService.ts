import axios from 'axios';
import { mockLogin, mockRegister } from './mockAuthService';

// API URL configuration
const API_URL = 'http://localhost:3000'; // Change this to your backend URL

// Set to true to use mock service, false to use real API
const USE_MOCK_SERVICE = false;

export const login = async(
  email: string, 
  password: string
): Promise<{token: string}> => {
  if (USE_MOCK_SERVICE) {
    return mockLogin(email, password);
  }
  
  try {
    console.log('Making login request to:', `${API_URL}/auth/login`);
    
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    })
    
    console.log('Login response:', response.data);
    return response.data;
  } catch(error: any) {
    console.log("Login error details:", error);
    console.log("Error response:", error?.response?.data);
    console.log("Error status:", error?.response?.status);
    console.log("Error message:", error?.message);
    
    let msg = "Login failed";
    
    if (error?.response?.data?.msg) {
      msg = error.response.data.msg;
    } else if (error?.response?.data?.message) {
      msg = error.response.data.message;
    } else if (error?.message) {
      if (error.message.includes('Network Error') || error.message.includes('ECONNREFUSED')) {
        msg = "Cannot connect to server. Please make sure the server is running.";
      } else {
        msg = error.message;
      }
    }
    
    throw new Error(msg);
  }
}

export const register = async(
  email: string, 
  password: string,
  name: string,
  avatar?: string | null
): Promise<{token: string}> => {
  if (USE_MOCK_SERVICE) {
    return mockRegister(email, password, name, avatar);
  }
  
  try {
    console.log('Making registration request to:', `${API_URL}/auth/register`);
    console.log('Registration data:', { email, name, avatar });
    
    const response = await axios.post(`${API_URL}/auth/register`, {
      email,
      password,
      name,
      avatar
    })
    
    console.log('Registration response:', response.data);
    return response.data;
  } catch(error: any) {
    console.log("Registration error details:", error);
    console.log("Error response:", error?.response?.data);
    console.log("Error status:", error?.response?.status);
    console.log("Error message:", error?.message);
    
    let msg = "Registration failed";
    
    if (error?.response?.data?.msg) {
      msg = error.response.data.msg;
    } else if (error?.response?.data?.message) {
      msg = error.response.data.message;
    } else if (error?.message) {
      if (error.message.includes('Network Error') || error.message.includes('ECONNREFUSED')) {
        msg = "Cannot connect to server. Please make sure the server is running.";
      } else {
        msg = error.message;
      }
    }
    
    throw new Error(msg);
  }
}