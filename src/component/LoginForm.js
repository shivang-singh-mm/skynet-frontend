import '../Register.css';
import { useEffect, useState } from 'react';
import { loginUser, registerUser } from '../slicer/authSlicer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function LoginForm() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();


  useEffect(() => {
    if (status === 'succeeded' && user) {
      navigate('/')
    }
  }, [status, user, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
    dispatch(loginUser(form))
  };
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h1 className='register-heading'> Sign In </h1>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter a password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>

      {status === 'loading' && <div class="info-msg">
        <i class="fa fa-info-circle"></i>
        Give us time to process.
      </div>}
      {status === 'failed' && <div class="error-msg">
        <i class="fa fa-times-circle"></i>
        Something went wrong.
      </div>}
    </div>
  );
}

export default LoginForm
