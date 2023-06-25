import React from "react";

const getHour = new Date().getHours();
function Footer() {
  const displayMsg =
    getHour > 19 ? "Sorry we're closed" : "We're currently open";

  return (
    <footer>
      {new Date().toLocaleTimeString()} {displayMsg}
    </footer>
  );
}

export default Footer;
