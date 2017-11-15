import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from './Home';
import actions from './redux';

class Ctner extends Component {
  static propTypes = {
    // eslint-disable-next-line
    news: PropTypes.object,
  };

  render() {
    const { news } = this.props;

    return <Home news={news.list} />;
  }
}

function mapStateToProps(state) {
  return {
    news: state.news,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Ctner);
