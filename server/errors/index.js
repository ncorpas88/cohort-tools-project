function handleErrors(app){
    app.use("*", (req,res) =>{
        res.sendStatus(404)
    })

    app.use((error,req,res,next) => {
        console.log(error)
        res.sendStatus(500)
    })
}

module.exports = handleErrors