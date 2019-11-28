let CarreraModel = require("../models/models").CarreraModel;
 
let router = function(app) {
 
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
 
    app.post("/carrera", function(request, response) {
        let carrera = new CarreraModel({
            "nombre": request.body.nombre,
            "tituloOtorgado": request.body.tituloOtorgado,
            "materias": request.body.materias
        });
        carrera.save(function(error, carrera) {
            if(error) {
                return response.status(401).send({ "success": false, "message": error});
            }
            response.send(carrera);
        });
    });
    
    app.put("/carrera/:id", function(request, response) {
        CarreraModel.findByIdAndUpdate(
            request.params.id, 
            {$set: request.body},
            function(error, carrera) {
                if(error) {
                    return response.status(401).send({ "success": false, "message": error});
                }
                response.send(carrera);
            }
        );
    });

    app.put("/carrera/:carreraId/materia/:materiaId", function(request, response) {
        CarreraModel.findByIdAndUpdate(
            request.params.carreraId, 
            {$set: request.body},
            function(error, carrera) {
                if(error) {
                    return response.status(401).send({ "success": false, "message": error});
                }
                response.send(carrera);
            }
        );
    });

    app.delete("/carrera/:id", function(request, response) {
        CarreraModel.findByIdAndRemove(
            request.params.id, 
            function (error) {
                if(error) {
                    return response.status(401).send({ "success": false, "message": error});
                }
                response.send('Deleted successfully!');
            }
        );
    })
}
 
module.exports = router;