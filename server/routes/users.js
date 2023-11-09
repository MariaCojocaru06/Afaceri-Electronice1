const express = require("express");
const app = express();
const router = require("express").Router();
const bcrypt = require('bcrypt');
const User =require("../models/users")
const { encodeToken, authenticationMiddleware } = require('./authServer');
const Order = require("../models/order");
const Product= require('../models/product')

const deleteAllProductsFromOrder = async (order) => {
  try {
    const products = await order.getProducts();

    for (const product of products) {
      // Assuming you have a 'OrdersProducts' join table
      await order.removeProduct(product);
    }

    return { message: "deleted" };
  } catch (error) {
    throw error;
  }
};

//creare cont
router
 
  .post('/client', async (req, res, next) => {
    try {
      if (req.body) {
        const hashedPassword = await bcrypt.hash(
          req.body.parola,
          Number.parseInt(process.env.NUMBER_OF_SALTS))

        const par = {
          id: req.body.id,
          nume: req.body.nume,
          prenume: req.body.prenume,
          telefon: req.body.telefon,
          email: req.body.email,
          parola: hashedPassword,
          // parola: req.body.parola
        };
        await User.create(par)
        res.status(201).json({ message: " created" })
      }

    } catch (error) {
      next(error)
    }
  })
 //primeste datele de autentificare si intoarce un token de acces
 .post('/login', async (req, res, next) => {
    const params = req.body.email;
    const pass = req.body.parola;
    if (params && pass) {
      try {
        const user = await User.findOne({ where: { email: params } });
        if (user) {
          if (await bcrypt.compare(pass, user.parola)) {
            res.status(200).json({
              message: 'Success',
              token: encodeToken({ userId: user.id }),
              user: user
            });
          } else {
            console.log(user)
            console.log(pass);
            console.log(user.parola)
            res.status(403).json({ error: "Incorect password" });
          }
        } else res.status(404).json({ error: 'User not found' });
      } catch (err) {
        next(err);
      }
    } else {
      res.status(400).json({ message: 'Malformed request!' });
    }
  })
  //intoarce datele utilizatorului autentificat
  .get('/logged', authenticationMiddleware, async (req, res) => {
    if (req.userId) {
      console.log(req.userId)
      const user = await User.findByPk(req.userId);
      if (user) {
        const data = { ...user };
        console.log(data);
        delete data.parola;
        res.status(200).json(data);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } else {
      res.status(400).json({ message: 'Malformed request!' });
    }
  })
  .get('/login/:email/:parola', (req, res, next) => {
    try {
      User.findOne({
        where: {
          email: req.params.email,
          parola: req.params.parola
        }
      }).then(result => {
        if (result !== null)
          res.status(200).json(result)
        else
          res.status(403).json({ message: "invalid login" })
      })
    } catch (error) {
      next(error);
    }
  })

  
  //***********************FUNCTII COS**************************************************************** */
  //get pentru a vizualiza o anumita comanda
  .get('/client/:id/order/:idC', async (req, res, next) => {
    try {
      const client = await User.findByPk(req.params.id);
      if (client) {

        const produs = await client.getOrders({ where: { id: req.params.idC } });
        const pro = produs.shift();
        if (pro) {
          res.status(202).json(pro)
        }

      } else {
        res.status(404).json({ message: "not found" })
      }

    } catch (error) {
      next(error)
    }

  })
  .put('/client/:id/order/:idC', async (req, res, next) => {
    try {
      const client = await User.findByPk(req.params.id);
      if (client) {

        const produs = await client.getOrders({ where: { id: req.params.idC } });
        const pro = produs.shift();
        if (pro) {
          pro.finalizata = 1
          await pro.save();
          res.status(202).json(pro)
        }

      } else {
        res.status(404).json({ message: "not found" })
      }

    } catch (error) {
      next(error)
    }

  })
  .get('/client/:id/order/:idC/product', async (req, res, next) => {
    try {
      const client = await User.findByPk(req.params.id);
      if (client) {

        const produs = await client.getOrders({ where: { id: req.params.idC } });
        const pro = produs.shift();
        if (pro) {
          const p = await pro.getProducts();
          res.status(201).json(p);
        }

      } else {
        res.status(404).json({ message: "not found" })
      }

    } catch (error) {
      next(error)
    }

  })
  //post pentru atunci cand un client plaseaza o comanda
  .post('/client/:id/order', async (req, res, next) => {
    try {
      const client = await User.findByPk(req.params.id);
      if (client) {
        const order = await Order.create(req.body);
        client.addOrders(order);
        await client.save();
        res.status(202).json({ message: "created" })

      } else {
        res.status(404).json({ message: "not found" })
      }

    } catch (error) {
      next(error)
    }
  })
  //get pentru a vizualiza comanda unui client
  .get('/client/:id/order', async (req, res, next) => {
    try {
      const client = await User.findByPk(req.params.id);
      if (client) {
        const order = await client.getOrders();
        res.json(order);

      } else {
        res.status(404).json({ message: "not found" })
      }

    } catch (error) {
      next(error)
    }

  })
  .get('/client/:id/order/:idC/product/:idP', async (req, res, next) => {
    try {
      const client = await User.findByPk(req.params.id);
      if (client) {

        const produs = await client.getOrders({ where: { id: req.params.idC } });
        const pro = produs.shift();
        if (pro) {
          const p = await pro.getProducts({ where: { id: req.params.idP } });
          const p_cautat = p.shift();
          if (p_cautat) {
            res.status(201).json(p_cautat);
          } else {
            res.status(404).json({ message: "not found" })
          }

        } else {
          res.status(404).json({ message: "not found" })
        }

      }
    } catch (error) {
      next(error)
    }

  })
  .delete('/client/:id/order/:idC/product/:idP', async (req, res, next) => {
    try {
      const client = await User.findByPk(req.params.id);
      if (client) {

        const produs = await client.getOrders({ where: { id: req.params.idC } });
        const pro = produs.shift();
        if (pro) {
          const p = await pro.getProducts({ where: { id: req.params.idP } });
          const p_cautat = p.shift();
          if (p_cautat) {
           await pro.removeProduct(p_cautat);
            res.status(202).json({ message: "deleted" })
          } else {
            res.status(404).json({ message: "not found" })
          }

        } else {
          res.status(404).json({ message: "not found" })
        }

      }
    } catch (error) {
      next(error)
    }

  })

  
  .delete('/client/:id/order/:idC/deleteAll', async (req, res, next) => {
    try {
      const client = await User.findByPk(req.params.id);
      
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
  
      const order = await client.getOrders({ where: { id: req.params.idC } });
      const currentOrder = order.shift();
  
      if (!currentOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      const result = await deleteAllProductsFromOrder(currentOrder);
      
      return res.status(202).json(result);
    } catch (error) {
      next(error);
    }
  })
  .post('/client/:id/order/:idC/product', async (req, res, next) => {
    try {
      const client = await User.findByPk(req.params.id);
      if (client) {

        const order = await client.getOrders({ where: { id: req.params.idC } });
        const pro = order.shift();
        if (pro) {
          const product = await Product.findByPk(req.body.productId); 
          pro.addProducts(product);
          await pro.save();
          res.status(202).json({ message: "created"+product+pro+client })
        }

      } else {
        res.status(404).json({ message: "not found" })
      }

    } catch (error) {
      next(error)
    }

  })
  //editare cantitate comandata de produs
  .put('/client/:id/order/:idC/product/:idP', async (req, res, next) => {
    try {
      const client = await User.findByPk(req.params.id);
      if (client) {

        const produs = await client.getOrders({ where: { id: req.params.idC } });
        const pro = produs.shift();
        if (pro) {
          const p = await pro.getProducts({ where: { id: req.params.idP } });
          const p_cautat = p.shift();
          if (p_cautat) {
            p_cautat.gramaj = req.body.gramaj
            await p_cautat.save()
            res.status(202).json(p_cautat)
          } else {
            res.status(404).json({ message: "not found" })
          }

        } else {
          res.status(404).json({ message: "not found" })
        }

      }
    } catch (error) {
      next(error)
    }

  })


  module.exports = router