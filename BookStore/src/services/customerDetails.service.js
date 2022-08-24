import cutomer_detailsModel from "../models/cutomer_details.model";

// Add customer details ######################

export const customerDetails= async(body)=>{
    const details= await cutomer_detailsModel.create(body);
    if(details){
        console.log(details);
        return details;
    }
}