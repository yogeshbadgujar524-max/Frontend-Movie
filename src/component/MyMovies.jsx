import React, {useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './Profile.css';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

function MyMovies() {
  const [bookedMovies, setBookedMovies] = useState([]);

  const location = useLocation();

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

const cancelBooked = async (index) => {
  const movie = bookedMovies[index];
  const bookingId = movie.bookingId;

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, cancel it!",
  }).then(async (result) => {

    if (result.isConfirmed) {

      try {

        await axios.delete(
          `https://backend-movie-vvyk.vercel.app/booking/${bookingId}`
        );

        setBookedMovies((prev) =>
          prev.filter((_, i) => i !== index)
        );

        Swal.fire({
          title: "Deleted!",
          text: "Your booking has been cancelled.",
          icon: "success",
        });

      } catch (error) {

        console.log(error);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to cancel booking.",
        });
      }
    }
  });
};

  useEffect(() => {
  const fetchBookings = async () => {
    try {
      const email = localStorage.getItem("email");

      const res = await axios.get(
        `https://backend-movie-vvyk.vercel.app/booking/user/${email}`
      );

      setBookedMovies(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  fetchBookings();
}, []);

  const handleShowDetails = (movie) => {
    setSelectedMovie(movie);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedMovie(null);
  };

  return (
    <>
      <div className="main-movies">

        <h1 className="page-title">My Booked Movies</h1>

        {bookedMovies.length === 0 ? (
          <div className="empty-box">
            <p>No movies booked yet.</p>

            <Link to="/Movies" className="book-link">
              Book Your Favorite Movie Here
            </Link>
          </div>
        ) : (
          bookedMovies.map((movie, index) => (
            <div
              key={index}
              className="movie-card"
              onClick={() => handleShowDetails(movie)}
            >
              <img src={movie.image} alt="" className="movie-image" />

              <div className="movie-content">
                <h2>
                  <i className="fa-solid fa-film"></i> {movie.title}
                </h2>

                <p className="booking-id">
                  Booking ID: {movie.bookingId}
                </p>

                <p className="price">
                  Total Paid : ₹{movie.totalPrice}
                </p>

                

                <button
                  className="cancelbtn"
                  onClick={(e) => {
                    e.stopPropagation();
                    cancelBooked(index);
                  }}
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showDetails && selectedMovie && (
        <>
          <div
            className="details-overlay"
            onClick={handleCloseDetails}
          ></div>

          <div className="details-popup">

            <h2>
              <i className="fa-solid fa-film"></i>
              {selectedMovie.title}
            </h2>

            <p><b>Booking ID:</b> {selectedMovie.bookingId}</p>

            <p>
              <i className="fa-solid fa-chair"></i>
              Seats : {selectedMovie.selectedSeats}
            </p>

            <p>
              <i className="fa-solid fa-ticket"></i>
              Mode : {selectedMovie.selectedMode}
            </p>

            <p>
              <i className="fa-solid fa-calendar-days"></i>
              Date : {selectedMovie.selectedDate}
            </p>

            <p>
              <i className="fa-solid fa-clock"></i>
              Time : {selectedMovie.selectedTime}
            </p>

            <p>
              Booked By :
              <span className="email">
                {selectedMovie.email}
              </span>
            </p>

            <div className="status">
              <input type="checkbox" checked readOnly />
              <span>Completed</span>
            </div>

            <button
              onClick={handleCloseDetails}
              className="close-btn"
            >
              Close
            </button>

          </div>
        </>
      )}
    </>
  );
}

export default MyMovies;