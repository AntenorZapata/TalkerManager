const VerifyCredentials = require('../utils/verifyCredentials');

const validation = async (req, res, next) => {
  const verify = new VerifyCredentials(req, res);
  const vToken = verify.verifyToken();
  const vName = verify.verifyName();
  const vAge = verify.verifyAge();
  const vTalk = verify.verifyTalk();
  if (vToken && vName && vAge && vTalk) {
    next();
  }
};

module.exports = validation;