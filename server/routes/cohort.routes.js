const express = require("express");
const router = express.Router();

const Cohort = require(`./models/Cohort.model`);

//Crea un cohorte (FUNCIONA)
router.post("/api/cohort", async (req, res, next) => {
  try {
    const created = await Cohort.create({
      cohortSlug: req.body.cohortSlug,
      cohortName: req.body.cohortName,
      program: req.body.program,
      format: req.body.format,
      campus: req.body.campus,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      inProgress: req.body.inProgress,
      programManager: req.body.programManager,
      leadTeacher: req.body.leadTeacher,
      totalHours: req.body.totalHours,
    });
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

//recuperar cohort (FUNCIONA)
router.get("/api/cohorts", async (req, res, next) => {
  try {
    const response = await Cohort.find();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

//recupera un cohorte especifico (FUNCIONA)

router.get("/api/cohorts/:cohortId", async (req, res, next) => {
  try {
    const response = await Cohort.findById(req.params.cohortId);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// actualiza un cohorte especifico por id (FUNCIONA)
router.put("/api/cohorts/:cohortId", async (req, res, next) => {
  try {
    const response = await Cohort.findByIdAndUpdate(req.params.cohortId, {
      cohortSlug: req.body.cohortSlug,
      cohortName: req.body.cohortName,
      program: req.body.program,
      format: req.body.format,
      campus: req.body.campus,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      inProgress: req.body.inProgress,
      programManager: req.body.programManager,
      leadTeacher: req.body.leadTeacher,
      totalHours: req.body.totalHours,
    });
    res.status(202).json(response);
  } catch (error) {
    next(error);
  }
});

//delete cohorte (FUNCIONA)
router.delete("/api/cohorts/:cohortId", async (req, res, next) => {
  try {
    await Cohort.findByIdAndDelete(req.params.cohortId);

    res.status(202).json("Se borró el cohort");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
