import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    firstname: Joi.string().min(2).required(),
    lastname: Joi.string().min(2).required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().required()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    })
  } else {
    next();
  }
};




// import Joi from '@hapi/joi';

// export const newUserValidator = (req, res, next) => {
//   const schema = Joi.object({
//     name: Joi.string().min(4).required()
//   });
//   const { error, value } = schema.validate(req.body);
//   if (error) {
//     next(error);
//   } else {
//     req.validatedBody = value;
//     next();
//   }
// };
