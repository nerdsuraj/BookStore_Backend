import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];

    const  user  = await jwt.verify(bearerToken, process.env.SECRATEKEY);
    
    req.body.email = user.email;
    req.body.firstname=user.firstname;
    next();
  } catch (error) {
   next(error)
  }
};

//making the middleware for reset password

export const emailAuth = async (req, res, next) => {
  // console.log('inside middleware',req.body)
  try {
    var emailToken = req.params.token;
    // console.log(emailToken);
    if (!emailToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    const  user    = await jwt.verify(emailToken, process.env.ForgetSecretKey);
  //  console.log(user);
   req.body.email = user.email;
    next();
  }catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      data: data,
      message: `UnAuthorised token`
  });
  }
};
