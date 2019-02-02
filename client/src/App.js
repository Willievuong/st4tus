import React, { Component } from 'react';
import './App.css';
import { NavTabs } from './NavBar/TabContainer';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


class App extends Component {
  render() {
    return (
      <div>
     <Grid container
        xs={16}
        direction="column"
        justify="center" 
        alignContent="center" 
        alignItems="center"
        spacing="8"
        className="center"
        >
       <Grid 
        item xs={8}
         >
         <Paper >
            <NavTabs />
            
          </Paper> 
        </Grid>
        
      </Grid>
     
      </div>
    );
  }
}

export default App;
