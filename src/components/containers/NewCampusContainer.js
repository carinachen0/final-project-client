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
    const { imageUrl, name, address, description } = this.state;
    if (!imageUrl || !name || !address || !description) {
        return false;
    }
    return true;
  };

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    if (!this.validateForm()) {
        this.setState({ errors: "Missing information. Please fill out all the fields!"});
        return;
    }

    let campus = {
        imageUrl: this.state.imageUrl,
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