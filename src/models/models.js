const Mongoose  = require("mongoose");
const Schema    = Mongoose.Schema;
const ObjectId  = Mongoose.SchemaTypes.ObjectId;

Mongoose.set('useFindAndModify', false);


const CarreraSchema = new Schema({
    nombre: String,
    tituloOtorgado: String,
    materias: [
        {
            type:   ObjectId,
            ref:    "Materia"
        }
    ]

});
const Carrera = Mongoose.model('Carrera', CarreraSchema);

const MateriaSchema = new Schema({
    nombre: String,
    cargaHoraria: Number,
    carreras: [
      { 
        type: ObjectId, 
        ref: 'Carrera' 
      }
    ],
    alumnos: [
        {
            type: ObjectId,
            ref: 'Alumno'
        }
    ]
});
const Materia = Mongoose.model('Materia', MateriaSchema);

const alumnoSchema = new Schema({
    nombre: String,
    fechaNacimiento: String,
    domicilio: String,
    carrera: { 
        type: ObjectId, 
        ref: 'Carrera' 
    },
    materias: [
        {
            materiaId: {
                type: ObjectId,
                ref: "Materia"
            },
            estadoCursado: String,
            notaObtenida: Number
        }
    ]
});
const Alumno = Mongoose.model('Alumno', alumnoSchema);

module.exports.CarreraModel = Carrera;
module.exports.MateriaModel = Materia;
module.exports.AlumnoModel  = Alumno;
