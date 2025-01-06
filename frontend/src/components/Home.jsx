import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 position-relative">
      <div className="card p-4 shadow-lg w-10">
        <div className="d-flex justify-content-center align-items-center vh-10">
          <div className="text-center">
            <h1 className="mb-4">lenno</h1>
            <Link to="/register" className="btn btn-primary btn-lg me-3">
              Регистрация
            </Link>
            <Link to="/login" className="btn btn-secondary btn-lg">
              Вход
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
