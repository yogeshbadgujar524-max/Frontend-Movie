import { Link, NavLink, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef, useContext } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './Navbar.css';
import { BookingContext } from './BookingContext';

function Navbar({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();
  const [sticky, setSticky] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const {drop,setDrop} = useContext(BookingContext);

  // Update admin state when login or userType changes
  useEffect(() => {
    const userType = localStorage.getItem('userType');
    setIsAdmin(userType === 'Admin');
  }, [isLoggedIn]); // <— re-run whenever login state changes
  // Sticky Navbar on scroll
  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dropdown Toggle
  const toggleDropdown = () => setDrop(true);
  
  // Smooth Scroll Handlers
  const trClick = () => window.scrollTo({ top: 865, behavior: 'smooth' });
  const MostwatchClick = () => window.scrollTo({ top: 1565, behavior: 'smooth' });
  const UnderretedClick = () => window.scrollTo({ top: 2265, behavior: 'smooth' });
const prologgedin = localStorage.getItem("isLoggedIn");

  // Logout Function
  const Logout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to logout!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Logged out!',
          text: 'You have successfully logged out.',
          icon: 'success',
          confirmButtonText:'Ok',
                customClass:{
              confirmButton:'Mybutton'
            }
        });
        onLogout();
        localStorage.removeItem('userType');
        localStorage.removeItem("email");
        navigate('/login');
      }
    });
  };

  return (
    <div className="head">
      <nav className={sticky ? 'change' : ''}>
        <ul>
          {!isAdmin ?
          <h2>M4You</h2>:<h2 style={{marginLeft:"100px",color:"yellowgreen"}}>Admin Site</h2>}

          {isAdmin ? (
            <>
            <div className="admin">
            <li>
              <NavLink to="/Dashboard">Users Data</NavLink>
            </li>
            <li>
              <NavLink to="/userbookings">Bookings</NavLink>
            </li>
            <li>
              <NavLink to="/userqueries">Contacts Details</NavLink>
            </li>
            </div>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>

              <li className="dropdown-parent">
                <NavLink to="/Movies">
                  Movies <i className="fas fa-caret-down" onClick={toggleDropdown}></i>
                </NavLink>
                {drop && (
                  <div className="drop-down">
                    <ul>
                      <li onClick={trClick}>Trending</li>
                      <li onClick={MostwatchClick}>Most Watched</li>
                      <li onClick={UnderretedClick}>Underrated</li>
                    </ul>
                  </div>
                )}
              </li>
              {isLoggedIn &&
              <li>
                <NavLink to="/Contact">Contact</NavLink>
              </li>}
            </>
          )}
        </ul>

        <div className="para1">
          <div className="login">
            {isLoggedIn && prologgedin ? (
              <button className="logout" onClick={Logout}>
                <i className="fa-solid fa-right-to-bracket"></i>
              </button>
            ) : (
              <div className="loginvis">
                <Link to="/Login">Login</Link>
              </div>
            )}
          </div>
        </div>

        {!isAdmin && (
          <>
            <div className="user">
              <Link to="/Profile">
                <i className="fa-sharp fa-solid fa-circle-user"></i>
              </Link>
            </div>
            <div className="map">
              <i className="fa-solid fa-location-crosshairs"></i>
              <p>Map</p>
            </div>
          </>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
