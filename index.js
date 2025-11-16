import 'dotenv/config.js';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import votacionRoutes from './routes/votacion.js';
import candidatosRoutes from './routes/candidatos.js';
import partidosRoutes from './routes/partidos.js';
import indicadoresRouter from './routes/indicadores.js';

const app = express();
app.use(helmet());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60000,
  max: 30,
  message: { error: 'Too many requests' }
});
app.use(limiter);

app.use("/api/v1/votacion", votacionRoutes);
app.use("/api/v1/candidatos", candidatosRoutes);
app.use("/api/v1/partidos", partidosRoutes);
app.use('/api/v1/indicadores', indicadoresRouter);



app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('API running on port ' + port));