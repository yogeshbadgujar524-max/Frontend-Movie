import React from 'react'
import './Home.css'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navigate, Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { motion } from 'motion/react';

function Home({ isLoggedIn }) {

  useEffect(() => {
    if (!isLoggedIn) {
      setTimeout(() => {
        Swal.fire({
          title: "Please First Login This Site",
          showConfirmButton: true,
          confirmButtonText: 'OK',
          confirmButtonColor: 'green',
          customClass: { confirmButton: 'Mybutton' },

          showClass: {
            popup: `
        animate__animated
        animate__fadeInUp
        animate__faster
      ` },
          hideClass: {
            popup: `
        animate__animated
        animate__fadeOutDown
        animate__faster
      ` }

        });
      }, 10000);
    }
  }, [])

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  const navgated = useNavigate();
  const movie = () => {
    navgated("/Movies");
  }
  return (
    <>
      <div className='home'>
        <div className='contains'>
          <h3>SECURE SEATES ,<br /> BOOK ALL TICKETS <br /><span>EFFORTLESSLLY</span></h3>
          <h6>Unlock unfogettable advanture with our easy to use ticket booking platform,where convenience meets choices <br />for every journey and events and make sure your intrested to watching the best movies</h6>
        </div>
        <div className='book-btn'>
          <button><a href='Movies'>Book Now</a></button>
          <button className='btn2'><Link to='Contact'>Contact Us</Link></button>
        </div>
        <div className='home-img'>
          <img src='https://media.istockphoto.com/id/1401019613/photo/movie-tickets-online-booking-app.jpg?s=612x612&w=0&k=20&c=qre7CchnzXeLh72GXH3sOiPvNKX2aNoxEIHV1DM9lwI='></img>
        </div>
        <div className='line'>

        </div>
         <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.8, type: "spring", stiffness: 20 }} className='boxes'>
          <div className='box'>
            <p>Join Now</p>
            <h3>Upcomming Film <br />Festivals</h3>
          </div>
          <div className='box'>
            <p>Watch Now</p>
            <h3>Watching Movies <br />Awards</h3>
          </div>
          <div className='box'>
            <p>Get Tickets</p>
            <h3>Watching Comedy <br />Shows</h3>
          </div>
        </motion.div>
        <div className='Home-movies'>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 20 }} className='home-main-movie'>
            <img src='https://static.toiimg.com/thumb/resizemode-4,width-1280,height-720,msid-126268362/126268362.jpg'></img>
            <div className='black'></div>
            <h2>The Kerala Story 2</h2>
            <p>Things get complicated when Kabir Dhaliwal,a secret agent, <br /> is accused of betraying his nation and his former batchmate <br /> Vikram is assigned the task of finding him.</p>
            <div className="dir">
              <marquee>
                Director : Sudipto Sen &nbsp; Writers : Sudipto Sen, Suryapal Singh &nbsp; Stars : Adah Sharma, Yogita Bihani, Sonia Balani</marquee>
            </div>
          </motion.div>
          <br></br>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 20 }} className='h-movies'>
            <div className='movie'>
              <img src='https://m.media-amazon.com/images/I/91R0hGWtbpL._UF1000,1000_QL80_.jpg'></img>

              <h3>Galionki Raasleela : Ram Leela</h3>
              <p>Type : Action</p>
            </div>
            <div className='movie'>
              <img src='https://m.media-amazon.com/images/M/MV5BYjAwZWE2NmUtYjFjYy00Y2EyLTg4OTgtNmQ0NTQyY2M0NjE1XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg'></img>

              <h3>Bahubali 2</h3>
              <p>Type : Action / Cultural</p>
            </div>
            <div className='movie'>
              <img src="https://m.media-amazon.com/images/M/MV5BNDM5ZWM2ZTktZTM5My00NGQzLWFkYmItZjAyNDU0ZTliOGIyXkEyXkFqcGc@._V1_.jpg"></img>

              <h3>Chennai Express</h3>
              <p>Type : Action</p>
            </div>
            <div className='movie'>
              <img src="https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p8173602_p_v8_ac.jpg"></img>

              <h3>Khatta Meetha</h3>
              <p>Type : Comedy</p>
            </div>
          </motion.div>
        </div>
        <button className='btn' onClick={movie}>See More....</button>
      </div>
    </>
  )
}

export default Home
