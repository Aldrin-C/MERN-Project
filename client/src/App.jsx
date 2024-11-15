import Dashboard from "./views/Dashboard"
import {Routes, Route} from "react-router-dom"
import Edit from "./views/Edit"
import Create from "./views/Create"



function App() {
  

  return (
    <div className="bg-white-content">
      
      
      <Routes>
        <Route path="/expense/:id/edit" element={ <Edit /> } />
        <Route path="/" element={ <Dashboard /> } />

      </Routes>

    </div>
  )
}

export default App
