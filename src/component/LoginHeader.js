import React, { useState } from 'react';
import '../Register.css';
import logo from '../asset/logo.jpg'

function LoginHeader() {
    return (
        <div className="register-header">
            <img src={logo} alt="Skynect Logo" className="logo" />
            <h1 className='company-heading'>SKYNECT</h1>
            <pre>Network . Connect . Grow</pre>
        </div>

    );
}

export default LoginHeader