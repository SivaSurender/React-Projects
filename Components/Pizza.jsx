import React from "react";
import { pizzaData } from "../public/data";
import margItem from "/pizzas/margherita.jpg";

function Pizza() {
  return (
    <div>
      <img src={margItem} alt="pizza" />
      <h3>Margheritta</h3>
      <p>To,ato, spinach, ricatto</p>
    </div>
  );
}

export default Pizza;
