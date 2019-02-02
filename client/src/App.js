import React, { Component } from 'react';
import './App.css';
import { NavTabs } from './NavBar/TabContainer';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class App extends Component {
  render() {
    return (
<<<<<<< HEAD
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
          	Hello from Duke!
          </a>
        </header>
      </div>
=======
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
>>>>>>> 7eb39a66ac4d1edd2f7a9628cbfe6eb628fe1b68
    );
  }
}

export default App;
