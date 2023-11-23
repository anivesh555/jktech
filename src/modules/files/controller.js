
const fileSchema = require("./model")
const bucketSchema = require("./../buckets/model")
const path = require("path")
const mongoose = require("mongoose")
const constants = require("../../utilities/constants");
const { customResponse } = require("../../utilities/helper");

const createfile = async (req, res) => {


    let code, message, resData;
    try {
        console.log(req.body, "=====>>>>>>")

        const { bucket_id } = req.params;
        const isValid = mongoose.Types.ObjectId.isValid(bucket_id);
        if (!isValid) {
            throw { message: constants.INVALID_OBJECTID, code: constants.HTTP_422_CODE };
        }
        const bucket = await bucketSchema.findById(bucket_id);
        if (!bucket) {
            return res.status(404).json({ message: 'Bucket not found' });
          }      
        req.body.images = []
        const filePath = path.join(__dirname, "../../../" + "public/files/product");
        req.uploadedImages?.map(async (img) => {
            console.log(img,"====>")
            fileLocation = filePath + img
            const newFile = new fileSchema({ filename:fileLocation, bucket: bucket_id });
            await newFile.save();
            bucket.files.push(newFile._id);
            await bucket.save();
            // const imageDesc = { url: filePath + img, altText: "" }
            // req.body.images.push(imageDesc)
        })

        // const data = await new fileSchema(req.body).save();

        code = constants.HTTP_201_CODE;
        message = constants.MESSAGE_FILE.ADD;
        resData = customResponse({ code, message });
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
const getAllfiles = async (req, res) => {

    try {
        console.log("dddd====")
        
        const { bucket_id } = req.params;
        const isValid = mongoose.Types.ObjectId.isValid(bucket_id);
        if (!isValid) {
            throw { message: constants.INVALID_OBJECTID, code: constants.HTTP_422_CODE };
        }
        const bucket = await bucketSchema.findById(bucket_id);

        if (!bucket) {
            return res.status(404).json({ message: 'Bucket not found' });
          }    
        const data = await fileSchema.find({ bucket: bucket_id });

        console.log(data,"===")
        code = constants.HTTP_200_CODE;
        message = constants.MESSAGE_FILE.FETCH;
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
const getOnefile = async (req, res) => {

    try {
        console.log("dddd====")
        
        const { bucket_id, file_id } = req.params;
        
        const isValid = mongoose.Types.ObjectId.isValid(bucket_id);
        if (!isValid) {
            throw { message: constants.INVALID_OBJECTID, code: constants.HTTP_422_CODE };
        }
        const isValid1 = mongoose.Types.ObjectId.isValid(file_id);
        if (!isValid1) {
            throw { message: constants.INVALID_OBJECTID, code: constants.HTTP_422_CODE };
        }
        const bucket = await bucketSchema.findById(bucket_id);

        if (!bucket) {
            return res.status(404).json({ message: 'Bucket not found' });
          }    
        const data = await fileSchema.find({ 
            $and:[{bucket: bucket_id }, {_id:file_id}]});
        console.log(data,"===")
        code = constants.HTTP_200_CODE;
        message = constants.MESSAGE_FILE.FETCH;
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
const deleteOnefile = async (req, res) => {
    try {
        console.log("dddd====")
        
        const { bucket_id, file_id } = req.params;
        
        const isValid = mongoose.Types.ObjectId.isValid(bucket_id);
        if (!isValid) {
            throw { message: constants.INVALID_OBJECTID, code: constants.HTTP_422_CODE };
        }
        const isValid1 = mongoose.Types.ObjectId.isValid(file_id);
        if (!isValid1) {
            throw { message: constants.INVALID_OBJECTID, code: constants.HTTP_422_CODE };
        }
        const bucket = await bucketSchema.findById(bucket_id);

        if (!bucket) {
            return res.status(404).json({ message: 'Bucket not found' });
          }   
        const data = await fileSchema.findOneAndDelete({ 
            $and:[{bucket: bucket_id }, {_id:file_id}]});
        console.log(data,"===")
        code = constants.HTTP_200_CODE;
        message = constants.MESSAGE_FILE.FETCH;
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


module.exports ={ createfile,
    getAllfiles,
    getOnefile,
    deleteOnefile}