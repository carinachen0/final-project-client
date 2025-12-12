/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import { unenrollStudentThunk } from "../../store/thunks";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, unenrollStudent} = props;
  
  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <img src= {campus.imageUrl || 'https://image-static.collegedunia.com/public/college_data/images/studyabroad/appImage/college_2187_29-15:05_Purdue_University.jpeg' } alt="campus image" />
      <p>Address: {campus.address}</p>
      <p>Description: {campus.description}</p>
      
      <Link to={`/editCampus/${campus.id}`}>
        <button>Edit Campus</button>
      </Link>

      {/* Enroll New Student */}
      <Link to={`/newstudent?campusId=${campus.id}`}>
        <button>Enroll New Student</button>
      </Link>

      <br />

      {/* Enroll Registered Student */}
      <Link to="/students">
        <button>Enroll Registered Student</button>
      </Link>

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
              <button onClick={() => unenrollStudent(student.id, campus.id)}>
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