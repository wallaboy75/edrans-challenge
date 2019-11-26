const Mongoose  = require("mongoose");
const Schema  = Mongoose.Schema;
const ObjectId  = Mongoose.SchemaTypes.ObjectId;

Mongoose.set('useFindAndModify', false);
/*const CarreraSchema = new Mongoose.Schema({
    nombre: String,
    tituloOtorgado: String,
    materias: [
        {
            type:   ObjectId,
            ref:    MateriaSchema
        }
    ],
    alumnos: [
        {
            type:   ObjectId,
            ref:    AlumnoSchema
        }
    ]
});*/

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
/*const MateriaSchema = new Mongoose.Schema({
    nombre: String,
    cargaHoraria: Number,
    alumnos: [
        {
            type:   ObjectId,
            ref:    AlumnoSchema
        }
    ],
    carreras: [
        {
            type:   ObjectId,
            ref:    CarreraSchema
        }
    ]
});*/
const materiaCarreraSchema = new Schema({
  _id: { type: ObjectId, ref: 'Carrera' },
  nombre: String
});

const MateriaSchema = new Schema({
    nombre: String,
    cargaHoraria: Number,
    carreras: [
      { 
        type: ObjectId, 
        ref: 'Carrera' 
      }
    ]
});

const Materia = Mongoose.model('Materia', MateriaSchema);

const alumnoCarreraSchema = new Schema({
  _id: { type: ObjectId, ref: 'Carrera' },
  nombre: String
});

const alumnoMateriaSchema = new Schema({
  _id: { type: ObjectId, ref: 'Materia' },
  nombre: String,
  estadoCursado: String,
  notaObtenida: Number
});

const alumnoSchema = new Schema({
  nombre: String,
  fechaNacimiento: String,
  domicilio: String,
  carrera: alumnoCarreraSchema,
  materias: [alumnoMateriaSchema]
});

const Alumno = Mongoose.model('Alumno', alumnoSchema);

/*const AlumnoSchema = new Mongoose.Schema({
    nombre: String,
    fechaNacimiento: String,
    domicilio: String,
    carrera: {
        type:   ObjectId,
        ref:    CarreraSchema
    },
    materias: [
        {
            type:   ObjectId,
            ref:    MateriaSchema
        }
    ]
});*/
 
/*module.exports.CarreraModel = Mongoose.model("Carrera", CarreraSchema);
module.exports.MateriaModel = Mongoose.model("Materia", MateriaSchema);
module.exports.AlumnoModel  = Mongoose.model("Alumno", AlumnoSchema);*/

module.exports.CarreraModel = Carrera;
module.exports.MateriaModel = Materia;
module.exports.AlumnoModel  = Alumno;