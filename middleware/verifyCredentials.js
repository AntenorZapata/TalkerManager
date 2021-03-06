const verifyEmail = (req, res, next) => {
  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }

  if (!email.match(pattern)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
};

const verifyPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  const pass = password.toString();
  if (pass.length < 6) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  next();
};

const verifyDateAndRate = (req, res, next) => {
  const { talk } = req.body;
  const pattern = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

  if (!talk.watchedAt.match(pattern)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  if (!Number.isInteger(+talk.rate) || +talk.rate < 1 || +talk.rate > 5) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    });
  }
  next();
};

const verifyTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || (!talk.rate && talk.rate !== 0)) {
    return res.status(400).json({
      message:
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    });
  }

  next();
};

const verifyAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }

  if (+age < 18) {
    return res.status(400).json({
      message: 'A pessoa palestrante deve ser maior de idade',
    });
  }
  next();
};

const verifyName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  }

  if (name.length < 3) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }

  next();
};

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  const pattern = /^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/;
  if (!authorization) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }

  if (authorization.length !== 16 || !authorization.match(pattern)) {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }
  next();
};

module.exports = {
  verifyEmail,
  verifyPassword,
  verifyToken,
  verifyName,
  verifyAge,
  verifyTalk,
  verifyDateAndRate,
};
