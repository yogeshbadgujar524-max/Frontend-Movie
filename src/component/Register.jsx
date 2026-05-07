import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import axios from 'axios'
import Swal from 'sweetalert2';

function Register() {
  const navigate = useNavigate();
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpass, setConfirmpass] = useState('');
  const [usertype,setUsertype] = useState('');
  const [secretkey,setSecretkey] = useState('');

const generatedUserId = () => {
  return Math.random().toString(36).substring(2,8) +
         Math.random().toString(36).substring(2,8);
};


  const handleRegister = async (e) => {
  e.preventDefault();

  if (password !== confirmpass) {
    alert("Passwords do not match");
    return;
  }

  const userid = generatedUserId();

  const newUser = {
    userid,
    fname,
    lname,
    email,
    phone,
    password
  };

  try {
    await axios.post('http://localhost:3001/register', newUser);

    Swal.fire({
      position: "center",
      icon: "success",
      title: "User Registered Successfully !!",
      showConfirmButton: true,
      confirmButtonText: 'OK',
      confirmButtonColor: 'green',
      customClass: { confirmButton: 'Mybutton' }
    });

    navigate('/login');
  } catch (err) {
    console.log(err);
    alert("Registration failed");
  }
};

  return (
    <div className="form-container">
      <h2>Register for Movie Ticket Booking</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group1">
          <label htmlFor="firstname">First Name</label>
          <input type="text" id="firstname" required value={fname}
            onChange={(e) => setFname(e.target.value)} />
        </div>

          <div className="form-group1">
          <label htmlFor="lastname">Last Name</label>
          <input type="text" id="lasttname" required value={lname}
            onChange={(e) => setLname(e.target.value)} />
        </div>

        <div className="form-group1">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" required value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-group1">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" required pattern="[0-9]{10}" maxLength="10" value={phone}
            onChange={(e) => setPhone(e.target.value)} />
        </div>

        <div className="form-group1">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required minLength="6" value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="form-group1">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" required minLength="6" value={confirmpass}
            onChange={(e) => setConfirmpass(e.target.value)} />
        </div>

        <button type="submit" className="btnre">Register</button>
      </form>

      <p className="login-link">Already have an account? <Link to="/Login">Login here</Link>.</p>
    </div>
  );
}

export default Register;
