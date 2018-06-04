import React, { Component } from "react";

import { Actions } from 'react-native-router-flux';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as authActions from '../../actions/auth';

import {
  Text,
  View,
  Image,
  WebView,
  TouchableHighlight,
  Dimensions,
  Platform,
  StyleSheet,
  TextInput, 
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback
} from "react-native";

import api from '../../util/api';
import language from '../../util/language';


import styles from "../styles";

class BottomMenu extends Component {
  constructor(props) {
		super(props);

		this.state = {
			user:[],
      isReady:false,
      isOpen: false,
      isOpen2: false,
      selectedItem: 'About',
      top:'',
      bottom:'',
      email:'',
      pass:'',
      open: false,
      connected: false,
      error:'',
      isPopup: false,
      amount:'20'
		};

	}
  componentDidMount(){
    StatusBar.setHidden(true, 'none');
  }

  componentWillMount(){
//    console.log(this.props.type);
let type = this.props.type

  if (type == 'plus' || type == 'send' || type == 'buy' || type == 'sell' || type == 'withdraw'){
    this.setState({isPopup: true})
  }
    if (this.props.popup == '1'){
      this.setState({isPopup: true})
    }
	}

  componentWillReceiveProps (nextProps) {
	}

  nav(path){
    const {auth} = this.props

    if (!auth.isLoggedIn) {
      Actions.auth()
    } else {
      Actions.push(path)
    }

  }

  togglePopup(){
    this.setState({ isPopup: !this.state.isPopup });
    }
//<TouchableOpacity onPress={() => Actions.buy()} >
//</TouchableOpacity>
setAmount(amount){

  amount = amount.replace('$ ','');
  amount = amount.replace('$','');

  this.setState({'amount':amount})
}

