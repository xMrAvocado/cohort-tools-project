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
//mongoose.connect("mongodb+srv://chaconsaavedrakurt:HAzQRqA7pDss402W@cluster0.9aj03.mongodb.net/cohort-tools-api?retryWrites=true&w=majority&appName=Cluster0")
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

// app.get(`/api/cohorts`,(req,res)=>{
//   Cohort.find({})
//   .then((cohorts) => {
//     console.log("Estamos dentro del Then Cohorts")
//     res.json(cohorts);})
//   .catch((error) => {
//     console.log("Error",error)
//     res.status(500).json({error: "Failed to retrieve Cohorts"})})
// })


//crear estudiante (FUNCIONA)
app.post("/api/students",async (req, res, next) => {
try{
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
    cohort: req.body.cohort
  })
  res.status(201).json(created)
}
catch (error){
    next(error)
}
})

//recuperar todos los estudiantes (FUNCIONA)
app.get("/api/students", async (req, res, next) => {
  
  
  try{
    
  console.log(patata)
  const response =  await  Student.find().populate("cohort")
    res.status(200).json(response)

  }
  catch (error){
    next(error) 
  }
})

//recuperar los estudiantes de un cohort determinada (id) (FUNCIONA)

app.get("/api/students/cohort/:cohortId", async (req, res, next) => {
  try{
    const response = await Student.find({cohort: req.params.cohortId}).populate("cohort")
    res.status(200).json(response)
  }
  catch (error){
    next(error)
  }
})

//recupera un estudiante id (FUNCIONA)
app.get("/api/students/:studentId", async (req, res, next) => {
  try{
    const response = await Student.findById(req.params.studentId).populate("cohort")
    res.status(200).json(response)
    
  }
  catch (error){
    next(error)
  }
})

// Actualizar un estudianto por ID (FUNCIONA)
app.put("/api/students/:studentId",async (req, res, next) => {
  try{
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
      cohort: req.body.cohort
    }
  )
  res.status(202).json(response)
  }
  catch (error) {
      next(error)
  }
})

//Borrar (FUNCIONA)
app.delete("/api/students/:studentId",async (req, res, next) => {
  try{
      await Student.findByIdAndDelete(req.params.studentId)

      res.status(202).json("Se borró el elemento")

  }
  
  catch (error){
    next(error)
  }
})

//Crea un cohorte (FUNCIONA)
app.post("/api/cohort",async (req, res, next) => {
  try{
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
      totalHours: req.body.totalHours
    })
    res.status(201).json(created)
  }
  catch (error){
    next(error)
 
  }
  })

  //recuperar cohort (FUNCIONA)
  app.get("/api/cohorts", async (req, res, next) => {
    try{
    const response =  await  Cohort.find()
      res.status(200).json(response)
  
    }
    catch (error){
      next(error) 
    }
  })

  //recupera un cohorte especifico (FUNCIONA)

  app.get("/api/cohorts/:cohortId", async (req, res, next) => {
    try{
      const response = await Cohort.findById(req.params.cohortId)
      res.status(200).json(response)
      
    }
    catch (error){
      next(error)
    }
  })

  // actualiza un cohorte especifico por id (FUNCIONA)
  app.put("/api/cohorts/:cohortId",async (req, res, next) => {
    try{
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
        totalHours: req.body.totalHours
      }
    )
    res.status(202).json(response)
    }
    
    catch (error){
      next(error)
    }
  })

  //delete cohorte (FUNCIONA)
  app.delete("/api/cohorts/:cohortId",async (req, res, next) => {
    try{
        await Cohort.findByIdAndDelete(req.params.cohortId)

        res.status(202).json("Se borró el cohort")
    }
    
    catch (error){
      next(error)
    }
  })


  // GESTIÓN DE ERRORES

  app.use((req,res) => {
      res.status(404).json({errorMensage: "No existe la ruta indicada"})
  })

  app.use((error,req,res,next) => {
      console.log(error)
      res.status(500).json({errorMensage: "Error en el servidor"})
      //res.sendStatus(500)
  })

// START SERVER
const PORT = 5005;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
