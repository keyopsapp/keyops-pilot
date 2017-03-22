require('./styles/main.scss')
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './components/App'
import exampleStore from './stores/ExampleStore'

const stores = {
  exampleStore
}

ReactDOM.render(
  <AppContainer>
    <App stores={stores} />
  </AppContainer>,
  document.getElementById('root')
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', () => {
    ReactDOM.render(
      <AppContainer>
        <App stores={stores} />
      </AppContainer>
      ,
      document.getElementById('root')
    );
  });
}
