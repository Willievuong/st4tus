import React, { Component } from 'react';
import './App.css';
import { NavTabs } from './NavBar/TabContainer';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class App extends Component {
  render() {
    return (
     <Grid container
        justify="center" 
        alignContent="center" 
        alignItems="center">
       <Grid 
        item xs={8}
        className="center"
         >
         <Paper >
            <NavTabs />
          </Paper> 
        </Grid>
      </Grid>
    );
  }
}

export default App;
