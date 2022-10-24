import mongoose from "mongoose";
const workingSchema = mongoose.Schema(
    {
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        workdays: [
            {
                day: {type: String},
                openingHour: {type: String || Date},
                closingHour: {type: String || Date}
            }
        ]
    },
    {
        timestamps: true
    }
)

const Workdays = mongoose.model("working-hours", workingSchema)
export default Workdays

