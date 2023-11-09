import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function AdminPage() {
  const [productData, setProductData] = useState({
    denumire: "",
    pret: 0.00,
    gramaj: 1,
    img: "link",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8083/prod/produs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.status === 201) {
        console.log("Produsul a fost adăugat cu succes!");
        setProductData({
            denumire: " ",
            pret: 0.00,
            gramaj: 1,
            img: "link",
          });
      } else {
        console.error("Eroare la adăugarea produsului.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={4}>
          <h2>Pagina admin </h2>
          <h3>Adaugare produse</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Denumire:</Form.Label>
              <Form.Control
                type="text"
                name="denumire"
                value={productData.denumire}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Preț:</Form.Label>
              <Form.Control
                type="number"
                name="pret"
                value={productData.pret}
                onChange={handleInputChange}
              />
            </Form.Group>
        
            
            <Form.Group>
              <Form.Label>Imagine:</Form.Label>
              <Form.Control
                type="text"
                name="img"
                value={productData.img}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Adaugă Produs
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminPage;
