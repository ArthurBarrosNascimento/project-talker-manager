const express = require('express');
const talke = require('./talker.json');
const { geraStringAleatoria, validateEmail } = require('./service');

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
  console.log(result);
  
  if (Object.keys(result).length === 0) return res.status(401).end();

  if (result.email === '' || result.hasOwnProperty('email') === false) res.status(400).json({ message: "O campo \"email\" é obrigatório"})//email vazio ou não seja passado

  if (!validateEmail(result.email)) res.status(400).json({ message: 'O \"email\" deve ter o formato \"email@email.com\"'})//email não valido

  if (result.password === '' || result.hasOwnProperty('password') === false) res.status(400).json({ message: "O campo \"password\" é obrigatório"})//password vazio ou não seja passado

  if (result.password.length < 6) res.status(400).json({ message: 'O \"password\" deve ter pelo menos 6 caracteres'})//password seja menor que 6


  const toke = geraStringAleatoria(16);
  return res.status(200).json({ token: toke});
  
});