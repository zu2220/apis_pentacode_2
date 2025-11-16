import express from 'express';
import voterService from '../services/voterService.js';
import validate from '../middlewares/validate.js';

const router = express.Router();

// ==== 10 registros FIJOS ====
const registrosFijos = [
  {
    dni: "12345678",
    fecha_emision: "2020-01-15",
    codigo_verificador: "5",
    nombre: "Pedro S�nchez",
    lugar_votacion: "IE 3054 Rep�blica del Per�",
    direccion: "Av. Los �lamos 123",
    latitud: -12.0464,
    longitud: -77.0428,
    mesa: "450123",
    pabellon: "A",
    miembro_mesa: false
  },
  {
    dni: "87654321",
    fecha_emision: "2019-03-10",
    codigo_verificador: "3",
    nombre: "Mar�a L�pez",
    lugar_votacion: "Colegio San Mart�n",
    direccion: "Jr. Ayacucho 455",
    latitud: -12.0604,
    longitud: -77.0301,
    mesa: "451200",
    pabellon: "B",
    miembro_mesa: true
  },
  {
    dni: "11112222",
    fecha_emision: "2018-05-21",
    codigo_verificador: "2",
    nombre: "Juan P�rez",
    lugar_votacion: "IE 1085 Santa Rosa",
    direccion: "Av. Per� 300",
    latitud: -12.0500,
    longitud: -77.0400,
    mesa: "450567",
    pabellon: "C",
    miembro_mesa: false
  },
  {
    dni: "22223333",
    fecha_emision: "2022-08-12",
    codigo_verificador: "8",
    nombre: "Luisa G�mez",
    lugar_votacion: "Colegio Am�rica",
    direccion: "Av. Los H�roes 789",
    latitud: -12.0522,
    longitud: -77.0455,
    mesa: "452300",
    pabellon: "A",
    miembro_mesa: true
  },
  {
    dni: "33334444",
    fecha_emision: "2021-02-18",
    codigo_verificador: "4",
    nombre: "Carlos Huam�n",
    lugar_votacion: "IE 2025 T�pac Amaru",
    direccion: "Av. Pachac�tec 1200",
    latitud: -12.0650,
    longitud: -77.0500,
    mesa: "453000",
    pabellon: "B",
    miembro_mesa: false
  },
  {
    dni: "44445555",
    fecha_emision: "2017-09-25",
    codigo_verificador: "9",
    nombre: "Ana Torres",
    lugar_votacion: "Colegio Santa Ana",
    direccion: "Jr. Cusco 150",
    latitud: -12.0455,
    longitud: -77.0480,
    mesa: "452850",
    pabellon: "C",
    miembro_mesa: true
  },
  {
    dni: "55556666",
    fecha_emision: "2023-01-05",
    codigo_verificador: "0",
    nombre: "Roberto Aguilar",
    lugar_votacion: "IE 6043 Rep�blica Argentina",
    direccion: "Av. Grau 870",
    latitud: -12.0700,
    longitud: -77.0300,
    mesa: "451500",
    pabellon: "A",
    miembro_mesa: false
  },
  {
    dni: "66667777",
    fecha_emision: "2020-11-11",
    codigo_verificador: "1",
    nombre: "Carmen Rojas",
    lugar_votacion: "Colegio Leoncio Prado",
    direccion: "Av. La Marina 920",
    latitud: -12.0750,
    longitud: -77.0500,
    mesa: "454200",
    pabellon: "B",
    miembro_mesa: false
  },
  {
    dni: "77778888",
    fecha_emision: "2016-07-07",
    codigo_verificador: "6",
    nombre: "Hugo Castro",
    lugar_votacion: "IE 3099 San Jos� Obrero",
    direccion: "Av. Angamos 220",
    latitud: -12.0850,
    longitud: -77.0600,
    mesa: "455300",
    pabellon: "C",
    miembro_mesa: true
  },
  {
    dni: "88889999",
    fecha_emision: "2015-03-03",
    codigo_verificador: "7",
    nombre: "Laura Fern�ndez",
    lugar_votacion: "Colegio San Juan Bosco",
    direccion: "Jr. Libertad 350",
    latitud: -12.0900,
    longitud: -77.0700,
    mesa: "456700",
    pabellon: "A",
    miembro_mesa: false
  }
];

// ==== GET filtra por dni, fecha_emision y codigo_verificador ====
router.get("/consulta", (req, res) => {
  const { dni, fecha_emision, codigo_verificador } = req.query;

  if (!dni || !fecha_emision || !codigo_verificador) {
    return res.status(400).json({
      error: "Debes enviar dni, fecha_emision y codigo_verificador"
    });
  }

  const resultado = registrosFijos.find(
    reg =>
      reg.dni === dni &&
      reg.fecha_emision === fecha_emision &&
      reg.codigo_verificador === codigo_verificador
  );

  if (!resultado) {
    return res.status(404).json({ error: "No se encontr� el registro" });
  }

  return res.json({
    total: 1,
    data: resultado
  });
});

// ==== POST real ====
router.post("/consulta", validate, async (req, res) => {
  try {
    const data = await voterService.consultar(req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error en la consulta" });
  }
});

export default router;
