const express = require("express");
const router = express.Router();

const Student = require(`./models/Student.model`);

//crear estudiante (FUNCIONA)
router.post("/api/students", async (req, res, next) => {
  try {
    const created = await Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      linkedinUrl: req.body.linkedinUrl,
      languages: req.body.languages,
      program: req.body.program,
      background: req.body.background,
      image: req.body.image,
      proyects: req.body.proyects,
      cohort: req.body.cohort,
    });
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

//recuperar todos los estudiantes (FUNCIONA)
router.get("/api/students", async (req, res, next) => {
  try {
    console.log(patata);
    const response = await Student.find().populate("cohort");
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//recuperar los estudiantes de un cohort determinada (id) (FUNCIONA)

router.get("/api/students/cohort/:cohortId", async (req, res, next) => {
  try {
    const response = await Student.find({
      cohort: req.params.cohortId,
    }).populate("cohort");
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//recupera un estudiante id (FUNCIONA)
router.get("/api/students/:studentId", async (req, res, next) => {
  try {
    const response = await Student.findById(req.params.studentId).populate(
      "cohort"
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// Actualizar un estudianto por ID (FUNCIONA)
router.put("/api/students/:studentId", async (req, res, next) => {
  try {
    const response = await Student.findByIdAndUpdate(req.params.studentId, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      linkedinUrl: req.body.linkedinUrl,
      languages: req.body.languages,
      program: req.body.program,
      background: req.body.background,
      image: req.body.image,
      proyects: req.body.proyects,
      cohort: req.body.cohort,
    });
    res.status(202).json(response);
  } catch (error) {
    next(error);
  }
});

//Borrar (FUNCIONA)
router.delete("/api/students/:studentId", async (req, res, next) => {
  try {
    await Student.findByIdAndDelete(req.params.studentId);

    res.status(202).json("Se borró el elemento");
  } catch (error) {
    next(error);
  }
});
module.exports = router;
