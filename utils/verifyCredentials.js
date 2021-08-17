class VerifyLoginCredentials {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  verifyEmail() {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const { email } = this.req.body;

    if (!email) {
      this.res.status(400).json({
        message: 'O campo "email" é obrigatório',
      });
      return;
    }

    if (!email.match(pattern)) {
      this.res.status(400).json({
        message: 'O "email" deve ter o formato "email@email.com"',
      });
      return;
    }
    return true;
  }

  verifyPassword() {
    const { password } = this.req.body;
    if (!password) {
      this.res.status(400).json({
        message: 'O campo "password" é obrigatório',
      });
      return;
    }
    const pass = password.toString();
    if (pass.length < 6) {
      this.res.status(400).json({
        message: 'O "password" deve ter pelo menos 6 caracteres',
      });
      return;
    }
    return true;
  }

  verifyToken() {
    const { authorization } = this.req.headers;
    const pattern = /^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/;
    if (!authorization) {
      this.res.status(401).json({
        message: 'Token não encontrado',
      });
      return;
    }

    if (authorization.length !== 16 || !authorization.match(pattern)) {
      this.res.status(401).json({
        message: 'Token inválido',
      });
      return;
    }
    return true;
  }

  verifyName() {
    const { name } = this.req.body;

    if (!name) {
      this.res.status(400).json({
        message: 'O campo "name" é obrigatório',
      });
      return;
    }

    if (name.length < 3) {
      this.res.status(400).json({
        message: 'O "name" deve ter pelo menos 3 caracteres',
      });
      return;
    }
    return true;
  }

  verifyAge() {
    const { age } = this.req.body;
    if (!age) {
      this.res.status(400).json({
        message: 'O campo "age" é obrigatório',
      });
      return;
    }

    if (+age < 18) {
      this.res.status(400).json({
        message: 'A pessoa palestrante deve ser maior de idade',
      });
      return;
    }
    return true;
  }

  verifyTalk() {
    const { talk } = this.req.body;
    if (!talk || !talk.watchedAt || !talk.rate) {
      this.res.status(400).json({
        message:
          'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
      return;
    }
    return this.verifyDateAndRate();
  }

  verifyDateAndRate() {
    const { talk } = this.req.body;
    const pattern = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

    if (!talk.watchedAt.match(pattern)) {
      this.res.status(400).json({
        message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
      });
      return;
    }
    if (!Number.isInteger(+talk.rate) || +talk.rate < 1 || +talk.rate > 5) {
      this.res.status(400).json({
        message: 'O campo "rate" deve ser um inteiro de 1 à 5',
      });
      return;
    }
    return true;
  }
}

module.exports = VerifyLoginCredentials;
