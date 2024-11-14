import React, { useState, useEffect } from 'react'
import axios from "axios"
import {useParams, useNavigate, Link} from "react-router-dom"

const Edit = () => {
    const {id} = useParams();

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

const [errors, setErrors] = useState({});

const navigate = useNavigate();

useEffect(()=>{
    axios.get(`http://localhost:8000/api/expense/${id}`)
        .then(res=>{
            console.log(res.data);
                const foundExpense = res.data;
                setExpenseState(foundExpense);
        })
        .catch(err=>console.log(err))
}, [])

const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:8000/api/expense/${id}`, expenseState)
        .then(res=>{
            console.log(res.data)
            navigate(`/`);
        })
        .catch(err=>{
            console.log(err.response.data.errors)
            
        })
}

const handleDelete = () =>{
    axios.delete(`http://localhost:8000/api/expense/${id}`)
        .then(res=>{
            navigate("/")

        })
        .catch(err=>console.log(err));
}

  return (
    <div>Edit
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Expense Name: </label>
                <input type="text" name="name" id="name" value={expenseState.name} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="amount">Amount: $</label>
                <input type="number" name="amount" id="amount" value={expenseState.amount} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="date">Date: </label>
                <input type="date" name="date" id="date" value={expenseState.date} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="isPaid">Paid? </label>
                <input type="checkbox" name="isPaid" id="isPaid" checked={expenseState.isPaid} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="paymentType">Payment Type: </label>
                <input type="text" name="paymentType" id="paymentType" value={expenseState.paymentType} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="note">Note: </label>
                <textarea type="text" name="note" id="note" value={expenseState.note} onChange={handleChange}/>
            </div>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">
                                Update
            </button>
        </form>
    </div>
  )
}

export default Edit