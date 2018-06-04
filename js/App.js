//https://github.com/react-navigation/react-navigation/issues/962

import React from "react";
import {AppLoading} from "expo"
import { StyleSheet, View, AsyncStorage,Platform,Dimensions} from 'react-native';
import { NavigationActions,addNavigationHelpers,StackNavigator, DrawerNavigator} from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator'
import {Tabs, Stack,Scene, Router,Reducer,Drawer,ActionConst} from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import	thunkMiddleware	from	'redux-thunk'
import {persistStore,autoRehydrate,} from 'redux-persist';

const RouterWithRedux = connect()(Router);
import reducers from './reducers';

const platform = Platform.OS;

const window = Dimensions.get('window');

var WINDOW_WIDTH = Dimensions.get('window').width;
var WINDOW_HEIGHT = Dimensions.get('window').height;

import { login } from './actions/auth';
import { updateprice } from './actions/coins';
import api from './util/api';


import Contacts from    "./components/contacts"; //0
import Auth from    "./components/auth";//0.1
import Registration from    "./components/registration";//0.2
import Forgot from    "./components/forgot";//0.3

import Prices from    "./components/prices"; //1
import Wallets from    "./components/wallets"; //2
import Exchange from    "./components/exchange"; //3
import Chat from    "./components/chat"; //4
import Settings from    "./components/settings"; //5

import Coin from    "./components/coin"; //1.1
import Buy from    "./components/buy";
import Sell from    "./components/sell";
import Withdraw from    "./components/withdraw";

import Send from    "./components/send";
import WalletsSubpage from    "./components/walletssubpage";
import EuroWallet from    "./components/eurowallet";

import Eurodeposit from    "./components/eurodeposit"; //2.2.2


import Deposit from    "./components/deposit";

import Alerts from    "./components/alerts";
//import AddAlert from    "./components/addalert";
import Verification from    "./components/verification";
import Conversation from    "./components/conversation";



import Profile from    "./components/profile";
import Currencies from    "./components/currencies";
import Accounts from    "./components/accounts";
import IdentityVerify from    "./components/identityverify";
import Security from    "./components/security";
import AddAlert from    "./components/addalert";
import Passcode from    "./components/passcode";
import AddAccount from    "./components/addaccount";
import AddCard from    "./components/addcard";
import AddBank from    "./components/addbank";
import VerifyAccountPhoto from    "./components/verifyaccountphoto";


import VerifyingTransfer from    "./components/verifyingtransfer";
import AddPhone from    "./components/addphone";


  const store = createStore(
    reducers,
    undefined,
    compose(
      applyMiddleware(thunkMiddleware),
      autoRehydrate()
    )
  )

console.disableYellowBox = true;
console.ignoredYellowBox = [
    'Setting a timer'
];

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    if (action.type == "REACT_NATIVE_ROUTER_FLUX_PUSH")
    {
//      console.log('Action :', action)
      console.log(action.routeName)
      action.routeName = action.routeName.replace('_','');
    }

//    console.log('State :', state)
  var nextState = defaultReducer(state, action);
    return nextState;
  };
};


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appIsReady: true,
      storageReady:false,
      welcomeReady:true,
      startpage:'',
      isLoggedIn:false,
    };
  }

  componentWillMount() {}

onReceivedMessage(data) {
  store.dispatch(updateprice(data))
}


  componentDidMount() {
    persistStore(store, {blacklist: ['nav'],storage: AsyncStorage}, () => {
      this.setState({storageReady: true});
    })
  }

