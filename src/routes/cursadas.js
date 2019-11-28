var CursadaModel = require("../models/models").CursadaModel;
 
var router = function(app) {
 
    app.get("/cursadas", function(request, response) {
        CursadaModel.find({}).populate("materia").then(function(result) {
            response.send(result);
        }, function(error) {
            response.status(401).send({ "success": false, "message": error});
        });
    });
 
    app.get("/cursada/:id", function(request, response) {
        CursadaModel
            .findOne({"_id": request.params.id})
            .populate("materia")
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

    app.post("/cursada", function(request, response) {
        var cursada = new CursadaModel({
            "estadoCursado": request.body.estadoCursado,
            "notaObtenida": request.body.notaObtenida,
            "materia": request.body.materia
        });
        cursada.save(function(error, cursada) {
            if(error) {
                return response.status(401).send({ "success": false, "message": error});
            }
            response.send(cursada);
        });
    });
 
    app.put("/cursada/:id", function(request, response) {
        CursadaModel.findByIdAndUpdate(
            request.params.id, 
            {$set: request.body},
            function(error, cursada) {
                if(error) {
                    return response.status(401).send({ "success": false, "message": error});
                }
                response.send(cursada);
            }
        );
    });

    app.delete("/cursada/:id", function(request, response) {
        MateriaModel.findByIdAndRemove(
            request.params.id, 
            function (error) {
                if(error) {
                    return response.status(401).send({ "success": false, "message": error});
                }
                response.send('Cursada Deleted successfully!');
            }
        );
    })
}
 
module.exports = router;