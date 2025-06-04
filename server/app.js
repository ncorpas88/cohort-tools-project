const express = require("express");
const morgan = require("morgan");
const cors = require("cors")
const cookieParser = require("cookie-parser");
const PORT = 5005;
const mongoose = require("mongoose");

//Cambiar nombre de la base de datos
mongoose.connect("mongodb://127.0.0.1:27017/cohort-tools-api")
.then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
.catch(err => console.error("Error connecting to MongoDB", err));



// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...



// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// const cohorts = require("./cohorts.json")
// app.get("/api/cohorts", (req, res) => {
//   res.json(cohorts)
// })

// const students = require("./students.json")
// app.get("/api/students", (req, res) => {
//   res.json(students)
// })


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5005', 'http://localhost:5173'],
}))


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

const Student = require("./models/Student.model")

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

//Crear un nuevo estudiante
app.post(("/api/students"), async(req, res) => {
  try {
    const response = await Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      linkedinURL: req.body.linkedinURL,
      languages: req.body.languages,
      program: req.body.program,
      background: req.body.background,
      image: req.body.image,
      projects: req.body.projects
    })
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

//Devolver todos los estudiantes
app.get("/api/students", async(req, res) => {
  try {
    const response = await Student.find({})
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

//Devuelve todos los estudiantes de un cohort 
app.get("/api/students/cohort/:cohortId", async(req, res) => {
  try {
    const response = await Cohort.findById(req.params.cohortId)
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

//Devuelve un estudiante en especifico mediante si ID
app.get("/api/students/:studentId", async(req, res) => {
  try {
    const response = await Student.findById(req.params.studentId)
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

//Actualiza todos los datos de un estudiante en especifico
app.put("/api/students/:studentId", async(req, res) => {
  try {
    const responseFromDB = await Student.findByIdAndUpdate(req.params.studentId, {})
    res.json(responseFromDB)
  } catch (error) {
    console.log(error)
  }
})

//Elimina un estudiante en concreto
app.delete("/api/students/:studentId", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.studentId)
    res.send("Estudiante borrado")
  } catch (error) {
    console.log(error)
  }
})

const Cohort = require("./models/Cohort.model")

//Crear un nuevo cohort
app.post("/api/cohorts", async(req,res)=>{
try {
  const response = await Cohort.create({
    inProgress: req.body.inProgress,
    cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortName,
    program: req.body.program,
    campus: req.body.campus,
    startDate : req.body.startDate,
    endDate: req.body.endDate,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours,
  })
  res.json(response)
  res.send("Cohort creado")
} catch (error) {
  console.log(error)
}
})

//Devolver todos los cohorts
app.get("/api/cohorts", async(req,res) =>{
  try {
    const response = await Cohort.find({})
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

//Devuelve un cohort en especifico mediante su ID
app.get("/api/cohorts/:cohortId", async(req,res) =>{
  try {
    const response = await Cohort.findById(req.params.cohortId)
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

//Actualiza los datos de un cohort en especifico
app.put("/api/cohorts/:cohortId", async(req,res) => {
  try {
    const response = await Cohort.findByIdAndUpdate(req.params.cohortId)
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

//Elimina un cohort en especifico
app.delete("/api/cohorts/:cohortId",async(req,res)=> {
  try {
    await Cohort.findByIdAndDelete(req.params.cohortId)
    res.send("Cohort Eliminado")
  } catch (error) {
    console.log(error)
  }
})

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});