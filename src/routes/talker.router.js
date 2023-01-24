const express = require('express');
// const fs = require('fs');
const readFile = require('../readFile');
const writeFile = require('../writeFile');

const {
  validationAuthenticationHeader,
  validationLengthAuthentication,
  validationPropertyName,
  validationLengthName,
  validationPropertyAge,
  validationLengthAge,
  valodationPropertyTalk,
  validationPropertyWatchedAt,
  validationFormatWatchedAt,
  validationPropertyRate,
  validationRate,
} = require('../middleware/validationTalker');

const router = express.Router();
router.use(express.json());

router.get('/talker', async (_req, res) => {
  const talkersFile = await readFile();
  return res.status(200).json(talkersFile);
});

router.get('/talker/:id', async (req, res) => {
   const { id } = req.params;
   const talkersFile = await readFile();
   const request = talkersFile.find((t) => t.id === Number(id));
   if (!request) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

   return res.status(200).json(request);
});

router.post('/talker',
  validationAuthenticationHeader,
  validationLengthAuthentication,
  validationPropertyName,
  validationLengthName,
  validationPropertyAge,
  validationLengthAge,
  valodationPropertyTalk,
  validationPropertyWatchedAt,
  validationFormatWatchedAt,
  validationPropertyRate,
  validationRate,
 async (req, res) => {
  const request = req.body;
  const talkersFile = await readFile();
  for (let i = 0; talkersFile.length > i; i += 1) {
    request.id = i + 2;
  }
  talkersFile.push(request);
  await writeFile(talkersFile);
  res.status(201).json(request);
}); 

module.exports = router;