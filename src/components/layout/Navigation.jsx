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
              <Link to="/">
                <img src="" alt="astarte biologics logo" className="logo" />
              </Link>
              <ul className="nav-links">
                <li><Link to="/requests">Requests</Link></li>
                <li><Link to="/draws">Draws</Link></li>
                <li><Link to="/lots">Lots</Link></li>
                <li><Link to="/donors">Donors</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/freezers">Freezers</Link></li>
              </ul>
              <p className="user-info">
                <span>
                  <img src="" alt="dropdown button icon" />
                </span>
                Admin
              </p>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
