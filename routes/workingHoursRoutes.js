import express from "express";
import { create_workday, updateOneDay, getOneDay, deleteOneDay } from "../controllers/workingHoursController.js";
import { userProtect } from "../middlewares/auth_handlers.js";
const work_router = express.Router()
work_router.route("/working-days-hours")
    .post(userProtect, create_workday)

work_router.route("/working-days-hours/:id")
    .patch(userProtect, updateOneDay)
    .get(userProtect, getOneDay)
    .delete(userProtect, deleteOneDay)
export default work_router