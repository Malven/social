export default {
  palette: {
    common: { black: 'rgba(0, 0, 0, 1)', white: '#fff' },
    background: { paper: '#fff', default: '#fafafa' },
    primary: {
      light: 'rgba(100, 130, 161, 1)',
      main: 'rgba(77, 101, 125, 1)',
      dark: 'rgba(51, 68, 85, 1)',
      contrastText: '#fff'
    },
    secondary: {
      light: 'rgba(251, 203, 125, 1)',
      main: 'rgba(245, 166, 35, 1)',
      dark: 'rgba(191, 128, 23, 1)',
      contrastText: '#fff'
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff'
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)'
    }
  },
  classes: {
    form: {
      textAlign: 'center'
    },
    image: {
      margin: '20px auto 20px auto',
      borderRadius: '5px',
      border: '1px solid black',
      height: 50,
      width: 50,
      objectFit: 'cover'
    },
    pageTitle: {
      margin: '10px auto 10px auto'
    },
    textField: {
      margin: '10px auto 10px auto'
    },
    button: {
      marginTop: 20,
      position: 'relative'
    },
    buttonProgress: {
      position: 'absolute'
    },
    invisibleSeparator: {
      border: 'none',
      margin: 4
    },
    visibleSeparator: {
      width: '100%',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      marginBottom: 20
    }
  }
};
