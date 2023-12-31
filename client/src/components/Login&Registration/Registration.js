import React from 'react'
import "../../css/Login&Registrationcss/Registration.css"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Registration() {
  const navigate = useNavigate()
  const [email_id, setEmail_id] = useState('')
  const [password_user, setPassword_user] = useState('')
  const [error, setError] = useState(null);
  const [phone_no, setPhone_no] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email_id) {
      toast.error("Email is required")
      setTimeout(() => setError(''), 3000);
      return
    }
    if (!emailPattern.test(email_id)) {
      toast.error('Email should be in the correct format.');
      setTimeout(() => setError(''), 3000);
      return;
    }

    const phonePattern = /^\d{10}$/;
    if (!phone_no) {
      toast.error("Phone number is required");
      setTimeout(() => setError(''), 3000);
      return;
    }
    if (!phonePattern.test(phone_no)) {
      toast.error('Phone number should be exactly 10 digits.');
      setTimeout(() => setError(''), 3000);
      return;
    }

    // Validate password format using regular expression
    if (!password_user) {
      toast.error('Password is required')
      setTimeout(() => setError(''), 3000);
      return

    }
    const passwordPattern = /^(?=.*[A-Za-z0-9@])[A-Za-z0-9@]{6}$/;
    if (!passwordPattern.test(password_user)) {
      toast.error('Password should have 6 alphanumeric characters.');
      setTimeout(() => setError(''), 3000);
      return
    }
    if (password_user.length > 6) {
      toast.error('Password must not exceed 6 alphanumeric characters')
      setTimeout(() => {
        setError('')
      }, 3000);
    }
    if (!retypePassword) {
      toast.error("Retype password is required");
      setTimeout(() => setError(''), 3000);
      return;
    }
    if (password_user !==retypePassword) {
    toast.error('Password do not match Retype the correct password')
      setTimeout(() => {
        setError('')
      }, 3000)
      return;
    }


    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_id, password_user }),
      });

      const data = await response.json();

      if (response.ok) {
        setError('');
        setTimeout(() => setError(''), 1000);
        console.log(data.message);
        navigate("/login")
      } else {
        setError(data.error);
        setTimeout(() => setError(''), 5000);
      }
    }
    catch (error) {
      console.error('Error:', error);
      setError('An error occurred during registration.');
      setTimeout(() => setError(''), 5000);
    }
    e.target.reset();
  };

  return (
    <div className='Registration'>
      <div className='container-registration'>
        <div className='register-container'>
        <h4> Registration</h4>
          <form className='form-register' onSubmit={handleRegister} autoComplete='off'>
            <div className='input-fields'>
              <input type="text"  value={email_id} className='all-input' onChange={(e) => setEmail_id(e.target.value)}></input>
              <label for="fields" className="label-fields">
                <span className='content-fields'>Email_id...</span>
              </label>
            </div>
            <div className='input-fields'>
            <input type="text"  className='all-input' onChange={(e) => setPhone_no(e.target.value)}></input>
            <label for="fields" className="label-fields">
                <span className='content-fields'>Phone_no...</span>
              </label>
            </div>
            <div className='input-fields'>
            <input type="password"  value={password_user} className='all-input' onChange={(e) => setPassword_user(e.target.value)}></input>
            <label for="fields" className="label-fields">
                <span className='content-fields'>Password...</span>
              </label>
            </div>
            <div className='input-fields'>
            <input type="password" className='all-input' onChange={(e) => setRetypePassword(e.target.value)}></input>
            <label for="fields" className="label-fields">
                <span className='content-fields'>Retype_password...</span>
              </label>
            </div>
            <div><button className='signup'>Sign up</button></div>
          </form>
          <div className='exist-account'>Already have an Account? <Link to="/login" className='link'>Login</Link></div>
        </div>
        <div className='header-register'>
        </div>
      </div>
      <ToastContainer limit={1} position={'top-right'} pauseOnHover={false} pauseOnFocusLoss={false} draggable={false} closeOnClick={false}/>
    </div>

  )
}

export default Registration