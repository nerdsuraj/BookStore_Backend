import HttpStatus from 'http-status-codes';
import * as wishService from '../services/wishlist.service'

//for get all books
export const sendtoWish = async (req, res, next) => {
    try {
      const data = await wishService.sendtoWish(req.params._id, req.body.email);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'book send to wishlist successfully'
      });
    } catch (error){
      next(error);
    }
  };