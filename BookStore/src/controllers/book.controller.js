import HttpStatus from 'http-status-codes';
import * as bookService from '../services/book.service';

//for get all books
export const getAllbook = async (req, res, next) => {
    try {
      const data = await bookService.getAllbook(req.body.email);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All books fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };

//for get one books by id
export const getbook = async (req, res, next) => {
    try {
      const data = await bookService.getbook(req.params._id,req.body.email);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'book fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };