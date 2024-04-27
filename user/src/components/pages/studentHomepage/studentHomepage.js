import React from "react";
import { connect } from "react-redux";
import LogoutButton from "../../atoms/LogoutButton/LogoutButton";
import Auth from "../../../helper/Auth";
import { Navigate } from "react-router-dom";
import { getUserDetails } from "../../../redux/actions/loginAction";
import { Drawer, Typography, withStyles, AppBar, Toolbar, List, ListItem, ListItemText, ListItemIcon } from "@material-ui/core";
import AlertBox from '../../atoms/Alertbox/AlertBox';
import TestDetailsStudent from "../../templates/TestDetails/TestDetailsStudent";
import UpcomingStudentTestsDetails from "../../templates/TestDetails/UpcomingStudentTestsDetails";
import CompletedTestsDetailsStudent from "../../templates/TestDetails/CompletedTestsDetailsStudent";
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ScheduleIcon from '@material-ui/icons/Schedule';
import DoneIcon from '@material-ui/icons/Done';

const drawerWidth = 200;
const appbarHeight = 64;

const useStyles = (theme) => ({
  drawer: {
    width: drawerWidth,
    height: `calc(100% - ${appbarHeight}px)`,
    top: appbarHeight,
    backgroundColor: '#111827', // Set background color to black
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
    flexGrow: 1
  },
  appbar: {
    height: appbarHeight,
    background: '#111827',
  },
  listItem: {
    '&:hover': {
      backgroundColor: 'gray', // Change background color on hover
    }
  },
  listItemText: {
    color: 'white', // Set text color to white
  },
  whiteIcon: {
    color: 'white', // Set icon color to white
  },
  studentDetails: {
    marginLeft: theme.spacing(2),
  },
});

class StudentHomepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: (<div><h1>Welcome to Exam portal</h1></div>),
      menuList: [{
        title: 'Home',
        icon: <HomeIcon className={this.props.classes.whiteIcon} />,
        content: (<div>Welcome to Exam portal</div>)
      }, {
        title: 'View All tests',
        icon: <AssignmentIcon className={this.props.classes.whiteIcon} />,
        content: <TestDetailsStudent />
      }, {
        title: 'Upcoming Tests',
        icon: <ScheduleIcon className={this.props.classes.whiteIcon} />,
        content: <UpcomingStudentTestsDetails />
      }, {
        title: 'Completed Tests',
        icon: <DoneIcon className={this.props.classes.whiteIcon} />,
        content: <CompletedTestsDetailsStudent />
      }]
    };
  }

  onMenuItemClick(content) {
    this.setState({
      ...this.state,
      content: content
    });
  }

  render() {
    const { classes } = this.props;

    if (!Auth.retriveToken() || Auth.retriveToken() === 'undefined') {
      return (<Navigate to='/' />);
    } else if (!this.props.user.isLoggedIn) {
      this.props.getUserDetails();
      return (<div></div>);
    } else if (this.props.user.userDetails.type !== 'STUDENT') {
      return (<Navigate to='/' />);
    }

    const { username } = this.props.user.userDetails;

    return (
      <div>
        <div>
          <AppBar
            elevation={0}
            className={classes.appbar}
          >
            <Toolbar>
              <Typography variant='h5' className={classes.title}>
                Student Homepage
              </Typography>
              <Typography variant='h6' className={classes.studentDetails}>
                Welcome, {username} !!
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
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} className={classes.listItemText} />
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
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default withStyles(useStyles)(connect(mapStateToProps, { getUserDetails })(StudentHomepage));
