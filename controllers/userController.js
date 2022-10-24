import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs"
import { generatetoken } from "../utilities/generate_token.js";
import User from "../models/user.js";
//import user from "../models/user.js";
export const user_signup = asyncHandler(async(req, res) => {
    const {firstName,
         middleName,
          lastName,
           age, gender,
            phoneNumber,
             email,
              address,
               password} = req.body
    const userExist = await User.find({email: email}, {phoneNumber: phoneNumber})           


if(userExist.length > 0){
    throw new Error("User already exists")
}else{
    const hashedpass = await bcrypt.hash(password, 10)

    const user = await User.create({
        firstName, lastName,middleName, phoneNumber, email, gender, age, address, password: hashedpass
    })
    if(user){
        res.status(201).json({
            status: "ok",
            message: "user created successfully",
            data: {
                _id: user._id,
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                age: user.age,
                email: user.email,
                address: user.address,
                gender: user.gender,
                password: user.password,
                token: generatetoken(user._id)
            }
        })
    }else{
        res.status(400).json({
            message:"user data not valid"
        })
    }
}

})

export const user_signin = asyncHandler(async(req, res) =>{
    const{email, password} = req.body

    const user = await User.findOne({email})
    if(!user || !bcrypt.compareSync(password, user.password)){
        res.json({error: "email or password is incorrect"})
    }else{
        res.json({
            status: "ok",
            message: "login successful",
            data: {
                _id: user._id,
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                age: user.age,
                email: user.email,
                address: user.address,
                gender: user.gender,
                password: user.password,
                token: generatetoken(user._id)
            }
        })
    }
})

export const get_all_users = asyncHandler(async(req, res) => {
    const users = await User.find({})
    res.json({
        status: "ok",
        message: "all users retrieved",
        data: users
    })
})

export const get_single_user = asyncHandler(async(req, res) => {
    const user = await User.findOne({_id: req.params.id})
    if(user){
        res.json({
            status: "ok",
            message: "user gotten",
            data: user
        })
    }
})

export const update_single_user = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
    const {firstName,
        middleName,
         lastName,
          age, gender,
           phoneNumber,
            email,
             address,
              password} = req.body

    if (user){
        user.firstName = firstName || user.firstName
        user.middleName = middleName || user.middleName 
        user.lastName = lastName || user.lastName 
        user.age = age || user.age
        user.email = email || user.email
        user.address =  address || user.address
        user.phoneNumber = phoneNumber || user.phoneNumber
        user.gender = gender || user.gender
        user.password = password || user.password 


        const updateduser = await user.save()

        if(updateduser){
            res.status(201).json({
                status: "ok",
                message: "user updated successfully",
                data: updateduser
            })
        }else{
            res.json({message:"something went wrong"})
        }
    }else{
        res.json({error:"user does not exist"})

    }
})

export const delete_single_user = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
    if(user){
        res.json({
            status: "ok",
            message: "user deleted successfully",
        })
    }else{
        res.json({message: "user not found"})
    }
})
