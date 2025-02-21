import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/dashboard.css';
import logo from '../assets/logo.png';

function Dashboard() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 position-relative dashboard-container">
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
        <div className="d-flex flex-column justify-content-center align-items-center vh-10">
          <h1 className="title mb-4">Рабочее пространство</h1>
          <div className="d-grid gap-3 w-100">
            <Link
              to="/create-group"
              className="btn btn-custom btn-lg"
            >
              Создать группу
            </Link>
            <Link
              to="/create-discipline"
              className="btn btn-custom btn-lg"
            >
              Создать дисциплину
            </Link>
            <Link
              to="/create-student"
              className="btn btn-custom btn-lg"
            >
              Создать ученика
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
