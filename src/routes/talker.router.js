const express = require('express');
const readFile = require('../readFile');

const router = express.Router();

router.get('/talker', async (_req, res) => {
  const talkers = await readFile();
  return res.status(200).json(talkers);
});

router.get('/talker/:id', async (req, res) => {
   const { id } = req.params;
   const talkers = await readFile();
   const request = talkers.find((t) => t.id === Number(id));
   if (!request) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

   return res.status(200).json(request);
});

// app.post('/talker', async (req, res) => {
//   const request = req.body;
//   const autorization = req.header('authorization');
//   if (!autorization) { 
//     return res.status(401).json({ message: 'Token não encontrado' });
//   }
//   if (autorization.toString().length !== 16) {
//     return res.status(401).json({ message: 'Token inválido' });
//   }
//   if (request.name === ''
//   || request.hasOwnProperty('name') === false) {
//     return res.status(400).json({ message: 'O campo "name" é obrigatório' });
//   }
//   if (request.name.length < 3) {
//     return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
//   }
//   if (request.age === ''
//   || request.hasOwnProperty('age') === false) {
//     return res.status(400).json({ message: 'O campo "age" é obrigatório' });
//   }
//   if (Number(request.age) < 18) {
//     return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
//   }
//   if (request.hasOwnProperty('talk') === false) {
//     return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
//   }
//   if (request.talk.watchedAt === ''
//   || request.talk.hasOwnProperty('watchedAt') === false) {
//     return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
//   }
//   if (!validateDate(request.talk.watchedAt)) {
//     return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
//   }
//   if (request.talk.rate === ''
//   || request.talk.hasOwnProperty('rate') === false) {
//     return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
//   }
//   if (Number(request.talk.rate) < 1
//   || Number(request.talk.rate) > 5
//   || !Number.isInteger(request.talk.rate)) {
//     return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
//   }
//   const talkers = JSON.parse(await fs.readFile(`${__dirname}/talker.json`));
//   return res.status(201).json(talkers);
// });

module.exports = router;