componentWillUnmount() {
}
  render() {
    if (this.state.storageReady && this.state.welcomeReady) {
      console.log('storageReady');

/*
      if (platform == 'ios'){
      const App = () => (
        <Router>
            <Stack key="root2" hideNavBar showLabel={false} >
              <Tabs
                key="tabbar"
                swipeEnabled
                showLabel={false}
                 tabBarStyle={{height:0,width:0}}
                activeBackgroundColor="white"
                inactiveBackgroundColor="rgba(255, 0, 0, 0.5)">
              <Scene  key="prices" component={Prices} title='prices'  hideNavBar />
              <Scene  key="wallets" component={Wallets} title='wallets'  hideNavBar />
              <Scene  key="chat" component={Chat} title='chat'  hideNavBar />
              <Scene  key="settings" component={Settings} title='settings'  hideNavBar />
            </Tabs>

              <Scene key="prices2" component={Prices} title='prices2'  hideNavBar />
              <Scene key="main" component={Main} title="main"/>
              <Scene key="auth" component={Auth} title="auth" />
              <Scene key="forgot" component={Forgot} title="forgot" />
              <Scene key="registration" component={Registration} title="registration" />

              <Scene key="coin" component={Coin} title="coin" />
              <Scene key="buy" component={Buy} title="buy" />
              <Scene key="sell" component={Sell} title="sell" />
              <Scene key="withdraw" component={Withdraw} title="withdraw" />
              <Scene key="send" component={Send} title="send" />
              <Scene key="walletssubpage" component={WalletsSubpage} title="walletssubpage" />
              <Scene key="eurowallet" component={EuroWallet} title="eurowallet" />
              <Scene key="deposit" component={Deposit} title="deposit" />
              <Scene key="conversation" component={Conversation} title="conversation" />
              <Scene key="verification" component={Verification} title="verification" />
              <Scene key="alerts" component={Alerts} title="alerts" />
              <Scene key="eurodeposit" component={Eurodeposit} title="eurodeposit" />
              <Scene key="profile" component={Profile} title="profile" />
              <Scene key="currencies" component={Currencies} title="currencies" />
              <Scene key="accounts" component={Accounts} title="accounts" />
              <Scene key="identityverify" component={IdentityVerify} title="identityverify" />
              <Scene key="security" component={Security} title="security" />
              <Scene key="addalert" component={AddAlert} title="addalert" />
              <Scene key="passcode" component={Passcode} title="passcode" />
              <Scene key="addaccount" component={AddAccount} title="addaccount" />
              <Scene key="addcard" component={AddCard} title="addcard" />
              <Scene key="addbank" component={AddBank} title="addbank" />
              <Scene key="verifyaccountphoto" component={VerifyAccountPhoto} title="verifyaccountphoto" />
              <Scene key="verifyingtransfer" component={VerifyingTransfer} title="verifyingtransfer" />
              <Scene key="addphone" component={AddPhone} title="addphone" />

          </Stack>
        </Router>
      );

      return (
        <Provider store={store}>
            <App />
        </Provider>
      )
} else {
*/

  const App = () => (
    <Router
      createReducer={reducerCreate}
      >
      <Stack
        key='root'
        hideNavBar
        >
               <Scene key="prices"  component={Prices} title='prices'  hideNavBar />
               <Scene key="wallets" component={Wallets} title='wallets'  hideNavBar />
               <Scene key="chat" component={Chat} title='chat'  hideNavBar />
               <Scene key="settings" component={Settings} title='settings'  hideNavBar />
                 <Scene key="auth" component={Auth} title="auth" hideNavBar animationEnabled={true}/>
                 <Scene key="registration" component={Registration} hideNavBar title="registration" animationEnabled={true}/>
                 <Scene key="forgot" component={Forgot} hideNavBar title="forgot" animationEnabled={true}/>
                 <Scene key="coin" hideNavBar component={Coin} title="coin" />
                 <Scene key="buy" hideNavBar component={Buy} title="buy" />
                 <Scene key="sell" hideNavBar component={Sell} title="sell" />
                 <Scene key="withdraw" hideNavBar component={Withdraw} title="withdraw" />
                 <Scene key="send" hideNavBar component={Send} title="send" />
                 <Scene key="walletssubpage" hideNavBar component={WalletsSubpage} title="walletssubpage" />
                 <Scene key="eurowallet" hideNavBar component={EuroWallet} title="eurowallet" />
                 <Scene key="deposit" hideNavBar component={Deposit} title="deposit" />
                 <Scene key="conversation" hideNavBar component={Conversation} title="conversation" />
                 <Scene key="verification" hideNavBar component={Verification} title="verification" />
                 <Scene key="alerts" hideNavBar component={Alerts} title="alerts" />
                 <Scene key="eurodeposit" hideNavBar component={Eurodeposit} title="eurodeposit" />
                 <Scene key="profile" hideNavBar component={Profile} title="profile" />
                 <Scene key="addbank" hideNavBar component={AddBank} title="addbank" />
                 <Scene key="verifyaccountphoto" hideNavBar component={VerifyAccountPhoto} title="verifyaccountphoto" />
                 <Scene key="verifyingtransfer" hideNavBar component={VerifyingTransfer} title="verifyingtransfer" />
                 <Scene key="addphone" hideNavBar component={AddPhone} title="addphone" />
                 <Scene key="contacts" hideNavBar component={Contacts} title="contacts" />
                 </Stack>
                </Router>
              );

  return (
    <Provider store={store}>
        <App />
    </Provider>
  )

//}
    } else {
      return (
        <AppLoading />
      );
    }
  }
}
