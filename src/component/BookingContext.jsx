import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookedMovies, setBookedMovies] = useState([]);
  const [bookedNotification,setBookedNotification] = useState(false);
  const [drop, setDrop] = useState(false);

  // Load bookings from DB
  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) return;

    axios.get(`https://backend-movie-ac46twv6r-yogeshbadgujar524-maxs-projects.vercel.app/user/${email}`)
      .then(res => setBookedMovies(res.data))
      .catch(err => console.log(err));
  }, []);


  // Add booking to list
  const addBooking = (movie) => {
    setBookedMovies(prev => [...prev, movie]);
  };

  // Delete booking
  const cancelBooking = (index) => {
    setBookedMovies(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <BookingContext.Provider value={{ bookedMovies, addBooking, cancelBooking,bookedNotification,setBookedNotification,drop,setDrop }}>
      {children}
    </BookingContext.Provider>
  );
};
