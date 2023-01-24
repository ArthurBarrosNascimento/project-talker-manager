const { validationEmail } = require('../service');

const validationPropertyEmail = (req, res, next) => {
  const requireProperty = ['email'];
  if (requireProperty.every((property) => property in req.body)) {
    next();
  } else res.status(400).json({ message: 'O campo "email" é obrigatório' });
};

const validationTypeEmail = (req, res, next) => {
  const request = req.body.email;
  if (validationEmail(request)) {
    next();
  } else res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
};

const validationPropertyPassword = (req, res, next) => {
  const requireProperty = ['password'];
  if (requireProperty.every((property) => property in req.body)) {
    next();
  } else res.status(400).json({ message: 'O campo "password" é obrigatório' });
};

const validationLengthPassword = (req, res, next) => {
  const { password } = req.body;
  if (password.length >= 6) {
    next();
  } else res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
};

module.exports = {
  validationPropertyEmail,
  validationTypeEmail,
  validationPropertyPassword,
  validationLengthPassword,
};