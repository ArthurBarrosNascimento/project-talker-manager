const express = require('express');
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

router.get('/talker/search', validationAuthenticationHeader,
validationLengthAuthentication, async (req, res) => {
  const { q } = req.query;
  const talkersFile = await readFile();
  if (!q || q === '') {
    return res.status(200).json(talkersFile);
  }
  const talkersByQuery = talkersFile.filter((t) => t.name.toLowerCase().includes(q.toLowerCase()));
  console.log(talkersByQuery);
  res.status(200).json(talkersByQuery);
});

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

router.delete('/talker/:id', validationAuthenticationHeader,
validationLengthAuthentication, async (req, res) => {
  const { id } = req.params;
  const talkersFile = await readFile();
  const newTalkersFile = talkersFile.filter((talker) => talker.id !== Number(id));
  await writeFile(newTalkersFile);
  res.status(204).end();
});

router.put('/talker/:id',
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
  const { id } = req.params;
  
  const talkersFile = await readFile();
  const newTalkersFile = talkersFile.filter((talker) => talker.id !== Number(id));

  request.id = Number(id);
  newTalkersFile.push(request);

  await writeFile(newTalkersFile);

  res.status(200).json(request);
});

module.exports = router;