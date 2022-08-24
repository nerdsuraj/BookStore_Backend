import express from 'express';
import { customerDetailsValidator } from '../validators/customer_details.validator';
import * as customerDetails  from '../controllers/customerDeatils.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();



//route to create a new customer details

router.post("",customerDetailsValidator ,userAuth,customerDetails.customerDetails)




export default router;