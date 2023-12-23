import Listing from "../models/listing.models.js"

export const createListing=async(req,res,next)=>{
    console.log("create listing route")
try {
    const listing = await Listing.create(req.body)
    return res.status(201).json({message:"Listing created",listing});
    
} catch (error) {
    next(error)
}
}