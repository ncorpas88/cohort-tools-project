const express = require("express")
const router = express.Router()

const studentRouter = require("./student.routes")
router.use("/students", studentRouter)

const cohortRouter = require("./cohort.routes")
router.use("/cohorts", cohortRouter)


router.get("/",(req,res,next) => {
    res.json("Todo OK")
})

const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

module.exports = router

/* 
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
}); */