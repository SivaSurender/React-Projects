import React from "react";
import { pizzaData } from "../public/data";
import margItem from "../public/pizzas/margherita.jpg";

function Pizza() {
  return (
    <div>
      <h3>Margheritta</h3>
      <img src={margItem} alt="pizza" />
    </div>
  );
}

export default Pizza;
