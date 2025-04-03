import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import '../assets/styles/modal.css';

const EventModal = ({ 
  show, 
  onHide, 
  title,
  type,
  eventTitle,
  setEventTitle,
  selectedEvent,
  onSubmit
}) => {
  const isCreate = type === 'create';
  const isDelete = type === 'delete';

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="modal-header">
        <Modal.Title className="modal-title">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isCreate && (
          <Form>
            <Form.Group>
              <Form.Label>Название события</Form.Label>
              <Form.Control
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="Введите название события"
                className="modal-input"
              />
            </Form.Group>
          </Form>
        )}
        {isDelete && (
          <p>Вы уверены, что хотите удалить событие "{selectedEvent?.title}"?</p>
        )}
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button 
          variant="secondary" 
          onClick={onHide}
          className="modal-btn-secondary"
        >
          Отмена
        </Button>
        <Button 
          variant={isDelete ? "danger" : "primary"}
          onClick={onSubmit}
          className={isDelete ? "modal-btn-danger" : "modal-btn-primary"}
        >
          {isDelete ? "Удалить" : "Создать"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventModal; 