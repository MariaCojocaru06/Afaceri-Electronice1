import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';

export default function SignInSide() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn") === "true");
  let isAdmin = useState(false);
  let user=0;
  const handleLogin = async (event) => {
    event.preventDefault();
    let data = fetch(`http://localhost:8083/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        parola: password,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Email invalid sau parolă greșită!");
        }
      })
      .then((data) => {
        if (data.message) {
          console.log(data);
          user=data.user.id;
          localStorage.setItem("user",user)
          toast.success("Logare cu succes", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        localStorage.setItem('token', data.token);
          localStorage.setItem("loggedIn", "true");
          setLoggedIn(true);
          if(data.user.email==='admin@gmail.com'){
            isAdmin=true;
            localStorage.setItem("isAdmin",isAdmin)
            window.location.href = "http://localhost:3002/admin";}else{window.location.href = "http://localhost:3002/";}
        
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    if (loggedIn) {
        
    //   window.location.href = "http://localhost:3002/";
      console.log(loggedIn);
    }
  }, [loggedIn]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Login</h5>
              <form>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Parolă:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button variant="primary" onClick={handleLogin}>
                  {loggedIn ? "Log Out" : "Log In"}
                </Button>
                <p>
                Nu ai cont? <Link to="/register">Creeaza</Link>
              </p>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
