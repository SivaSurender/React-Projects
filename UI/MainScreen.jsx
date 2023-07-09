import React, { useState } from "react";

import AvailableMovies from "./AvailableMovies";
import WatchedMovies from "./WatchedMovies";

function MainScreen() {
  return (
    <>
      <main className="main">
        <AvailableMovies />
        <WatchedMovies />
      </main>
    </>
  );
}

export default MainScreen;
