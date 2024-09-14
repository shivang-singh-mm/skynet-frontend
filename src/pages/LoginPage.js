import React from 'react'
import LoginForm from '../component/LoginForm'
import LoginHeader from '../component/LoginHeader'
import { useNavigate } from 'react-router-dom'


function LoginPage() {
    const navigate = useNavigate();

  return (
    <div className='register-container'>
        <LoginHeader />
        <LoginForm />

        <a className="login-link pb-24" onClick={() => navigate('/register')} href="#">
            Don't have an account
        </a>
    </div>
  )
}

export default LoginPage