import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import logo from './img/logo.png';
import Home from './components/Home';
import Todolist from './components/Todolist'
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';

var moment = require('moment');
export default class App extends React.Component {
  componentDidMount() {
    this.auth();
  }
  state = {
    isAuthenticated: false
  }
  auth() {
    let stringToken = localStorage.getItem('token');
    let data;
    if (stringToken) {
      data = JSON.parse(stringToken);
      if (moment(data.expires) > moment()) {
        this.setState({ isAuthenticated: true });
      } else {
        this.setState({ isAuthenticated: false });
      }
    }
  }
  render() {
    return (
      <Router >
        <Navbar params={this.state.isAuthenticated} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={(props) => <Register props={props} params={this} />} />
          <Route path="/login" component={(props) => <Login props={props} params={this} />} />
          <Route exact path="/logout" component={(props) =><Logout p={props} params={this} />} />
          <PrivateRoute path="/todolist" auth={this.state.isAuthenticated} >
            <Todolist />
          </PrivateRoute>
        </Switch>

      </Router>
    );
  }
}
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        rest.auth ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}


class Navbar extends React.Component {
  componentDidMount() {
  }
  render() {
    return (
      <nav className="nav">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img
              src={logo}
              alt="new"
            />
          </Link>
          <div id="button"></div>
          <ul id="menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/todolist">TODO List</Link></li>
            {this.props.params ?
              <li><Link to="/logout">Wyloguj się</Link></li>
              :
              <>
              <li><Link to="/login">Zaloguj się</Link></li>
              <li><Link to="/register">Rejestracja</Link></li>
              </>}

          </ul>
        </div>
      </nav>

    );
  }
}