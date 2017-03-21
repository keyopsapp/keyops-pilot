import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

@observer
export default class Navigation extends Component {
  render() {
    return (
      <nav className="top-nav">
        <div className="container">
          <div className="row">
            <div className="twelve columns">
              <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
              </ul>
              <ul className="nav-links">
                <li><Link to="/people">People</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
