/*==================================================
NewStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
================================================== */
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Create styling for the input form
const useStyles = makeStyles( () => ({
  formContainer:{  
    width: '500px',
    backgroundColor: '#f0f0f5',
    borderRadius: '5px',
    margin: 'auto',
  },
  formTitle:{
    backgroundColor:'#c5c8d6',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '3px'
  },
}));

const EditStudentsView = ({ studentData, handleChange, handleSubmit, errors }) => {
  const classes = useStyles();

  if (!studentData) return <p>Loading student data...</p>;

  // Render a New Student view with an input form
  return (
    <div>
    {/*Page Title*/}
      <h1>Edit Student</h1>

    {/*Form Title: dynamic students full name*/}
      
    <div className={classes.formContainer}>
        <div className={classes.formTitle}>
            <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
                {studentData.firstname} {studentData.lastname}
            </Typography>
        </div>
        
        {/*Form*/}
        <form style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>
            
            <div>     
                <label style= {{color:'#11153e', fontWeight: 'bold'}}>First Name: </label>
                <input 
                    type="text" 
                    name="firstname" 
                    value={studentData.firstname} // controlled input: always reflects current state / stored value
                    onChange ={(e) => handleChange(e)} 
                />
                <br/><br/>
            </div>  

            <div>     
                <label style= {{color:'#11153e', fontWeight: 'bold'}}>Last Name: </label>
                <input 
                    type="text" 
                    name="lastname" 
                    value={studentData.lastname} // controlled input: always reflects current state / stored value
                    onChange ={(e) => handleChange(e)} 
                />
                <br/><br/>
            </div>  

            <div>     
                <label style= {{color:'#11153e', fontWeight: 'bold'}}>Email: </label>
                <input 
                    type="text" 
                    name="email" 
                    value={studentData.email} // controlled input: always reflects current state / stored value
                    onChange ={(e) => handleChange(e)} 
                    placeholder='first name'
                />
                <br/><br/>
            </div>  

            <div>     
                <label style= {{color:'#11153e', fontWeight: 'bold'}}>Image URL: </label>
                <input 
                    type="text" 
                    name="imageUrl" 
                    value={studentData.imageUrl} // controlled input: always reflects current state / stored value
                    onChange ={(e) => handleChange(e)} 
                />
                <br/><br/>
            </div>  

            <div>     
                <label style= {{color:'#11153e', fontWeight: 'bold'}}>GPA: </label>
                <input 
                    type="text" 
                    name="gpa" 
                    value={studentData.gpa} // controlled input: always reflects current state / stored value
                    onChange ={(e) => handleChange(e)} 
                />
                <br/><br/>
            </div>  

            <div>     
                <label style= {{color:'#11153e', fontWeight: 'bold'}}>CampusId: </label>
                <input 
                    type="text" 
                    name="campusId" 
                    value={studentData.campusId} // controlled input: always reflects current state / stored value
                    onChange ={(e) => handleChange(e)} 
                />
                <br/><br/>
            </div>  

            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <br/><br/>
          </form>
          </div>
    </div>
  );
};

export default EditStudentsView;