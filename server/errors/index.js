function handleErrors(app){
    app.use((req,res) => {
        res.status(404).json({errorMensage: "No existe la ruta indicada"})
    })
  
    app.use((error,req,res,next) => {
        console.log(error)
        res.status(500).json({errorMensage: "Error en el servidor"})
        //res.sendStatus(500)
    })
}

module.exports = handleErrors