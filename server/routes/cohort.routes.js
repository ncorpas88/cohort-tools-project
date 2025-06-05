const express = require("express")
const router = express.Router()

const Cohort = require("../models/Cohort.model")

//Crear un nuevo cohort
router.post("/", async(req,res,next)=>{
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
  next(error)
}
})

//Devolver todos los cohorts
router.get("/", async(req,res,next) =>{
  try {
    const response = await Cohort.find({})
    res.json(response)
  } catch (error) {
    next(error)
  }
})

//Devuelve un cohort en especifico mediante su ID
router.get("/:cohortId", async(req,res,next) =>{
  try {
    const response = await Cohort.findById(req.params.cohortId)
    res.json(response)
  } catch (error) {
    next(error)
  }
})

//Actualiza los datos de un cohort en especifico
router.put("/:cohortId", async(req,res,next) => {
  try {
    const response = await Cohort.findByIdAndUpdate(req.params.cohortId, {
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
  } catch (error) {
    next(error)
  }
})

//Elimina un cohort en especifico
router.delete("/:cohortId",async(req,res,next)=> {
  try {
    await Cohort.findByIdAndDelete(req.params.cohortId)
    res.send("Cohort Eliminado")
  } catch (error) {
    next(error)
  }
})

module.exports = router