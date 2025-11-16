import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Necesario para obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al JSON en la carpeta raíz del proyecto
const dataPath = path.join(__dirname, '..', 'postulantes.json');

// Función para cargar el JSON
const cargarPostulantes = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error al leer postulantes.json:', err);
    return [];
  }
};

// GET - Obtener todos los postulantes
router.get('/', (req, res) => {
  try {
    const postulantes = cargarPostulantes();

    res.status(200).json({
      success: true,
      data: postulantes,
      count: postulantes.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener postulantes',
      error: error.message
    });
  }
});

// GET - Obtener un postulante por ID (id tipo long en el JSON)
router.get('/:id', (req, res) => {
  try {
    const postulantes = cargarPostulantes();
    const { id } = req.params;
    const idNum = Number(id);

    const postulante = postulantes.find(p => p.id === idNum);

    if (!postulante) {
      return res.status(404).json({
        success: false,
        message: 'Postulante no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: postulante
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener postulante',
      error: error.message
    });
  }
});

// GET - Obtener postulantes por partido político
router.get('/partido/:partido', (req, res) => {
  try {
    const postulantes = cargarPostulantes();
    const { partido } = req.params;

    const filtrados = postulantes.filter(p =>
      p.partido_politico &&
      p.partido_politico.toLowerCase().includes(partido.toLowerCase())
    );

    if (filtrados.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No se encontraron postulantes para este partido político'
      });
    }

    res.status(200).json({
      success: true,
      partido: partido,
      data: filtrados,
      count: filtrados.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener postulantes por partido político',
      error: error.message
    });
  }
});

// GET - Obtener postulantes por departamento de origen
router.get('/departamento/:departamento', (req, res) => {
  try {
    const postulantes = cargarPostulantes();
    const { departamento } = req.params;

    const filtrados = postulantes.filter(p =>
      p.departamento_origen &&
      p.departamento_origen.toLowerCase().includes(departamento.toLowerCase())
    );

    if (filtrados.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No se encontraron postulantes para este departamento'
      });
    }

    res.status(200).json({
      success: true,
      departamento: departamento,
      data: filtrados,
      count: filtrados.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener postulantes por departamento',
      error: error.message
    });
  }
});

export default router;
