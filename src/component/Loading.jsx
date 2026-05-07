import "./Loading.css";

const Loading = () => {
  return (
    <div className="loader-container">
      <div className="film-reel"></div>

      <h2 className="loading-text">Please Wait A Few Minutes...</h2>

      <div className="seats">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="shimmer"></div>
        ))}
      </div>
    </div>
  );
};

export default Loading;