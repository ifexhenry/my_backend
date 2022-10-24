import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import Item from "../models/item.js";

export const create_item = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
    const {itemName, price, size, typeOfItem, qty, availability, description} = req.body
    if(user){
        const  item = await Item.create({
            created_by: req.user.id,
            itemName,
            price,
            size,
            typeOfItem,
            qty,
            availability,
            description
        })
        if(item){
            res.json({
                status: "ok",
                message: "item created successfully",
                data: item
            })
        }else{
            res.json({
                error: "invalid data inputed"
            })
        }
    }else{
        res.json({
            error: "user does not exist"
        })
    }
})

export const get_paginated_items = asyncHandler(async(req, res) =>{
    const user = await User.findById(req.user.id)
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1
    const count = await Item.countDocuments({created_by: user._id})
    const items = await Item.find({created_by: user._id})
        .sort({createdAt: -1})
        .limit(pageSize)
        .skip(pageSize * (page-1))
    if(user && items){
        res.json({
            status: "ok",
            message: "paginated items retrieved",
            data: {
                items,
                meta:{
                    page,
                    page:Math.ceil(count / pageSize),
                    total: count
                }
            }
        })
    }else{
        res.json({
            error: "user does not exist or no item for user"
        })
    }
})

export const get_item = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
    const items = await Item.find({created_by: user._id})
        
    if(user && items){
        res.json({
            status: "ok",
            message: "all items retrieved",
            data: items
        })
    }else{
        res.json({
            error: "user does not exist or no item for user"
        })
    }
})

export const updateOneItem = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
    const singleitem = await Item.findById({_id:req.params.id})
    const {itemName, price, size, typeOfItem, qty, availability, description} = req.body
    if(user && singleitem){
        singleitem.itemName = itemName || singleitem.itemName
        singleitem.price = price || singleitem.price
        singleitem.size = size || singleitem.size
        singleitem.typeOfItem = typeOfItem || singleitem.typeOfItem
        singleitem.qty = qty || singleitem.qty
        singleitem.availability = availability || singleitem.availability
        singleitem.description = description || singleitem.description

        const updatedItem = await singleitem.save()

        if(updatedItem){
            res.json({
                status: "ok",
                message: "item updated successfully",
                data: updatedItem
            })
        }else{
            res.json({
                error: "item not found"
            })
        }
    }else{
        res.json({
            error: "not user"
        })
    }
})

export const deleteoneitem = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
    const singleitem = await Item.findById({_id:req.params.id})
    if(user && singleitem){
        res.json({
            status: "ok",
            message: "item deleted successfully",
        })
    }else{
        res.json({
            error: "something went wrong"
        })
    }
})