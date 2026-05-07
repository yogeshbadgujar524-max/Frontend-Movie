import React, { useRef, useEffect, useState, useContext, use } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BookingContext } from './BookingContext';
import axios, { Axios } from 'axios';
import Swal from 'sweetalert2';
import './SeatBooking.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import QRCode from 'react-qr-code';
import Loading from './Loading';

function SeatBooking() {
  const Otp = useRef();
  const [showQR, setShowQR] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [details, setDetails] = useState(false);
  const [otp, setOtp] = useState();
  const [Payment, setPayment] = useState('');
  const [showotp, setShowotp] = useState(false);
  const dateref = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { addBooking, setBookedNotification } = useContext(BookingContext);


 const Greet = (e) => {
      e.preventDefault();
      setShowPayment(false)
      setShowQR(true)
    }

  const movie = location.state || {};
  const title = movie.title || "Unknown";
  const moviePrice = movie.price || 200;
  const image = movie.image || "/default.jpg";


  const pay = useRef();

  const handledetails = () => {
    setDetails(false)
    setShowPayment(true);
  }


  const GenerateTransactionId = () => {
    const ve = "TRID"
    return ve + Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
  }

  const scan = useRef();

  const handlePayment = () => {
    const transactionId = GenerateTransactionId();

    if (Payment === null) {
      alert("Select Payment Method");
    }
    else {
      setShowotp(true);
      const useremail = localStorage.getItem("email");
      axios.post('http://localhost:3001/Payment', { transactionId, Payment, totalPrice, email: useremail })
        .then(result => console.log(result))
        .catch(err => console.log(err))

      pay.current.innerText = "Processing...."
      pay.current.style.position = "relative"
      pay.current.style.left = "100px";
      setTimeout(() => {
        if(confirm("Payment Successfully !!!")){
          setShowPayment(false);
          setShowotp(true);
          
        }
      }, 4000);
    }
  }

  const handleQR = () => {
    scan.current.innerText = "Scanning...."
    setTimeout(() => {
      setShowQR(false);
      setShowotp(true);
      alert("Payment Successfully !!!")
    }, 6000);
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const generatedBookingId = () => {
    const bo = "BKID"
    return bo + Math.random().toString(36).substring(2, 10) +
      Math.random().toString(36).substring(2, 10);
  };


  const otpgenerater = () => {
    const val = 1000000;
    const randomnum = Math.floor(Math.random() * val);
    const randomstring = String(randomnum).padStart(6, '0');
    setOtp(randomstring);
    sending.current.innerText = "Sending...."
    setTimeout(() => {
      otpref.current.innerText = "OTP Is : " + randomstring;
      otpref.current.style.color = "brown"
      otpref.current.style.fontWeight = "bold"
      sending.current.innerText = ""

      alert("You'r OTP is : " + randomstring)
    }, 4000);
  }

  const sending = useRef();
  const pro = useRef();
  const otpref = useRef();
  const seatsRef = useRef(null);
  const proc = useRef(null);
  const state = useRef(null)

  const [seats, setSeats] = useState([]);
  const [count, setCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedMode, setSelectedMode] = useState('');

  // Generate seats
  useEffect(() => {
    if (!selectedDate)
      return;
    const generatedSeats = [];
    for (let i = 1; i <= 65; i++) {
      const isBooked = Math.random() < 0.3;
      generatedSeats.push({
        id: `s${i}`,
        booked: isBooked,
        selected: false,
      });
    }
    setSeats(generatedSeats);

  }, [selectedDate, selectedTime,]);


  // Handle seat selection
  const handleClick = (id) => {
    const updatedSeats = seats.map((seat) => {
      if (seat.id === id && !seat.booked) {
        return { ...seat, selected: !seat.selected };
      }
      return seat;
    });

    const selectedCount = updatedSeats.filter((seat) => seat.selected).length;
    setCount(selectedCount);
    setTotalPrice(selectedCount * moviePrice + Number(`${selectedMode === "AC" ? 120 : ""}`));
    setSeats(updatedSeats);
  };

  const selectedSeats = seats.filter(seat => seat.selected).map(seat => seat.id).join(', ');

  const handleOTP = () => {

    if (!state.current.value || state.current.value === 'Choose Payment Method') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select a payment method.',
        showConfirmButton: false,
        timer: 4000,
      });
      return;
    }

    else if (!selectedDate || !selectedTime || count === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Incomplete Booking',
        text: 'Please fill all fields and select at least one seat.',
        showConfirmButton: false,
        timer: 4000,
      });
      return;
    }
    else {
      setDetails(true)
    }
  }

  const mobileno = useRef();
  const otppin = useRef();

  // Form submission handler
  const submit = (e) => {

    e.preventDefault();
    if (mobileno.current.value.length < 10) {
      alert("Phone Number must be 10 digits")
    }
    else if (otppin.current.value === "" || otppin.current.value.length < 6) {
      alert("Please Enter OTP in 6 digits")
    }

    else {
      setBookedNotification(true);
      setShowotp(false);
      const bookingId = generatedBookingId();
      const useremail = localStorage.getItem("email");

      axios.post('http://localhost:3001/booking', {
        title,
        selectedSeats,
        totalPrice,
        selectedDate,
        selectedTime,
        selectedMode,
        bookingId,
        email: useremail,
        image: image
      })
        .then(result => console.log(result))
        .catch(err => console.log(err))



      const MovieDetails = {
        bookingId,
        title,
        selectedSeats,
        totalPrice,
        selectedDate,
        selectedTime,
        selectedMode,
        image
      };



      const storedList = JSON.parse(localStorage.getItem("BookedMoviesList")) || [];
      storedList.push(MovieDetails);
      localStorage.setItem("BookedMoviesList", JSON.stringify(storedList));


      addBooking(MovieDetails);

      alert("You'r Verification is complete \n Please click OK");
      pro.current.style.display = "block";
      

      setTimeout(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Congratulations! You'r Ticket Has Been Booked",
          showConfirmButton: true,
          confirmButtonText: 'OK',
          confirmButtonColor: 'green',
          customClass: {
            confirmButton: 'Mybutton'
          }
        });


        proc.current.style.color = 'green';
        proc.current.innerText = 'Thank you !!';
        pro.current.style.display = "none";
        navigate("/Profile");
      }, 4000);

    }

  };


  return (
    <>
      <form onSubmit={submit}>
        <div className="main">
          <div className="tickets">
            <div className="ticket-selector">
              <div className="title">
                <span style={{ color: 'black', fontWeight: 'bold', fontSize: '35px' }}>{title}</span>
              </div>
              <br />
              <br />
              <div className='mode'>
                <select name='mode' required value={selectedMode} onChange={(e) => setSelectedMode(e.target.value)}>
                  <option value=''>Select mode</option>
                  <option>AC</option>
                  <option>NON-AC</option>
                </select>
              </div>

              <div className='date-time'>
                <p>Select Date:</p>
                <input type='date' required value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} ref={dateref} />
                <div className='showtime'>
                  <p>Show Time:</p>
                  <select name='time' required value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                    <option value=''>Select Time</option>
                    <option>08:00 AM</option>
                    <option>11:30 AM</option>
                    <option>03:00 PM</option>
                    <option>06:15 PM</option>
                    <option>09:30 PM</option>
                  </select>
                </div>
              </div>

              <br />

              <div className="seats">
                <div className="status">
                  <div className="items">Available</div>
                  <div className="items">Booked</div>
                  <div className="items">Selected</div>
                </div>

                <div className="all-seats" ref={seatsRef}>
                  {seats.map((seat) => (
                    <React.Fragment key={seat.id}>
                      <input
                        type="checkbox"
                        id={seat.id}
                        name='tickets'
                        disabled={seat.booked}
                        checked={seat.selected}
                        onChange={() => handleClick(seat.id)}
                      />
                      <label
                        htmlFor={seat.id}
                        className={`seat ${seat.booked ? 'booked' : seat.selected ? 'selected' : ''}`}
                      ></label>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className='screentext'>Please Select Seats Carefully</div>
            </div>
          </div>

          <div className='Booking-Ticket'>
            <h2>Continue To Booking</h2>
            <div className='count'>Tickets : {count}</div>
            <div className='price'>Total Price : ₹ {`${selectedMode === "AC" ? totalPrice + 120 : totalPrice}`}
              <br></br>
              {selectedMode === "AC" ?
                <span style={{ fontSize: "15px ", color: "red", fontWeight: "600" }}>+ 120 for AC mode</span> : ""}
            </div>

            <div className='States'>
              <select ref={state} style={{width:"240px"}}>
                <option>Choose Movie Theater</option>
                <option>Miraj Cinemas , Udhana</option>
                <option>Inox , Althan</option>
                <option>Inox , Khatodara Wadi</option>
                <option>Ranjhans Cinemas , Vesu</option>
                <option>Rahul Raj , Dumas-rd Piplod</option>
                <option>Roongta Cinemas , Bharthana</option>
              </select>
            </div>
              <input type='button' onClick={handleOTP} value='Booking Now' className='BTN' />
              <div className='process' ref={proc} style={{ display: 'none' }}>
                <p>Processing...</p>
              </div>
          </div>
        </div>

        {showotp && (
          <>
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.98)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  background: "white",
                  padding: "30px",
                  borderRadius: "10px",
                  width: "400px",
                }}
              >
                <h2>OTP Authentications : </h2>

                <h3>Phone Number : </h3>
                <input type="tel" placeholder="Phone No" ref={mobileno} required style={{
                  width: "85%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px", margin: "10px 0"
                }} /><br></br>

                <input type="button" value="Generate OTP" name="OTP" onClick={otpgenerater} style={{ position: "relative", border: "1px solid #ccc", top: "15px", color: "black", backgroundColor: "yellowgreen", border: "none", borderRadius: "10px", width: "150px", height: "30px", fontWeight: "bold", margin: "10px 0", padding: "5px" }} />
                <h4 ref={sending} style={{ position: "relative", left: "20px" }}></h4>
                <p ref={otpref} style={{ position: "relative", top: "25px" }}></p>
                <br></br>
                <h3>Enter OTP : </h3>
                <input placeholder="Enter OTP" ref={otppin} onChange={(e) => setOtp(e.target.value)} style={{
                  width: "85%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px", margin: "10px 0"
                }} required /><br></br><br></br>
                <input type='submit' value="Submit" style={{ border: "none", borderRadius: "10px", width: "100px", height: "30px", backgroundColor: "black", color: "white" }} ref={Otp} />
              </div>
            </div>
          </>
        )}
        <div ref={pro} style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.85)", display: "none"
        }}>
          <h3 style={{ position: "fixed", bottom: "200px", left: "450px", fontSize: "50px", color: "Gray", fontWeight: "bolder", fontStyle: "oblique" }}>Processing....</h3>
        </div>
      </form>

      {/* Payment page */}
      {showPayment && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.98)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999
        }}>

          <div style={{
            width: "750px",
            background: "#fff",
            borderRadius: "10px",
            padding: "25px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.3)"
          }}>

            {/* Header */}
            <h3 style={{ marginBottom: "10px", color: "#360",fontSize:"26px" }}>
              Total Price : ₹ {`${selectedMode === "AC" ? totalPrice + 120 : totalPrice}`}  
            </h3>
              {selectedMode === "AC" ?
              <span>(With AC)</span>
            :<span>(Without AC)</span>}

            <h2 style={{
              textAlign: "center",
              marginBottom: "20px"
            }}>
              Payment Method
            </h2>

            {/* Main Layout */}
            <div style={{
              display: "flex",
              gap: "30px"
            }}>

              {/* LEFT SIDE */}
              <div style={{
                width: "35%",
                borderRight: "1px solid #eee",
                paddingRight: "20px"
              }}>
                <h4>Select Option</h4>

                <label className="radio">
                  <input
                    type="radio"
                    name="payment"
                    value="Credit Card"
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <strong>💳</strong> Credit / Debit Card
                </label>

                <label className="radio">
                  <input
                    type="radio"
                    name="payment"
                    value="UPI"
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <strong>पे</strong> UPI / PhonePe 
                </label>

                <label className="radio">
                  <input
                    type="radio"
                    name="payment"
                    value="Net banking"
                    onChange={(e) => setPayment(e.target.value)}
                  />
                  <strong>🏛</strong> Net Banking
                </label>
              </div>

              {/* RIGHT SIDE */}
              <div style={{ width: "65%" }}>

                {/* CREDIT CARD */}
                {Payment === "Credit Card" && (
                  <>
                    <h4><strong>💳</strong> Card Details</h4>

                    <input type="text" placeholder="Cardholder Name" className="input" />
                    <input type="tel" maxLength={14} placeholder="Card Number" className="input" />

                    <div style={{ display: "flex", gap: "10px" }}>
                      <input type="text" placeholder="MM/YY" className="input" />
                      <input type="text" maxLength={4} placeholder="CVV" className="input" />
                    </div>

                    <input type="text" placeholder="Zip Code" className="input" />
                  </>
                )}

                {/* UPI */}
                {Payment === "UPI" && (
                  <>
                    <h4>पे UPI Details</h4>
                    <input type="text" placeholder="Enter UPI ID" className="input" /><br></br><br></br>
                    <hr></hr>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span>Scan & Pay</span>

                      <button
                        onClick={Greet}
                        style={{
                          color: "green",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          textDecoration: "underline",
                          fontSize: "16px"
                        }}
                      >
                        Click here to scan
                      </button>
                    </div>
                  </>
                )}

                {/* NET BANKING */}
                {Payment === "Net banking" && (
                  <>
                    <h4> 🏛 Select Bank</h4>
                    <select className="input">
                      <option>Select Bank</option>
                      <option>SBI</option>
                      <option>HDFC</option>
                      <option>ICICI</option>
                      <option>Kotak</option>
                      <option>BOI</option>
                      <option>BOB</option>
                      <option>Central Bank Of India</option>
                    </select>
                  </>
                )}

                {/* BUTTON */}
                <button
                  onClick={handlePayment}
                  style={{
                    width: "100%",
                    padding: "12px",
                    marginTop: "20px",
                    background: "#28a745",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "16px",
                    cursor: "pointer"
                  }}
                >
                  Proceed to Pay
                </button>
                <h4 ref={pay}></h4>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Show booking Details */}
      {details &&
        <>
          <div className="details" style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.98)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          </div>
          <div style={{
            width: "450px",
            margin: "auto", position: "fixed", fontSize: "20px",
            top: 160,
            left: 500,
            background: "white",
            padding: "20px",
            border: "5px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
          }}>
            <h3>Your Movie Details : </h3>

            <i className="fa-solid fa-film"></i> Movie : {title}<br /><br />
            <i className="fa-solid fa-chair"></i> Total Seats : {selectedSeats}<br /><br />
            <i className="fa-solid fa-ticket"></i> Show Tickets : {count}<br /><br />
            <i className="fa-solid fa-calendar-days"></i> Show Date : {selectedDate}<br /><br />
            <i className="fa-solid fa-clock"></i> Show Time : {selectedTime}<br /><br />
            <input type='submit' value="Cancel" style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px", margin: "10px 0", background: "red", color: "white", border: "none", cursor: "pointer"
            }} onClick={() => { setDetails(false) }} />
            <input type='submit' value="Go To Payment Page" style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px", margin: "10px 0", marginLeft: "20px", background: "#5cb30c", color: "white", border: "none", cursor: "pointer"
            }} onClick={handledetails} />
          </div>

        </>
      }

      {showQR &&
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.98)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <div style={{ height: "500px", width: "600px", background: "white", border: "2px solid white", position: "relative", top: "50px" }} onClick={handleQR}>
            <div style={{ height: "Auto", margin: "0 auto", maxWidth: 200, width: "100%", border: "5px solid white", marginTop: "100px" }}>
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value="hey"
                viewBox={`0 0 256 256`}
              />
            </div>
            <h1 style={{ position: "relative", left: "210px" }}>Scan & Pay</h1>
            <h2 ref={scan} style={{ position: "relative", left: "230px", color: "blue" }}></h2>
          </div>
        </div>}
    </>
  );

}

export default SeatBooking;
