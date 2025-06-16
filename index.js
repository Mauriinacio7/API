const express = require('express');
const multer = require('multer');
const path = require('path');
const validarImagem = require('./validadorImagem');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'aparencia.html'));
});

const upload = multer({ dest: 'uploads/' });

app.post('/enviar', upload.single('foto'), async (req, res) => {
  const caminho = req.file.path;
  const resultado = await validarImagem(caminho);

  if (resultado.valido) {
    res.send('✅ Imagem aceita! Pode seguir com o registro de pontos.');
  } else {
    res.send('❌ Imagem inválida. Tire uma foto de um produto reciclável.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});