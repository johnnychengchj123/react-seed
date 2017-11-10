import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

function rootReducer(state) {
  return state;
}

function createHelpers({ fetch, history }) {
  return {
    fetch,
    history,
  };
}

let store;

export default function configureStore(initialState, helpersConfig) {
  const helpers = createHelpers(helpersConfig);
  const middleware = [thunk.withExtraArgument(helpers)];

  let enhancer;

  // eslint-disable-next-line no-underscore-dangle
  if (process.env.__DEV__) {
    // middleware.push(createLogger());

    // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
    let devToolsExtension = f => f;
    if (process.env.BROWSER && window.devToolsExtension) {
      devToolsExtension = window.devToolsExtension();
    }

    enhancer = compose(applyMiddleware(...middleware), devToolsExtension);
  } else {
    enhancer = applyMiddleware(...middleware);
  }

  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  store = createStore(rootReducer, initialState, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  // if (__DEV__ && module.hot) {
  //   module.hot.accept('../reducers', () =>
  //     // eslint-disable-next-line global-require
  //     store.replaceReducer(require('../reducers').default),
  //   );
  // }

  return store;
}

// eslint-disable-next-line prefer-const
let reducerCache = {};

export function addReducer(reducers) {
  const reducerKeys = Object.keys(reducers);
  reducerKeys.forEach(key => {
    reducerCache[key] = reducers[key];
  });

  if (!process.env.BROWSER) {
    // eslint-disable-next-line
    global.__store.replaceReducer(combineReducers(reducerCache));
  } else {
    store.replaceReducer(combineReducers(reducerCache));
  }
}
