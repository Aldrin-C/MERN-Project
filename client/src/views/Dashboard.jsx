import React, { useState, useEffect} from 'react'
import axios from "axios"
import { format, parseISO } from "date-fns"
import { Link } from "react-router-dom"
import FileUpload from '../components/FileUpload'
import ExpenseChart from '../components/ExpenseChart'
import Header from '../components/Header'
import Create from './Create'



const Dashboard = () => {

    const [expenseList, setExpenseList] = useState([]);

    const expenseToChart = () => {

        
    }


    const addExpensetoList = (newExpense) => {
        setExpenseList([...expenseList, newExpense])
    }

    const addCsvToExpenseList = (csvData) => {
        console.log(csvData)
        setExpenseList ([...expenseList, ...csvData])
    }

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/expense`)
            .then(res=>{
                console.log(res);
                setExpenseList(res.data)
            })
            .catch(err=> console.log(err))

    }, [])
    

    // const [fileData, setData] = useState([]);
    // const handleFileLoad = (csvData) => {
    //     setData(csvData);
    // };
    
    // const handleSubmit = (e) =>{
    //     e.preventDefault();

    //     // console.log(fileData)
    //     axios.post(`http://localhost:8000/api/expenses`, fileData)
    //         .then(res=>{
    //             console.log(res.data)
    //             // const newData = (res.data)
    //             // setExpenseList()
    //         })
    //         .catch(err=> console.log(err))
    // }

    const handleDelete =(deleteId)=>{
        axios.delete(`http://localhost:8000/api/expense/${deleteId}`)
            .then(res=>{
                const filteredList = expenseList.filter((eachExpense)=>eachExpense._id != deleteId)
                setExpenseList(filteredList);
            })
            .catch(err=>console.log(err))

    }

  return (
    <div className="py-20 px-20">

        
        <Header newHeader="Expense Tracker"/>
        
        
        
        <div className="flex justify-between gap-20">
            <div className="py-40"> 
                <h4 className="text-center text-xl font-bold">Upload CSV</h4>
               
                <FileUpload receiveCsvData = {addCsvToExpenseList}/>
                {/* <form onSubmit={handleSubmit} className="pt-5">
                    <FileUpload />
                    <div className="text-center pt-5">
                        <button className="btn btn-success btn-sm" type="submit">
                            Upload File
                        </button>
                    </div>
                </form> */}
                <Create receiveNewExpense = {addExpensetoList}/>
            </div>
            <div className="basis-3/4">
            <ExpenseChart width={700} height={500} data={expenseList} />
            <div className="flex justify-end gap-2">
                <button className="btn btn-info btn-sm">Monthly</button>
                <button className="btn btn-success btn-sm">Weekly</button>
                <button className="btn btn-warning btn-sm">Daily</button>
            </div>
            <div className="overflow-x-auto">
            <table className="table text-lg">
                <thead className="text-lg">
                    <tr>
                        <th className="py-2">Expense Name</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Paid?</th>
                        <th>Payment Type</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        expenseList.map((eachExpense) =>
                            <tr key={eachExpense._id} className="hover">
                                <td className="py-2">
                                    <Link to={`/expense/${eachExpense._id}/edit`}>{eachExpense.name}</Link> 
                                </td>
                                <td>$ {eachExpense.amount}</td>
                                {/* <td>{eachExpense.date}</td> */}
                                <td>{format( parseISO(eachExpense.date), "MM/dd/yyyy")}</td>
                                <td>{eachExpense.isPaid ? "Yes" : "No"}</td>
                                {eachExpense.isPaid ?
                                    <td>{eachExpense.paymentType}</td> :
                                    <td></td>
                                }
                                <td>
                                <button onClick={()=>handleDelete(eachExpense._id)}  className="btn btn-sm btn-error"
                                type="button">delete</button> 
                                </td>
                            </tr>
                        
                    )}
                </tbody>
            </table>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard