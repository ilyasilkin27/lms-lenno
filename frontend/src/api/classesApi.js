import axios from "axios";

export const createClass = async (classData) => {
  try {
    if (!classData.name) {
      throw new Error("Название дисциплины обязательно");
    }

    const response = await axios.post(
      `${
        process.env.REACT_APP_CLASS_URL || "http://localhost:4003"
      }/api/classes`,
      classData
    );
    return response.data;
  } catch (error) {
    let errorMessage = "Ошибка при создании дисциплины";
    if (error.response) {
      errorMessage = error.response.data?.message || errorMessage;
    } else if (error.request) {
      errorMessage = "Сервер не ответил";
    }
    throw new Error(errorMessage);
  }
};

export const getAllClasses = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_CLASS_URL}/api/classes`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Ошибка при получении дисциплин"
    );
  }
};

export const getClassById = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_CLASS_URL}/api/classes/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Ошибка при получении дисциплины"
    );
  }
};

export const updateClass = async (id, classData) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_CLASS_URL}/api/classes/${id}`,
      classData
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Ошибка при обновлении дисциплины"
    );
  }
};

export const deleteClass = async (id) => {
  try {
    await axios.delete(`${process.env.REACT_APP_CLASS_URL}/api/classes/${id}`);
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Ошибка при удалении дисциплины"
    );
  }
}; 