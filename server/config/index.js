const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

function config(app) {
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(express.static("public"));
  app.use(express.urlencoded({ extended: false }));

  app.use(
    cors({
      origin: process.env.ORIGIN,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
}

module.exports = config;
