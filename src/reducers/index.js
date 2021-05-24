import { combineReducers } from 'redux';
import auth from './auth';
import navigation from './navigation';
import alerts from './alerts';
import layout from './layout';
import products from './products';
import analytics from './analytics';
import chat from './chat';
import users from './usersReducers';
import DataTable from './DataImport';
import { connectRouter } from 'connected-react-router';
import ShipmentsDetails from './ShipmentsDetailsReducer';



export default (history) =>
  combineReducers({
    router: connectRouter(history),
    alerts,
    DataTable,
    ShipmentsDetails,
    auth,
    navigation,
    layout,
    products,
    analytics,
    chat,
    users,
});
