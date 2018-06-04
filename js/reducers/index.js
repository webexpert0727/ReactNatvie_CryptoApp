import { combineReducers } from 'redux';
import routes from './routes';
import config from './config';
import auth from './auth';
import messages from './messages';
import chat from './chat';
import coins from './coins';

export default combineReducers({
  routes,
  config,
  auth,
  chat,
  messages,
  coins
});
