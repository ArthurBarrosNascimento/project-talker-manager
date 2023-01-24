const { validationDate } = require('../service');

const validationAuthenticationHeader = (req, res, next) => {
  if (req.header('authorization')) {
    next();
  } else res.status(401).json({ message: 'Token não encontrado' });
};

const validationLengthAuthentication = (req, res, next) => {
  const authentication = req.header('authorization');
  if (authentication.length === 16) {
    next();
  } else res.status(401).json({ message: 'Token inválido' });
};

const validationPropertyName = (req, res, next) => {
  const requerProperty = ['name'];
  if (requerProperty.every((property) => property in req.body)) {
    next();
  } else res.status(400).json({ message: 'O campo "name" é obrigatório' });
};

const validationLengthName = (req, res, next) => {
  const { name } = req.body;
  if (name.length >= 3) {
    next();
  } else res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
};

const validationPropertyAge = (req, res, next) => {
  const requerProperty = ['age'];
  if (requerProperty.every((property) => property in req.body)) {
    next();
  } else res.status(400).json({ message: 'O campo "age" é obrigatório' });
};

const validationLengthAge = (req, res, next) => {
  const { age } = req.body;
  if (Number(age) >= 18) {
    next();
  } else res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
};

const valodationPropertyTalk = (req, res, next) => {
  const requerProperty = ['talk'];
  if (requerProperty.every((property) => property in req.body)) {
    next();
  } else res.status(400).json({ message: 'O campo "talk" é obrigatório' });
};

const validationPropertyWatchedAt = (req, res, next) => {
  const requerProperty = ['watchedAt'];
  if (requerProperty.every((property) => property in req.body.talk)) {
    next();
  } else res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
};

const validationFormatWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  if (validationDate(watchedAt)) {
    next();
  } else res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
};

const validationPropertyRate = (req, res, next) => {
  const requerProperty = ['rate'];
  if (requerProperty.every((property) => property in req.body.talk)) {
    next();
  } else res.status(400).json({ message: 'O campo "rate" é obrigatório' });
};

const validationRate = (req, res, next) => {
  const { rate } = req.body.talk;
  const number = Number(rate);
  if (number >= 1 && number <= 5 && Number.isInteger(number)) {
    next();
  } else res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
};

module.exports = {
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
};  