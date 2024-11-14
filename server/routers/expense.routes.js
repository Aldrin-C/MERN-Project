import {Router} from "express";
import ExpenseController from "../controllers/expense.controller.js";

const router = Router();

router.route("/expense")
    .get(ExpenseController.getAll)
    .post(ExpenseController.addOne)

router.route("/expenses")
    .post(ExpenseController.addMany)

router.route("/expense/:id")
    .get(ExpenseController.getOne)
    .put(ExpenseController.updateOne)
    .delete(ExpenseController.deleteOne)

export default router;