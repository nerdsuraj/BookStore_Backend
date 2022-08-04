import Book from '../models/book.model'

//get all books
export const getAllbook = async () => {
    const data = await Book.find();
    return data;
  };

//get one book
export const getbook = async (_id) => {
    const data = await Book.findById(_id);
    return data;
  };