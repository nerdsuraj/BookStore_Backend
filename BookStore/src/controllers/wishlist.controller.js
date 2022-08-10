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

   //controller for del the book from wish
   export const bookremove = async (req, res, next) => {
    try {
      const data = await wishService.bokkremove(req.body.email,req.params._id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: "Book deleted sucessfully"
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      });
    }
  };

   //controller for get the book from wish
   export const getwish = async (req, res, next) => {
    try {
      const data = await wishService.getwish(req.body.email);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: "Book get sucessfully"
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      });
    }
  };