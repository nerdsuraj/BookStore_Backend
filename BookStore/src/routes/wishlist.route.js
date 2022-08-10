import express from 'express';
import * as wishController from '../controllers/wishlist.controller';
import { userAuth } from '../middlewares/auth.middleware'

const router = express.Router();

//route to post the book on cart
router.post('/:_id', userAuth,  wishController.sendtoWish);

//route to del the book from cart
router.put('/:_id',userAuth, wishController.bookremove);

router.get('',userAuth,wishController.getwish)


export default router;