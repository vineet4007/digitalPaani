const mongoose = require('mongoose')
const db = require('../dbConnection/dao')
const generateToken = require('../middlewares/jwt')


const Login = async (req, res) => {
    try {
        let { username, password } = req.body
        let findUser = await db.user.findOne({ username: username })
        console.log(findUser)
        if (!findUser) {
            return res.status(200).send({ status: 1, message: "User Does not exist" })
        }
        if (password !== findUser.password) {
            return res.status(200).send({ status: 1, message: "Password is Incorrect" })
        }
        let authToken = await generateToken.authToken({ _id: findUser._id.toString(), });
        let data = {
            name: findUser.username,
            authToken: authToken
        }
        return res.status(200).send({ status: 1, message: "Valid User", data: data })
    } catch (error) {
        console.log("Err", error)
        res.status(500).send({ status: 0, message: "Something went wrong " })
    }
}

const Signup = async (req, res) => {
    try {
        console.log(req.body)
        let { username, password } = req.body
        let findUser = await db.user.findOne({ username: username })
        if (findUser) {
            return res.status(200).send({ status: 1, message: "User Already Exist Please Choose different Name", data: [] })
        }
        let data = {
            username: username,
            password: password
        }
        let createUser = await db.user.create(data)
        return res.status(201).send({ status: 1, message: "User Created Successfully", data: [] })
    } catch (error) {
        console.log("Sign up error", error)
        return res.status(500).send({ status: 0, message: "Something went wrong", data: [] })
    }
}

const FetchAllBooks = async(req,res)=>{
   try{
    let books = await db.book.find({})
    if(books.length == 0){
         return res.status(200).send({ status: 0, message: "No Books Present", data: [] })
     }
         return res.status(201).send({ status: 1, message: "Books Fetched Successfully", data: books })
    }catch(error){
        console.log("Fetch All Book Error",error)
        return res.status(500).send({ status: 0, message: "Something went wrong", data: [] })
    }
}

const AddBooks = async(req,res)=>{
try{
    let { title,author,year} = req.body;
    let findTitle = await db.book.find({title:title})
     if(findTitle.length == 0)
     {return res.status(200).send({ status: 1, message: "Book with same title already exist", data: [] })}
    let data ={}
    data.title = title;
    data.author = author;
    data.year = year
    
    let insertData = await db.book.create(data)
    return res.status(201).send({ status: 1, message: "Book Created Successfully", data: insertData })
}catch(error){
    console.log("add book error", error)
        return res.status(500).send({ status: 0, message: "Something went wrong", data: [] })
}
}

const UpdateBook = async(req,res)=>{
    try{
        let { title,author,year} = req.body;
        let _id = req.params._id
        let findbook = await db.book.findOne({_id: new mongoose.Types.ObjectId(_id)})
        if( findbook.length == 0 ){return res.status(200).send({ status: 1, message: "Book does not  exist", data: [] })}
        let data ={}
        if(title != "" ){
        data.title = title;
        }
        if(author != ""){
        data.author = author;
        }
        if(year != ""){
        data.year = year
        }
        let updateData = await db.book.updateOne({ _id : new mongoose.Types.ObjectId(_id) } ,{ $set : data})
        return res.status(201).send({ status: 1, message: "Book updated Successfully", data: updateData })
    }catch(error){
        console.log("add book error", error)
            return res.status(500).send({ status: 0, message: "Something went wrong", data: [] })
    }
    }

    const DeleteBook = async(req,res)=>{
        try{
           
            let  _id  = req.params._id
            let findbook = await db.book.find({_id: new mongoose.Types.ObjectId(_id)})
            if(findbook.length == 0){return res.status(200).send({ status: 1, message: "Book does not  exist", data: [] })}
            let deleteData = await db.book.deleteOne({ _id:_id })
            return res.status(201).send({ status: 1, message: "Book Deleted Successfully", data: deleteData })
        }catch(error){
            console.log("add book error", error)
                return res.status(500).send({ status: 0, message: "Something went wrong", data: [] })
        }
        }   
        
        

module.exports = {
    Login: Login,
    signup: Signup,
    addBook:AddBooks,
    updateBook:UpdateBook,
    deleteBook:DeleteBook,
    getAllBooks:FetchAllBooks,
}

