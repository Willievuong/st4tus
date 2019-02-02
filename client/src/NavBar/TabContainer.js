import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import './TabContainer.css';

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
    


    var names = ['One', 'Two', 'Three', 'Four', 'Five'];
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
              {/* <LinkTab label={roommateOne} href="page1" />
              <LinkTab label={roommateTwo} href="page2" />
              <LinkTab label={roommateThree} href="page3" /> */}

              { namesTabs }

            </Tabs>
          </AppBar>
          

          {value === 0 && <TabContainer>roommate one</TabContainer>}
          {value === 1 && <TabContainer>roommateTwo</TabContainer>}
          {value === 2 && <TabContainer>roommateThree</TabContainer>}
        </div>
      </NoSsr>
    );
  }
}

NavTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavTabs);