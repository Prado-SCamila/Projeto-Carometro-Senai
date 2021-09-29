import React from 'react'
import ReactDOM from 'react-dom'
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom'
import { parseJwt, usuarioAutenticado } from './services/auth'

import './index.css'


import Home from './pages/home/home'
import Login from './pages/login/login'
import Administrador from './pages/administrador/administrador'
import Colaborador from './pages/colaborador/colaborador'

import reportWebVitals from './reportWebVitals'

const RoleAdministrador = ({ component: Component }) => (
  <Route
    render={props =>
      usuarioAutenticado() && parseJwt().role === '1' ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
)

const RoleColaborador = ({ component: Component }) => (
  <Route
    render={props =>
      usuarioAutenticado() && parseJwt().role === '2' ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
)

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} /> 
        <RoleAdministrador path="/administrador" component={Administrador} />        
        <RoleColaborador path="/colaborador" component={Colaborador} />                
        {/* <Route exact path="/notfound" component={NotFound} /> 
        <Redirect to="/notfound" /> */}
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
