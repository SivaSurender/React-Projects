import React from "react";
import Pizza from "../Components/Pizza";
import { pizzaData } from "../public/data";

function Menu() {
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      <ul className="pizzas">
        {pizzaData.map((each, index) => {
          return (
            <Pizza
              name={each.name}
              ingredients={each.ingredients}
              price={each.price}
              photoName={each.photoName}
              soldOut={each.soldOut}
            />
          );
        })}
      </ul>
    </main>
  );
}

export default Menu;
