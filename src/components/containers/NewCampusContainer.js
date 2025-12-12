/*==================================================
NewCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewCampusView from '../views/NewCampusView';
import { addCampusThunk } from '../../store/thunks';

class NewCampusContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      imageUrl: "",
      name: "",
      address: "", 
      description: "",
      redirect: false, 
      redirectId: null,
      errors: {}
    };
  }

  // Capture input data when it is entered
  handleChange = event => {
    const { name, value} = event.target;

    //update state first
    this.setState({ [name]: value}, () => {
      // validate this field after state updates
      this.validateField(name, value);
    });
  }

      // Real-time validation for a single field
  validateField = (name, value) => {
    const errors = { ...this.state.errors };

    switch (name) {
      case "name":
        errors.name = value.trim() ? "" : "Campus name is required!";
        break;
      case "address":
        errors.address = value.trim() ? "" : "Campus address is required!";
        break;
      default:
        break;
    }

    this.setState({ errors });
  };

    // Validate inputs entered in form 
  validateForm = () => {
    const { name, address } = this.state;
    const errors = {};
    //requires user to fill in name and addr , else form cannot submit
    if (!name) errors.name = "Campus name is required!";
    if (!address) errors.address = "Campus address is required!";
    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    if (!this.validateForm()) {
      // validation failed, errors are already set in state
      return;
    }

    let campus = {
        imageUrl: this.state.imageUrl || undefined,
        name: this.state.name,
        address: this.state.address, 
        description: this.state.description
    };

    // add new campus in back-end database 
    let newCampus = await this.props.addCampus(campus);
    
    //Update state and trigger redirec to show new campus
    if (newCampus && newCampus.id) {
        this.setState({
            imageUrl: "",
            name: "",
            address: "",
            description: "",
            redirect: true,
            redirectId: newCampus.id,
            errors: {}
        });
    } 
  }

// Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
    this.setState({redirect: false, redirectId: null});
  }

  // Render new campus input form
  render() {
    // Redirect to new campus's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <NewCampusView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit} 
          errors={this.state.errors}     
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
        addCampus: (campus) => dispatch(addCampusThunk(campus)),
    })
}

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(null, mapDispatch)(NewCampusContainer);