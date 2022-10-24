import mongoose from "mongoose";
const adminSchema = mongoose.Schema(
    {
        firstName: {type : String},
        middleName: {type : String},
        lastName: {type : String},
        dob: {type : String},
        qualification: {type : String},
        post: {type : String},
        email: {type : String},
        phoneNumber: {type : String},
        password: {type : String},
        gender: {type : String},
        address: {type : String},
    }
)
const Admin = mongoose.model("admin", adminSchema)
export default Admin