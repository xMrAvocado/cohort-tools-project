const User = require("../models/User.model");

const router = require("express").Router();
//Exportar la ruta

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/auth.middleware");

router.post("/signup", async (req, res, next) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    res.status(400).json({ errorMessage: "Faltan campos por cubrir." });
    return;
  }
  if (name.length < 3) {
    res
      .status(400)
      .json({ errorMessage: "El nombre tiene que ser más largo." });
    return;
  }

  const charRegex = /^[a-zA-Z0-9ñÑ]+$/gm; //Cuidado con el gm final
  if (charRegex.test(name) === false) {
    res
      .status(400)
      .json({ errorMessage: "El nombre no incluye caracteres especiales." });
    return;
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
  if (passwordRegex.test(password) === false) {
    res
      .status(400)
      .json({ errorMessage: "La contraseña tiene que ser mas fuerte." });
    return;
  }

  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  if (emailRegex.test(email) === false) {
    res
      .status(400)
      .json({ errorMessage: "El email no tiene el formato correcto." });
    return;
  }

  try {
    const foundUser = await User.findOne({ email: email });

    if (foundUser !== null) {
      res.status(400).json({ errorMessage: "El email ya está en uso." });
      return;
    }

    const hashPassword = await bcrypt.hash(password, 12);

    await User.create({
      email: email,
      name: name,
      password: hashPassword,
    });

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .json({ errorMessage: "Todos los campos son obligatorios." });
    return;
  }

  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  if (emailRegex.test(email) === false) {
    res
      .status(400)
      .json({ errorMessage: "El email no tiene el formato correcto." });
    return;
  }

  try {
    const foundUser = await User.findOne({ email: email });

    if (foundUser === null) {
      res
        .status(400)
        .json({ errorMessage: "Usuario no encontrado con ese correo." });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (isPasswordCorrect === false) {
      res
        .status(400)
        .json({ errorMessage: "Contraseña no válida." });
      return;
    }

    const payload = {
        _id: foundUser._id
    }

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, { algorithm:"HS256", expiresIn: "7d" })
    res.status(200).json({authToken:authToken})
  } catch (error) {
    next(error);
  }
});

router.get("/verify", verifyToken, (req, res) => {

    res.status(200).json({payload:req.payload})

})

// Ver el perfil de cualquier usuario. 
//! Cuidado con no limitar la informacion a enviar
router.get("/users/:id", verifyToken, async (req, res, next)=>{
    try {
        const response = await User.findById(req.params.id)
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
})

//!acceso al perfil personal
/*
router.get("/profile", verifyToken, async (req, res, next)=>{
    try {
        const response = await User.findById(req.payload._id)
        res.status(200).json(response);
    } catch (error) {
        next(error)
    }
})
*/
module.exports = router;
