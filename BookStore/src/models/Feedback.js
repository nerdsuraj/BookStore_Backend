import { Schema, model } from 'mongoose';


const feedbackSchema = new Schema(
    {
        productID: {
            type: String,
        },
        userAdded: [{
            feedback: {
                type: String,
            },
            star: {
                type: Number,
            },
            name:{
                type:String,
            }
        }]
    })

export default model('Feedback', feedbackSchema);