import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { fetchMyPolls } from '../actions';
import { Link } from 'react-router';

class MyPolls extends Component {
  render() {
    const { user, polls } = this.props;
    const myPolls = polls.filter((poll)=>{
      return poll._creator == user._id
    });
    
    console.log(polls, myPolls);

    return (
      <div className="polls">
        <h3>My Polls:</h3>
        <ul>
          {
            myPolls.map(
              (poll)=>(<li key={poll._id}>
                  <Link to={poll._id}>{poll.name}</Link>
                </li>)
            )
          }
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { polls: state.polls.polls, user: state.auth.user }
}

export default connect(mapStateToProps)(MyPolls);