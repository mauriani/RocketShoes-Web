import Reactotron from 'reactotron-react-js';

import { reactotronRedux } from 'reactotron-redux';
import reactotronSaga from 'reactotron-redux-saga';

if (process.env.NODE_ENV === 'development') {
  // ip serviço -> 192.168.1.148
  // ip pc em casa ->192.168.25.15
  const tron = Reactotron.configure({ host: '192.168.25.15' })
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect();
  tron.clear();
  console.tron = tron;
}
