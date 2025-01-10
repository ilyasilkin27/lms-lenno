import axios from 'axios';

const USER_SERVICE_API_URL = 'http://localhost:5001/users';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${USER_SERVICE_API_URL}`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка регистрации');
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${USER_SERVICE_API_URL}/login`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);

    throw new Error(error.response?.data?.message || 'Ошибка входа');
  }
};
