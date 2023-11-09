import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import './register.css';

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = (event) => {
    event.preventDefault();
    let data = fetch(`http://localhost:8083/user/client`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nume: firstName,
        prenume: lastName,
        telefon:phone,
        email: email,
        parola: password,
       
        
      }),
      
    })
      .then((response) => {
        console.log(response)
        if (response.status === 201) {
            console.log("inregistrare cu succes")
          return response.json();
        
        } else {
          throw new Error("Eroare creare cont");
          
        }
      })
      .then((data) => {
        if (data.message) {
            window.location.href = "http://localhost:3000/login"
          console.log(data);
       
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Register</h5>
              <Form onSubmit={handleRegistration}>
                <Form.Group>
                  <Form.Label>Nume:</Form.Label>
                  <Form.Control
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Prenume:</Form.Label>
                  <Form.Control
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Telefon:</Form.Label>
                  <Form.Control
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Parola</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" onClick={handleRegistration}>
                 Inregistrare
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
