import './App.css';
import { Route, Redirect, Switch } from 'react-router-dom';
import Signin from './pages/signin';
import Invoice from './pages/invoices';
import Dashboard from './pages/dashboard';
import UserContext from './contexts/userContext';
import { useContext, useState } from 'react';
import Layout from './components/layout'
import User from './pages/users'


function App() {

  const userCtx = useContext(UserContext);


  return (

    <Layout>
      <Switch>
        <Route path='/signin'>
          {userCtx.isLoggedIn && <Redirect to='/invoice' />}
          <Signin />
        </Route>


        <Route path='/invoice'>
          {userCtx.isLoggedIn && (
            <>
              <Invoice />

            </>


          )}
          {!userCtx.isLoggedIn && <Redirect to='/signin' />}
        </Route>

        <Route path='/dashboard'>
          {userCtx.isLoggedIn && (
            <>
              <Dashboard />

            </>


          )}
          {!userCtx.isLoggedIn && <Redirect to='/signin' />}
        </Route>
        <Route path='/user'>
          {userCtx.isLoggedIn && (
            <>
              <User />

            </>


          )}
          {!userCtx.isLoggedIn && <Redirect to='/signin' />}
        </Route>

      </Switch>
    </Layout>


  );
}

export default App;
