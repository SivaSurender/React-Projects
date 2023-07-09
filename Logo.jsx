import React from "react";
import popMovie from "/assets/popmovie.png";

function Logo() {
  return (
    <>
      <div className="logo">
        <span role="img">
          <img className="img-logo" src={popMovie} />
        </span>
        <h1>PopMovies</h1>
      </div>
    </>
  );
}

export default Logo;
