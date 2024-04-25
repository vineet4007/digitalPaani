const express = require("express");
const router = express.Router();
const serivce = require("../services/services")
const {validationResult } = require("express-validator")
const verifyUser = require("../middlewares/checkAuth")
//Check VAlidation can be used for further validations 


function checkValidationResult(req,res,next){
    var result = validationResult(req).array();
    result.length ? res.send({status:0,message:"message",paylaod:[]}):next()
}

// Login Route No need of checking As Login requires only name and password 
router.route("/login").post( (req, res, next) => {
    checkValidationResult(req, res, next);
}, serivce.Login);

// No check for JWT 
router.route("/sign-up").post( (req, res, next) => {
    checkValidationResult(req, res, next);
}, serivce.signup);

router.route("/fetch-all-book").get(verifyUser.checkUser, (req, res, next) => {
    checkValidationResult(req, res, next);
}, serivce.getAllBooks);

router.route("/add-book").post( verifyUser.checkUser,(req, res, next) => {
    checkValidationResult(req, res, next);
}, serivce.addBook);

router.route("/update-book/:_id").put(verifyUser.checkUser, (req, res, next) => {
    checkValidationResult(req, res, next);
}, serivce.updateBook);

router.route("/delete-book/:_id").delete(verifyUser.checkUser, (req, res, next) => {
    checkValidationResult(req, res, next);
}, serivce.deleteBook);

module.exports = router;