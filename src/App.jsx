import { useState, useEffect } from 'react';
import Navbar from './component/navbar';
import ProtectedRoute from './component/ProtectedRoute';
import Movies from './component/Movies';
import Home from './component/Home';
import { BrowserRouter as Router, Routes, Route, useNavigate,useLocation } from 'react-router-dom';
import FooterWrapper from './component/FooterWrapper';
import Contact from './component/Contact';
import SeatBooking from './component/SeatBooking';
import Register from './component/Register';
import Login from './component/Login';
import MovieDetails from './component/MovieDetails';
import MyMovies from './component/MyMovies';
import Profile from './component/Profile';
import AdminDashboard from './Admin/AdminDashboard';
import AdminBookings from './Admin/AdminBookings';
import { BookingProvider } from './component/BookingContext';
import UserQueries from './Admin/UserQueries';
import Loading from './component/Loading';

function AppWrapper() {
  return (
    <BookingProvider>
      <Router>
        <App />
      </Router>
    </BookingProvider>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [pageLoading, setPageLoading] = useState(false);


  //Loading
const loadingRoutes = ["/", "/SeatBooking","/Profile","/MyMovies","/movie/:category/:id","/dashboard"];

useEffect(() => {
  const isMatch =
    loadingRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/movie/");

  if (isMatch) {
    setPageLoading(true);

    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }
}, [location]);
  

  // Load from localStorage once
  useEffect(() => {
     const timer = setTimeout(() => {
      const storedLoginStatus = localStorage.getItem('isLoggedIn');
      const storedUserType = localStorage.getItem('userType');

      if (storedLoginStatus === 'true') {
        setIsLoggedIn(true);
        setUserType(storedUserType);
      }
        setIsLoading(false);
  }, 2000);

  return () => clearTimeout(timer);

  }, []);

  // Update login state
  const handleLogin = (type) => {
    setIsLoggedIn(true);
    setUserType(type);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userType', type);
  };

  // Update logout state
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    navigate('/Login');
  };

  if (isLoading) 
    return <Loading/>;

  return (
    <>
      {pageLoading && <Loading/>}
      <Navbar isLoggedIn={isLoggedIn} userType={userType} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home isLoggedIn = {isLoggedIn}/>} />
        <Route path="/Movies" element={<Movies isLoggedIn = {isLoggedIn}/>} />
        {/* <Route path="/Contact" element={<Contact />} /> */}

        {/* Private Routes */}
        <Route path="/SeatBooking" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <SeatBooking/>
            </ProtectedRoute>
          } />
        <Route path="/MyMovies" element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MyMovies />
            </ProtectedRoute>
          } />
        <Route path="/Register" element={<Register />} />
        <Route
          path="/Profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path='/Contact' element = {
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Contact />
          </ProtectedRoute>
        }
        />
        <Route
          path="/movie/:category/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MovieDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userbookings"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AdminBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userqueries"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <UserQueries />
            </ProtectedRoute>
          }
        />
        {/* Pass handleLogin to Login */}
        <Route path="/Login" element={<Login onLogin={handleLogin} />} />
      </Routes>
      <FooterWrapper />
    </>
  );
}

export default AppWrapper;
