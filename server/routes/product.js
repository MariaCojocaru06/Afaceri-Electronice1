//get pentru toate produsele
const { Op } = require("sequelize");
const router = require("express").Router();
const express = require("express");
const Product = require("../models/product");
router
  .get("/all", async (req, res, next) => {
    try {
      const produs = await Product.findAll();
      if (produs.length > 0) {
        res.json(produs);
      } else {
        res.status(404).json({ message: "no products" });
      }
    } catch (error) {
      next(error);
    }
  })
  .post("/produs", async (req, res, next) => {
    try {
   
        await Product.create(req.body);
        res.status(201).json({ message: "created" });
      
    } catch (error) {
      next(error);
    }
  });
  module.exports = router