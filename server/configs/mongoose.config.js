import { connect } from "mongoose";

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
import dotenv from "dotenv";

async function dbConnect() {
    try {
        await connect(MONGODB_URI, {
            dbName: 'expensesdb',
        });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export default dbConnect;