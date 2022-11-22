export default function Inventory({ onAdd, contents, goods, onDelete }) {
  return (
    <div>
      <h2>inventory</h2>
      <ul>
        {goods.map((item) => (
          <li key={item.id}>
            <Item
              item={item}
              onAdd={onAdd}
              onDelete={onDelete}
              contents={contents}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onAdd, contents, onDelete }) {
  console.log("contents[item.id]?.count in Item", contents[item.id]?.count);
  console.log(
    "contents.hasOwnProperty(item.id)",
    contents.hasOwnProperty(item.id)
  );
  console.log("contents in Item", contents);
  return (
    <div className="item">
      {!contents.hasOwnProperty(item.id) && (!contents[item.id]?.count || 0) ? (
        <button onClick={() => onAdd(item)}> Buy </button>
      ) : (
        <div>
          <button onClick={() => onDelete(item)}> - </button>
          <button onClick={() => onAdd(item)}> + </button>
        </div>
      )}

      <p> {item.name} </p>
      <p> - </p>
      <p>
        {" "}
        {item.currency}
        {item.price}{" "}
      </p>
      <p>
        ({contents[item.id]?.count || 0} selected, {item.available} in stock)
      </p>
    </div>
  );
}
