import axios from 'axios';

export const loginUser = async (userData) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/login',
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
  
      throw new Error(error.response?.data?.message || 'Ошибка входа');
    }
  };
  