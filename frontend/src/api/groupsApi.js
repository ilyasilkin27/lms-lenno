import axios from "axios";

export const createGroup = async (groupData) => {
  try {
    if (!groupData.name) {
      throw new Error("Имя группы обязательно");
    }

    if (!groupData.classes || groupData.classes.length === 0) {
      groupData.classes = null;
    }

    console.log("Отправка данных на сервер:", groupData);
    const response = await axios.post(
      `${
        process.env.REACT_APP_GROUP_URL || "https://groupservice.onrender.com"
      }/api/groups`,
      groupData
    );
    console.log("Ответ сервера:", response.data);
    return response.data;
  } catch (error) {
    console.error("Ошибка API:", {
      message: error.message,
      response: error.response,
      request: error.request,
      config: error.config,
    });

    let errorMessage = "Ошибка при создании группы";
    if (error.response) {
      errorMessage = error.response.data?.message || errorMessage;
    } else if (error.request) {
      errorMessage = "Сервер не ответил";
    }

    throw new Error(errorMessage);
  }
};

export const getAllGroups = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_GROUP_URL}/api/groups`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Ошибка при получении групп"
    );
  }
};

export const getGroupById = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_GROUP_URL}/api/groups/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Ошибка при получении группы"
    );
  }
};

export const updateGroup = async (id, groupData) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_GROUP_URL}/api/groups/${id}`,
      groupData
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Ошибка при обновлении группы"
    );
  }
};

export const deleteGroup = async (id) => {
  try {
    await axios.delete(`${process.env.REACT_APP_GROUP_URL}/api/groups/${id}`);
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Ошибка при удалении группы"
    );
  }
};

export const addStudentToGroup = async (groupId, studentId) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_GROUP_URL}/api/groups/${groupId}/students`,
      { studentId }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Ошибка при добавлении ученика"
    );
  }
};

export const removeStudentFromGroup = async (groupId, studentId) => {
  try {
    await axios.delete(
      `${process.env.REACT_APP_GROUP_URL}/api/groups/${groupId}/students/${studentId}`
    );
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Ошибка при удалении ученика"
    );
  }
};
