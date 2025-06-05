const express = require("express")
const router = express.Router()

const Student = require("../models/Student.model")

//Crear un nuevo estudiante
router.post(("/"), async(req, res,next) => {
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
    next(error)
  }
})

//Devolver todos los estudiantes
router.get("/", async(req, res,next) => {
  try {
    const response = await Student.find({})
    .populate("cohort")
    res.json(response)
  } catch (error) {
    next(error)
  }
})

//Devuelve todos los estudiantes de un cohort 
router.get("/cohort/:cohortId", async(req, res,next) => {
  try {
    // se busca en Student los estudiantes que su cohort sea igual al id dentro del params
    const response = await Student.find({cohort: req.params.cohortId})
    .populate("cohort")
    res.json(response)
  } catch (error) {
    next(error)
  }
})

//Devuelve un estudiante en especifico mediante si ID
router.get("/:studentId", async(req, res,next) => {
  try {
    const response = await Student.findById(req.params.studentId)
    .populate("cohort")
    res.json(response)
  } catch (error) {
    next(error)
  }
})

//Actualiza todos los datos de un estudiante en especifico
router.put("/:studentId", async(req, res,next) => {
  try {
    const responseFromDB = await Student.findByIdAndUpdate(req.params.studentId, {
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
    res.json(responseFromDB)
  } catch (error) {
    next(error)
  }
})

//Elimina un estudiante en concreto
router.delete("/:studentId", async (req, res,next) => {
  try {
    await Student.findByIdAndDelete(req.params.studentId)
    res.send("Estudiante borrado")
  } catch (error) {
    next(error)
  }
})

module.exports = router