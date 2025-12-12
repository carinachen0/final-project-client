/*==================================================
EditCampusView.js

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

const EditCampusView = ({ handleChange, handleSubmit, errors, campus }) => {
  const classes = useStyles();

  // Render a New Campus view with an input form
  return (
    <div>
    {/*Page Title*/}
      <h1>Edit Campus</h1>

    {/*Form Title: dynamic students full name*/}
      
    <div className={classes.formContainer}>
        <div className={classes.formTitle}>
            <Typography style={{fontWeight: 'bold', fontFamily: 'Courier, sans-serif', fontSize: '20px', color: '#11153e'}}>
                Edit Campus Information
            </Typography>
        </div>
        
        {/*Form*/}
        <form style={{textAlign: 'center'}} onSubmit={(e) => handleSubmit(e)}>
            
            <div>     
                <label style= {{color:'#11153e', fontWeight: 'bold'}}>Name: </label>
                <input 
                    type="text" 
                    name="name" 
                    value={campus.name} // controlled input: always reflects current state / stored value
                    onChange ={(e) => handleChange(e)} 
                    placeholder="required"
                />
                {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
                <br/><br/>
            </div>    

            <div>     
                <label style= {{color:'#11153e', fontWeight: 'bold'}}>Image URL: </label>
                <input 
                    type="text" 
                    name="imageUrl" 
                    value={campus.imageUrl} // controlled input: always reflects current state / stored value
                    onChange ={(e) => handleChange(e)} 
                    placeholder='optional'
                />
                <br/><br/>
            </div>  

            <div>     
                <label style= {{color:'#11153e', fontWeight: 'bold'}}>Address: </label>
                <input 
                    type="text" 
                    name="address" 
                    value={campus.address} // controlled input: always reflects current state / stored value
                    onChange ={(e) => handleChange(e)} 
                    placeholder='required'
                />
                {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}
                <br/><br/>
            </div>  

            <div>     
                <label style= {{color:'#11153e', fontWeight: 'bold'}}>Description: </label>
                <input 
                    type="text" 
                    name="description" 
                    value={campus.description} // controlled input: always reflects current state / stored value
                    onChange ={(e) => handleChange(e)} 
                    placeholder='Enter Description Here'
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

export default EditCampusView;