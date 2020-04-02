import React from 'react'
import UserForm from './UserForm'
//npm install react-router-dom //{} to fetch multiple values from file
import { BrowserRouter, Route, Link} from 'react-router-dom'

function App(props){
    return (
        <BrowserRouter>
        <div>
            <center><h1>User Job  Application!!</h1></center>
           

           <Route path="/" component={UserForm}/>
           
          
        </div>
        </BrowserRouter>
    )
}

export default App