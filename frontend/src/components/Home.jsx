import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/home.css';
import logo from '../assets/logo.png';

function Home() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 position-relative home-container">
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
        <div className="d-flex justify-content-center align-items-center vh-10">
          <div className="text-center">
            <Link
              to="/register"
              className="btn btn-primary btn-lg me-3 btn-custom"
            >
              Регистрация
            </Link>
            <Link
              to="/login"
              className="btn btn-secondary btn-lg btn-outline-custom"
            >
              Вход
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
