/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewStudentView from '../views/NewStudentView';
import { addStudentThunk } from '../../store/thunks';

class NewStudentContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      firstname: "", 
      lastname: "", 
      email: "",
      imageUrl: "",
      gpa: "",
      campusId: null, 
      redirect: false, 
      redirectId: null,
      errors: {}
    };
  }

  // Capture input data when it is entered
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
    this.validateField(name, value); // trigger real-time validation after state updates
    });
  };

    // Real-time validation for a single field
  validateField = (name, value) => {
    const errors = { ...this.state.errors };

    switch (name) {
      case "firstname":
        errors.firstname = value.trim() ? "" : "First name is required!";
        break;
      case "lastname":
        errors.lastname = value.trim() ? "" : "Last name is required!";
        break;
      case "email":
        errors.email = value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)
          ? "Entered invalid email format!"
          : "";
        break;
      case "gpa":
        errors.gpa = value && (isNaN(value) || value < 0 || value > 4)
          ? "GPA must be a number between 0.0 and 4.0!"
          : "";
        break;
      default:
        break;
    }

    this.setState({ errors });
  };

    // Validate inputs entered in form 
  validateForm = () => {
    const { firstname, lastname, email, gpa } = this.state;
    const errors = {};
    if (!firstname) errors.firstname = "First name is required!";
    if (!lastname) errors.lastname = "Last name is required!";
    if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.email = "Entered invalid email format!";
    if (gpa && (gpa < 0.0 || gpa > 4.0 || isNaN(gpa))) errors.gpa = "GPA must be a number betwen 0.0 and 4.0!"; //out of range OR not a number
    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    let student = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        imageUrl: this.state.imageUrl || undefined,
        gpa: this.state.gpa || null, //gpa is an optional field
        campusId: this.state.campusId
    };
    
    // Add new student in back-end database
    let newStudent = await this.props.addStudent(student);

    // Update state, and trigger redirect to show the new student
    if (newStudent && newStudent.id) {
      this.setState({
        firstname: "", 
        lastname: "", 
        email: "",
        imageUrl: "",
        gpa: "",
        campusId: null, 
        redirect: true, 
        redirectId: newStudent.id
      });
    }
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render new student input form
  render() {
    // Redirect to new student's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/student/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <NewStudentView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit} 
          studentData = {this.state} // passes state to view
          errors = {this.state.errors}     
        />
      </div>          
    );
  }
}

// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        addStudent: (student) => dispatch(addStudentThunk(student)),
    })
}

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(null, mapDispatch)(NewStudentContainer);