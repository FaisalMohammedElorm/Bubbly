// Mock authentication service for development/testing
import { Alert } from 'react-native';

interface MockUser {
  id: string;
  email: string;
  name: string;
  avatar?: string | null;
}

// Mock user storage
const mockUsers: Array<MockUser & { password: string }> = [];
let userIdCounter = 1;

// Helper to generate mock JWT token
const generateMockToken = (user: MockUser): string => {
  const tokenPayload = {
    user,
    iat: Date.now(),
    exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
  };
  return Buffer.from(JSON.stringify(tokenPayload)).toString('base64');
};

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockLogin = async(
  email: string, 
  password: string
): Promise<{token: string}> => {
  await delay(1000); // Simulate network delay
  
  console.log('Mock login attempt:', { email });
  
  const user = mockUsers.find(u => u.email === email && u.password === password);
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  const { password: _, ...userWithoutPassword } = user;
  const token = generateMockToken(userWithoutPassword);
  
  console.log('Mock login successful:', userWithoutPassword);
  return { token };
};

export const mockRegister = async(
  email: string, 
  password: string,
  name: string,
  avatar?: string | null
): Promise<{token: string}> => {
  await delay(1500); // Simulate network delay
  
  console.log('Mock registration attempt:', { email, name });
  
  // Check if user exists
  const existingUser = mockUsers.find(u => u.email === email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  
  // Validate input
  if (!email || !password || !name) {
    throw new Error('Please provide email, password, and name');
  }
  
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }
  
  // Create new user
  const newUser: MockUser = {
    id: userIdCounter.toString(),
    email,
    name,
    avatar
  };
  
  // Store user
  mockUsers.push({ ...newUser, password });
  userIdCounter++;
  
  const token = generateMockToken(newUser);
  
  console.log('Mock registration successful:', newUser);
  console.log('Total mock users:', mockUsers.length);
  
  return { token };
};
