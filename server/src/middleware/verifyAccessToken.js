require('dotenv').config();
const jwt = require('jsonwebtoken');
const formatResponse = require('../utils/formatResponse');

function verifyAccessToken(req, res, next) {
  try {
    console.log(req.headers.authorization, 'REQ HEADERS AUTHORIZATION <<<==============')
    const accessToken = req.headers.authorization.split(' ')[1];
    const { user } = jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN);
    res.locals.user = user;
    console.log(res.locals.user, '<<<<<<<<<<<<<<<<<<< RES.LOCALS.USER verifyaccesstoken')
    next();
  } catch ({ message }) {
    console.log('======verifyAccessToken=======>>>>>>>', message);
    res
      .status(403)
      .json(
        formatResponse(
          403,
          'Invalid access token',
          null,
          'Invalid access token'
        )
      );
  }
}

module.exports = verifyAccessToken;
