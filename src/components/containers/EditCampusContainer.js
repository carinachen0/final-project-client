/*==================================================
/src/components/containers\EditCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditCampusView from '../views/EditCampusView';
import { editCampusThunk, fetchCampusThunk } from '../../store/thunks';

class EditCampusContainer extends Component {
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
      errors: ""
    };
  }

  // fetch campus data from backend database
  componentDidMount() {
    this.props.fetchCampus(this.props.match.params.id).then(() => {
      const { campus } = this.props;
      if (campus) {
        // fill in the details of fetched campus data in edit campus form 
        this.setState( {
          name: campus.name,
          address: campus.address,
          description:campus.description,
          imageUrl: campus.imageUrl
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
    if (!name) errors.name = "Campus name is required!";
    if (!address) errors.address = "Campus address is required!";
    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  // take action after user click the submit button
  handleSubmit = async event => {
  event.preventDefault();  // Prevent browser reload/refresh after submit.
    
    if (!this.validateForm()) {
      return; //stop if validation fails 
    }

    let campus = {
      id: this.props.campus.id,
      name: this.state.name || this.props.campus.name, // either update campus object if they cahnged this.state or keep original value from database (redux store)
      address: this.state.address || this.props.campus.address,
      description: this.state.description || this.props.campus.description,
      imageUrl: this.state.imageUrl || this.props.campus.imageUrl,
    };
  
    // edit campus in back-end database
    await this.props.editCampus(campus);
    this.setState({ 
      redirect: true 
    }); // update state and redirect after successful edit
  };

  // update state with campus data
  componentDidUpdate(previousProps) {
    if (previousProps.campus !== this.props.campus) {
      const { name, address, description, imageUrl } = this.props.campus;
      this.setState({
        name,
        address, 
        description, 
        imageUrl
      });
    }
  }

  // render edit campus input form
  render() {
    // redirect to current campus's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/campus/${this.props.campus.id}`}/>)
    } 

    // display the input form via the corresponding View component
    return ( 
      <div>
        <Header />
        <EditCampusView
          handleChange = {this.handleChange}
          handleSubmit = {this.handleSubmit}
          campus = {this.props.campus}
        />
      </div>
    );
  }
}

// redux state mapping
const mapState = (state) => {
  return { 
    campus: state.campus,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    editCampus: (campus) => dispatch(editCampusThunk(campus)),
  }
}

// Export store-connected container by default
// EditCampussContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditCampusContainer);