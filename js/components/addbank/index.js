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
import CheckBox from 'react-native-check-box'

import api from '../../util/api';
import language from '../../util/language';
import styles from "../styles";

import BottomMenu from '../bottommenu'

import * as authActions from '../../actions/auth';

class AddBank extends Component {
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
      password:'',
      password2:'',
      name:'',
      surname:'',
      cpf:'',
      open: false,
      connected: false,
      error:'',
      isModal: false,
      checked:false,
      val1:'CBAEURSYJSDYQJ',
      val2:'EE957700771001355096',
      val3:'Coinbase UK, Ltd.',
      val4:'Estonia',
      val5:'$ 80,00',
      val6:'Tartu mnt 2, 10145 Tallinn, Estonia',
      val7:'9th Floor, 107 Cheapside, London, EC2V 6DN, United Kingdom',
      val8:'AS LHV Pank',
      val9:'LHVBEE22',


		};

	}

  _toggleModal = () =>
    this.setState({ isModal: !this.state.isModal });

  componentDidMount(){
    StatusBar.setHidden(true, 'none');
  }


registration(){
  api.RegUser(this.state).then((res)=>{
    let isLoggedIn = false
    if (typeof res.id !== 'undefined'){
        user_info = res.user_info;
        this.props.actions.login(user_info);
        isLoggedIn = true
        Actions.coins()

    } else {
      this.setState({'error':language.get(res.error),'isModal':true})
    }
  })
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

  onClick(checked) {
        checked = !checked;
        this.setState({'checked':checked})
  }

  componentWillReceiveProps (nextProps) {

	}

  render() {

    const {auth} = this.props

    return (
        <View style={styles.white}>
          <View style={styles.headerBigBlock}>
            <View style={styles.rows}>
              <TouchableOpacity onPress={Actions.pop}>
                <Image source={require('../../../assets/icons/arrow_left.png')} style={styles.topRightIcon} />
              </TouchableOpacity>
            </View>
            <View style={[styles.headerBigBlockTitle,{marginTop:-12}]}>
              <Text style={styles.headerBigBlockText}>CONNECT YOUR</Text>
              <Text style={styles.headerBigBlockText}>BANK ACCOUNT</Text>
            </View>
            <View style={{width:50}}>
            </View>


          </View>
          <View style={styles.content}>
            <ScrollView>
              <View style={styles.blockMargin}>
                <Text style={styles.titleBlue}>Connect your bank account</Text>
                <Text style={styles.textBlue}>To verify your bank account, please send a small, $1 SEPA payment to the following account. Once complete, you'll be able to quickly withdraw funds.</Text>
              </View>
              <View style={{height:20}}></View>
                <View style={styles.blockRounded}>
                  <View style={styles.blockRoundedLeft}>
                    <Text style={styles.blockRoundedTitle}>Reference Number</Text>
                    <TextInput
                      style={styles.blockRoundedValue}
                      onChangeText={(val1) => this.setState({val1})}
                      value={this.state.val1}
                      underlineColorAndroid='rgba(0,0,0,0)'
                    />
                    <Text style={styles.blockRoundedComment}>This must be included exactly for your deposit to succeed</Text>
                  </View>
                  <Image source={require('../../../assets/icons/settings8.png')} style={styles.blockRoundedIcon} />
                </View>
                <View style={styles.blockRounded}>
                  <View style={styles.blockRoundedLeft}>
                    <Text style={styles.blockRoundedTitle}>Recipient's IBAN</Text>
                    <TextInput
                      style={styles.blockRoundedValue}
                      onChangeText={(val2) => this.setState({val2})}
                      value={this.state.val2}
                      underlineColorAndroid='rgba(0,0,0,0)'
                    />
                  </View>
                  <Image source={require('../../../assets/icons/settings8.png')} style={styles.blockRoundedIcon} />
                </View>
                <View style={styles.blockRounded}>
                  <View style={styles.blockRoundedLeft}>
                    <Text style={styles.blockRoundedTitle}>Recipient Name</Text>
                      <TextInput
                        style={styles.blockRoundedValue}
                        onChangeText={(val3) => this.setState({val3})}
                        value={this.state.val3}
                        underlineColorAndroid='rgba(0,0,0,0)'
                      />
                  </View>
                  <Image source={require('../../../assets/icons/settings8.png')} style={styles.blockRoundedIcon} />
                </View>
                <View style={styles.blockRounded}>
                  <View style={styles.blockRoundedLeft}>
                    <Text style={styles.blockRoundedTitle}>Bank Country</Text>
                      <TextInput
                        style={styles.blockRoundedValue}
                        onChangeText={(val4) => this.setState({val4})}
                        value={this.state.val4}
                        underlineColorAndroid='rgba(0,0,0,0)'
                      />
                  </View>
                  <Image source={require('../../../assets/icons/settings8.png')} style={styles.blockRoundedIcon} />
                </View>
            <View style={styles.blockRounded}>
              <View style={styles.blockRoundedLeft}>
                <Text style={styles.blockRoundedTitle}>Amount</Text>
                  <TextInput
                    style={styles.blockRoundedValue}
                    onChangeText={(val5) => this.setState({val5})}
                    value={this.state.val5}
                    underlineColorAndroid='rgba(0,0,0,0)'
                  />
              </View>
              <Image source={require('../../../assets/icons/settings8.png')} style={styles.blockRoundedIcon} />
            </View>
            <View style={styles.blockRounded}>
              <View style={styles.blockRoundedLeft}>
                <Text style={styles.blockRoundedTitle}>Bank Address</Text>
                  <TextInput
                    style={styles.blockRoundedValue}
                    onChangeText={(val6) => this.setState({val6})}
                    value={this.state.val6}
                    underlineColorAndroid='rgba(0,0,0,0)'
                  />
              </View>
              <Image source={require('../../../assets/icons/settings8.png')} style={styles.blockRoundedIcon} />
            </View>
            <View style={styles.blockRounded}>
              <View style={styles.blockRoundedLeft}>
                <Text style={styles.blockRoundedTitle}>Recipient Address</Text>
                  <TextInput
                    style={styles.blockRoundedValue}
                    onChangeText={(val7) => this.setState({val7})}
                    value={this.state.val7}
                    underlineColorAndroid='rgba(0,0,0,0)'
                  />
              </View>
              <Image source={require('../../../assets/icons/settings8.png')} style={styles.blockRoundedIcon} />
            </View>
            <View style={styles.blockRounded}>
              <View style={styles.blockRoundedLeft}>
                <Text style={styles.blockRoundedTitle}>Bank Name</Text>
                  <TextInput
                    style={styles.blockRoundedValue}
                    onChangeText={(val8) => this.setState({val8})}
                    value={this.state.val8}
                    underlineColorAndroid='rgba(0,0,0,0)'
                  />
              </View>
              <Image source={require('../../../assets/icons/settings8.png')} style={styles.blockRoundedIcon} />
            </View>
            <View style={styles.blockRounded}>
              <View style={styles.blockRoundedLeft}>
                <Text style={styles.blockRoundedTitle}>SWIFT / BIC</Text>
                  <TextInput
                    style={styles.blockRoundedValue}
                    onChangeText={(val9) => this.setState({val9})}
                    value={this.state.val9}
                    underlineColorAndroid='rgba(0,0,0,0)'
                  />
              </View>
              <Image source={require('../../../assets/icons/settings8.png')} style={styles.blockRoundedIcon} />
            </View>
            <View style={styles.blockMargin}>
              <CheckBox
                onClick={()=>this.onClick(this.state.checked)}
                isChecked={this.state.checked}
                rightTextView={<Text style={[styles.textBlue,{marginLeft:10}]}>I copied my Rerence number</Text>}
                checkedImage={<Image source={require('../../../assets/icons/checkbox2.png')} style={{width:20/34*32, height:20}}/>}
                unCheckedImage={<Image source={require('../../../assets/icons/checkbox1.png')} style={{width:20, height:20}}/>}
              />
            </View>
            <TouchableOpacity onPress={() => Actions.accounts()}>
              <View style={[styles.button, styles.bigButtonLight]}>
                <Text style={styles.bigButtonLightText}>I've sent it</Text>
              </View>
            </TouchableOpacity>
            <View style={{height:50}}></View>

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
)(AddBank);
