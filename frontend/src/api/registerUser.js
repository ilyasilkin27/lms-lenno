import axios from 'axios';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_REG_DEV_URL || 'https://register-service-6wmk.onrender.com'}/api/register`,
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка регистрации');
  }
};
