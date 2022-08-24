import { Schema, model } from 'mongoose';

const CustomerSchema = new Schema(
    {
        userId: {
            type: String
        },
        Name: {
            type: String,
            require: true
        },
        PhoneNumber: {
            type: Number,
            require: true
        },
        Pincode: {
            type: Number,
           
        },
        Locality: {
            type: String,
           
        },
        Address: {
            type: String,
            require: true
        },
        City: {
            type: String,
            require: true
        },
        state: {
            type: String,
           
        },
        Type: {
            type: String,
           
        }

    },
    {
        timestamps: true
    }
);

export default model('Customer', CustomerSchema);