import User from '../models/user.model';
import Feedback from '../models/Feedback';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//get all users
export const getAllUsers = async () => {
  const data = await User.find();
  return data;
};

//create new user by registration
export const userRegistration = async (body) => {
  const result = await User.findOne({email:body.email,firstname:body.firstname,lastname:body.lastname});
  if(result)
  {
    throw new Error("user already existed")
  }else{
    const saltRounds=10
    const hashpassword =await bcrypt.hash(body.password,saltRounds)
    body.password = hashpassword;
    const data = await User.create(body);
    return data;
  }
};

// login User############

export const login = async (body) => {

  const result = await User.findOne({email:body.email});
  // console.log(result)
  
  if(result != null){
    
    const comparePass =await bcrypt.compare(body.password, result.password);
    if(comparePass){

      var token = jwt.sign({ id:result._id, email:result.email, firstname:result.firstname,lastname:result.lastname,password:result.password }, process.env.SECRATEKEY);
      return {"token":token,"Name": result.firstname}
    
    }else{
      throw new Error("Password is incorrect")
    }


  }else{
    throw new Error("Mail Is not exist")
  }
}

//service for customer feedback 
// For add feedback on book ########################

export const feedback = async (book_id, comment, Star,name) => {
  const bookCheck = await Feedback.findOne({ 'productID': book_id })
  if (bookCheck) {
    bookCheck.userAdded.unshift({ 'feedback': comment, 'star': Star ,'name':name  })
    // console.log("Book found and the bookCheck is ", bookCheck)
    // console.log("Book found and the comment array is", bookCheck.userAdded)
    const addFeedback = await Feedback.findOneAndUpdate({ 'productID': book_id, }, { 'userAdded': bookCheck.userAdded }, { new: true })
    return addFeedback
  } else {
    const information = { 'productID': book_id, 'userAdded': [{ 'feedback': comment, 'star': Star , 'name':name}] }
    const data = await Feedback.create(information)
    // console.log("new feedback added", data)
    return data
  }

};

// For get all feedback on book ########################

export const getallfeedback = async (book_id) => {
  const allFeedback = await Feedback.findOne({ 'productID': book_id })
  // console.log("allFeedback are : ",allFeedback)
  return allFeedback
  

};



// get service from forget password

export const forgetPassword = async (body) => {
  const data = await User.findOne({"email":body.email});
 if(data != null)
 {
  var token = jwt.sign({ email:data.email }, process.env.ForgetSecretKey);
  // sendMail(data.email,token)

 }
 else{
  throw new Error("data not match or found")
}
};

// get service for reset password
 
export const resetPassword = async (body)=>{
  // const tokenData = await jwt.verify(_token, process.env.ForgetSecretKey);
   const saltRounds = 5
   const hashpassword = await bcrypt.hash(body.password,saltRounds);
   body.password= hashpassword
   const newData = User.findOneAndUpdate(
     {email:body.email },
     {password: body.password},
     {new: true})
    return newData;
 };

 

//update single user
export const updateUser = async (_id, body) => {
  const data = await User.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  return '';
};

//get single user
export const getUser = async (id) => {
  const data = await User.findById(id);
  return data;
};
