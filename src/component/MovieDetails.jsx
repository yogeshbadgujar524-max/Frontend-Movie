import { Link, useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import trendingMovies from './TrendingMovies';
import mostWatchedMovies from './MostWatchedMovies';
import underratedMovies from './UnderratedMovies';

function MovieDetails() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const { category, id } = useParams();
  const movieId = parseInt(id);

  let movie;

  if (category === 'trending') {
    movie = trendingMovies.find((m) => m.id === movieId);
  } else if (category === 'mostwatched') {
    movie = mostWatchedMovies.find((m) => m.id === movieId);
  } else if (category === 'underrated') {
    movie = underratedMovies.find((m) => m.id === movieId);
  }

  if (!movie) {
    return (
      <p style={{
        textAlign: "center",
        marginTop: "100px",
        fontSize: "24px",
        color: "white"
      }}>
        Movie not found. <a href="/Movies" style={{color:"#ff4d4d"}}>Go Back</a>
      </p>
    );
  }

  return (
    <>
    <div style={{background:"black",border:"none",height:"80px",width:"1500px",position:"relative",bottom:"170px",opacity:"0.8"}}>
    </div>
    <div style={{backgroundColor: "#0f0f0f", color: "white", fontFamily: "Arial",marginTop:"-180px"}}>

      {/* HERO SECTION */}
      <div style={{
        height: "100vh",
        backgroundImage: `url(${movie.image})`,
        backgroundSize:"contain",
        backgroundPosition: "center",

        position: "relative"
      }}>

        {/* Overlay */}
        <div style={{
          background: "linear-gradient(to right, rgba(0,0,0,0.95), rgba(0,0,0,0.4))",
          height: "100%",
          display: "flex",
          alignItems: "center"
        }}>

          <div style={{
            display: "flex",
            gap: "40px",
            padding: "50px"
          }}>

            {/* Poster */}
            <img
              src={movie.image}
              alt={movie.title}
              style={{
                width: "400px",
                borderRadius: "10px",
                height:"500px",
                boxShadow: "0 0 20px black"
              }}
            />

            {/* Info */}
            <div>
              <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>
                {movie.title}
                <span style={{ fontSize: "20px", color: "#ccc" }}> ({movie.year})</span>
              </h1>

              <p style={{ color: "#aaa", fontSize: "18px" }}>
                {movie.type}
              </p>

              <p style={{
                marginTop: "20px",
                fontSize: "22px",
                color: "#ff4d4d"
              }}>
                🎟 ₹ {movie.price}
              </p>

              <Link
                to="/SeatBooking"
                state={{ title: movie.title, price: movie.price, image: movie.image }}
                style={{
                  display: "inline-block",
                  marginTop: "20px",
                  padding: "12px 25px",
                  backgroundColor: "#e50914",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "6px",
                  fontSize: "18px"
                }}
              >
                Book Tickets
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* DETAILS SECTION */}
      <div style={{
        padding: "40px 60px"
      }}>
        <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>
          About the Movie
        </h2>

        <p style={{
          color: "#ccc",
          lineHeight: "1.6",
          marginBottom: "20px"
        }}>
          {movie.desc}
        </p>

        <div>
          <p style={{ margin: "8px 0" }}>
            <strong>Director : </strong> <span style={{color:"#4dd0e1"}}>{movie.director}</span>
          </p>

          <p style={{ margin: "8px 0" }}>
            <strong>Writers : </strong> <span style={{color:"#4dd0e1"}}>{movie.writers}</span>
          </p>

          <p style={{ margin: "8px 0" }}>
            <strong>Stars : </strong> <span style={{color:"#4dd0e1"}}>{movie.stars}</span>
          </p>
        </div>
      </div>

    </div>
    </>
  );
}

export default MovieDetails;