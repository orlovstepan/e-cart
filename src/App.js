import { useState } from "react";
import Cart from "./Cart";
import Inventory from "./Inventory";
import "./styles.css";

function changeGoods({ goods, item, operation, step }) {
  const newGoods = [...goods];
  const replaceIndex = goods.findIndex((el) => el.id === item.id);
  if (operation === "select") {
    newGoods[replaceIndex] = { ...item, available: item.available - step };
  } else {
    newGoods[replaceIndex] = { ...item, available: item.available + step };
  }
  return newGoods;
}

export default function App() {
  let [cartContents, setCartContents] = useState({});
  const [goods, setGoods] = useState([
    { id: "apples", name: "Apples", price: 10, available: 12, currency: "$" },
    { id: "melon", name: "Melon", price: 20, available: 5, currency: "$" },
    { id: "orange", name: "Orange", price: 8, available: 20, currency: "$" }
  ]);

  function addToCart(item) {
    const step = 1;
    if (item.available > 0) {
      if (!!cartContents[item.id]) {
        setCartContents((prevContents) => ({
          ...prevContents,
          [item.id]: {
            ...prevContents[item.id],
            count: prevContents[item.id].count + step,
            price: [item.price]
          }
        }));
      } else {
        setCartContents((prevContents) => ({
          ...prevContents,
          [item.id]: {
            name: item.name,
            count: step,
            price: [item.price]
          }
        }));
      }

      setGoods(changeGoods({ goods, item, operation: "select", step }));
    }
  }

  function deleteFromCart(item) {
    const step = 1;
    if (cartContents[item.id]?.count > 0) {
      setCartContents((prevContents) => {
        const result = prevContents[item.id].count - step;
        if (result === 0) {
          const newPrevContents = { ...prevContents };
          delete newPrevContents[item.id];
          return newPrevContents;
        }
        return {
          ...prevContents,
          [item.id]: {
            ...prevContents[item.id],
            count: result
          }
        };
      });
      setGoods(changeGoods({ goods, item, step }));
    } else {
      delete cartContents[item.id];
    }
  }

  return (
    <div className="App">
      <h1>Ecart</h1>
      <Cart contents={cartContents} emptyCart={setCartContents} />
      <Inventory
        onAdd={addToCart}
        goods={goods}
        onDelete={deleteFromCart}
        contents={cartContents}
      />
    </div>
  );
}
