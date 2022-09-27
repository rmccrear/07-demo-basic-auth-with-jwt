'use strict';

const base64 = require('base-64');
const { Users } = require('../models/index.js');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    //?
    return _authError();
  }

  try {
    const basic = req.headers.authorization.split(' ')[1];
    const [username, pass] = base64.decode(basic).split(':');
    req.user = await Users.authenticateBasic(username, pass);
    next();
  } catch (e) {
    console.error(e);
    res.status(403).send('Invalid Login');
  }
};
