import 'bootstrap/dist/css/bootstrap.css';

require('./assets/styles/main.scss');
import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import App from './components/App'
import exampleStore from './stores/ExampleStore'
import surveyStore from './stores/SurveyStore'
import 'typeface-roboto'
// import 'material-ui-icons'
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import {purple, green, red, gray} from 'material-ui/colors'

const theme = createMuiTheme({
    // palette: {
    //     primary: purple, // Purple and green play nicely together.
    //     secondary: green,
    //     error: red,
    // }

});

const stores = {
    exampleStore,
    surveyStore
};

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <AppContainer>
            <App stores={stores}/>
        </AppContainer>
    </MuiThemeProvider>
    ,
    document.getElementById('root')
);

// Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./components/App', () => {
        ReactDOM.render(
            <AppContainer>
                <App stores={stores}/>
            </AppContainer>
            ,
            document.getElementById('root')
        );
    });
}
