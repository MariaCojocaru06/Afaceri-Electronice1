import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Card from "react-bootstrap/Card";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState({}); // State for quantities
  const idC = 2;
  const [cart, setCart] = useState([]);

  const handleIncreaseQuantity = (productId) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [productId]: (prevQuantity[productId] || 0) + 1,
    }));
  };

  const handleDecreaseQuantity = (productId) => {
    if (quantity[productId] > 1) {
      setQuantity((prevQuantity) => ({
        ...prevQuantity,
        [productId]: prevQuantity[productId] - 1,
      }));
    }
  };

  const handleAddToCart = (product) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.id === product.id
    );

    if (productIndex !== -1) {
      // If the product is already in the cart, update its quantity
      updatedCart[productIndex].quantity += quantity[product.id] || 1;
    } else {
      // If the product is not in the cart, add it to the cart
      updatedCart.push({
        ...product,
        quantity: quantity[product.id] || 1,
      });
    }

    setCart(updatedCart);
    console.log(updatedCart);

    fetch(`http://localhost:8083/user/client/1/order/${idC}/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId:product.id,
        denumire: product.denumire,
        pret: product.pret,
        gramaj: 1,
        img: product.img,
        cantitate_com: quantity,
      }),
    })
      .then((res) => {
        console.log("m1");
      })
      .then(() => {
        console.log("m2");
        toast.success(`Produsul ${product.denumire} adaugat cu succes!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
        console.log(`Produs ${product.denumire} adaugat cu succes!`)
      })
      .catch((e) => console.log(`eroare`));
  };

  useEffect(() => {
    fetch("http://localhost:8083/prod/all")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        const initialQuantities = {};
        data.forEach((prod) => {
          initialQuantities[prod.id] = 1;
        });
        setQuantity(initialQuantities);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Jucarii</h1>
      <div className="product-list d-flex flex-wrap justify-content-center">
        {products.map((prod) => (
          <Card style={{ width: "18rem" }} className="mx-2" key={prod.id}>
            <Card.Img variant="top" src={prod.img} alt={prod.denumire} />
            <Card.Body>
              <Card.Title>{prod.denumire}</Card.Title>
              <Card.Text>Pret: {prod.pret}</Card.Text>
              <div className="quantity-control">
                <button
                  className="btn btn-secondary"
                  onClick={() => handleDecreaseQuantity(prod.id)}
                >
                  -
                </button>
                <span>{quantity[prod.id] || 0}</span>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleIncreaseQuantity(prod.id)}
                >
                  +
                </button>
              </div>

              <button
                className="btn btn-primary"
                onClick={() => handleAddToCart(prod)}
              >
                Adauga in cos
              </button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Products;
