import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logoutUser } from '../actions';

class Header extends Component {
    renderLinks() {
        if (this.props.authenticated) {
            return [
                <li className="nav-item" key={1}>
                    <Link className="nav-link" to="/mypolls">My Polls</Link>
                </li>,
                <li className="nav-item" key={2}>
                    <Link className="nav-link" to="/create">New Poll</Link>
                </li>,
                <li className="nav-item" key={3}>
                    <Link className="nav-link" to="" onClick={()=>this.props.logoutUser()}>Sign Out</Link>
                </li>
            ];
        } else {
            return [
                <li className="nav-item" key={1}>
                    <Link className="nav-link" to="/signin">Sign In</Link>
                </li>,
                <li className="nav-item" key={2}>
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
            ];
        }
    }
    render() {
        return (
            <nav className="navbar navbar-toggleable-sm navbar-light">
                <Link className="navbar-brand" to="/">Voting</Link>
                <div>
                    <ul className="nav navbar-nav">
                        {this.renderLinks()}
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps, {logoutUser})(Header);