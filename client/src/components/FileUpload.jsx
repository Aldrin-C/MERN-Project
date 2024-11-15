import React, { useState } from 'react'
import Papa from "papaparse"
import axios from "axios"


const FileUpload = (props) => {

  const [fileData, setData] = useState([]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            Papa.parse(file, {
              complete: (result) => {
              setData(result.data);
              },
              header: true,
              dynamicTyping: true,
              skipEmptyLines: true,
            });
          }
        };
        

    const clearForm = () => {
        setData([])
    }

    const handleSubmit = (e) =>{
          e.preventDefault();
  
          // console.log(fileData)
          axios.post(`http://localhost:8000/api/expenses`, fileData)
              .then(res=>{
                  console.log(res.data)
                  props.receiveCsvData(res.data)
                  
              })
              .catch(err=> console.log(err))

          clearForm()
      }



  return (
    <div className="text-center"> 
        {/* <input type="file" accept=".csv" onChange={handleFileChange} className="file-input file-input-bordered file-input-warning w-full max-w-xs" />                   */}
      <form onSubmit={handleSubmit}> 
        <label htmlFor="upload"className="text-center text-xl font-bold">Upload CSV</label> 
        <input id="upload" type="file" accept=".csv" onChange={handleFileChange} className="file-input file-input-bordered file-input-warning w-full max-w-xs" />                  
          <p style={{fontSize: 10}}>fine print: accepts a very specific, proprietary csv file</p>
            <div className="text-center pt-5">
                        <button className="btn btn-success btn-sm" type="submit">
                            Submit
                        </button>
            </div>
      </form>
    </div>
  )
}

export default FileUpload