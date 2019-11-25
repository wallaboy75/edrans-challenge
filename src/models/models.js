const Mongoose  = require("mongoose");
const ObjectId  = Mongoose.SchemaTypes.ObjectId;

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

const CarreraSchema = new Mongoose.Schema({
    nombre: String,
    tituloOtorgado: String
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
const materiaCarreraSchema = new Mongoose.Schema({
  _id: { type: ObjectId, ref: 'Carrera' },
  nombre: String
});

const MateriaSchema = new Mongoose.Schema({
    nombre: String,
    cargaHoraria: Number,
    carreras: [materiaCarreraSchema]
});

const Materia = Mongoose.model('Materia', MateriaSchema);

const alumnoCarreraSchema = new Mongoose.Schema({
  _id: { type: ObjectId, ref: 'Carrera' },
  nombre: String
});

const alumnoMateriaSchema = new Mongoose.Schema({
  _id: { type: ObjectId, ref: 'Materia' },
  nombre: String,
  estadoCursado: String,
  notaObtenida: Number
});

const alumnoSchema = new Mongoose.Schema({
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