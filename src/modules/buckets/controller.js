
const bucketSchema = require("./model")
const mongoose = require("mongoose")
const constants = require("../../utilities/constants");
const { customResponse } = require("../../utilities/helper");


// const createBucket = async (req, res) => {


//     let code, message, resData;
//     try {
//         console.log(req.body, "=====>>>>>>")

//         req.body.images = []
//         const filePath = path.join(__dirname, "../../../" + "public/files/product");
//         req.uploadedImages?.map(async (img) => {
//             const imageDesc = { url: filePath + img, altText: "" }
//             req.body.images.push(imageDesc)
//         })

//         const data = await new bucketSchema(req.body).save();

//         code = constants.HTTP_201_CODE;
//         message = constants.MESSAGE_PRODUCT.ADD;
//         resData = customResponse({ code, message, data });
//         return res.status(code).send(resData);
//     } catch (error) {
//         console.log("error in post create bucket endpoint", error);
//         code = error?.code ? error.code : constants.HTTP_500_CODE;
//         message = error?.message ? error.message : constants.SERVER_ERR;
//         resData = customResponse({
//             code,
//             message,
//             err: error.message,
//         });
//         return res.status(code).send(resData);
//     }
// }
const createBucket = async (req, res) => {


    let code, message, resData;
    try {
        console.log(req.body, "=====>>>>>>")

        // req.body.images = []
        // const filePath = path.join(__dirname, "../../../" + "public/files/product");
        // req.uploadedImages?.map(async (img) => {
        //     const imageDesc = { url: filePath + img, altText: "" }
        //     req.body.images.push(imageDesc)
        // })

        const data = await new bucketSchema(req.body).save();

        code = constants.HTTP_201_CODE;
        message = constants.MESSAGE_PRODUCT.ADD;
        resData = customResponse({ code, message, data });
        return res.status(code).send(resData);
    } catch (error) {
        console.log("error in post create bucket endpoint", error);
        code = error?.code ? error.code : constants.HTTP_500_CODE;
        message = error?.message ? error.message : constants.SERVER_ERR;
        resData = customResponse({
            code,
            message,
            err: error.message,
        });
        return res.status(code).send(resData);
    }
}

const addBucket = async (req, res) => {

    let code, message, resData;
    let category_not_exists = false;
    try {
        console.log(req.body, "take bucket name and user=====>>>>>>")

        const data = await new bucketSchema(req.body).save();

        code = constants.HTTP_201_CODE;
        message = constants.MESSAGE_PRODUCT.ADD;
        resData = customResponse({ code, message, data });
        return res.status(code).send(resData);
    } catch (error) {
        console.log("error in add  bucket endpoint", error);
        code = error?.code ? error.code : constants.HTTP_500_CODE;
        message = error?.message ? error.message : constants.SERVER_ERR;
        resData = customResponse({
            code,
            message,
            err: error.message,
        });
        return res.status(code).send(resData);
    }


}

const getOneBucket = async (req, res) =>  {

    let code, message, resData;
    
    try {
       
        const _id = req.params.bucket_id;
        const isValid = mongoose.Types.ObjectId.isValid(_id);
        if (!isValid) {
            throw { message: constants.INVALID_OBJECTID, code: constants.HTTP_422_CODE };
        }
        
        console.log(_id,"----")
        const data = await bucketSchema.find({_id})
        console.log(data,"===")
        code = constants.HTTP_200_CODE;
        message = constants.MESSAGE_PRODUCT.FETCH;
        resData = customResponse({ code, message, data });
        return res.status(code).send(resData);
    } catch (error) {
        console.log("error in add  bucket endpoint", error);
        code = error?.code ? error.code : constants.HTTP_500_CODE;
        message = error?.message ? error.message : constants.SERVER_ERR;
        resData = customResponse({
            code,
            message,
            err: error.message,
        });
        return res.status(code).send(resData);
    }


}
const deleteOneBucket = async (req, res) => {

    let code, message, resData;

    try {
        const _id = req.params.bucket_id;
        const isValid = mongoose.Types.ObjectId.isValid(_id);
        if (!isValid) {
            throw { message: constants.INVALID_OBJECTID, code: constants.HTTP_422_CODE };
        }
        
        console.log(_id,"----")
        const data = await bucketSchema.findByIdAndDelete(_id);


        code = constants.HTTP_201_CODE;
        message = constants.MESSAGE_PRODUCT.DELETE;
        resData = customResponse({ code, message, data });
        return res.status(code).send(resData);
    } catch (error) {
        console.log("error in add  bucket endpoint", error);
        code = error?.code ? error.code : constants.HTTP_500_CODE;
        message = error?.message ? error.message : constants.SERVER_ERR;
        resData = customResponse({
            code,
            message,
            err: error.message,
        });
        return res.status(code).send(resData);
    }


}


const getAllBuckets = async (req, res) => {

    let code, message, resData;
    
    try {
        console.log("dddd====")
        

        const data = await bucketSchema.find()
        console.log(data,"===")
        code = constants.HTTP_200_CODE;
        message = constants.MESSAGE_PRODUCT.FETCH;
        resData = customResponse({ code, message, data });
        return res.status(code).send(resData);
    } catch (error) {
        console.log("error in add  bucket endpoint", error);
        code = error?.code ? error.code : constants.HTTP_500_CODE;
        message = error?.message ? error.message : constants.SERVER_ERR;
        resData = customResponse({
            code,
            message,
            err: error.message,
        });
        return res.status(code).send(resData);
    }


}


module.exports = {createBucket,
    addBucket,getOneBucket,
    deleteOneBucket,getAllBuckets,
}

