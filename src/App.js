import './App.css';

import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Users from './Users';
import Logout from './Logout';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

import loader from './loader.gif';

const App = () => {
  const { token, user } = useContext(AuthContext);

  return (
    <div className='App'>
      {token ? (
        user ? (
          <Switch>
            {/* Protected Routes */}
            <Route path='/users' component={Users} />
            <Route path='/logout' component={Logout} />
            <Redirect to='/users' />
          </Switch>
        ) : (
          <img src={loader} />
        )
      ) : (
        <Switch>
          {/* Public Routes */}
          <Route path='/auth/login' component={Login} />
          <Route path='/auth/signup' component={SignUp} />

          <Redirect to='auth/login' />
        </Switch>
      )}
    </div>
  );
};

export default App;
