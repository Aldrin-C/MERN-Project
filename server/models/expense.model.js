import { model, Schema } from "mongoose";

const ExpenseSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Expense Name is required!"],
            minlength: [2, "Expense Name must be at least 2 characters long"]
        },

        amount: {
            type: Number,
            required: [true, "Amount is required!"],
            min: [.01, "Amount must be greater than 0"]
        },

        date: {
            type: String,
            required: [true, "Date is required!"]
        },

        isPaid: {
            type: Boolean,
            required: [true],
            default: false
        },

        paymentType: {
            type: String,
            
        },

        note: {
            type: String,
            maxlength: [255, "Note must be less than 255 characters long!"]
        }

    },
    {timestamps: true}

);

const Expense = model("Expense", ExpenseSchema)
export default Expense