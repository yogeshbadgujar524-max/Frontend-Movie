import React, { useRef } from 'react'
import './Footer.css'
import { useLocation } from 'react-router-dom';

function Footer() {
  
  const location = useLocation();
  const myref = useRef();
  const backtotop = () =>{
    window.scrollTo({top:0,left:0,behavior:"smooth"});
    myref.current.style.transition = "5s";
  }
  
  return (
    <div className='footer'>
  <footer> 
    <div className = "foot1">
            <p onClick={backtotop} ref={myref}>Back To Top</p>
        </div>
    <div className = "foot2">
        <h5>Reserved All Rights And &copy; Copyright</h5>
        <ul className = "head">
            <h6>Connect with Us</h6>
            <li><i className="fa-brands fa-facebook"></i></li>
            <li><i className="fa-brands fa-twitter"></i></li>
            <li><i className="fa-brands fa-instagram"></i></li>

        </ul>
        </div>
        <div className='foot3'>
        <ul className = "head2">
            <h4>Let Us Help You</h4>
            <li>Your Account</li>
            <li>Booking Centre</li>
            <li>100% Protections</li>
            <li>M4YOU App Download</li>
            <li>Help</li>
        </ul>
        </div>
    </footer>
    </div>
  )
}

export default Footer
