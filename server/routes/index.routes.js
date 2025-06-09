const express = require("express")
const router = express.Router()

const studentRouter = require("./student.routes")
router.use("/students", studentRouter)

const cohortRouter = require("./cohort.routes")
router.use("/cohorts", cohortRouter)

const verifyToken = require("../middlewares/auth.middlewares")

router.get("/",(req,res,next) => {
    res.json("Todo OK")
})

const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

const User = require("../models/User.model")


router.get("/users/:id",verifyToken, async (req, res, next) => {
  console.log(req.payload)
  try {
    console.log(req.params.id)
    
    const response = await User.findById(req.payload._id)
      res.json(response)
  } catch (error) {
    next(error)
  }
})


module.exports = router

/* 
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
}); */