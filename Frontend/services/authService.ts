import axios from 'axios';

// API URL configuration - matches your backend
const API_URL = 'http://localhost:3000';

export const login = async(
  email: string, 
  password: string
): Promise<{token: string}> => {
  
  try {
    console.log('Making login request to:', `${API_URL}/auth/login`);
    
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    })
    
    console.log('Login response:', response.data);
    
    // Your backend returns { success: true, token }
    if (response.data.success && response.data.token) {
      return { token: response.data.token };
    } else {
      throw new Error(response.data.msg || 'Login failed');
    }
  } catch(error: any) {
    console.log("Login error details:", error);
    console.log("Error response:", error?.response?.data);
    console.log("Error status:", error?.response?.status);
    console.log("Error message:", error?.message);
    
    let msg = "Login failed";
    
    // Handle your backend's error format
    if (error?.response?.data?.msg) {
      msg = error.response.data.msg;
    } else if (error?.response?.data?.message) {
      msg = error.response.data.message;
    } else if (error?.message) {
      if (error.message.includes('Network Error') || error.message.includes('ECONNREFUSED')) {
        msg = "Cannot connect to server. Please make sure your backend is running on port 3000.";
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
    
    // Your backend returns { success: true, token }
    if (response.data.success && response.data.token) {
      return { token: response.data.token };
    } else {
      throw new Error(response.data.msg || 'Registration failed');
    }
  } catch(error: any) {
    console.log("Registration error details:", error);
    console.log("Error response:", error?.response?.data);
    console.log("Error status:", error?.response?.status);
    console.log("Error message:", error?.message);
    
    let msg = "Registration failed";
    
    // Handle your backend's error format
    if (error?.response?.data?.msg) {
      msg = error.response.data.msg;
    } else if (error?.response?.data?.message) {
      msg = error.response.data.message;
    } else if (error?.message) {
      if (error.message.includes('Network Error') || error.message.includes('ECONNREFUSED')) {
        msg = "Cannot connect to server. Please make sure your backend is running on port 3000.";
      } else {
        msg = error.message;
      }
    }
    
    throw new Error(msg);
  }
}