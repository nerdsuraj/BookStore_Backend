import HttpStatus from 'http-status-codes';
import * as cartService from '../services/cart.service'

//for get all books
export const sendtoCart = async (req, res, next) => {
    try {
      const data = await cartService.sendtoCart(req.params._id, req.body.email);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'book send to cart successfully'
      });
    } catch (error){
      next(error);
    }
  };

  //controller for del the book from cart
  export const bokkremove = async (req, res, next) => {
    try {
      const data = await cartService.bokkremove(req.body.email,req.params._id);
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
