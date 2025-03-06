import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../assets/styles/createDiscipline.css';
import logo from '../assets/logo.png';
import { createClass } from '../api/classesApi';

function CreateDiscipline() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const classData = { name };
      await createClass(classData);
      
      setSuccess('Дисциплина успешно создана!');
      setError('');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Произошла ошибка при создании дисциплины');
      setSuccess('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 position-relative create-discipline-container">
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

        <h2 className="mb-4 text-center title">Создание дисциплины</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        {success && <p className="text-success text-center">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Название дисциплины</label>
            <input
              type="text"
              className="form-control input-field"
              placeholder="Введите название дисциплины"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn submit-btn" disabled={isLoading}>
            {isLoading ? 'Создание...' : 'Создать дисциплину'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateDiscipline; 