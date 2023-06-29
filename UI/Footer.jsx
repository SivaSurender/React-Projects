import React from "react";

const getHour = new Date().getHours();
function Footer() {
  const displayMsg =
    getHour > 19 ? "Sorry we're closed" : "We're currently open";

  return (
    <footer className="footer">
      <div className="order">
        <p>
          {" "}
          {new Date().toLocaleTimeString()} {displayMsg}
        </p>
        <button className="btn">Order Now</button>
      </div>
    </footer>
  );
}

export default Footer;
