import express from 'express';

const router = express.Router();

const partidos = [
    {
      id: 1,
      name: 'Partido Alianza Nacional',
      shortName: 'PAN',
      icon: '🛡️',
      bgColor: 'bg-teal-700',
      axes: ['Economía', 'Seguridad', 'Salud'],
      planData: {
        '2026': [
          { name: 'Economía', percentage: 35 },
          { name: 'Seguridad', percentage: 30 },
          { name: 'Salud', percentage: 25 },
          { name: 'Otros', percentage: 10 }
        ],
        '2022': [
          { name: 'Economía', percentage: 40 },
          { name: 'Seguridad', percentage: 25 },
          { name: 'Salud', percentage: 20 },
          { name: 'Otros', percentage: 15 }
        ]
      }
    },
    {
      id: 2,
      name: 'Frente Popular Unido',
      shortName: 'FPU',
      icon: '🌱',
      bgColor: 'bg-teal-600',
      axes: ['Educación', 'Medio Ambiente', 'Jóvenes'],
      planData: {
        '2026': [
          { name: 'Educación', percentage: 40 },
          { name: 'Medio Ambiente', percentage: 30 },
          { name: 'Jóvenes', percentage: 20 },
          { name: 'Cultura', percentage: 10 }
        ],
        '2022': [
          { name: 'Educación', percentage: 35 },
          { name: 'Medio Ambiente', percentage: 25 },
          { name: 'Jóvenes', percentage: 25 },
          { name: 'Cultura', percentage: 15 }
        ]
      }
    },
    {
      id: 3,
      name: 'Movimiento Cívico Renovador',
      shortName: 'MCR',
      icon: '🌾',
      bgColor: 'bg-yellow-400',
      axes: ['Reforma del Estado', 'Infraestructura', 'Agricultura'],
      planData: {
        '2026': [
          { name: 'Reforma E.', percentage: 30 },
          { name: 'Infraestructura', percentage: 45 },
          { name: 'Agricultura', percentage: 15 },
          { name: 'Otros', percentage: 10 }
        ],
        '2022': [
          { name: 'Reforma E.', percentage: 25 },
          { name: 'Infraestructura', percentage: 40 },
          { name: 'Agricultura', percentage: 25 },
          { name: 'Otros', percentage: 10 }
        ]
      }
    },
    {
      id: 4,
      name: 'Unión por el Progreso',
      shortName: 'UPP',
      icon: '❤️',
      bgColor: 'bg-emerald-700',
      axes: ['Integración', 'Igualdad', 'Descentralización'],
      planData: {
        '2026': [
          { name: 'Integración', percentage: 25 },
          { name: 'Igualdad', percentage: 40 },
          { name: 'Descentralización', percentage: 35 }
        ],
        '2022': [
          { name: 'Integración', percentage: 30 },
          { name: 'Igualdad', percentage: 30 },
          { name: 'Descentralización', percentage: 40 }
        ]
      }
    },
    {
      id: 5,
      name: 'Democracia Activa',
      shortName: 'DA',
      icon: '🕊️',
      bgColor: 'bg-gray-100',
      axes: ['Mujer', 'Inclusión Social', 'Cultura'],
      planData: {
        '2026': [
          { name: 'Mujer', percentage: 35 },
          { name: 'Inclusión Social', percentage: 45 },
          { name: 'Cultura', percentage: 20 }
        ],
        '2022': [
          { name: 'Mujer', percentage: 30 },
          { name: 'Inclusión Social', percentage: 40 },
          { name: 'Cultura', percentage: 30 }
        ]
      }
    },
    {
      id: 6,
      name: 'Partido del Futuro',
      shortName: 'PDF',
      icon: '🚀',
      bgColor: 'bg-teal-800',
      axes: ['Tecnología', 'Desarrollo Sostenible', 'Trabajo'],
      planData: {
        '2026': [
          { name: 'Tecnología', percentage: 50 },
          { name: 'Desarrollo S.', percentage: 25 },
          { name: 'Trabajo', percentage: 25 }
        ],
        '2022': [
          { name: 'Tecnología', percentage: 40 },
          { name: 'Desarrollo S.', percentage: 30 },
          { name: 'Trabajo', percentage: 30 }
        ]
      }
    },
  ];

// GET - Obtener todos los partidos
router.get('/', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: partidos,
      count: partidos.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener partidos',
      error: error.message
    });
  }
});

// GET - Obtener un partido por ID
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const partido = partidos.find(p => p.id === parseInt(id));

    if (!partido) {
      return res.status(404).json({
        success: false,
        message: 'Partido no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: partido
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener partido',
      error: error.message
    });
  }
});

// GET - Obtener partidos por nombre (búsqueda)
router.get('/buscar/:name', (req, res) => {
  try {
    const { name } = req.params;
    const partidosFiltrados = partidos.filter(p => 
      p.name.toLowerCase().includes(name.toLowerCase()) ||
      p.shortName.toLowerCase().includes(name.toLowerCase())
    );

    if (partidosFiltrados.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No se encontraron partidos con ese nombre'
      });
    }

    res.status(200).json({
      success: true,
      data: partidosFiltrados,
      count: partidosFiltrados.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al buscar partidos',
      error: error.message
    });
  }
});

// GET - Obtener plan de un partido por año
router.get('/:id/plan/:year', (req, res) => {
  try {
    const { id, year } = req.params;
    const partido = partidos.find(p => p.id === parseInt(id));

    if (!partido) {
      return res.status(404).json({
        success: false,
        message: 'Partido no encontrado'
      });
    }

    const plan = partido.planData[year];

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: `No hay plan disponible para el año ${year}`
      });
    }

    res.status(200).json({
      success: true,
      partid: partido.name,
      year: year,
      data: plan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener plan del partido',
      error: error.message
    });
  }
});

// GET - Obtener ejes políticos de un partido
router.get('/:id/ejes', (req, res) => {
  try {
    const { id } = req.params;
    const partido = partidos.find(p => p.id === parseInt(id));

    if (!partido) {
      return res.status(404).json({
        success: false,
        message: 'Partido no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      partido: partido.name,
      ejes: partido.axes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener ejes del partido',
      error: error.message
    });
  }
});

export default router;