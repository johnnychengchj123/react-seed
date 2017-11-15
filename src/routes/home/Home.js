import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';

class Home extends React.Component {
  static propTypes = {
    news: PropTypes.arrayOf(
      PropTypes.shape({
        bodyUrl: PropTypes.string.isRequired,
        cover: PropTypes.string.isRequired,
        excerpt: PropTypes.string,
      }),
    ).isRequired,
  };

  render() {
    const { news } = this.props;

    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>React.js News</h1>
          <p>{process.env.REACT_APP_API_ZTBSAS}</p>
          <p>{JSON.stringify(news)}</p>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
