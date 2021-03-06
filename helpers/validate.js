const Validator = require('validatorjs');

const validator = (body, rules, customMessages, callback) => {
  try {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = validator;