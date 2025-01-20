import axios from 'axios';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      'http://localhost:5001/api/register',
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
