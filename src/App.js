import React, { Suspense } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { Navbar } from './components/navbar';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import myTheme from './utils/theme';
import { AuthRoute } from './utils/authRoute';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppProvider from './contexts/appContext';
import { Configuration } from './components/configuration';

const Home = React.lazy(() => import('./pages/home'));
const Login = React.lazy(() => import('./pages/login'));
const Signup = React.lazy(() => import('./pages/signup'));

const theme = createMuiTheme(myTheme);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <AppProvider>
        <Router>
          <Navbar />
          <Configuration>
            <div className="container">
              <Suspense
                fallback={
                  <CircularProgress
                    size={48}
                    style={{ top: '50%', left: '50%' }}
                  />
                }
              >
                <Switch>
                  <Route path="/" exact component={Home} />
                  <AuthRoute path="/login" component={Login} />
                  <AuthRoute path="/signup" component={Signup} />
                  <Redirect to="/" component={Home} />
                </Switch>
              </Suspense>
            </div>
          </Configuration>
        </Router>
      </AppProvider>
    </MuiThemeProvider>
  );
}

export default App;
