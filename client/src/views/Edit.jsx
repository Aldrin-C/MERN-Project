import React, { useState, useEffect } from 'react'
import axios from "axios"
import {useParams, useNavigate, Link} from "react-router-dom"
import Header from '../components/Header'


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
            // props.receiveUpdatedExpense(res.data)
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
    <div className="container mx-auto py-5 p-10">
             <Header newHeader="Update Expense"/>
        <div className="flex justify-between gap-20">
        <form onSubmit={handleSubmit} className="pt-10">
            <div>
                <label htmlFor="name" className="text-lg font-bold">Expense Name: </label> <br></br>
                <input  className="border-solid border-2 border-slate-800 rounded-md"
                        type="text" name="name" id="name" value={expenseState.name} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="amount" className="text-lg font-bold">Amount:</label> <br></br>
                <input  className="border-solid border-2 border-slate-800 rounded-md" 
                        type="number" name="amount" id="amount" value={expenseState.amount} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="date" className="text-lg font-bold">Date: </label> <br></br>
                <input  className="border-solid border-2 border-slate-800 rounded-md" 
                        type="date" name="date" id="date" value={expenseState.date} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="isPaid" className="text-lg font-bold">Paid? </label>
                <input type="checkbox" name="isPaid" id="isPaid" checked={expenseState.isPaid} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="paymentType" className="text-lg font-bold">Payment Type: </label> <br></br>
                <input  className="border-solid border-2 border-slate-800 rounded-md"
                        type="text" name="paymentType" id="paymentType" value={expenseState.paymentType} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="note" className="text-lg font-bold">Note: </label> <br></br>
                <textarea className="border-solid border-2 border-slate-800 rounded-md" 
                            type="text" name="note" id="note" value={expenseState.note} onChange={handleChange}/>
            </div>
                <button className="btn btn-sm btn-success" type="submit">
                                Update
                </button>
        </form>
        <div>
        <div className="carousel w-full rounded pt-20">
  <div id="slide1" className="carousel-item relative w-full ">
    <img
      src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
      className="w-full" />
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide4" className="btn btn-circle">❮</a>
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div>
  <div id="slide2" className="carousel-item relative w-full">
    <img
      src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
      className="w-full" />
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide1" className="btn btn-circle">❮</a>
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div>
  <div id="slide3" className="carousel-item relative w-full">
    <img
      src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
      className="w-full" />
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide2" className="btn btn-circle">❮</a>
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
  </div>
  <div id="slide4" className="carousel-item relative w-full">
    <img
      src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
      className="w-full" />
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide3" className="btn btn-circle">❮</a>
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div>
</div>
        </div>
        </div>
    </div>
  )
}

export default Edit