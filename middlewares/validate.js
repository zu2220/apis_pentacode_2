export default function (req, res, next) {
  const { dni, fecha_emision, codigo_verificador } = req.body;

  if (!dni || !fecha_emision || !codigo_verificador) {
    return res.status(400).json({
      error: "Todos los campos son obligatorios"
    });
  }

  // DNI debe tener 8 dígitos
  if (!/^\d{8}$/.test(dni)) {
    return res.status(400).json({
      error: "El DNI debe tener 8 dígitos"
    });
  }

  // Código verificador debe ser 0–9
  if (!/^\d$/.test(codigo_verificador)) {
    return res.status(400).json({
      error: "El código verificador debe ser un número de 0 a 9"
    });
  }

  next();
};
