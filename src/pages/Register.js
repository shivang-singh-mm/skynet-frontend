import React, { useState } from 'react';
import '../Register.css';
import LoginHeader from '../component/LoginHeader';
import RegisterForm from '../component/RegisterForm';
import { useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate();


  return (
    <div className="register-container">
      <LoginHeader />

      <RegisterForm />

      <a className="login-link pb-24" onClick={() => navigate('/login')} href="#">
        Already have an account
      </a>

    </div>
  );
}

export default Register;
