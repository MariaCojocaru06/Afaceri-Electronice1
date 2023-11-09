import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import PayPal from "./PayPal";
import Button from "react-bootstrap/Button";

function CartPage({ cart }) {
  const [products, setProducts] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [checkout, setCheckOut] = useState(false);
  let sold = 0;
  const [total, settotal] = useState();
  let user=localStorage.getItem("user");

  useEffect(() => {
    // Fetch the products in the cart based on your API endpoint
    fetch("http://localhost:8083/user/client/1/order/2/product")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        let sold = 0;
        for (let i = 0; i < data.length; i++) {
          sold = sold + data[i].pret * data[i].gramaj;
        }
        console.log(sold);
        settotal(sold);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Function to remove a product from the cart
  const removeProductFromCart = (productId) => {
    
  };
  const stergeProdus = async (idP) => {
    const res = await fetch(`http://localhost:8083/user/client/1/order/2/product/${idP}`, {
        method: 'DELETE',
    }).then((res) => res.json())
        .then((data) => {  console.log("stergere apelata") });
        window.location.reload(); // Refresh the page

}
  const golire = async () => {
    const res = await fetch(`http://localhost:8083/user/client/1/order/2/deleteAll`, {
        method: 'DELETE',
    }).then((res) => res.json())
        .then((data) => {  console.log("stergere apelata") });
        window.location.reload(); // Refresh the page

}
const CantitateMinus = async (idP) => {

    const res = await fetch(`http://localhost:8083/user/client/1/order/2/product/${idP}`)
    const data = await res.json();
    console.log(data)
    await fetch(`http://localhost:8083/user/client/1/order/2/product/${idP}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            //descriere si deadline preluate din campurile input
            gramaj: data.gramaj - 1
        }),

    }).then((res) => res.json())
        //dupa salvare facem intoarcerea la pagina principala
        .then((data) => {

        
            console.log("editat");
            window.location.reload();
        }).catch((e) => console.log(`${e.message}`));
    if (data.gramaj == 1) {
        stergeProdus(idP)
    }



}

const CantitatePlus = async (idP) => {

    const res = await fetch(`http://localhost:8083/user/client/1/order/2/product/${idP}`)
    const data = await res.json();
    console.log(data)
    await fetch(`http://localhost:8083/user/client/1/order/2/product/${idP}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            //descriere si deadline preluate din campurile input
            gramaj: data.gramaj + 1
        }),

    }).then((res) => res.json())
        //dupa salvare facem intoarcerea la pagina principala
        .then((data) => {

            console.log("editat");
            window.location.reload();
        }).catch((e) => console.log(`${e.message}`));


}

  return (
    <div className="cart-page">
      <div className="product-list d-flex flex-wrap">
        {/* <h1>Shopping Cart</h1> */}
        {/* <ul> */}
          {products.map((prod) => (
            <Card style={{ width: "18rem" }} className="mx-2" key={prod.id}>
              <Card.Img variant="top" src={prod.img} alt={prod.denumire} />
              <Card.Body>
                <Card.Title>{prod.denumire}</Card.Title>
                <Card.Text>Price: {prod.pret}</Card.Text>
                <div className="quantity-control">
                
                <button
                  className="btn btn-secondary"
                  onClick={() => CantitateMinus(prod.id)}
                >
                  -
                </button>
                <span>{prod.gramaj}</span>
                <button
                  className="btn btn-success"
                  onClick={() => CantitatePlus(prod.id)}
                >
                  +
                </button>
                  <button
                   className="btn btn-danger"
                    onClick={() => stergeProdus(prod.id)}
                  >
                    Remove
                  </button>
                 
                </div>
              </Card.Body>
            </Card>
          ))}
        {/* </ul> */}
      </div>

      <div className="cart-summary">
        {/* <h1>Cart Summary</h1> */}
        <p>Total Value: {total}</p>
        <Button onClick={golire}>Clear Cart</Button>
        {checkout ? (
        <PayPal orderValue={total} />
      ) : (
        <Button
          onClick={() => {
            setCheckOut(true);
          }}
        >
          Checkout
        </Button>)}
      </div>
    </div>
  );
}

export default CartPage;
