const Joi = require('joi');

// Define the validation schema for the parameters
const registerValidationSchema = Joi.object({
  fname: Joi.string().pattern(/^[a-zA-Z]+$/).required()
	.messages({
    'string.pattern.base': 'First name must contain only letters'
  }),
  email: Joi.string().email().required()
	.messages({
    'string.email': 'Invalid email address'
  }),
  password: Joi.string().min(8).required()
	.messages({
    'string.min': 'Password must be at least 8 characters long'
  })
});

module.exports = { registerValidationSchema }