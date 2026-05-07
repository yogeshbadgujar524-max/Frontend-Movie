import React, { useContext, useEffect, useState } from 'react';
import { BookingContext } from './BookingContext';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './Profile.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function MyMovies() {
  const { bookedMovies, cancelBooking } = useContext(BookingContext);
  
  const location = useLocation();

  const [selectedMovie, setSelectedMovie] = useState(null); // store clicked movie
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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3001/booking/${bookingId}`);
          cancelBooking(index);

          Swal.fire({
            title: "Deleted!",
            text: "Your movie booking has been cancelled.",
            icon: "success",
            confirmButtonText: "OK",
            customClass:{
              confirmButton:'Mybutton'
            }
          });
        } catch (error) {
          console.error("Error deleting booking:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to cancel booking. Please try again later.",
          });
        }
      }
    });
  };

  // When clicking on a movie, show its details
  const handleShowDetails = (movie) => {
    setSelectedMovie(movie);
    
    setShowDetails(true);
  };

  // Close popup
  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedMovie(null);
  };

  return (
    <>
      <div className="MainMovies">
        <h1
          style={{
            position: "relative",
            left: "450px",
            bottom: "50px",
            fontSize: "45px",
            color: "white",
          }}
        >
          My Booked Movies
        </h1>

        {bookedMovies.length === 0 ? (
          <p style={{ position: "relative",
              left: "480px",
              bottom: "50px",
              fontSize: "30px",
              color: "orange",
            }}
          >
            No movies booked yet.
            <a
              href="/Movies"
              style={{
                textDecoration: "none",
                position: "relative",
                top: "60px",
                right: "300px",
                color: "AppWorkspace",
              }}
            >
              Book Your favorite movie&nbsp;
              <span style={{ color: "yellowgreen", fontWeight: "lighter" }}>
                Here
              </span>
            </a>
          </p>
        ) : (
          bookedMovies.map((movie, index) => (
            <div
              key={index}
              style={{
                height: "150px",
                width: "700px",
                border: "1px solid black",
                padding: "30px",
                marginBottom: "20px",
                backgroundColor: "#D8A4A5",
                borderRadius: "25px",
                marginLeft: "250px",
                cursor: "pointer",
              }}
              onClick={() => handleShowDetails(movie)} //  click handler
            >
              <div style={{height:"5px"}}>
                <img src={movie.image} alt=''></img>
              </div>
              <br></br>
              <h2
                style={{
                  position: "relative",
                  left: "100px",
                  top: "-50px",
                  fontSize: "40px",
                  color:"black"
                }}
                ><i className="fa-solid fa-film"></i>
                {movie.title}
              </h2>
              <hr/>
              <div
                className="moviedetail"
                style={{ position: "relative", left: "250px", bottom: "150px" }}
                >
                
                <p
                  style={{
                    color: "darkblue",
                    fontWeight: "bolder",
                    position:"relative",
                    top:"150px",
                    right:"230px"
                  }}
                >
                  Booking ID: {movie.bookingId}
                </p>
                <h3
                  style={{
                    bottom: "-110px",
                    left: "300px",
                    position: "relative",
                  }}
                >
                  <input type="checkbox" checked readOnly /> Completed
                </h3>
                <h3
                  style={{
                    bottom: "10px",
                    left: "-120px",
                    position: "relative",
                    color:'darkgreen'
                    
                  }}
                >
                  <p>Total Payed : ₹{movie.totalPrice}</p>
                </h3>
               
                <button
                  className="cancelbtn"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent opening popup
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

      {/* Show Details Popu */}
      {showDetails && selectedMovie && (
        <>
          <div
            className="details-overlay"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.8)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 999,
            }}
            onClick={handleCloseDetails}
          />
          <div
            style={{
              width: "600px",
              height:"400px",
              position: "fixed",
              top: "100px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "gray",
              padding: "20px",
              borderRadius: "10px",
              zIndex: 1000,
              fontSize: "18px",
            }}
          >

      <div style={{position:"relative",left:"300px",bottom:"-40px",fontSize:"22px"}}>
            <p style={{position:"relative",right:"-100px",top:"-60px",color:"yellow",fontSize:"18px"}}>{selectedMovie.bookingId}</p>
            <p style={{position:"relative",top:"-70px",right:"300px",fontSize:"30px",background:"black",color:"Highlight",fontWeight:"bold",textAlign:"center",display:"flex", alignItems:"center", justifyContent:"center", height:"50px"}}><i className="fa-solid fa-film"></i> {selectedMovie.title}</p>
            <p style={{position:"relative",top:"-30px",fontWeight:"bold",right:"250px"}}><i className="fa-solid fa-chair"></i> Seats : {selectedMovie.selectedSeats}</p>
            <p style={{position:"relative",top:"-10px",fontWeight:"bold",right:"250px"}}><i className="fa-solid fa-ticket"></i> Mode : {selectedMovie.selectedMode}</p>
            <p style={{position:"relative",top:"-130px",fontWeight:"bold"}}><i className="fa-solid fa-calendar-days"></i> Date : {selectedMovie.selectedDate}</p>
            <p style={{position:"relative",top:"-100px",fontWeight:"bold"}}><i className="fa-solid fa-clock"></i> Time : {selectedMovie.selectedTime}</p>
            <p style={{position:"relative",bottom:"80px",right:"150px",color:"AppWorkspace"}}>Booked By : <span style={{color:"red"}}>{selectedMovie.email}</span></p>
            <div style={{position:"relative",top:"-430px",right:"280px",}}> 
            <input type="checkbox" checked readOnly /> Completed
            </div>
      </div>
            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <button
                onClick={handleCloseDetails}
                style={{
                  padding: "10px 15px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  position:"relative",
                  bottom:"100px"
                }}
              >
                Close
              </button>

            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MyMovies;              