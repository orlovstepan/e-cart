export default function Cart({ contents, emptyCart }) {
  const contentsKeys = Object.keys(contents);

  // let totalValue = contents["orange"];

  let totalValue = contentsKeys.reduce(
    (acc, cv) => contents[cv].count * contents[cv].price + acc,
    0
  );
  // console.log("totalValue", totalValue.apples.price[0]);

  // console.log(
  //   "apples total price",
  //   contents.apples.price[0] * contents.apples.count
  // );
  console.log("contents", contents);
  console.log("totalValue", totalValue);

  console.log("contentsKeys", contentsKeys);

  return (
    <div className="cart">
      {!!contentsKeys.length ? (
        <div>
          <ul className="cart-contents">
            {contentsKeys.map((key) => (
              <li key={contents[key].name}>
                {contents[key].name} x {contents[key].count}{" "}
              </li>
            ))}
          </ul>
          <p> Total: {totalValue} </p>
          <button
            onClick={() => [
              alert("Thank you for your purchase"),
              emptyCart({})
            ]}
          >
            {" "}
            Checkout{" "}
          </button>
        </div>
      ) : (
        <h5> the cart is empty </h5>
      )}
    </div>
  );
}
