import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import Workdays from "../models/working-hours.js";

export const create_workday = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
   
    const workingDays = await Workdays.findOne({created_by: req.user.id})
    
    const {day, openingHour, closingHour} = req.body
    const workExist = await Workdays.findOne({created_by: req.user.id, "workdays.day": day})
    if(workExist){
        res.json({
            message: "work day already exists with time"
        })
    }else{
        if(user && workingDays){
            if(workingDays.workdays.length > 7){
                res.json({
                    error: "workdays cannot exceed seven days"
                })
            }
            const updateWork = await Workdays.findByIdAndUpdate(workingDays._id ,{
                $addToSet : {
                    workdays: [
                        {
                            day,
                            openingHour,
                            closingHour
                        }
                    ]
                }
            }, ({new: true, useAndModify: false}))
            if(updateWork){
                res.json({
                    status: "okay",
                    message: "workdays have been updated",
                    data: workingDays
                })
            }
        }else{
            const newwork = await Workdays.create({
                created_by: req.user.id,
                WorkDays: [
                    {
                        day,
                        openingHour,
                        closingHour
                    }
                ]
            })
            if(newwork){
                res.json({
                    status: "okay",
                    message: "work day has been created successfully",
                    data: newwork
                })
            }else{
                res.json({
                    error: "invalid data provided"
                })
            }
        }
    }
    

})
// export const updateOneDay = asyncHandler(async(req, res) => {
//     const workingDays = await Workdays.findOne({created_by: req.user.id})
    
//     const oop = workingDays.filter((x) => {
        
//         return x 
//     })
    
//     // let oop = []
//     // for(let x=workingDays.length; x >= 0; x--){
//     //    oop += workingDays[x]
//     // }
//     const work = await oop.findById(req.user.id)
//     const {day, openingHour, closingHour} = req.body
    // if(work){
    //     work.day = day || work.day
    //     work.openingHour = openingHour || work.openingHour
    //     work.closingHour = closingHour || work.closingHour

    //     const updatedwork = await work.save()

    //     if(updatedwork){
    //         res.json({
    //             status: "ok", 
    //             message: "updated sucessfully",
    //             data: updatedwork
    //         })
    //     }else{
    //         res.json({
    //             message: "something went wrong"
    //         })
    //     }
    // }else{
    //     res.json({
    //         error: "working hour does not exist"
    //     })
    //  }

    
//})



export const updateOneDay = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
    const workingDays = await Workdays.findOne({created_by: req.user.id})
    //console.log(workingDays)
    const work = workingDays.workdays.find(elem => elem._id == req.params.id)
    const {day, openingHour, closingHour} = req.body
    if(user && workingDays){
        work.day = day || work.day
        work.openingHour = openingHour || work.openingHour
        work.closingHour = closingHour || work.closingHour

        const updatedwork = await work.save({suppressWarning: true})

        if(updatedwork){
            res.json({
                status: "ok", 
                message: "workday updated sucessfully",
                data: updatedwork
            })
        }else{
            res.json({
                message: "something went wrong"
            })
        }
    }else{
        res.json({
            error: "working hour does not exist"
        })
     }
    
})
export const getOneDay = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
    const workingDays = await Workdays.findOne({created_by: req.user.id})
    
    if(user && workingDays){
        const work = workingDays.workdays.find(elem => elem._id == req.params.id)
        if(work){
            res.json({
                status: "ok",
                message: "day gotten",
                data: work
            })
        }else{
            res.json({
                message: "gggggg"
            })
        }
    }else{
        res.json({
            message: "kkkkk"
        })
    }
})


export const  deleteOneDay = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
    const workingDays = await Workdays.findOne({created_by: req.user.id})
    if(user && workingDays){
        const work = workingDays.workdays.find(elem => elem._id == req.params.id)
        const updatework = await Workdays.findByIdAndUpdate(workingDays._id, {
            $pullAll: {
                workdays: [work]
            }
        }, ({new: true, useAndModify: false}))
        if(updatework){
            res.json({
                status: "ok",
                message: "deleted",
                data: workingDays
            })
        }else{
            res.json({
                message: "hygtygy"
            })
        }
    }else{
        res.json({
            message: "jbhu"
        })

    }        
})