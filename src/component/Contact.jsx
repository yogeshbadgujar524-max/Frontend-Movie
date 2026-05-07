import React, { useRef } from 'react'
import './Contact.css'
import { useLocation } from 'react-router-dom'
import { useEffect,useState } from 'react';
import axios from 'axios';

function Contact() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [issue,setIssue] = useState("");
  const [msg, setMsg] = useState("");


  const location = useLocation();
  const sub = useRef();
  
  const submit = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:3001/contact',{fullname,email,issue,msg})
    .then(result => console.log(result))
    .catch(err => console.log(err))

    if (email === "") {
      alert("Please Enter Email");
      return;
    }
    sub.current.innerText = "Message Deliver Successfully";
    sub.current.style.color = "green";
  }


  useEffect(() => {
    window.scrollTo(0,0);
  }, [location]);
  
  const image = <img src='https://media.istockphoto.com/id/2172494039/photo/business-help-desk.jpg?s=612x612&w=0&k=20&c=_Iay3_NildwBpTJK0SXEcrXPhoaf7r8lBwYwo9VU9vE='></img>
  return (
    <div>
      <div className='contact'>
        {image}
        <h1>Contact US</h1>
        <div className='contact-menu'>
          <h3>Ask how we can help you :</h3>
          <p>see our platform in action</p>
          <span>We can try to solve your problem in <br/>quick and fast in between 24 hours</span>
        </div>
      <form className='form' onSubmit={submit}>
        
        <div className='contact-contains'>
          <h2 ref={sub}></h2>
          <div className='u-name'>
          <label>Full Name</label>
          <input type='text' placeholder='Enter Your FullName' value={fullname} onChange={(e)=>setFullname(e.target.value)} required/>
          </div>
          <div className='e-mail'>
          <label>Email</label>
          <input type='text' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
          </div>
          <div className='issued'>
            <select value={issue} onChange={(e)=>setIssue(e.target.value)}>
              <option value="Select Issue">Select Issue</option>
              <option value="Booking Issued">Booking Issued</option>
              <option value="Seats Not Availble">Seats Not Availble</option>
              <option value="Ticket Not Found">Ticket Not Found</option>
              <option value="Transaction Failed">Transaction Failed</option>
              <option value="Other">Other</option>
            </select>
            </div>
          <br></br>
          <div className='c-msg'>
          <textarea placeholder='Message...' value={msg} onChange={(e)=>setMsg(e.target.value)} required></textarea>
          </div>
          <button>Send</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Contact
