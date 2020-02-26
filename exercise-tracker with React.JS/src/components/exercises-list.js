import React,{Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//this file has 2 components:
//this component isimplimented as functional react component: 
//neither has state nor lifecycle method 
const Exercise = props=>(
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() =>{ props.deleteExercise(props.exercise._id)}}>delete</a>
        </td>
    </tr>
)


//while this component is implimented a class component
export default class ExerciseList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = { exercises: []};
    }

    //lifecycle method
    componentDidiMount(){
        axios.get('http://localhost:5000/exercises/')
            .then(res =>{
                this.setState({exercises: res.data})
            })
            .catch((error) =>{
                console.log(error);
            })
    }

    deleteExercise(id){
        axios.delete('http://localhost:5000/exercises/'+id)
            .then(res => console.log(res.data))

        this.setState({
            //ret all d remaining id after deleting  the 'id' above
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList(){
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise= {currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;

        })
    }

    render() {
        return (
            <div>
                <h3>Logged Exercise</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        );
    }
}