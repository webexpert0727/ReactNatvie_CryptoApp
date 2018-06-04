import React, { Component } from "react";
import { login } from '../../actions/auth';
import { Actions } from 'react-native-router-flux';
import {
  Text, View, Image,TouchableHighlight,Platform,StyleSheet,TextInput,TouchableOpacity,StatusBar,ScrollView,
  BackHandler

} from "react-native";

import Modal from "react-native-modal";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'; 
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import api from '../../util/api';
import language from '../../util/language';
import styles from "../styles";

import BottomMenu from '../bottommenu'

import * as authActions from '../../actions/auth';

class AddCard extends Component {
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
      card_holder_name:'',
      expiring:'',
      cardnumber:'',
      cvv:'',
      billing_address:'',
      open: false,
      connected: false,
      error:'',
      isModal: false,

		};

	}

  _toggleModal = () =>
    this.setState({ isModal: !this.state.isModal });

  componentDidMount(){
    StatusBar.setHidden(true, 'none');
  }

  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
        Actions.settings();
        return true;
    });
	}

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', function() {
        Actions.settings();
        return true;
    });
  }


  componentWillReceiveProps (nextProps) {

	}

  addCard = () => {
    const {auth} = this.props
    const {card_holder_name, expiring, cardnumber,cvv,billing_address} = this.state

    api.payment_add({
      user_id:auth.user.id,
      account:[
        "card_holder_name":card_holder_name,
        "expiring":expiring,
        "number":cardnumber,
        "cvv":cvv,
        "billing_address":billing_address,
      ]
    }).then((res)=>{
      if (res.success == true){
          Actions.prices()
      } else {
      }
    })
  }

  render() {

    const {auth} = this.props

    return (
        <View style={styles.white}>
          <View style={styles.headerBigBlock}>
            <View style={styles.rows}>
              <TouchableOpacity onPress={()=>Actions.settings()}>
                <Image source={require('../../../assets/icons/arrow_left.png')} style={styles.topRightIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerBigBlockTitle}>
              <Text style={styles.headerBigBlockText}>ADD CARD</Text>
            </View>
            <View style={{width:50}}>
            </View>


          </View>
          <View style={styles.content}>
            <ScrollView>

            <View style={styles.blockRounded}>
              <TextInput
                style={styles.cardInput}
                onChangeText={(card_holder_name) => this.setState({card_holder_name})}
                value={this.state.card_holder_name}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Full name"
              />
            </View>
            <View style={[styles.blockRounded, {justifyContent:'space-between'}]}>
              <TextInput
                style={styles.cardInput}
                onChangeText={(cardnumber) => this.setState({cardnumber})}
                value={this.state.cardnumber}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Card number"
              />
            <Image source={require('../../../assets/icons/settings9.png')} style={[styles.topRightIcon,{marginTop:8,width:30, height:30/49*37}]} />
            </View>
            <View style={{flexDirection:'row'}}>
            <View style={[styles.blockRounded,{width:100}]}>
              <TextInput
                style={styles.cardInputShort}
                onChangeText={(expiring) => this.setState({expiring})}
                value={this.state.expiring}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="MM/YY"
              />
            </View>
            <View style={[styles.blockRounded,{paddingBottom:10,paddingTop:10, width:100, marginLeft:10}]}>
              <TextInput
                style={styles.cardInputShort}
                onChangeText={(cvv) => this.setState({cvv})}
                value={this.state.cvv}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="CVV"
              />
            </View>
          </View>
            <View style={[styles.blockRounded, {justifyContent:'space-between'}]}>
              <TextInput
                style={styles.cardInput}
                onChangeText={(name) => this.setState({name})}
                value={this.state.name}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Billing Address"
              />
            <Image source={require('../../../assets/icons/arrow.png')} style={[styles.topRightIcon,{marginTop:12,width:8, height:8/14*30}]} />

            </View>

            <TouchableOpacity onPress={this.addCard}>
              <View style={[styles.bigButtonBlue]}>
                <Text style={[styles.bigButtonBlueText]}>Add Card</Text>
              </View>
            </TouchableOpacity>

{/*
              <View style={styles.settingsBlock}>
                  <View style={styles.settingsTitle}>
                    <Text style={styles.settingsTitleText}>Account</Text>
                  </View>
                  <TouchableOpacity onPress={() => Actions.alerts()} style={[styles.settingsItem, styles.settingsItemLine]}>
                    <Text style={styles.settingsItemText}>Alerts</Text>
                    <Image source={require('../../../assets/icons/arrow.png')} style={styles.miniIcon} />
                  </TouchableOpacity>
                  <View style={[styles.settingsItem, styles.settingsItemLine]}>
                    <Text style={styles.settingsItemText}>Currency</Text>
                    <Image source={require('../../../assets/icons/arrow.png')} style={styles.miniIcon} />
                  </View>
                  <View style={[styles.settingsItem, styles.settingsItemLine]}>
                    <Text style={styles.settingsItemText}>Country</Text>
                    <Image source={require('../../../assets/icons/arrow.png')} style={styles.miniIcon} />
                  </View>
                  <View style={styles.settingsItem}>
                    <Text style={styles.settingsItemText}>Phone</Text>
                    <Image source={require('../../../assets/icons/arrow.png')} style={styles.miniIcon} />
                  </View>
              </View>
*/}
{/*              <View style={styles.settingsBlock}>
                  <View style={styles.settingsTitle}>
                    <Text style={styles.settingsTitleText}>Verification</Text>
                  </View>
                  <TouchableOpacity onPress={() => Actions.verification()} style={[styles.settingsItem, styles.settingsItemLine]}>
                    <Text style={styles.settingsItemText}>Security</Text>
                    <Image source={require('../../../assets/icons/arrow.png')} style={styles.miniIcon} />
                  </TouchableOpacity>
                  <View style={[styles.settingsItem, styles.settingsItemLine]}>
                    <Text style={styles.settingsItemText}>Security</Text>
                    <Image source={require('../../../assets/icons/arrow.png')} style={styles.miniIcon} />
                  </View>
                  <View style={[styles.settingsItem, styles.settingsItemLine]}>
                    <Text style={styles.settingsItemText}>Security</Text>
                    <Image source={require('../../../assets/icons/arrow.png')} style={styles.miniIcon} />
                  </View>
                  <View style={[styles.settingsItem, styles.settingsItemLine]}>
                    <Text style={styles.settingsItemText}>Security</Text>
                    <Image source={require('../../../assets/icons/arrow.png')} style={styles.miniIcon} />
                  </View>
                  <View style={[styles.settingsItem, styles.settingsItemLine]}>
                    <Text style={styles.settingsItemText}>Security</Text>
                    <Image source={require('../../../assets/icons/arrow.png')} style={styles.miniIcon} />
                  </View>
                  <View style={[styles.settingsItem, styles.settingsItemLine]}>
                    <Text style={styles.settingsItemText}>Security</Text>
                    <Image source={require('../../../assets/icons/arrow.png')} style={styles.miniIcon} />
                  </View>
              </View>
*/}

<View style={{height:50}}></View>

            </ScrollView>
          </View>

          <BottomMenu />
          <View style={styles.menuline}></View>
        </View>
    );
  }
}
/*


*/
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
)(AddCard);
