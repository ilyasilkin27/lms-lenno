import axios from 'axios';

export const loginUser = async (userData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LOGIN_URL || 'https://login-service-60nh.onrender.com'}/api/login`,
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
  