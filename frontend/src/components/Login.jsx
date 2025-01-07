import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../api/userService';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
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
      const response = await loginUser(formData);
      setSuccess(`Добро пожаловать, ${response.name}!`);
      setError('');
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 position-relative">
      <div className="position-absolute top-0 left-0 ms-3 mt-3">
        <img
          src="../../assets/logo.png"
          alt="lenno"
          style={{ height: '40px' }}
        />
      </div>

      <div className="card p-4 shadow-lg w-50">
        <Link
          to="/"
          className="btn btn-light position-absolute top-0 end-0 m-3"
        >
          &larr; Назад
        </Link>

        <h2 className="mb-4 text-center">Вход</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        {success && <p className="text-success text-center">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Почта</label>
            <input
              type="email"
              className="form-control"
              placeholder="Введите почту"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Пароль</label>
            <input
              type="password"
              className="form-control"
              placeholder="Введите пароль"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Вход
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
