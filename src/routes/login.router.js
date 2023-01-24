const express = require('express');

const router = express.Router();

// router.post('/login', (req, res) => {
//   const request = req.body;
//   if (Object.keys(request).length === 0) {
//     return res.status(401).end();
//   }
//   if (request.email === '' || request.hasOwnProperty('email') === false) {
//     return res.status(400).json({ message: 'O campo "email" é obrigatório' });
//   }
//   if (!validateEmail(request.email)) {
//     return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
//   }
//   if (request.password === '' || request.hasOwnProperty('password') === false) {
//     return res.status(400).json({ message: 'O campo "password" é obrigatório' });
//   }
//   if (request.password.length < 6) {
//     return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
//   }
//   const toke = geraStringAleatoria(16);
//   return res.status(200).json({ token: toke });  
// });

module.exports = router;