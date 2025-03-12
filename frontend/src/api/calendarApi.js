import axios from "axios";

export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_CALENDAR_URL || "http://localhost:4004"}/api/calendar/events`,
      eventData
    );
    return response.data;
  } catch (error) {
    let errorMessage = "Ошибка при создании события";
    if (error.response) {
      errorMessage = error.response.data?.message || errorMessage;
    } else if (error.request) {
      errorMessage = "Сервер не ответил";
    }
    throw new Error(errorMessage);
  }
};

export const getAllEvents = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_CALENDAR_URL || "http://localhost:4004"}/api/calendar/events`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Ошибка при получении событий"
    );
  }
};

export const getEventById = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_CALENDAR_URL || "http://localhost:4004"}/api/calendar/events/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Ошибка при получении события"
    );
  }
};

export const updateEvent = async (id, eventData) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_CALENDAR_URL || "http://localhost:4004"}/api/calendar/events/${id}`,
      eventData
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Ошибка при обновлении события"
    );
  }
};

export const deleteEvent = async (id) => {
  try {
    await axios.delete(
      `${process.env.REACT_APP_CALENDAR_URL || "http://localhost:4004"}/api/calendar/events/${id}`
    );
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Ошибка при удалении события"
    );
  }
}; 