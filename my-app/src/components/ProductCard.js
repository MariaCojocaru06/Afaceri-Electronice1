import React, { useState } from 'react';

const Product = ({ prod}) => {
//   const [quantity, setQuantity] = useState(initialQuantity);
let quantity=1
  const handleIncreaseQuantity = () => {
    quantity=quantity + 1;
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 0) {
      quantity=quantity - 1;
    }
  };

  const handleAddToCart = () => {
    // Implement the logic to add the product to the cart here
  };

  return (
    <div className="product" key={prod.id}>
    
      <h3>{prod.denumire}</h3>
      <div className="quantity-control">
        <button className="btn btn-secondary" onClick={handleDecreaseQuantity}>-</button>
        <h4>{prod.pret}</h4>
        <span>1</span>
        <button className="btn btn-secondary" onClick={handleIncreaseQuantity}>+</button>
      </div>
      <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default Product;
