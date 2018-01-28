import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Provider, observer} from 'mobx-react'
import LazyRoute from 'lazy-route'


import Navigation from './layout/Navigation';

@observer
export default class App extends Component {
    constructor(props) {
        super(props);
        this.stores = this.props.stores
    }

    render() {

        return (
            <Router>
                <Provider {...this.stores}>
                    <div className="wrapper">
                        <Navigation {...this.props} />
                        <div className="app-contnet">
                            <Route
                                exact
                                path="/"
                                render={(props) => <LazyRoute {...props} component={import('./home')}/>}
                            />
                            <Route
                                exact
                                path="/edit/:surveyId"
                                render={(props) => <LazyRoute {...props} component={import('./editor')}/>}
                            />
                            <Route
                                name="display"
                                exact
                                path="/display/:surveyId/:postId/:clientId"
                                render={(props) => <LazyRoute {...props} component={import('./display')}/>}
                            />
                            <Route
                                exact
                                path="/results/:surveyId"
                                render={(props) => <LazyRoute {...props} component={import('./results')}/>}
                            />
                        </div>

                    </div>
                </Provider>
            </Router>
        )
    }
}
