const MateriaModel  = require("../models/models").MateriaModel;
const AlumnoModel   = require("../models/models").AlumnoModel;
const CarreraModel  = require("../models/models").CarreraModel;
 
const router = function(app) {
 
    app.get("/alumnos", function(request, response) {
        AlumnoModel
        .find({})
        .populate("carrera")
        .populate(
            {
                path: "materias.materiaId",
                populate:{
                    path: "materia"
                }
            }
        )
        .then(
            function(result) {
                response.send(result);
            }, 
            function(error) {
                response.status(401).send({ "success": false, "message": error});
            }
        );
    });
 
    app.get("/alumno/:id", function(request, response) {
        AlumnoModel.findOne({"_id": request.params.id})
        .populate("carrera")
        .populate(
            {
                path: "materias.materiaId",
                populate:{
                    path: "materia"
                }
            }
        )
        .then(function(result) {
            response.send(result);
        }, function(error) {
            response.status(401).send({ "success": false, "message": error});
        });
    });
 
    app.post("/alumno", function(request, response) {
        const alumno = new AlumnoModel({
            "nombre": request.body.nombre,
            "fechaNacimiento": request.body.fechaNacimiento,
            "domicilio": request.body.domicilio
        });
        alumno.save(function(error, alumno) {
            if(error) {
                return response.status(401).send({ "success": false, "message": error});
            }
            response.send(alumno);
        });
    });
    
    app.put("/alumno/:id", function(request, response) {
        AlumnoModel.findByIdAndUpdate(
            request.params.id, 
            {$set: request.body},
            {new: true},
            function(error, alumno) {
                if(error) {
                    return response.status(401).send({ "success": false, "message": error});
                }

                response.send(alumno);
            }
        );
    });

    app.delete("/alumno/:id", function(request, response) {
        AlumnoModel.findByIdAndRemove(
            request.params.id, 
            function (error) {
                if(error) {
                    return response.status(401).send({ "success": false, "message": error});
                }
                response.send('Alumno Deleted successfully!');
            }
        );
    })

}
 
module.exports = router;