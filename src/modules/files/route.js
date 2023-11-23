const express = require("express");
const router = express.Router();
const { uploadMiddleware } = require("../../middleware/fileUpload");

const {
   
    createfile,
    getAllfiles,
    getOnefile,
    deleteOnefile
  } = require("./controller");



router.post("/:bucket_id", uploadMiddleware,createfile); //done
router.get("/:bucket_id", getAllfiles);  //done
router.get("/:file_id/:bucket_id", getOnefile); //inprogress
router.delete("/:file_id/:bucket_id", deleteOnefile); //inprogress




// could implement later
// router.get("/logout", verifyToken, logout);

module.exports = router;