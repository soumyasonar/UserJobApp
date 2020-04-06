import React from 'react'
import moment from 'moment'
import axios from './config/axios'

class AdminDashboard extends React.Component {
    constructor(){
        super()
        this.state={
            candidates:[],
            jobTitles:['Front-End Developer','Node.js Developer','MEAN Stack Developer','FULL Stack Developer'],
            selectedJob: 'Front-End Developer'

        }
    }
    componentDidMount () {
        axios.get('/users/application-forms')
        .then((response) =>{
            console.log(response.data)
            const candidates = response.data
            this.setState({ candidates })
        })
        .catch((err) => {
            console.log(err)
        })
    }
    changeTitle = (title) => {
        this.setState({ selectedJob:title})

    }
    handleViewDetails = (id) =>{
        axios.get(`/users/application-form/${id}`)
        .then((response) =>{
            const candidate = response.data
            alert(`Name-${candidate.name} - Email-${candidate.email} - Contact-${candidate.phone}`)
        })
    }
    handleStatus = (id,status) => {
        axios.put(`/users/application-form/update/${id}`, {status} )
        .then((response) =>{
            const candidate = response.data
            alert(`Candidate has been ${candidate.status}`)
            this.setState(prevState => ({
                candidates : prevState.candidates.map(cand =>{
                    if(cand._id === candidate._id){
                        return {...candidate}
                    }else{
                        return {...cand}
                    }
                })

            }))
        })
    }
    render(){
        return(
            <div>
                <h1>Admin Dashboard</h1>
                {this.state.jobTitles.map(title => {
                    return <button onClick={() => {
                        this.changeTitle(title)
                    }}>{ title }</button>
                })}
                <h1>{this.state.selectedJob}s</h1>
                <p>List of candidates applied for {this.state.selectedJob} profile</p>
                <table border="2">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Technical Skills</th>
                            <th>Experience</th>
                            <th>Applied Date</th>
                            <th>View Details</th>
                            <th>Update Application Status</th>
                        </tr>

                    </thead>
                    <tbody>
                        { this.state.candidates.filter(candidate => candidate.jobTitle === 
                            this.state.selectedJob).map(candidate =>{
                                return (
                                    <tr>
                                        <td>{ candidate.name }</td>
                                        <td>{ candidate.skills }</td>
                                        <td>{ candidate.experience }</td>
                                        <td>{ moment(candidate.createdAt).format("DD/MM/YYYY") }</td>
                                        <td><button onClick={() => {
                                           this.handleViewDetails(candidate._id)
                                        }}>View Details</button></td>
                                        <td>
                                            {candidate.status}
                                            {candidate.status === 'applied' ? (
                                            <div>
                                                <button onClick={ () =>{
                                                    this.handleStatus(candidate._id,'shortlisted')
                                                }}>shortlist</button> 
                                                <button onClick={ () =>{
                                                    this.handleStatus(candidate._id,'rejected')
                                                }}>reject</button>
                                            </div>) : (
                                                <button>{candidate.status}</button>
                                            )}
                                            </td>
                                    </tr>
                                )
                            })}

                    </tbody>

                </table>
            </div>
        )
    }
}
export default AdminDashboard