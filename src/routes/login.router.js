const express = require('express');
const {
  validationPropertyEmail,
  validationTypeEmail,
  validationPropertyPassword,
  validationLengthPassword,
} = require('../middleware/validationLogin');
const { geraToken } = require('../service');

const router = express.Router();
router.use(express.json());

router.post('/login',
  validationPropertyEmail,
  validationTypeEmail,
  validationPropertyPassword,
  validationLengthPassword, (_req, res) => {
  const tokenGerado = geraToken(16);
  return res.status(200).json({ token: tokenGerado });  
});

module.exports = router;