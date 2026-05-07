import { useState,useEffect } from 'react';
import axios from 'axios';

function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/booking')
      .then((res) => {
        console.log("Fetched users from MongoDB:", res.data);
        setBookings(res.data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  return (
        <>
    <h2 style={{
      position:"relative",
      left:"550px",
      color:"ButtonShadow",
      fontSize:"30px"
    }}
    >Welcome To Admin Dashboard</h2>
    <div
      style={{
        width: "900px",
        margin: "50px auto",
        border: "2px solid black",
        backgroundColor: "#f9f9f9",
        padding: "20px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Movie Booking Details</h2>
      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}
      >
        <thead style={{ backgroundColor: "#ddd" }}>
          <tr>
            <th>Booking Id</th>
            <th>Email</th>
            <th>Movie Name</th>
            <th>Seats</th>
            <th>Total Price</th>
            <th>Show Date</th>
            <th>Show Time</th>
            <th>Mode</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((book, index) => (
              <tr key={index}>
                <td>{book.bookingId}</td>
                <td>{book.email}</td>
                <td>{book.title}</td>
                <td>{book.selectedSeats}</td>
                <td>{book.totalPrice}</td>
                <td>{book.selectedDate}</td>
                <td>{book.selectedTime}</td>
                <td>{book.selectedMode}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default AdminBookings
