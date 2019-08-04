import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { Navbar } from './components/navbar';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import myTheme from './utils/theme';
import jwtDecode from 'jwt-decode';
import { AuthRoute } from './utils/authRoute';
import useLocalStorage from './hooks/useLocalStorage';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppProvider from './contexts/appContext';

// import Home from './pages/home';
// import Login from './pages/login';
// import Signup from './pages/signup';
const Home = React.lazy(() => import('./pages/home'));
const Login = React.lazy(() => import('./pages/login'));
const Signup = React.lazy(() => import('./pages/signup'));

const theme = createMuiTheme(myTheme);

// let authenticated;
// const token = localStorage.getItem('social-token');
// if (token) {
//   const decodedToken = jwtDecode(token);
//   if (decodedToken.exp * 1000 < Date.now()) {
//     //window.location.href = '/login';
//     authenticated = false;
//   } else {
//     authenticated = true;
//   }
// }

function App() {
  const [token] = useLocalStorage('social-token');

  let authenticated;
  if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      const origin = window.location.origin;
      //window.location.href = `${origin}/login`;
      authenticated = false;
    } else {
      authenticated = true;
    }
  }

  return (
    <MuiThemeProvider theme={theme}>
      <AppProvider>
        <Router>
          <Navbar />
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
                <AuthRoute path="/" exact component={Home} />
                <AuthRoute
                  path="/login"
                  component={Login}
                  authenticated={authenticated}
                />
                <AuthRoute
                  path="/signup"
                  component={Signup}
                  authenticated={authenticated}
                />
                <Redirect to="/" component={Home} />
              </Switch>
            </Suspense>
          </div>
        </Router>
      </AppProvider>
    </MuiThemeProvider>
  );
}

export default App;
