import express from 'express';
import * as bookController from '../controllers/book.controller';
import { userAuth } from '../middlewares/auth.middleware'

const router = express.Router();

//route to get all book
router.get('', userAuth, bookController.getAllbook);

//route to get a single book by id
router.get('/:_id',userAuth, bookController.getbook);

export default router;