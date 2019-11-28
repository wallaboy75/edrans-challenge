const MateriaModel  = require("../models/models").MateriaModel;
const CursadaModel  = require("../models/models").CursadaModel;
const AlumnoModel   = require("../models/models").AlumnoModel;
const CarreraModel  = require("../models/models").CarreraModel;
 
const router = function(app) {
 
    app.get("/alumnos", function(request, response) {
        AlumnoModel
        .find({})
        .populate(
            {
                path: "materias",
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
        .populate(
            {
                path: "materias",
                populate:{
                    path: "materia"
                }
            }).then(function(result) {
            response.send(result);
        }, function(error) {
            response.status(401).send({ "success": false, "message": error});
        });
    });
 
    app.post("/alumno", function(request, response) {
        const alumno = new AlumnoModel({
            "nombre": request.body.nombre,
            "fechaNacimiento": request.body.fechaNacimiento,
            "domicilio": request.body.domicilio,
            "carrera": request.body.carrera,
            "materias": request.body.materias
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

    app.put("/alumno/:alumnoId/materia/:materiaId", function(request, response) {
        AlumnoModel.findOne({"_id": request.params.alumnoId}).then(function(alumno) {
            MateriaModel.findOne({"_id": request.params.materiaId}).then(function(materia) {
                if(materia != null && alumno != null) {
                    if(!alumno.materias) {
                        alumno.materias = [];
                    }
                    if(!materia.alumnos) {
                        materia.alumnos = [];
                    }
                    const cursada = new CursadaModel({
                        "materia": request.params.materiaId,
                        "estadoCursado": request.body.estadoCursado,
                        "notaObtenida": request.body.notaObtenida
                    });
                    cursada.save();
                    alumno.materias.push(cursada._id);
                    materia.alumnos.push(alumno._id);
                    alumno.save();
                    materia.save();
                    response.send(alumno);
                } else {
                    return response.status(401).send({ "success": false, "message": "The `alumno_id` or `materia_id` was invalid"});
                }
            }, function(error) {
                return response.status(401).send({ "success": false, "message": error});
            });
        }, function(error) {
            return response.status(401).send({ "success": false, "message": error});
        });
    });
 
}
 
module.exports = router;