import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware'

const router = express.Router();

//route to post the book on cart
router.post('/:_id', userAuth,  cartController.sendtoCart);

//route to del the book from cart
router.put('/:_id',userAuth, cartController.bokkremove);


export default router;