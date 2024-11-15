import React, { useState, useEffect} from 'react'
import axios from "axios"
import { format, parseISO } from "date-fns"
import { Link } from "react-router-dom"
import FileUpload from '../components/FileUpload'
import ExpenseChart from '../components/ExpenseChart'
import Header from '../components/Header'
import Create from './Create'
import Edit from './Edit'



const Dashboard = () => {

    const [expenseList, setExpenseList] = useState([]);

    const [isActive, setIsActive] = useState(false);

    const handleClick = (e) => {
        setIsActive(current => !current);
    }

    const addUpdatedExpense = (updatedExpense) => {
        setExpenseList([...expenseList])
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
                console.log(res.data);
                setExpenseList(res.data)
            })
            .catch(err=> console.log(err))

    }, [])

    const handleDelete =(deleteId)=>{
        axios.delete(`http://localhost:8000/api/expense/${deleteId}`)
            .then(res=>{
                const filteredList = expenseList.filter((eachExpense)=>eachExpense._id != deleteId)
                setExpenseList(filteredList);
            })
            .catch(err=>console.log(err))

    }

  return (
    <div className="py-5 px-10">
        <Header newHeader="Expense Tracker"/>
        
        <div className="flex justify-between gap-10">
            <div className="py-40"> 
               
                <FileUpload receiveCsvData = {addCsvToExpenseList}/>

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

                                    {/* <button onClick={()=>handleClick}  className="btn btn-active btn-ghost btn-sm"
                                        type="button">edit</button> */}
                                </td>
                            </tr> 
                    )}
                </tbody>
            </table>
            {/* <div>
                <Edit receiveUpdatedExpense = {addUpdatedExpense}/>
            </div> */}
            {/* <div>
                
                    {
                        isActive && (
                        <Edit />
                    )}
                    
                
            </div> */}
            </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard