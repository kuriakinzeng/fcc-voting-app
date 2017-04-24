import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPoll, deletePoll } from '../actions';
import { Doughnut } from 'react-chartjs';
import VotingForm from './VotingForm';

const defaultColors = ['#3366CC', '#DC3912', '#FF9900', '#109618',
  '#990099', '#3B3EAC', '#0099C6', '#DD4477',
  '#66AA00', '#B82E2E', '#316395', '#994499',
  '#22AA99', '#AAAA11', '#6633CC', '#E67300',
  '#8B0707', '#329262', '#5574A6', '#3B3EAC'];

class Poll extends Component {
  componentWillMount() {
    this.props.fetchPoll(this.props.params.pollId);
  }

  handleDeletePoll(){
    const { activePoll, deletePoll, user } = this.props;
    const pollToDelete = {
      user,
      pollId: activePoll._id
    };
    deletePoll(pollToDelete);
  }

  renderForm() {
    const { activePoll, user, authenticated } = this.props;
    const { name } = activePoll;
    return (
      <div className="col-4">
        <h3>{name}</h3>
        <VotingForm />
        <hr />
        <a target="_blank" className="btn btn-info"
          href={`https://twitter.com/intent/tweet?text=${name}:&url=${location.href}`}>Tweet</a>
        {authenticated &&
          user._id === activePoll._creator &&
       <button className="btn btn-danger" onClick={() => this.handleDeletePoll() }>Delete Poll</button>}
      </div>
    )
  }

  renderChart() {
    const thisPoll = this.props.activePoll;
    const options = thisPoll.options;

    let chartData = [];
    let totalVotes = 0;

    for (var i = 0; i < options.length; i++) {
      chartData.push({
        value: options[i].votes,
        color: defaultColors[i % defaultColors.length],
        label: options[i].name
      })
      totalVotes += options[i].votes;
    }

    const chartOptions = {
      responsive: true,
      bezierCurve: false,
    }

    return (
      <div className="col-8">
        {
          (totalVotes > 0) ? <Doughnut data={chartData} options={chartOptions} /> : 'No votes in yet.'
        }
      </div>
    )
  }

  renderPoll() {
    return (
      <div className="row">
        {this.renderForm()}
        {this.renderChart()}
      </div>
    )
  }
  render() {
    return (
      <div>
        {this.props.activePoll ? this.renderPoll() : 'Loading...'}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    polls: state.polls.polls,
    activePoll: state.polls.activePoll,
    authenticated: state.auth.authenticated,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, { fetchPoll, deletePoll })(Poll);