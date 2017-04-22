import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPolls } from '../actions';

class Home extends Component {
  componentDidMount(){
    this.props.fetchPolls();
  }
  renderList(){
    this.props.polls.polls.map((poll)=>(
      <li key={poll._id}><a href={poll.link}>{poll.name}</a></li>
    ))
  }
  render() {
    return (
      <ul>
        {this.renderList()}
      </ul>
    );
  }
}

function mapStateToProps(state){
  return { polls: state.polls }
}

export default connect(mapStateToProps, {fetchPolls})(Home);