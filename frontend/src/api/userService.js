import axios from 'axios';

const USER_API_URL = 'https://lms-lenno-user-service.onrender.com/api/users';

export const getUserData = async (userId) => {
  try {
    const response = await axios.get(`${USER_API_URL}/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Ошибка получения данных пользователя');
  }
};
