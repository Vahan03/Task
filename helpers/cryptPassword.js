//Password encrypt, signin and signup

const crypto = require('crypto-js');

module.exports = (password)=>{
  return crypto.HmacSHA1(password, "sesuritiu").toString();
}
