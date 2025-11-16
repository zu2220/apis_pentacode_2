import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Necesario para obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al JSON en la carpeta raíz del proyecto
const dataPath = path.join(__dirname, '..', 'indicadores.json');

// Función para cargar el JSON
const cargarIndicadores = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error al leer indicadores.json:', err);
    return [];
  }
};

// Lista de campos válidos de indicadores
const CAMPOS_INDICADORES = [
  'edu',
  'sal',
  'seg',
  'eco',
  'est',
  'soc',
  'med',
  'inf',
  'cul',
  'agr',
  'tec',
  'ext',
  'otr'
];

// GET - Obtener todos los partidos con sus indicadores
router.get('/', (req, res) => {
  try {
    const indicadores = cargarIndicadores();

    res.status(200).json({
      success: true,
      data: indicadores,
      count: indicadores.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener indicadores',
      error: error.message
    });
  }
});

// GET - Obtener indicadores de un partido específico
router.get('/partido/:partido', (req, res) => {
  try {
    const indicadores = cargarIndicadores();
    const { partido } = req.params;

    const resultados = indicadores.filter(i =>
      i.partido_politico &&
      i.partido_politico.toLowerCase().includes(partido.toLowerCase())
    );

    if (resultados.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No se encontraron indicadores para este partido'
      });
    }

    res.status(200).json({
      success: true,
      partido: partido,
      data: resultados,
      count: resultados.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener indicadores por partido',
      error: error.message
    });
  }
});

// GET - Obtener ranking de un indicador (ej: /indicador/edu)
router.get('/indicador/:campo', (req, res) => {
  try {
    const indicadores = cargarIndicadores();
    const { campo } = req.params;

    if (!CAMPOS_INDICADORES.includes(campo)) {
      return res.status(400).json({
        success: false,
        message: `Campo de indicador inválido. Campos válidos: ${CAMPOS_INDICADORES.join(', ')}`
      });
    }

    // Ordenar descendentemente por el campo indicado
    const ranking = [...indicadores].sort((a, b) => {
      const va = Number(a[campo] ?? 0);
      const vb = Number(b[campo] ?? 0);
      return vb - va;
    });

    res.status(200).json({
      success: true,
      indicador: campo,
      data: ranking,
      count: ranking.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener ranking del indicador',
      error: error.message
    });
  }
});

// GET - Obtener el valor de un indicador para un partido concreto
// Ejemplo: /partido/Fuerza%20Popular/indicador/edu
router.get('/partido/:partido/indicador/:campo', (req, res) => {
  try {
    const indicadores = cargarIndicadores();
    const { partido, campo } = req.params;

    if (!CAMPOS_INDICADORES.includes(campo)) {
      return res.status(400).json({
        success: false,
        message: `Campo de indicador inválido. Campos válidos: ${CAMPOS_INDICADORES.join(', ')}`
      });
    }

    const registro = indicadores.find(i =>
      i.partido_politico &&
      i.partido_politico.toLowerCase() === partido.toLowerCase()
    );

    if (!registro) {
      return res.status(404).json({
        success: false,
        message: 'Partido no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      partido: registro.partido_politico,
      indicador: campo,
      valor: Number(registro[campo] ?? 0)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener indicador del partido',
      error: error.message
    });
  }
});

export default router;
