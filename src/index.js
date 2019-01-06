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
import {MuiThemeProvider, createMuiTheme, createPalette} from 'material-ui/styles';
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
    500: '#03A9F4',
    600: '#0288D1',
    700: '#0288D1',
    800: '#0288D1',
    900: '#0288D1',
    A100: '#00e5ff',
    A200: '#00BCD4',
    A400: '#00e3ff',
    A700: '#00BCD4',
    contrastDefaultColor: 'light'

}

// All the following keys are optional.
// We try our best to provide a great default value.
// const theme = createMuiTheme({
//     palette: {
//         primary: indigo,
//         secondary: pink,
//         error: {
//             main: red[500],
//         },
//         // Used by `getContrastText()` to maximize the contrast between the background and
//         // the text.
//         contrastThreshold: 3,
//         // Used by the functions below to shift a color's luminance by approximately
//         // two indexes within its tonal palette.
//         // E.g., shift from Red 500 to Red 300 or Red 700.
//         tonalOffset: 0.2,
//     },
// });
// //
const theme = createMuiTheme({
    palette: {
        primary: {...teal, 500: '#FFFFFF', },
        secondary: {...teal, 'A200': '#288fcc'},
        error: red
    }

});

const stores = {
    exampleStore,
    surveyStore
};

function toggleFullScreen() {
    var doc = window.document;
    var docEl = doc.documentElement;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    }
    else {
        cancelFullScreen.call(doc);
    }
}

window.addEventListener("load", function () {
    // Set a timeout...
    console.log('started')
    setTimeout(function () {
        // Hide the address bar!
        console.log('loaded')
        toggleFullScreen()
        // window.scrollTo(0, 1);
    }, 0);
});

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

