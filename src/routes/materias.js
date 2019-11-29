var MateriaModel = require("../models/models").MateriaModel;
 
var router = function(app) {
 
    app.get("/materias", function(request, response) {
        MateriaModel.find({}).populate("carreras").populate("alumnos").then(function(result) {
            response.send(result);
        }, function(error) {
            response.status(401).send({ "success": false, "message": error});
        });
    });
 
    app.get("/materia/:id", function(request, response) {
        MateriaModel
            .findOne({"_id": request.params.id})
            .populate("carreras")
            .populate("alumnos")
            .then(
                function(result) {
                    response.send(result);
                }, 
                function(error) {
                    response
                        .status(401)
                        .send({ "success": false, "message": error});
                }
            );
    });
 
    app.post("/materia", function(request, response) {
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
 
    app.put("/materia/:id", function(request, response) {
        MateriaModel.findByIdAndUpdate(
            request.params.id, 
            {$set: request.body},
            {new: true},
            function(error, materia) {
                if(error) {
                    return response.status(401).send({ "success": false, "message": error});
                }
                response.send(materia);
            }
        );
    });

    app.delete("/materia/:id", function(request, response) {
        MateriaModel.findByIdAndRemove(
            request.params.id, 
            function (error) {
                if(error) {
                    return response.status(401).send({ "success": false, "message": error});
                }
                response.send('Materia Deleted successfully!');
            }
        );
    })
}
 
module.exports = router;