require('./styles/main.scss')
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './components/App'
import AppStore from './stores/AppStore'

const stores = {
  appStore: new AppStore()
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
