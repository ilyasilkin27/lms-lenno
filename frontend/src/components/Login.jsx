import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 position-relative">
      <div className="position-absolute top-0 left-0 ms-3 mt-3">
        <img src="" alt="lenno" style={{ height: '40px' }} />
      </div>

      <div className="card p-4 shadow-lg w-50">
        <Link to="/" className="btn btn-light position-absolute top-0 end-0 m-3">
          &larr; Назад
        </Link>
        
        <h2 className="mb-4 text-center">Вход</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Почта</label>
            <input type="email" className="form-control" placeholder="Введите почту" />
          </div>
          <div className="mb-3">
            <label className="form-label">Пароль</label>
            <input type="password" className="form-control" placeholder="Введите пароль" />
          </div>
          <button type="submit" className="btn btn-primary w-100">Вход</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
