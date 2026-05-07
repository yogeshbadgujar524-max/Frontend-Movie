import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
import './Movies.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import TrendingMovies from './TrendingMovies';
import MostWatchedMovies from './MostWatchedMovies';
import UnderratedMovies from './UnderratedMovies';
import { useNavigate } from 'react-router-dom';
import VideoPlayer from './VideoPlayer';
import { BookingContext } from './BookingContext';
import Swal from 'sweetalert2';
import { motion } from 'motion/react';

// https://i.ytimg.com/vi/tPlRgVCeBT8/maxresdefault.jpg

function Movies({ isLoggedIn }) {

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
      }, 5000);
    }
  }, [])

  const [play, setPlay] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { setDrop } = useContext(BookingContext);

  // Merge all movies in one list
  const allMovies = [
    ...TrendingMovies,
    ...MostWatchedMovies,
    ...UnderratedMovies
  ];

  // Filter movies by search input
  const filteredMovies = allMovies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const bhootbanglow = <img src='https://assets-in.bmscdn.com/discovery-catalog/events/et00411383-tpdjlgfwyz-landscape.jpg' alt="Bhoth Banglow"></img>
  const slider = useRef();
  const slider2 = useRef();
  const slider3 = useRef();
  let tx = 0;


  const SlideForward1 = () => {
    if (tx > -48) {
      tx -= 14;
    }
    slider.current.style.transform = `translateX(${tx}%)`;
    slider.current.style.transition = '1.8s';

  }

  const SlideBackward1 = () => {
    if (tx < 0) {
      tx += 15;
    }
    slider.current.style.transform = `translateX(${tx}%)`;
    slider.current.style.transition = '1.8s';
  }

  const SlideForward2 = () => {
    if (tx > -50.1) {
      tx -= 12;
    }
    slider2.current.style.transform = `translateX(${tx}%)`;
    slider2.current.style.transition = '1.8s';
  }

  const SlideBackward2 = () => {
    if (tx < 0) {
      tx += 12;
    }
    slider2.current.style.transform = `translateX(${tx}%)`;
    slider2.current.style.transition = '1.8s';
  }

  const SlideForward3 = () => {
    if (tx > -16) {
      tx -= 15;
    }
    slider3.current.style.transform = `translateX(${tx}%)`;
    slider3.current.style.transition = '1.8s';
  }

  const SlideBackward3 = () => {
    if (tx < 0) {
      tx += 15;
    }
    slider3.current.style.transform = `translateX(${tx}%)`;
    slider3.current.style.transition = '1.8s';
  }

  // const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <div className="searchbar">
        <input
          type="text"
          id="search"
          placeholder='Enter the Movie Title'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i className='fa-solid fa-magnifying-glass'></i>
      </div>
      {/* SEARCH RESULTS SECTION */}
      {searchTerm.trim() !== "" && (
        <div className="search-results" style={{ height: "1000px" }}>

          <div className="current-movies" style={{ marginBottom: "40px", position: "relative", top: "-20px" }}>
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie, index) => (
                <div className='current-movie' key={index}>
                  <div className='m-image'>
                    <img src={movie.image} alt={movie.title} />
                  </div>

                  <h3 className='m-title'>
                    {movie.title} <i>({movie.year})</i>
                  </h3>

                  <p className='type'>Type : {movie.type}</p>
                  <p className='price'>₹ {movie.price}</p>

                  <button className='booking'>
                    <Link to={`/movie/${movie.category.toLowerCase().replace(" ", "")}/${movie.id}`}>
                      Book Now
                    </Link>
                  </button>
                </div>
              ))
            ) : (
              <p style={{ padding: "20px", position: "relative", bottom: "50px", left: "350px", fontSize: "xx-large", color: "red" }}>No movies found.</p>
            )}
          </div>
        </div>
      )}
      {/* END SEARCH RESULTS */}
      {searchTerm.trim() === "" &&
        <>
          <div className="slider-wrapper" onClick={() => setDrop(false)}>
            <form action="#">
              <div className="catlog">
                <h3>Categories</h3>
                <input type='checkbox' />
                <label>Advanture</label><br></br>
                <input type='checkbox' />
                <label>Action</label><br></br>
                <input type='checkbox' />
                <label>Anime</label><br></br>
                <input type='checkbox' />
                <label>Comedy</label><br></br>
                <input type='checkbox' />
                <label>Drama</label><br></br>
                <input type='checkbox' />
                <label>Emotional</label><br></br>
                <input type='checkbox' />
                <label>Fantacy</label><br></br>
                <input type='checkbox' />
                <label>Geography</label><br></br>
                <input type='checkbox' />
                <label>Horror</label><br></br>
                <input type='checkbox' />
                <label>Love-Story</label><br></br>
                <input type='checkbox' />
                <label>Music</label><br></br>
                <input type='checkbox' />
                <label>Romantic</label><br></br>
                <input type='checkbox' />
                <label>Sci-Fy</label><br></br>
                <br></br>
                <h3>Languages</h3>
                <input type='checkbox' />
                <label>English</label><br></br>
                <input type='checkbox' />
                <label>Marathi</label><br></br>
                <input type='checkbox' />
                <label>Hindi</label><br></br>
                <input type='checkbox' />
                <label>Tamil</label><br></br>
                <br></br>
                <h3>Time</h3>
                <input type="radio" name='time' />
                <label>Morning</label><br></br>
                <input type="radio" name='time' />
                <label>Evening</label><br></br>
                <input type="radio" name='time' />
                <label>Night</label><br></br>
                <button className='btn'>Apply</button>
              </div>
            </form>
            <div className="main-movie">
              <div className='img'>
                {bhootbanglow}
                <p className='upcomming-title'>Upcomming movie</p>
                <div className='btns'>
                  <button className='btn43' onClick={() => { alert("This Movie Is Not Released Please wait 5-6 days for booking....") }}>Book Now</button>
                  <button className='alt' onClick={() => setPlay(true)}>Play Trailer</button>
                </div>
              </div>
            </div>

             <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 20 }} className='lounch'>
              <h3>Trending Now</h3>
            </motion.div>
            <div className='right'>
              <i className="fa-solid fa-chevron-right" onClick={SlideForward1}></i>
            </div>
            <div className='left'>
              <i className="fa-solid fa-chevron-left" onClick={SlideBackward1}></i>
            </div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 20 }}
              className='current-movies' ref={slider}>
              {TrendingMovies.filter(movie => movie.category === "Trending").map((movie, index) => (
                <div className='current-movie' key={index}>
                  <div className='m-image'>
                    <img src={movie.image} alt={movie.title} />
                  </div>
                  <h3 className='m-title'>{movie.title} <i>({movie.year})</i></h3>
                  <p className='type'>Type : {movie.type}</p>
                  <p className='price'>₹ {movie.price}</p>
                  <p hidden>{movie.desc}</p>
                  <p hidden>{movie.director}</p>
                  <p hidden>{movie.writers}</p>
                  <p hidden>{movie.stars}</p>
                  <button className='booking'><Link to={`/movie/trending/${movie.id}`}>Book Now</Link>
                  </button>
                </div>
              ))}
            </motion.div>

             <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 20 }} className='lounch'>
              <h3>Most Watched</h3>
            </motion.div>
            <div className='right'>
              <i className="fa-solid fa-chevron-right" onClick={SlideForward2}></i>
            </div>
            <div className='left'>
              <i className="fa-solid fa-chevron-left" onClick={SlideBackward2}></i>
            </div>

             <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 20 }} className='top-movies' ref={slider2}>

              {MostWatchedMovies.filter(movie => movie.category === "Most Watched").map((movie, index) => (
                <div className='top-movie' key={index}>
                  <div className='m-image'>
                    <img src={movie.image} alt={movie.title} />
                  </div>
                  <h3 className='m-title'>{movie.title} <i>({movie.year})</i></h3>
                  <p className='type'>Type : {movie.type}</p>
                  <p className='price'>₹ {movie.price}</p>
                  <p hidden>{movie.desc}</p>
                  <p hidden>{movie.director}</p>
                  <p hidden>{movie.writers}</p>
                  <p hidden>{movie.stars}</p>
                  <button className='booking'><Link to={`/movie/mostwatched/${movie.id}`}>Book Now</Link>
                  </button>
                </div>
              ))}
            </motion.div>
             <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 20 }} className='lounch'>
              <h3>Underrated</h3>
            </motion.div>
            <div className='right'>
              <i className="fa-solid fa-chevron-right" onClick={SlideForward3}></i>
            </div>
            <div className='left'>
              <i className="fa-solid fa-chevron-left" onClick={SlideBackward3}></i>
            </div>

             <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 20 }} className='top-movies' ref={slider3}>

              {UnderratedMovies.filter(movie => movie.category === "Underrated").map((movie, index) => (
                <div className='top-movie' key={index}>
                  <div className='m-image'>
                    <img src={movie.image} alt={movie.title} />
                  </div>
                  <h3 className='m-title'>{movie.title} <i>({movie.year})</i></h3>
                  <p className='type'>Type : {movie.type}</p>
                  <p className='price'>₹ {movie.price}</p>
                  <p hidden>{movie.desc}</p>
                  <p hidden>{movie.director}</p>
                  <p hidden>{movie.writers}</p>
                  <p hidden>{movie.stars}</p>
                  <button className='booking'><Link to={`/movie/underrated/${movie.id}`}>Book Now</Link>

                  </button>

                </div>

              ))}
            </motion.div>
          </div>
        </>
      }
      {/* {play &&
  <div className="video">
  <VideoPlayer/>
  </div>
  } */}
      {play &&
        <VideoPlayer onClose={() => setPlay(false)} />}
    </>
  )
}

export default Movies
