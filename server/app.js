const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

/*EN DIA 2 SE BORRAN LOS JSON Y PASAMOS A USAR BBDD*/

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
//const students = require(`./students.json`);
//const cohorts = require(`./cohorts.json`);
// Mongoose aquí
const mongoose = require(`mongoose`);
const Cohort = require(`./models/Cohort.model`)
const Student = require(`./models/Student.model`)

// CONECTAMOS MONGOOSE
mongoose.connect("mongodb://127.0.0.1:27017/cohort-tools-api")
.then(x => console.log(`Connected to Database`))
.catch(err => console.error("Error connecting to MongoDB cohorts", err))

/*
mongoose.connect("mongodb://127.0.0.1:27017/students")
.then(x => console.log(`Connected to Database: "${x.connections[0].cohort-tools-api}"`))
.catch(err => console.error("Error connecting to MongoDB students", err))
*/

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();



// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...

//cors
app.use(cors({origin:[`http://localhost:5173`]}))
/*****/3
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get(`/api/cohorts`,(req,res)=>{
  Cohort.find({})
  .then((cohorts) => {
    console.log("Estamos dentro del Then Cohorts")
    res.json(cohorts);})
  .catch((error) => {
    console.log("Error",error)
    res.status(500).json({error: "Failed to retrieve Cohorts"})})
})

app.get(`/api/students`,(req, res)=>{
  Student.find({})
  .then((students) => {
    console.log("Estamos dentro del Then Students")
    res.json(students);})
  .catch((error) => {
    console.log("Error",error)
    res.status(500).json({error: "Failed to retrieve Students"})})
})

// START SERVER
const PORT = 5005;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
