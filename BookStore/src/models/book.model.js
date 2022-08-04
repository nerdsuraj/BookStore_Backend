import { Schema, model } from 'mongoose';

const BookSchema = new Schema(
    {
        description: { type: String, required: true, },
        discountPrice: { type: String, required: true, },
        bookImage: { type: String, required: true, },
        admin_user_id: { type: String, required: true, },
        bookName: { type: String, required: true, },
        author: { type: String, required: true, },
        quantity: { type: String, required: true, },
        price: { type: String, required: true, },
    },
    {
        timestamps: true
    }
);

export default model('Book', BookSchema);
