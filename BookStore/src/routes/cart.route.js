import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware'

const router = express.Router();

//route to post the book on cart
router.post('/:_id', userAuth,  cartController.sendtoCart);

//route to del the book from cart
router.put('/:_id',userAuth, cartController.bokkremove);

// get all book details from cart 

router.get('',userAuth,cartController.CartBooks);

// change the isPurchased value

router.put('/purch/true',userAuth,cartController.purchasedT);

//false

router.put('/purch/false',userAuth,cartController.purchasedF);


export default router;