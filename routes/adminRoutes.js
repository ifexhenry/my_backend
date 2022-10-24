import express from "express";
import { admin_signin, admin_signup, get_all_admin, get_single_admin, update_single_admin, delete_admin } from "../controllers/adminController.js";
import { adminProtect } from "../middlewares/auth_handlers.js";
const admin_router = express.Router()
admin_router.post("/admin-signin", admin_signin)
admin_router.route("/")
     .post(admin_signup)
     .get(get_all_admin)
admin_router.route("/:id")    
     .get(adminProtect, get_single_admin)
     .patch(adminProtect, update_single_admin)
     .delete(adminProtect, delete_admin)



export default admin_router