  render() {

    let type = this.props.type
    let name = this.props.name

    if (type !== 'plus' &&type !== 'send' && type !== 'buy' && type !== 'sell' && type !== 'withdraw'){
      type = 'exchange';
    }

//    console.log(type);

    var dollar = ''
    if (type == 'withdraw' || type == 'plus'){
      dollar = '$ '
    }

    if (typeof name === 'undefined'){
      name = 'AMOUNT'
    }

//    console.log(type);
//    console.log(this.state.isPopup);



    return (
      <View style={styles.globalMenu}>
        <View style={styles.menuBlockWhite}></View>
        <View style={styles.menuline}></View>


        {( this.state.isPopup && type=='exchange') && (
        <View style={styles.popup}>
          <Image source={require("../../../assets/icons/navigation_bg.png")}
             style={styles.globalMenuIcon} />
           <TouchableOpacity onPress={() => this.nav('buy')}  style={styles.buyIconPos}>
            <Image source={require("../../../assets/icons/buy.png")} style={styles.buyIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.nav('sell')}  style={styles.sellIconPos}>
            <Image source={require("../../../assets/icons/sell.png")} style={styles.sellIcon} />
          </TouchableOpacity>
{/*          <TouchableOpacity onPress={() => this.nav('deposit')}  style={styles.depositIconPos}>
            <Image source={require("../../../assets/icons/deposit.png")} style={styles.depositIcon} />
          </TouchableOpacity>*/}
          <TouchableOpacity onPress={() => this.nav('send')}  style={styles.sendIconPos}>
            <Image source={require("../../../assets/icons/send.png")} style={styles.sendIcon} />
          </TouchableOpacity>
        </View>)
      }

      {type!=='exchange' && (
      <View style={styles.popupBuy}>
        <Image source={require("../../../assets/icons/speedometer.png")} style={styles.globalMenuIconBuy} />
        <View style={styles.globalMenuTextTitleBlock}>
          <Text style={styles.globalMenuTextTitle}>{name}</Text>
            <TextInput
              style={styles.globalMenuTextInput}
              onChangeText={(amount) => this.setAmount(amount)}
              value={dollar+this.state.amount}
              keyboardType="numeric"
              underlineColorAndroid='rgba(0,0,0,0)'
            />
          </View>
      </View>)
    }



      <View style={styles.menuBlock}>
        <View style={[styles.menuItem]}>
          <TouchableOpacity onPress={() => Actions.prices()}>
            <View>
              <Image source={require("../../../assets/icons/prices_icon.png")} style={[styles.menuItemIcon,{}]} />
            </View>
            <View style={styles.menuItemTextBlock}>
              <Text style={styles.menuItemText}>Prices</Text>
            </View>
        </TouchableOpacity>
        </View>
        <View style={[styles.menuItem]}>
          <TouchableOpacity onPress={() => this.nav('wallets')}>
            <View>
              <Image source={require("../../../assets/icons/wallets_icon.png")} style={[styles.menuItemIcon,{width:20, height:20/40*33}]} />
            </View>
            <View style={styles.menuItemTextBlock}>
              <Text style={styles.menuItemText}>Wallets</Text>
            </View>
          </TouchableOpacity>
        </View>

{type=='buy' && (
          <View style={[styles.menuItem, styles.menuItemActive]}>
            <View>
              <Image source={require("../../../assets/icons/buy_white.png")} style={[this.state.isPopup ? styles.menuItemIconBig : styles.menuItemIcon,{}]} />
            </View>
              {!this.state.isPopup &&
            <View>
              <Text style={styles.menuItemText, styles.menuItemTextActive}>Exchange</Text>
            </View>
            }
          </View>
    )}
    {type=='send' && (
              <View style={[styles.menuItem, styles.menuItemActive]}>
                <View>
                  <Image source={require("../../../assets/icons/send_white.png")} style={[styles.menuItemIconBig,{}]} />
                </View>
              </View>
        )}
    {type=='sell' && (
              <View style={[styles.menuItem, styles.menuItemActive]}>
                <View>
                  <Image source={require("../../../assets/icons/sell_white.png")} style={[this.state.isPopup ? styles.menuItemIconBig : styles.menuItemIcon,{}]} />
                </View>
                  {!this.state.isPopup &&
                <View>
                  <Text style={styles.menuItemText, styles.menuItemTextActive}>Exchange</Text>
                </View>
                }
              </View>
        )}
        {type=='withdraw' && (
                  <View style={[styles.menuItem, styles.menuItemActive]}>
                    <View>
                      <Image source={require("../../../assets/icons/withdraw_white.png")} style={[this.state.isPopup ? styles.menuItemIconBig : styles.menuItemIcon,{}]} />
                    </View>
                      {!this.state.isPopup &&
                    <View>
                      <Text style={styles.menuItemText, styles.menuItemTextActive}>Exchange</Text>
                    </View>
                    }
                  </View>
            )}
            {type=='plus' && (
                      <View style={[styles.menuItem, styles.menuItemActive]}>
                        <View>
                          <Image source={require("../../../assets/icons/plus_white.png")} style={[styles.menuItemIconBig,{}]} />
                        </View>
                      </View>
                )}
    {type=='exchange' && (
            <TouchableWithoutFeedback onPress={this.togglePopup.bind(this)} style={[styles.menuItem, styles.menuItemActive]}>
              <View style={[styles.menuItem, styles.menuItemActive]}>
                <View>
                  <Image source={require("../../../assets/icons/exchange_white.png")} style={[this.state.isPopup ? styles.menuItemIconBig : styles.menuItemIcon,{}]} />
                </View>
                  {!this.state.isPopup &&
                <View>
                  <Text style={styles.menuItemText, styles.menuItemTextActive}>Exchange</Text>
                </View>
                }
              </View>
          </TouchableWithoutFeedback>
        )}
        <View style={styles.menuItem}>
          <TouchableOpacity onPress={() => this.nav('chat')}>
            <View>
              <Image source={require("../../../assets/icons/chat_icon.png")} style={[styles.menuItemIcon,{}]} />
            </View>
            <View>
              <Text style={styles.menuItemText}>Chat</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.menuItem]}>
          <TouchableOpacity onPress={() => this.nav('settings')}>
            <View>
              <Image source={require("../../../assets/icons/settings_icon.png")} style={[styles.menuItemIcon,{}]} />
            </View>
            <View>
              <Text style={styles.menuItemText}>Settings</Text>
            </View>
        </TouchableOpacity>
        </View>
      </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state
  return {
    auth
  }
}

export default connect(mapStateToProps,
    (dispatch) => ({
      actions: bindActionCreators({...authActions}, dispatch),
    })
)(BottomMenu);
