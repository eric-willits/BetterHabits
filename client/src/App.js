import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch, NavLink } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './App.module.css';
import AppNavbar from './components/Navigation/AppNavbar';
import Day from './components/Day/Day';
import Groups from './components/Groups/Groups';
import Community from './components/Community/Community';
import Aux from './hoc/Aux';
import Home from './components/UI/Home/Home';

import { store } from "./index";
import { loadUser } from "./store/actions/auth";
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render(){
    const routes = (
      <div className={styles.container}>
        <ul className={styles.listGroup}>
          <NavLink to="/myday" className={[styles.listItem, styles.day].join(' ')}>My Day</NavLink>
          <NavLink to="/groups" className={[styles.listItem, styles.dashboard].join(' ')}>My Dashboard</NavLink>
          <NavLink to="/community" className={[styles.listItem, styles.community].join(' ')}>My Community</NavLink>
        </ul>
          <Switch>
            <Route path="/myday" component={Day}/>
            <Route path="/groups" component={Groups} />
            <Route path="/community" component={Community} />
            <Redirect from="/" to="/groups"/>
          </Switch>
      </div>
    )
    
    return(
      <BrowserRouter>
        <div className="App">
          <AppNavbar/>  
          {this.props.isAuthenticated ? routes : <Home />}
        </div>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(App);
