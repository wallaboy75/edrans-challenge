var MateriaModel = require("../models/models").MateriaModel;
 
var router = function(app) {
 
    app.get("/materias", function(request, response) {
        MateriaModel.find({}).populate("alumnoss").then(function(result) {
            response.send(result);
        }, function(error) {
            response.status(401).send({ "success": false, "message": error});
        });
    });
 
    app.get("/materia/:id", function(request, response) {
        MateriaModel.findOne({"_id": request.params.id}).populate("alumnos").then(function(result) {
            response.send(result);
        }, function(error) {
            response.status(401).send({ "success": false, "message": error});
        });
    });
 
    app.post("/materias", function(request, response) {
        var materia = new MateriaModel({
            "nombre": request.body.nombre,
            "cargaOraria": request.body.cargaOraria
        });
        materia.save(function(error, materia) {
            if(error) {
                return response.status(401).send({ "success": false, "message": error});
            }
            response.send(materia);
        });
    });
 
}
 
module.exports = router;