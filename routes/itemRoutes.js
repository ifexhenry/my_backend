import express from "express";
import { userProtect } from "../middlewares/auth_handlers.js";
import { create_item, deleteoneitem, get_item, get_paginated_items, updateOneItem } from "../controllers/itemController.js";

const item_router = express.Router()

item_router.route("/")
    .post(userProtect, create_item)
    .get(userProtect, get_paginated_items)

item_router.route("/get-item")
    .get(userProtect, get_item)
item_router.route("/:id")
    .patch(userProtect, updateOneItem)
    .delete(userProtect, deleteoneitem)

export default item_router