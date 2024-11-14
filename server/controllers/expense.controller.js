import Expense from "../models/expense.model.js";

const ExpenseController = {
    getAll: async (req, res) => {
        try{
            const allExpenses = await Expense.find()
            res.json(allExpenses)
        }catch(error){
            console.log(error)
            res.status(400).json(error);
        }
    },

    getOne: async (req, res) => {
        try{
            const oneExpense = await Expense.findById(req.params.id)
            res.json(oneExpense)
        }catch(error){
            console.log(error)
            res.status(400).json(error);
        }
    },

    addOne: async (req,res) => {
        try{
            const newExpense = await Expense.create(req.body);
            res.json(newExpense)
        }catch(error){
            console.log(error)
            res.status(400).json(error);
        }
    },

    addMany: async (req,res) => {
        try{
            const newExpenseList = await Expense.insertMany(req.body);
            res.json(newExpenseList)
        }catch(error){
            console.log(error)
            res.status(400).json(error);
        }
    },

    updateOne: async (req, res) => {
        const options = {
            new: true,
            runValidators: true
        }

        try{
            const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, options)
            res.json(updatedExpense)
        }catch(error){
            console.log(error)
            res.status(400).json(error);
        }
    },

    deleteOne: async (req, res) => {
        try{
            const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
            res.json(deletedExpense)
        }catch(error){
            console.log(error)
            res.status(400).json(error);
        }
    }


}
export default ExpenseController;
