const generateToken = require('../utils/crypto');
const VerifyLoginCredentials = require('../utils/verifyCredentials');

const login = (req, res) => {
  const verify = new VerifyLoginCredentials(req, res);
  const vEamil = verify.verifyEmail();
  const vPassword = verify.verifyPassword();
  if (vEamil && vPassword) {
    return res.status(200).json({
      token: generateToken(),
    });
  }
};

module.exports = {
  login,
};
