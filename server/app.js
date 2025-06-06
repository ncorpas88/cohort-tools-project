process.loadEnvFile()

const express = require("express")
const app = express();

require("./db")

const config = require("./config")
config(app)

const indexRouter = require("./routes/index.routes")
app.use("/api", indexRouter)

//Error Handle
const handleErrors = require("./errors")
handleErrors(app)

// START SERVER
const PORT = process.env.PORT || 5005

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});