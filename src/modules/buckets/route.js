const express = require("express");
const router = express.Router();

const {
    createBucket,
    getAllBuckets,
    getOneBucket,
    deleteOneBucket,
    createfile,
    getAllfiles,
    getOnefile,
    deleteOnefile
  } = require("./controller");

router.post("/", createBucket); // done
router.get("/", getAllBuckets); //done
router.get("/:bucket_id", getOneBucket); //done
router.delete("/:bucket_id", deleteOneBucket); // 

// could implement later
// router.get("/logout", verifyToken, logout);

module.exports = router;