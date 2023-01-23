const express = require('express');
const talke = require('./talker.json');
const geraToken = require('./service');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const ERRO = 'Pessoa palestrante não encontrada';


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', (_req, res) => {// exibe todo o array
  if (talke.length === 0) res.status(200).json([]);

  return res.status(200).json(talke);
});

app.get('/talker/:id', (req, res) => {// filtra array pelo Id
  const { id } = req.params;

  const findTalkerById = talke.find((t) => t.id === Number(id));
  if (!findTalkerById) res.status(404).json({message: ERRO});

  return res.status(200).json(findTalkerById);
});

app.post('/login', (req, res) => {
  const result = req.body;
  
  if (Object.keys(result).length === 0) return res.status(401).end();

  const toke = geraToken(16);
  return res.status(200).json({ token: toke});
  
});