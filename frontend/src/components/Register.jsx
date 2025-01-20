import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../api/registerUser.js';
import '../assets/styles/register.css';
import logo from '../assets/logo.png';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    login: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      setSuccess('Регистрация прошла успешно!');
      setError('');
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 position-relative register-container">
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
          to="/"
          className="btn btn-light position-absolute top-0 end-0 m-3 back-link"
        >
          &larr; Назад
        </Link>

        <h2 className="mb-4 text-center title">Регистрация</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        {success && <p className="text-success text-center">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Имя</label>
            <input
              type="text"
              className="form-control input-field"
              placeholder="Введите имя"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Фамилия</label>
            <input
              type="text"
              className="form-control input-field"
              placeholder="Введите фамилию"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Почта</label>
            <input
              type="email"
              className="form-control input-field"
              placeholder="Введите почту"
              name="login"
              value={formData.login}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Пароль</label>
            <input
              type="password"
              className="form-control input-field password"
              placeholder="Введите пароль"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn submit-btn">
            Регистрация
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
