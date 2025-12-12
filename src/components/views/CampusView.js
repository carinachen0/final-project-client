/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, deleteStudent} = props;
  
  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <img src= {campus.imageUrl || 'https://macaulay.cuny.edu/wp-content/uploads/2016/07/college-of-staten-island-main-walkway-lamp-posts-fountain-214.jpg' } alt="campus image" />
      <p>Address: {campus.address}</p>
      <p>Description: {campus.description}</p>

      <h2>Students:</h2>
      {campus.students.length === 0 ? (
        <p>No students enrolled at this campus.</p>
      ) : (
        campus.students.map( student => {
          let name = student.firstname + " " + student.lastname;
        
          return (
            <div key={student.id}>
              <Link to={`/student/${student.id}`}>
                <h3>{name}</h3>
              </Link> 

              {/* Delete Student Button */}        
              <button onClick={() => deleteStudent(student.id)}>
                Unenroll
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CampusView;