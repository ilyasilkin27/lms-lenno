import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/loginUser.js';
import '../assets/styles/login.css';
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
    <div className='flex justify-center items-center h-screen relative login-container'>
      <div className='absolute top-0 left-0 ml-2 mt-2'>
        <img src={logo} alt='lenno' className='h-36' />
      </div>

      <div className='bg-white p-4 shadow-lg w-1/2 card-container'>
        <Link
          to='/'
          className='absolute top-0 right-0 m-3 bg-gray-200 text-gray-800 py-2 px-4 rounded'
        >
          &larr; Назад
        </Link>

        <h2 className='mb-4 text-center text-2xl font-bold'>Вход</h2>
        {error && <p className='text-red-500 text-center'>{error}</p>}
        {success && <p className='text-green-500 text-center'>{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label className='block mb-1'>Почта</label>
            <input
              type='email'
              className='border rounded p-2 w-full'
              placeholder='Введите почту'
              name='login'
              value={formData.login}
              onChange={handleChange}
              required
            />
          </div>
          <div className='mb-3'>
            <label className='block mb-1'>Пароль</label>
            <input
              type='password'
              className='border rounded p-2 w-full'
              placeholder='Введите пароль'
              name='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type='submit'
            className='bg-blue-500 text-white py-2 px-4 rounded'
          >
            Вход
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
