const express = require("express");
const router = express.Router();

const userRouter = require("../modules/users/route");
const bucketRouter = require("../modules/buckets/route")
const fileRouter = require("../modules/files/route");


router.use("/user", userRouter);
router.use("/bucket", bucketRouter);
router.use("/file", fileRouter);



module.exports = router;



// TODO
// BUCKET_NAME SHOULD BE UNIQUE
//  LOOK RESPONSE AND CONSTANT
// 