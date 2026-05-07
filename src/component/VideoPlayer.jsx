import React from 'react';
// import ReactPlayer from 'react-player';

function VideoPlayer({ onClose }) {
  return (
    <div className="video">
      <h2 
        style={{position: "relative",bottom: "250px", left: "1220px", color: "red", cursor: "pointer",}}
        onClick={onClose}
      >
        X
      </h2>
      <video width="80%" height="80%" controls autoPlay style={{background: "rgba(0,0,0,0.98)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",marginTop:"50px"}}>
      <source src="Videos/video.mp4" type="video/mp4" />
      </video>


    </div>
  );
}

export default VideoPlayer;

// url="https://www.youtube.com/watch?v=hSBwq8yrXf0"