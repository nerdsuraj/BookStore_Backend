import Book from '../models/book.model'
import User from '../models/user.model';

//get all books
export const getAllbook = async (email) => {
  const usercheck = await User.find({email:email})

  if(usercheck){
    const data = await Book.find({});
    return data;
  }else{
    throw new Error("non auth people :)")
  }
  };

//get one book
export const getbook = async (_id,email) => {
  const usercheck = await User.find({email:email})
  if(usercheck){
    const data = await Book.findById(_id);
    return data;
  }else{
    throw new Error("non auth people :)")
  }
   
  };