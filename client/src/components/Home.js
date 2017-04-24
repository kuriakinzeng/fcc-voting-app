import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPolls } from '../actions';
import { Link } from 'react-router';

class Home extends Component {
  componentDidMount(){
    this.props.fetchPolls();
  }
  renderList(){
    return this.props.polls.polls.map((poll)=>(
      <li key={poll._id}><Link to={poll._id}>{poll.name}</Link></li>
    ))
  }
  render() {
    return (
      <div className="polls">
        <h3>All Polls:</h3>
        <ul>
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { polls: state.polls }
}

export default connect(mapStateToProps, {fetchPolls})(Home);