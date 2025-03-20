const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(418).json({ message: "all good here!" });
});

router.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

const cohortRouter = require("./cohort.routes");
router.use("/cohorts", cohortRouter);

const studentRouter = require("./student.routes");
router.use("/students", studentRouter);

module.exports = router;
