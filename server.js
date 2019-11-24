const express = require("express");
const app = express();

const connectDb = require("./src/connection");
const Alumno = require("./src/Alumno.model");
const Materia = require("./src/Materia.model");
const Carrera = require("./src/Carrera.model");

const PORT = 8080;

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/carrera', async (req, res) => {
  const carrera = new Carrera({nombre: req.body.nombre, tituloOtorgado: req.body.tituloOtorgado});
  await carrera.save().then(
    () => console.log(`Carrera ${req.body.nombre} creada`)
  );
  res.send(`Carrera ${req.body.nombre} creada \n`);
});

app.post('/materia', async (req, res) => {
  const materia = new Materia({nombre: req.body.nombre, cargaOraria: req.body.cargaOraria});
  await materia.save().then(
    () => console.log(`Materia ${req.body.nombre} creada`)
  );
  res.send(`Materia ${req.body.nombre} creada \n`);
});

app.post('/alumno', async (req, res) => {
  const alumno = new Alumno({nombre: req.body.nombre, fechaNacimiento: req.body.fechaNacimiento, domicilio: req.body.domicilio});
  await alumno.save().then(
    () => console.log(`Alumno ${req.body.nombre} creado`)
  );
  res.send(`Alumno ${req.body.nombre} creado \n`);
});

app.get("/alumnos", async (req, res) => {
  const alumnos = await Alumno.find();

  res.json(alumnos);
});

app.get("/materias", async (req, res) => {
  const materias = await Materia.find();
7
  res.json(materias);
});

app.get("/carreras", async (req, res) => {
  const carreras = await Carrera.find();

  res.json(carreras);
});

app.get("/alumno-create", async (req, res) => {
  const alumno = new Alumno({ nombre: "nombreTest", fechaNacimiento: "01/01/1975", domicilio: "caba" });

  await alumno.save().then(() => console.log("Alumno creado"));

  res.send("Alumno creado \n");
});

app.get("/materia-create", async (req, res) => {
  const materia = new Materia({ nombre: "nombreTest", cargaHoraria: 6 });

  await materia.save().then(() => console.log("Materia creada"));

  res.send("Materia creada \n");
});

app.get("/carrera-create", async (req, res) => {
  const carrera = new Carrera({ nombre: "carreraTest", tituloOtorgado: "Informatica" });

  await carrera.save().then(() => console.log("Carrera creada"));

  res.send("Carrera creada \n");
});

/*app.post('/carrera', (req, res) => {
  carrera.insertOne(
    {
      nombre: req.body.nombre,
      tituloOtorgado: req.body.tituloOtorgado
    },
    (err, result) => {
      if (err) {
        console.error(err)
        res.status(500).json({ err: err })
        return
      }
      res.status(200).json({ ok: true })
    }
  )
});*/

app.listen(PORT, function() {
  console.log(`Listening on ${PORT}`);

  connectDb().then(() => {
    console.log("MongoDb connected");
  });
});
