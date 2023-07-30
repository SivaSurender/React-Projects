import React from "react";

function ErrorLoader({ error }) {
  console.log(error, "frm loader");
  return <span className="error">🛑{error}</span>;
}

export default ErrorLoader;
