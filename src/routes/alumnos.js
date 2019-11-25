const MateriaModel  = require("../models/models").MateriaModel;
const AlumnoModel   = require("../models/models").AlumnoModel;
const CarreraModel  = require("../models/models").CarreraModel;
 
const router = function(app) {
 
    app.get("/alumnos", function(request, response) {
        AlumnoModel.find({}).populate("materias").then(function(result) {
            response.send(result);
        }, function(error) {
            response.status(401).send({ "success": false, "message": error});
        });
    });
 
    app.get("/alumno/:id", function(request, response) {
        AlumnoModel.findOne({"_id": request.params.id}).populate("materias").then(function(result) {
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
 
    app.post("/alumno/materia", function(request, response) {
        MateriaModel.findOne({"_id": request.body.materia_id}).then(function(materia) {
            AlumnoModel.findOne({"_id": request.body.alumno_id}).then(function(alumno) {
                if(materia != null && alumno != null) {
                    if(!alumno.materias) {
                        alumno.materias = [];
                    }
                    if(!materia.alumnos) {
                        materia.alumnos = [];
                    }
                    alumno.materias.push(materia._id);
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