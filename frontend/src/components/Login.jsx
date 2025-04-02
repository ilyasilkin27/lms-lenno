import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/loginUser.js';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import logo from '../assets/logo.png';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      await loginUser(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center min-vh-100 login-container'>
      <div className='position-absolute top-0 start-0 ms-2 mt-2'>
        <img src={logo} alt='lenno' className='h-36' />
      </div>

      <div className='bg-white p-4 shadow-lg w-50 card-container'>
        <Link
          to='/'
          className='position-absolute top-0 end-0 m-3 btn btn-secondary'
        >
          &larr; Назад
        </Link>

        <h2 className='mb-4 text-center'>Вход</h2>
        {error && <p className='text-danger text-center'>{error}</p>}
        {success && <p className='text-success text-center'>{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='form-label'>Почта</label>
            <input
              type='email'
              className='form-control'
              placeholder='Введите почту'
              name='login'
              value={formData.login}
              onChange={handleChange}
              required
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Пароль</label>
            <input
              type='password'
              className='form-control'
              placeholder='Введите пароль'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type='submit'
            className='btn btn-primary w-100'
          >
            Вход
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
