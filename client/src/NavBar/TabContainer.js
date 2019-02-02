import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import './TabContainer.css';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

function LinkTab(props) {
  return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

export class NavTabs extends React.Component {
  state = {
    value: 0,
  };

 

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    // will update with data later

    var roommates = ["Roommate One", "Roommate Two", "Roommate Three"]
    
    var roommateJson = {
     users: {
        "userID1": {
          name: "Arthur",
          chores: ["vaccuum", "dishes"],
          messages: ["Pick up milk from store"]
          },
        "userID2": {
          name: "Jake",
          chores: ["take out trash"],
          messages: ["Text us when you get home"]
          },
        "userID3": {
          name: "Molly",
          chores: ["wipe the counters"],
          messages: ["Pick up milk from store"]
          },
        "userID4": {
          name: "Julie",
          chores: ["wipe the counters"],
          messages: ["Pick up milk from store"]
          }
        }
    }
    
    var names = [];
    var choresLists = [];
    var messagesLists = [];
    for (var x in roommateJson) {
        for (var y in roommateJson[x]) {
          names.push(roommateJson[x][y].name);
          choresLists.push(roommateJson[x][y].chores);
          messagesLists.push(roommateJson[x][y].messages);
        }
    }


    var namesTabs = names.map(function(name){
      return <LinkTab label={name} href={name} />;
     })
   
     

    return (
      <NoSsr>
        <div position="center">
          <AppBar position="static">
            <Tabs 
              variant="scrollable"
              scrollButtons="on" 
              value={value} 
              onChange={this.handleChange}
              >
              { namesTabs }

            </Tabs>
          </AppBar>
          <TabContainer>
            <Typography variant="h5"> Chores List </Typography>
           
            <ol>
               {choresLists[value].map((toDo) =>
                  <li key={toDo.toString()}
                            value={toDo.toString()}> {toDo}
                            </li>
                             
                )}   
           

            </ol>
          
         
          <br />
          <Typography variant="h5"> Messages </Typography>
          
          <ul>
               {messagesLists[value].map((toGive) =>
                  <li key={toGive.toString()}
                            value={toGive.toString()}> {toGive}
                            </li>
                             
                )}   
           

            </ul>


          </TabContainer>




        </div>
      </NoSsr>
    );
  }
}

NavTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavTabs);