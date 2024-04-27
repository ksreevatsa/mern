import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { registerStudentAction } from "../../../redux/actions/registerStudentAction";
import { connect } from "react-redux";
import { setAlert } from "../../../redux/actions/alertAction";

const useStyles = () => ({
  root: {
    backgroundImage: 'url("https://images.squarespace-cdn.com/content/v1/5e888db5701c090efa2df1c2/1590274990960-NL3G054WSP554Y8OQ7EV/image-asset.jpeg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    finally: true
  },
  formClass: {
    margin: '20px',
    textAlign: 'center',
    border: '1px solid black',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Added a semi-transparent background color for better readability
  },
  formTitle: {
    fontSize: '2em',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
    textTransform: 'uppercase',
  },
  inputfield: {
    display: 'block',
    margin: '10px',
    width: '350px',
  },
  btn: {
    margin: '20px',
    width: '150px',
    color:'black',
  },
});

class StudentRegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  usernameInputHandler = (event) => {
    this.setState({
      ...this.state,
      username: event.target.value
    });
  }

  emailInputHandler = (event) => {
    this.setState({
      ...this.state,
      email: event.target.value
    });
  }

  passwordInputHandler = (event) => {
    this.setState({
      ...this.state,
      password: event.target.value
    });
  }

  confirmPasswordInputHandler = (event) => {
    this.setState({
      ...this.state,
      confirmPassword: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.confirmPassword !== this.state.password) {
      this.props.setAlert({
        isAlert: false,
        type: "error",
        title: 'Invalid Input',
        message: 'Confirm Password does not match',
      });
      return;
    }
    this.props.registerStudentAction({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    });
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <form className={this.props.classes.formClass} onSubmit={(event) => (this.handleSubmit(event))}>
          <div className={this.props.classes.formTitle} color="primary">Register</div>
          <TextField
            variant='outlined'
            color="primary"
            className={this.props.classes.inputfield}
            label="Username"
            placeholder='Enter username'
            type='text'
            value={this.state.username}
            onChange={(event) => (this.usernameInputHandler(event))}
            required
          />
          <TextField
            variant='outlined'
            color="primary"
            className={this.props.classes.inputfield}
            label="Email"
            placeholder='Enter email'
            type='email'
            value={this.state.email}
            onChange={(event) => (this.emailInputHandler(event))}
            required
          />
          <TextField
            variant='outlined'
            color="primary"
            label="Password"
            className={this.props.classes.inputfield}
            placeholder='Enter password'
            type='password'
            value={this.state.password}
            onChange={(event) => (this.passwordInputHandler(event))}
            required
          />
          <TextField
            variant='outlined'
            color="primary"
            label="Confirm Password"
            className={this.props.classes.inputfield}
            placeholder='Enter password again'
            type='password'
            value={this.state.confirmPassword}
            onChange={(event) => (this.confirmPasswordInputHandler(event))}
            required
          />
          <Button
            variant='contained'
            style={{ backgroundColor: '#ffff00' }}
            type='submit'
            className={this.props.classes.btn}
          >
            Register
          </Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({

});

export default withStyles(useStyles)(connect(mapStateToProps, {
  registerStudentAction,
  setAlert
})(StudentRegisterForm));
