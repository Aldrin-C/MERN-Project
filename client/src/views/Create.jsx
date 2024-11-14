import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

const Create = (props) => {
    const [expenseState, setExpenseState] = useState({
        name: "",
        amount: "",
        date: "",
        isPaid: false,
        paymentType: "",
        note: ""
    });


    const handleChange = (e) => {
        const keyToUpdate = e.target.name;
        let valToUpdate = e.target.value;
    
        if (e.target.type === "checkbox"){
            valToUpdate = e.target.checked;
        }
        else {
            valToUpdate = e.target.value;
        }
    
        setExpenseState((prevState) => ({
            ...prevState, 
            [keyToUpdate]: valToUpdate
        }))
    }

    const clearForm = () =>{
        setExpenseState({
            name: "",
            amount: 0,
            date:"",
            isPaid: false,
            paymentType: "",
            note:""
        })
    }

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newExpense = {...expenseState}

        axios.post(`http://localhost:8000/api/expense`, newExpense)
            .then(res=>{
                console.log(res.data)
                props.receiveNewExpense(res.data)
                navigate(`/`);
            })
            .catch(err=> console.log(err))
        
        clearForm()

    }

    return (
        <div className>
            
            {/* <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Home
            </Link> */}
            <h3 className="text-center text-lg font-bold p-2">or</h3>
            <h2 className="text-center text-xl font-bold mb-5">Enter New Expense</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <div className>
                <label htmlFor="name">Expense Name: </label> <br></br>
                <input className="border-solid border-2 border-slate-800 rounded-md" 
                        type="text" name="name" id="name" value={expenseState.name} 
                        onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="amount">Amount: $</label> <br></br>
                <input className="border-solid border-2 border-slate-800 rounded-md" 
                        type="number" name="amount" id="amount" value={expenseState.amount} 
                        onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="date">Date: </label> <br></br>
                <input className="border-solid border-2 border-slate-800 rounded-md" 
                        type="date" name="date" id="date" value={expenseState.date} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="isPaid">Paid? </label>
                <input type="checkbox" name="isPaid" id="isPaid" checked={expenseState.isPaid} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="paymentType">Payment Type: </label> <br></br>
                <input className="border-solid border-2 border-slate-800 rounded-md" 
                        type="text" name="paymentType" id="paymentType" value={expenseState.paymentType} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="note">Note: </label> <br></br>
                <textarea className="border-solid border-2 border-slate-800 rounded-md" 
                            type="text" name="note" id="note" value={expenseState.note} onChange={handleChange}/>
            </div>
            <div className="text-center">
            <button className="btn btn-success btn-sm" type="submit">
                                Add Expense
            </button>
            </div>
        </form>

        </div>
    )
}

export default Create