const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

/*EN DIA 2 SE BORRAN LOS JSON Y PASAMOS A USAR BBDD*/

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const students = require(`./students.json`);
const cohorts = require(`./cohorts.json`);

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
res.json(cohorts);
})

app.get(`/api/students`,(req, res)=>{
  res.json(students);
})

// START SERVER
const PORT = 5005;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});