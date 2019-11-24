var CarreraModel = require("../models/models").CarreraModel;
 
var router = function(app) {
 
    app.get("/carreras", function(request, response) {
        CarreraModel.find({}).populate("materias").then(function(result) {
            response.send(result);
        }, function(error) {
            response.status(401).send({ "success": false, "message": error});
        });
    });
 
    app.get("/carrera/:id", function(request, response) {
        CarreraModel.findOne({"_id": request.params.id}).populate("materias").then(function(result) {
            response.send(result);
        }, function(error) {
            response.status(401).send({ "success": false, "message": error});
        });
    });
 
    app.post("/carreras", function(request, response) {
        var carrera = new CarreraModel({
            "nombre": request.body.nombre,
            "tituloOtorgado": request.body.tituloOtorgado
        });
        carrera.save(function(error, carrera) {
            if(error) {
                return response.status(401).send({ "success": false, "message": error});
            }
            response.send(carrera);
        });
    });
 
}
 
module.exports = router;