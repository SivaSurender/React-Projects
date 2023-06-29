import React from "react";
import { pizzaData } from "../public/data";
import margItem from "/pizzas/margherita.jpg";

function Pizza({ name, ingredients, price, photoName, soldOut }) {
  return (
    <li className={`pizza ${soldOut ? "sold-out" : ""}`}>
      <img src={photoName} alt="pizza" />
      <h3>{name}</h3>
      <p>{ingredients}</p>
      <p>{soldOut ? "Sold Out" : price}</p>
    </li>
  );
}

export default Pizza;
