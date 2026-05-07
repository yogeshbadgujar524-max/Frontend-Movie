import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "./Profile.css";
import { BookingContext } from "./BookingContext";
import Loading from "./Loading";

function Profile({isLoading,setIsLoading}) {
  const [showDetails, setShowDetails] = useState(false);
  const [mode, setMode] = useState("dark");
  const [showNotify,setShowNotify] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { bookedNotification } = useContext(BookingContext);

  const usersData = JSON.parse(localStorage.getItem("currentUser"));



  useEffect(() => {
    setTimeout(() => {
      
      setIsLoading(true)
    }, 3000);
  }, [isLoading])
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.backgroundColor =
      mode === "dark" ? "#141414" : "#f5f5f5";
  }, [mode, location]);

  const handleMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleShowBooking = () => {
    navigate("/MyMovies");
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e50914",
      cancelButtonColor: "#555",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logged out!",
          text: "You have been successfully logged out.",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "Mybutton",
          },
        }).then(() => {
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("userType");
          navigate("/login");
        });
      }
    });
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

    if (isLoading) 
    return <Loading/>;

  return (
    <>
      <div className={`profile-container ${mode}`}>
        <div className="profile-card">
          <div className="profile-header">
            <img
              src="https://www.shutterstock.com/image-vector/people-person-icon-modern-flat-600nw-1691909635.jpg"
              alt="User Avatar"
              className="profile-avatar"
            />
            <h2 className="welcome-text">
              Welcome, {usersData.fname || "User"}!
            </h2>

            <button className="mode-btn" onClick={handleMode}>
              {mode === "dark" ? (
                <i className="fa-solid fa-sun"></i>
              ) : (
                <i className="fa-solid fa-moon"></i>
              )}
            </button>
          </div>

          <div className="profile-details">
            <h3>Profile Information</h3>
            <div className="details-list">
              <p>
                <strong>Name :</strong> {usersData.fname} {usersData.lname}
              </p>
              <p>
                <strong>Email :</strong> {usersData.email}
              </p>
              <p>
                <strong>Phone :</strong> {usersData.phone}
              </p>
              <p>
                <strong>User ID :</strong> {usersData.userid}
              </p>
              <p>
                <strong>Password :</strong> ••••••••
              </p>
            </div>
          </div>

          <div className="profile-actions">
            <button className="action-btn" onClick={handleShowBooking}>
              <i className="fa-solid fa-ticket"></i> Your Bookings
            </button>

            <button
              className="action-btn"
            >
              <i className="fa-solid fa-bell" ></i> Notifications
              {bookedNotification && (
                <i onClick={()=>setShowDetails(true)}
                  style={{
                    fontSize: "25px",
                    position:"relative",
                    left:"40px",
                    marginBottom:"40px",
                    color: "yellow",
                  }}
                  className="fa-solid fa-circle-exclamation"
                ></i>
              )}
            </button>

            <button className="action-btn logout" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          </div>
        </div>
      </div>


{showDetails && (
      <>
          <div
            className="details-overlay"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.96)",
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
              height:"300px",
              position: "fixed",
              top: "200px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#234",
              border:"2px solid black",
              padding: "20px",
              borderRadius: "10px",
              zIndex: 1000,
              fontSize: "18px",
            }}
          >

        <h2 style={{color:"darkblue",fontSize:"30px",textAlign:"center",background:"yellow",border:"2px solid black"}}>Notification : </h2>
      <div style={{marginTop:"20px",display:"flex",justifyContent:"center",flexDirection:"column",border:"2px solid white",textAlign:"center",background:"#235",color:"white"}}>
        <p ><strong style={{fontWeight:"bold",fontSize:"22px"}}>Congratulations !!</strong> Your Movie is Booked</p>   
        <h3>For All Information Click <a href="/mymovies" style={{color:"red"}}>Here...</a></h3>   
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

export default Profile;