import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../assets/styles/createGroup.css';
import logo from '../assets/logo.png';
import { createGroup } from '../api/groupsApi';

function CreateGroup() {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState('');
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAddClass = () => {
    if (newClass.trim()) {
      setClasses([...classes, newClass.trim()]);
      setNewClass('');
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const groupData = {
        name: groupName,
        classes: classes
      };

      console.log('Отправляемые данные:', groupData);

      const response = await createGroup(groupData);
      console.log('Ответ сервера:', response);
      
      setSuccess('Группа успешно создана!');
      setError('');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      console.error('Ошибка при создании группы:', err);
      setError(err.message || 'Произошла ошибка при создании группы');
      setSuccess('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 position-relative create-group-container">
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

      <div className="card p-4 shadow-lg w-50 card-container">
        <Link
          to="/dashboard"
          className="btn btn-light position-absolute top-0 end-0 m-3 back-link"
        >
          &larr; Назад
        </Link>

        <h2 className="mb-4 text-center title">Создание группы</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        {success && <p className="text-success text-center">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Название группы</label>
            <input
              type="text"
              className="form-control input-field"
              placeholder="Введите название группы"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Классы</label>
            <div className="input-group mb-2">
              <input
                type="text"
                className="form-control input-field"
                placeholder="Добавить класс"
                value={newClass}
                onChange={(e) => setNewClass(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-custom"
                onClick={handleAddClass}
              >
                Добавить
              </button>
            </div>
            <div className="d-flex flex-wrap gap-2">
              {classes.map((classItem, index) => (
                <span key={index} className="badge bg-secondary">
                  {classItem}
                </span>
              ))}
            </div>
          </div>

          <button type="submit" className="btn submit-btn" disabled={isLoading}>
            {isLoading ? 'Создание...' : 'Создать группу'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateGroup; 