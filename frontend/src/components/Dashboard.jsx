import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../assets/styles/dashboard.css';
import logo from '../assets/logo.png';
import { getAllEvents, createEvent, deleteEvent } from '../api/calendarApi';
import EventModal from './EventModal';

const localizer = momentLocalizer(moment);

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await getAllEvents();
        const formattedEvents = eventsData.map(event => ({
          id: event.id,
          title: event.summary,
          start: new Date(event.start.dateTime),
          end: new Date(event.end.dateTime),
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error('Ошибка при загрузке событий:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setModalType('create');
    setShowModal(true);
  };

  const handleCreateEvent = async () => {
    if (!newEventTitle.trim()) return;

    try {
      const eventData = {
        summary: newEventTitle,
        startDateTime: selectedSlot.start.toISOString(),
        endDateTime: selectedSlot.end.toISOString(),
      };
      const createdEvent = await createEvent(eventData);
      const formattedEvent = {
        id: createdEvent.id,
        title: createdEvent.summary,
        start: new Date(createdEvent.start.dateTime),
        end: new Date(createdEvent.end.dateTime),
      };
      setEvents([...events, formattedEvent]);
      setShowModal(false);
      setNewEventTitle('');
    } catch (error) {
      console.error('Ошибка при создании события:', error);
    }
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setModalType('delete');
    setShowModal(true);
  };

  const handleDeleteEvent = async () => {
    try {
      await deleteEvent(selectedEvent.id);
      setEvents(events.filter(e => e.id !== selectedEvent.id));
      setShowModal(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error('Ошибка при удалении события:', error);
    }
  };

  const getModalProps = () => {
    if (modalType === 'create') {
      return {
        title: 'Создание события',
        type: 'create',
        eventTitle: newEventTitle,
        setEventTitle: setNewEventTitle,
        onSubmit: handleCreateEvent
      };
    }
    return {
      title: 'Удаление события',
      type: 'delete',
      selectedEvent,
      onSubmit: handleDeleteEvent
    };
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 position-relative dashboard-container">
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          marginLeft: '10px',
          marginTop: '10px',
        }}
      >
        <img src={logo} alt="lenno" style={{ height: '150px' }} />
      </div>
      <div className="card p-4 shadow-lg w-10 card-container">
        <div className="d-flex flex-column justify-content-center align-items-center vh-10">
          <h1 className="title mb-4">Рабочее пространство</h1>
          <div className="d-grid gap-3 w-100">
            <Link
              to="/create-group"
              className="btn btn-custom btn-lg"
            >
              Создать группу
            </Link>
            <Link
              to="/create-discipline"
              className="btn btn-custom btn-lg"
            >
              Создать дисциплину
            </Link>
            <Link
              to="/create-student"
              className="btn btn-custom btn-lg"
            >
              Создать ученика
            </Link>
          </div>
          <div className="mt-4 w-100">
            <h3>Календарь событий</h3>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              selectable
              onSelectSlot={handleSelectSlot}
              onSelectEvent={handleSelectEvent}
            />
          </div>
        </div>
      </div>

      <EventModal
        show={showModal}
        onHide={() => setShowModal(false)}
        {...getModalProps()}
      />
    </div>
  );
};

export default Dashboard;
