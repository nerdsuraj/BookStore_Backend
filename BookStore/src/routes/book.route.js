import express from 'express';
import * as bookController from '../controllers/book.controller';

const router = express.Router();

//route to get all book
router.get('', bookController.getAllbook);

//route to get a single book by id
router.get('/:_id', bookController.getbook);

export default router;