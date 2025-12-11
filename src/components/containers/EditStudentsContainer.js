/*==================================================
/src/components/containers\EditStudentsContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditStudentsView from '../views/EditStudentsView';
import { editStudentThunk, fetchStudentThunk } from '../../store/thunks';

class EditStudentsContainer extends Component {
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
      redirectId: false,
      errors: {},
    };
  }

  // fetch student data from backend database
  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.id).then(() => {
      const { student } = this.props;
      if (student) {
        // fill in the details of fetched student data in edit student form 
        this.setState( {
          firstname: student.firstname,
          lastname: student.lastname,
          email: student.email,
          imageUrl: student.imageUrl,
          gpa: student.gpa,
          campusId: student.campusId,
        });
      }
    });
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

  // take action after user click the submit button
  handleSubmit = async event => {
  event.preventDefault();  // Prevent browser reload/refresh after submit.
    
    if (!this.validateForm()) {
      return; //stop if validation fails 
    }

    let student = {
      id: this.props.student.id,
      firstname: this.state.firstname || this.props.student.firstname, // either update student object if they cahnged this.state or keep original value from database (redux store)
      lastname: this.state.lastname || this.props.student.lastname,
      email: this.state.email || this.props.student.email,
      imageUrl: this.state.imageUrl || this.props.student.imageUrl,
      gpa: this.state.gpa || this.props.student.gpa,
      campusId: this.state.campusId || this.props.student.campusId,
    };
  
    // edit student in back-end database
    await this.props.editStudent(student);
    this.setState({ 
      redirect: true 
    }); // update state and redirect after successful edit
  };

  // update state with student data
  componentDidUpdate(previousProps) {
    if (previousProps.student !== this.props.student) {
      const { firstname, lastname, email, imageUrl, gpa, campusId } = this.props.student;
      this.setState({
        firstname,
        lastname,
        email, 
        imageUrl, 
        gpa, 
        campusId
      });
    }
  }

  // render edit student input form
  render() {
    // redirect to current student's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/student/${this.props.student.id}`}/>)
    } 

    // display the input form via the corresponding View component
    return ( 
      <div>
        <Header />
        <EditStudentsView
          handleChange = {this.handleChange}
          handleSubmit = {this.handleSubmit}
          studentData = {this.state} // passes state to view
          errors = {this.state.errors}
        />
      </div>
    );
  }
}

// redux state mapping
const mapState = (state) => {
  return { 
    student: state.student,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    editStudent: (student) => dispatch(editStudentThunk(student)),
  }
}

// Export store-connected container by default
// EditStudentsContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditStudentsContainer);