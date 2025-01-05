import { isValidObjectId } from "mongoose";

function checkId(req,res,next){
    if(!isValidObjectId(req.params.id)){
        res.statud(404)
        throw new Error(`invalid object of id : ${req.params.id}`)
    }
    next();
}

export default checkId;