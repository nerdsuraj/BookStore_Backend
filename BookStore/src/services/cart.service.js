
import Book from '../models/book.model';
import Cart from '../models/cart.model';


export const sendtoCart = async ( params_book_id,userEmail) => {
    const data = await Book.findOne({ _id: params_book_id })
    if (data) {

      let bookdata = {
        'bookName': data.bookName,
        'description': data.description,
        'author': data.author,
        'price': data.price,
        'bookImage': data.bookImage,
        'discountPrice': data.discountPrice,
        'productId': data._id,

      }
      console.log("book checked sucessfull")
      const cartData = await Cart.findOne({ userId: userEmail })

      if (cartData) {
        console.log("cart checked sucessfull")
        // console.log(cartData.books)
        let found = false;
        let price = 0;

        cartData.books.filter(element => {
          if (element.productId == params_book_id) {
            element.quantity = element.quantity + 1
            // console.log("same book updated")
            found = true;
            price=price+(element.price*element.quantity)
          }
          else{
            price=price+(element.price*element.quantity);
          }
        })
      
        if (found == false) {
         price=price+bookdata.price;
         cartData.books.push(bookdata)
          console.log("added new book")
        }
        
        const cartsee = await Cart.findOneAndUpdate({ userId: userEmail }, { books:cartData.books,cart_total:price }, { new: true });
        return cartsee

      } else {
        console.log("Cart Is Not Exist new created")
        const createCart = await Cart.create({ 'userId': userEmail, 'books': [bookdata], 'cart_total': data.price, })
        console.log("createCart", createCart)
        return createCart
      }


    } else {
      console.log("Book Is Not Exist")
      throw new Error("Book Is Not Exist") 
    }
}


//service to del the book from cart
export const bokkremove = async (userEmail, params_book_id) => {
  const cartData = await Cart.findOne({ userId: userEmail })
  if (cartData) {
    console.log("cartData sucessfull")
    let found = false
    cartData.books.filter(element => {
      if (element.productId == params_book_id) {
        let indexvalue = cartData.books.indexOf(element)
        cartData.books.splice(indexvalue, 1)
        found = true
        console.log("Book deleteded")
      }
    });
    if (found == false) {
      throw new Error("Book is not exist on cart")
    }
 
    const update_view_cart = Cart.findOneAndUpdate({ userId: userEmail }, { books: cartData.books }, { new: true })
    return update_view_cart
 
 
  } else {
    console.log("User cart is not exist")
  }
}







  // cartData.books.forEach(element => {
        //   if (element.productId == params_book_id) {
        //     element.quantity = element.quantity + 1
        //     // console.log("same book updated")
        //     found = true;
        //     price=price+(element.price*element.quantity)
        //   }
        //   else{
        //     price=price+(element.price*element.quantity);
        //   }
        // });













//other codes


// import Cart from '../models/cart.model';
// import Book from '../models/book.model'

// //send book to cart 
// export const sendtoCart = async (_id, userId) => {
//     const data = await Book.find({ _id: _id });
//     // console.log("data from cart ",data)
//     if (data) {
//         let bookdata = {
//             'bookName': data.bookName,
//             'description': data.description,
//             'author': data.author,
//             'price': data.price,
//             'bookImage': data.bookImage,
//             'discountPrice': data.discountPrice,
//             'productId': data._id,

//         }
//         console.log("book data sucessfull")

//         let cartDetail = await Cart.find({ userId: userId })
//         // console.log("cartdetails of cart",cartDetail);
//         // console.log(cartDetail.books)
//         if (cartDetail) {
//             let found = false;
//             cartDetail.books.forEach(element => {
//                 if (element.productId == _id) {
//                     element.quantity = element.quantity + 1
//                     console.log("same book updated")
//                     found = true;
//                 }
//             });
                
//             if (found == false) {
//                 cartDetail.books.push(bookdata)
//                 console.log("added new book")

//                 const cartsee = await Cart.findOneAndUpdate({ userId: userId }, { books: cartDetail.books }, { new: true });
//                 return cartsee;
//             } else {

//                 const createCart = await Cart.create({ 'userId': userId, 'books': [bookdata], 'cart_total': data.price })
//                 console.log("createCart", createCart)
//                 return createCart

//             }
//         } else {
//          throw new Error("not exist");
//         }

//     } else {
//         throw new Error("not available");
//     }

// }





//   let bookD­etails=book.find(_id:_id)

// if(bookDetails){

// let carDetail =cart.find(UserId:body.UserID)
//  if(carDetails){

// let isbook=filter out book

// if(isbook){
// Q++ by 1
// }else{
//  addbook

// }

// }else{

// create car and added book

// new{
// userId:body.UserID;
// book:[
// name:bookDetail.name
// ]

// }

// save/create


// }

// }else{

// error(not availabe)
// }