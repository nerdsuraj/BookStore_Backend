import Book from '../models/book.model';
import Wish from '../models/wishlist.model'


export const sendtoWish = async (params_book_id, userEmail) => {
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
        const wishData = await Wish.findOne({ userId: userEmail })

        if (wishData) {
            console.log("wish checked sucessfull")
            // console.log(cartData.books)
            let found = false;
            let price = 0;

            wishData.books.filter(element => {
                if (element.productId == params_book_id) {
                    element.quantity = element.quantity + 1
                    // console.log("same book updated")
                    found = true;
                }
            })

            if (found == false) {
                price = price + bookdata.price;
                wishData.books.push(bookdata)
                console.log("added new book")
            }

            const wishsee = await Wish.findOneAndUpdate({ userId: userEmail }, { books: wishData.books }, { new: true });
            return wishsee

        } else {
            console.log("wish Is Not Exist new created")
            const createWish = await Wish.create({ 'userId': userEmail, 'books': [bookdata] })
            console.log("createWish", createWish)
            return createWish
        }


    } else {
        console.log("Book Is Not Exist")
        throw new Error("Book Is Not Exist")
    }
}



//service to del the book from wishlist
export const bokkremove = async (userEmail, params_book_id) => {
  const wishData = await Wish.findOne({ userId: userEmail })
  if (wishData) {
    console.log("wishData sucessfull")
    let found = false
    wishData.books.filter(element => {
      if (element.productId == params_book_id) {
        let indexvalue = wishData.books.indexOf(element)
        wishData.books.splice(indexvalue, 1)
        found = true
        console.log("Book deleteded")
      }
    });
    if (found == false) {
      throw new Error("Book is not exist on cart")
    }
 
    const update_view_wish = Wish.findOneAndUpdate({ userId: userEmail }, { books: wishData.books }, { new: true })
    return update_view_wish
 
 
  } else {
    console.log("User wish is not exist")
  }
}


//service to get the book from wish
export const getwish = async (userEmail) => {
  const getBooks = await Wish.findOne({ userId: userEmail })
  if (getBooks) {
    return getBooks;
  } else {
    throw new Error("User not have any cart")
  }
}