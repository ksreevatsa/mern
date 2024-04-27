import React from "react";
import { connect } from "react-redux";
import LogoutButton from "../../atoms/LogoutButton/LogoutButton";
import Auth from "../../../helper/Auth";
import { Navigate } from "react-router-dom";
import { getUserDetails } from "../../../redux/actions/loginAction";
import AddQuestionForm from "../../templates/AddQuestionForm/AddQuestionForm";
import AlertBox from '../../atoms/Alertbox/AlertBox';
import { Drawer, Typography, withStyles, AppBar, Toolbar, List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import QuestionDetails from "../../templates/QuestionDetails/questionDetails";
import CreateTestForm from "../../templates/CreateTestForm/CreateTestForm";
import TestDetails from "../../templates/TestDetails/TestDetails";
import HomeIcon from '@material-ui/icons/Home';
import AddBoxIcon from '@material-ui/icons/AddBox';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ListAltIcon from '@material-ui/icons/ListAlt';

const drawerWidth = 200;
const appbarHeight = 64;

const useStyles = (theme) => ({
  drawer: {
    width: drawerWidth,
    height: `calc(100% - ${appbarHeight}px)`,
    top: appbarHeight,
  },
  drawerPaper: {
    width: drawerWidth,
    height: `calc(100% - ${appbarHeight}px)`,
    top: appbarHeight,
    backgroundColor: '#111827', // Set background color to black
  },
  flex: {
    display: 'flex'
  },
  content: {
    margin: 'auto'
  },
  addHeight: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    color: 'white', // Set text color to white
  },
  appbar: {
    height: appbarHeight,
    backgroundColor: '#111827',
  },
  listItem: {
    '&:hover': {
      backgroundColor: '#4B5563', // Change background color on hover
    }
  },
  listItemText: {
    color: 'white', // Set text color to white
  },
  listItemIcon: {
    color: 'white', // Set icon color to white
  }
});

class TeacherHomepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: (<div><h1>Welcome to Exam portal</h1></div>),
      menuList: [{
        title: 'Home',
        icon: <HomeIcon />,
        content: (<div>Welcome to Exam portal</div>)
      }, {
        title: 'Add Question',
        icon: <AddBoxIcon />,
        content: <AddQuestionForm />
      }, {
        title: 'Questions',
        icon: <QuestionAnswerIcon />,
        content: <QuestionDetails />
      }, {
        title: 'Create Test',
        icon: <PostAddIcon />,
        content: <CreateTestForm />
      }, {
        title: 'View Tests',
        icon: <ListAltIcon />,
        content: <TestDetails />
      }]
    }
  }

  onMenuItemClick(content) {
    this.setState({
      ...this.state,
      content: content
    })
  }

  render() {
    if (!Auth.retriveToken() || Auth.retriveToken() === 'undefined') {
      return (<Navigate to='/' />);
    } else if (!this.props.user.isLoggedIn) {
      this.props.getUserDetails();
      return (<div></div>);
    } else if (this.props.user.userDetails.type !== 'TEACHER') {
      return (<Navigate to='/' />);
    }
    const { classes } = this.props;

    return (
      <div>
        <div>
          <AppBar
            elevation={0}
            className={classes.appbar}
          >
            <Toolbar>
              <Typography variant='h5' className={classes.title}>
                Teacher Homepage
              </Typography>
              <Typography variant='h6'>
                welcome, {this.props.user.userDetails.username} !!
              </Typography>
            </Toolbar>
          </AppBar>
          <div className={classes.addHeight}></div>
        </div>
        <div className={classes.flex}>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            anchor="left"
            classes={{ paper: classes.drawerPaper }}
          >
            <List>
              {this.state.menuList.map((item, index) => (
                <ListItem button key={index} onClick={() => (this.onMenuItemClick(item.content))} className={classes.listItem}>
                  <ListItemIcon className={classes.listItemIcon}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} classes={{ primary: classes.listItemText }} />
                </ListItem>
              ))}
              <ListItem>
                <LogoutButton />
              </ListItem>
            </List>
          </Drawer>
          <div className={classes.content}>
            <AlertBox></AlertBox>
            {this.state.content}
          </div>
        </div>
      </div>
    )
  }
}

const mapStatetoProps = state => ({
  user: state.user
})

export default withStyles(useStyles)(connect(mapStatetoProps, {
  getUserDetails
})(TeacherHomepage));
