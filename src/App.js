import React from 'react'
//npm install react-router-dom //{} to fetch multiple values from file
import { BrowserRouter, Route } from 'react-router-dom'
import ApplicationForm from './ApplicationForm'
import AdminDashboard from './AdminDashboard'

function App(props){
    return (
        <BrowserRouter>
        <div>
            <center><h1>User Job  Application!!</h1></center>
           <Route path="/" component={ApplicationForm} exact={true}/>
           <Route path="/admin" component={AdminDashboard}/>
           </div>
        </BrowserRouter>
    )
}

export default App