const express = require("express");
const router = new express.Router();
const AWS = require("aws-sdk");
const s3 = new AWS.S3();

router.get('/', async function(req, res, next) {
    let my_file = await s3.getObject({
        Bucket: process.env.CYCLIC_BUCKET_NAME,
        Key: "text.json"
    }).promise();
    const result = JSON.parse(my_file.Body)?.text
    if(result == null) {
        res.json({
            status: "error",
        });
    } else {
        res.json({
            status: "success",
            text: result
        });
    }
});

router.post('/', async function(req, res, next) {
 const {text} = req.body;
 const textOb = {
        text: text
 }
 await s3.putObject({
        Body: JSON.stringify(textOb),
        Bucket: process.env.CYCLIC_BUCKET_NAME,
        Key: "text.json",
 }).promise();
    res.json({
        status: "success",
        text: text
    })
});

module.exports = router;
