import React, { useRef, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Paypal({ orderValue }) {
  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Cool looking table",
                amount: {
                  currency_code: "USD",
                  value: orderValue, // Utilizează valoarea din parametru
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          if (order.status === "COMPLETED") {
            // Clear the shopping cart here (replace with your cart-clearing logic)
            console.log("Clearing shopping cart...");
         
            await fetch(`http://localhost:8083/user/client/1/order/2/deleteAll`, {
                method: 'DELETE',
            }).then((res) => res.json())
                .then((data) => {  console.log("stergere apelata") });
                window.location.reload();
                toast.success(`Comanda ${order.id} a fost plasata cu succes`, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                // setTimeout(() => {
                //     window.location.reload();
                //   }, 2000);
          }else{
            toast.error(`Eroare procesare`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
          }
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, [orderValue]); // Adaugă orderValue în lista de dependințe a efectului

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
