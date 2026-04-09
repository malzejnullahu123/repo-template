require('dotenv').config();

const express = require('express');

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(express.static('public'));

app.get('/health', (_req, res) => {
  res.send({ ok: true, service: process.env.APP_NAME || 'repo-template-app' });
});

app.listen(PORT, () => {
  console.log(`Repo template app running on ${PORT}`);
});
