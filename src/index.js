
import 'survey-react/survey.css';
import './assets/styles/main.scss';

import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import App from './components/App'
import exampleStore from './stores/ExampleStore'
import surveyStore from './stores/SurveyStore'
import 'typeface-roboto'
// import 'material-ui-icons'
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import {purple, green, red, blue, teal, indigo, cyan, pink} from 'material-ui/colors'

const primary = red[500]; // #F44336


// test = {
// 500:        #03A9F4
// $accent-color:         #00BCD4
//     $primary-color-dark:   #0288D1
// $primary-color-light:  '#B3E5FC'
// $primary-color-text:   #FFFFFF
// $primary-text-color:   #212121
// $secondary-text-color: #757575
// $divider-color:        #BDBDBD
// }

console.log(purple.contrastDefaultColor)

const test = {
    50: '#B3E5FC',
    100: '#B3E5FC',
    200: '#B3E5FC',
    300: '#B3E5FC',
    400: '#B3E5FC',
    500:  '#03A9F4',
    600: '#0288D1',
    700: '#0288D1',
    800: '#0288D1',
    900: '#0288D1',
    A100: '#00e5ff',
    A200:'#00BCD4',
    A400:'#00e3ff',
    A700: '#00BCD4',
    contrastDefaultColor: 'light'

}

const theme = createMuiTheme({
    palette: {
        primary:teal,
        secondary: pink,
        error: red,
    }

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

