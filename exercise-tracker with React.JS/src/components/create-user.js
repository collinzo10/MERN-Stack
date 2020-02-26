import React,{Component} from 'react';
import axios from 'axios';

export default class CreateUsers extends Component {

    constructor(props){
        super(props);

        //binding the methods to the class
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this)

       this.state={
           username: ''
       }

   }

   onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            
        }

        console.log(user)
        // axios is used to connect the frontend to backend..npm install axios 
        axios.post('http://localhost:5000/users/add',user)
            .then(res => console.log(res.data));

        this.setState({
            username: ''
        })
        // once sy=ubmitted, takes user back to list of exercises
        
    }



    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text"
                            required className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary"/>

                    </div>
                </form>
            </div>
        );
    }
}