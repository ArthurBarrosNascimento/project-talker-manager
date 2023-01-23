const express = require('express');
const talke = require('./talker.json');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', (req, res) => {// exibe todo o array
  if (talke.length === 0) res.status(200).json([]);

  return res.status(200).json(talke);
});
