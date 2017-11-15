import React from 'react';
import Layout from '../../components/Layout';
import HomeCtner from './Ctner';
import { addReducer } from '../../store';
import actions, { reducers, fetchNews } from './redux';

async function action({ store }) {
  addReducer(store, reducers);

  const news = await fetchNews({
    columnId: '030008',
    pageNum: 1,
    pageSize: 10,
  });

  store.dispatch(actions.setNews(news));

  return {
    chunks: ['home'],
    title: 'React Starter Kit',
    component: (
      <Layout>
        <HomeCtner />
      </Layout>
    ),
  };
}

export default action;
