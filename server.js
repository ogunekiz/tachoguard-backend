const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const telemetryRoutes = require('./src/routes/telemetryRoutes');
app.use('/api/telemetry', telemetryRoutes);

const aiRoutes = require('./src/routes/aiRoutes');
app.use('/api/ai', aiRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'UP', message: 'TachoGuard Engine is running smoothly.' });
});

// app.listen(PORT, () => {
//   console.log(`🚀 TachoGuard backend running on port ${PORT}`);
// });

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}