import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { generatetoken } from "../utilities/generate_token.js";
import Admin from "../models/admin.js";


export const admin_signup = asyncHandler(async(req, res) => {
    const {
        firstName,
        middleName,
        lastName,
        dob,
        qualification,
        post,
        email,
        phoneNumber,
        password,
        gender,
        address,
    } = req.body
    const adminExist = Admin.find({$or : [{email:email}, {phoneNumber:phoneNumber}]})
    if (adminExist.length > 0){
        throw new Error ("admin already exists")
    }else{
        const hashedpass = await bcrypt.hash(password, 10)
        const admin = await Admin.create({firstName, middleName, lastName, dob, qualification, post, email, phoneNumber, password: hashedpass, gender, address})
        if(admin){
            res.status(201).json({
                status: "ok",
                message: "you're now an admin",
                data:{
                    _id: admin._id,
                    firstName: admin.firstName,
                    middleName: admin.middleName,
                    lastName: admin.lastName,
                    dob: admin.dob,
                    qualification: admin.qualification,
                    post: admin.post,
                    email: admin.email,
                    phoneNumber: admin.phoneNumber,
                    password: admin.password,
                    gender: admin.gender,
                    address: admin.address,
                    token: generatetoken(admin._id)
                }
            })
        }else{
            res.status(400).json({
                message: "user data not valid"
            })
        }
    }
})

export const admin_signin = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    const admin = await Admin.findOne({email})
    if(!admin || !bcrypt.compareSync(password, admin.password)){
        res.json({
            message: "wrong password or email"
        })
    }else{
        res.json({
            status: "ok",
            message: "welcome boss",
            data: {
                _id: admin._id,
                firstName: admin.firstName,
                middleName: admin.middleName,
                lastName: admin.lastName,
                dob: admin.dob,
                qualification: admin.qualification,
                post: admin.post,
                email: admin.email,
                phoneNumber: admin.phoneNumber,
                password: admin.password,
                gender: admin.gender,
                address: admin.address,
                token: generatetoken(admin._id)
            }
        })
    }
})
export const get_all_admin = asyncHandler(async(req, res) => {
    const admins = await Admin.find({})
    if(admins){
        res.json({
            status: "ok",
            message: "all admins retrieved",
            data: admins
        })
    }else {
        res.json({
            message: "No admins"
        })
    }
})
export const get_single_admin = asyncHandler(async(req, res) => {
    const admin = await Admin.findOne({_id: req.params.id})
    if(admin){
        res.json({
            status: "ok",
            message: "admin gotten",
            data: admin
        })
    }
})
export const update_single_admin = asyncHandler(async(req,res) => {
    const admin = await Admin.findById(req.params.id)
    const {
        firstName,
        middleName,
        lastName,
        dob,
        qualification,
        post,
        email,
        phoneNumber,
        password,
        gender,
        address,
    } = req.body
    if(admin){
        admin.firstName = firstName || admin.firstName
        admin.middleName = middleName || admin.middleName
        admin.lastName = lastName || admin.lastName
        admin.dob = dob || admin.dob
        admin.qualification = qualification || admin.qualification
        admin.post = post || admin.post
        admin.email = email || admin.email
        admin.phoneNumber = phoneNumber || admin.phoneNumber
        admin.password = password || admin.password
        admin.gender = gender || admin.gender
        admin.address = address || admin.address

        const updatedadmin = await admin.save()
        if(updatedadmin){
            res.json({
                status: "ok",
                message: "admin updated successfully",
                data: updatedadmin
            })
        }else{
            res.json({
                message: "something went wrong"
            })
        }
    }else{
        res.json({
            message: "admin does not exist"
        })
    }
})
export const delete_admin = asyncHandler(async(req, res) => {
    const admin = await Admin.findById(req.params.id)
    if(admin){
        res.json({
            status: "ok",
            message: "admin deleted sucessfully",
        })
    }else{
        res.json({
            message: "admin not found"
        })
    }
})