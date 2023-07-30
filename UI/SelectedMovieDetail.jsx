import React from "react";

function SelectedMovieDetail({ selectedMovieId, handleCloseSelected }) {
  return (
    <div className="details">
      {selectedMovieId}
      <button
        onClick={() => handleCloseSelected(selectedMovieId)}
        className="btn-back"
      >
        &larr;
      </button>
    </div>
  );
}

export default SelectedMovieDetail;
