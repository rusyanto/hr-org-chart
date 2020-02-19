import React from 'react';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from 'react-redux';
import OrgChart from '../OrgChart';
import { CLOSE_SNACKBAR_ERROR } from '../../redux/actionTypes';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#81bced",
      main: "#4e8cba",
      dark: "#0e5f8a",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ffc04d",
      main: "#fc8f13",
      dark: "#c36000",
      contrastText: "#fff"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.8)",
      secondary: "rgba(0, 0, 0, 0.4)"
    }
  }
});

function App() {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({ type: CLOSE_SNACKBAR_ERROR });
  };

  return (
    <ThemeProvider theme={theme}>
      <OrgChart />
      <Snackbar open={state.snackbar.sbOpenError} autoHideDuration={6000} onClose={handleCloseError}>
        <Alert onClose={handleCloseError} severity="error">
          {state.snackbar.sbMsgError}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
