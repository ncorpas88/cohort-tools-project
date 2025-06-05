function config(app) {
  const express = require("express");
  const morgan = require("morgan");
  const cors = require("cors");

  app.use(express.json());
  app.use(morgan("dev"));
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: false }));
  app.use(cors({
    origin: ['http://localhost:5005', 'http://localhost:5173'],
  }))
  
  app.use(express.json())
  app.use(express.urlencoded({extended:false}))

}

module.exports = config