const express = require('express');
const {
  validatePropertyEmail,
  validateTypeEmail,
  validatePropertyPassword,
  validateLengthPassword,
} = require('../middleware/validateLogin');
const { geraToken } = require('../service');

const router = express.Router();
router.use(express.json());

router.post('/login',
  validatePropertyEmail,
  validateTypeEmail,
  validatePropertyPassword,
  validateLengthPassword, (_req, res) => {
  const tokenGerado = geraToken(16);
  return res.status(200).json({ token: tokenGerado });  
});

module.exports = router;