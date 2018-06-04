import React, { Component } from "react";
import { login } from '../../actions/auth';
import { Actions } from 'react-native-router-flux';
import {
  Text, View, Image,TouchableHighlight,Platform,StyleSheet,TextInput,TouchableOpacity,StatusBar,ScrollView
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

class Settings extends Component {
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

		};

	}

  _toggleModal = () =>
    this.setState({ isModal: !this.state.isModal });

  componentDidMount(){
    StatusBar.setHidden(true, 'none');
  }

  componentWillMount(){
    const {auth} = this.props
    if (!auth.isLoggedIn) {
      Actions.auth()
    }
	}

  componentWillReceiveProps (nextProps) {

	}


  logout(){
    this.props.actions.logout();
    Actions.prices()
  }


  render() {

    const {auth} = this.props

console.log(auth);
    return (
        <View style={styles.white}>
          <View style={styles.headerBigBlock}>
            <View style={styles.headerBigBlockTitle}>
              <Text style={styles.headerBigBlockText}>SETTINGS</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => this.logout()}>
                <Image source={require('../../../assets/icons/logout.png')} style={styles.topRightIcon} />
              </TouchableOpacity>
            </View>

          </View>
          <View style={styles.content}>
            <ScrollView>
              <View style={[styles.blockRounded,{alignItems:'center'}]}>
                  <TouchableOpacity onPress={() => Actions.profile()} style={styles.chatIconBlock}>
                    <Image source={require('../../../assets/icons/profile.png')} style={styles.chatIcon} />
                  </TouchableOpacity>
                  <View style={[styles.chatMessageBlock,{marginTop:0}]}>
                    <Text style={styles.chatTitleText}>{auth.user.firstname} {auth.user.lastname}</Text>
                      <View style={[styles.rows]}>
                        <Image source={require('../../../assets/icons/profile_man.png')} style={[styles.settingsMiniIcon,styles.top1]} />
                        <Text style={styles.chatMessage}>{auth.user.username}</Text>
                      </View>
                    <View style={[styles.rows]}>
                      <Image source={require('../../../assets/icons/mail.png')} style={[styles.settingsMiniIcon,styles.top1]} />
                      <Text style={styles.chatMessage}>{auth.user.email}</Text>
                    </View>
                    <TouchableOpacity style={[styles.rows, styles.settingsLine ]} onPress={() => Actions.addphone()}>
                        <View style={{flexDirection:'row'}}>
                          <Image source={require('../../../assets/icons/phone.png')} style={[styles.settingsMiniIcon,styles.top1]} />
                          <Text style={styles.chatMessage}>{auth.user.phone}</Text>
                        </View>
                        <Image source={require('../../../assets/icons/edit.png')} style={[styles.editRightIcon,styles.top1]} />
                    </TouchableOpacity>
                  </View>
              </View>

            <View style={[styles.blockMargin,{flexDirection:'row',justifyContent:'space-between', marginTop:10}]}>
              <TouchableOpacity onPress={() => Actions.currencies()} style={[styles.halfBlockRounded,{justifyContent:'space-between'}]}>
                <Text style={styles.textBlue}>CURRENCY</Text>
                <Text style={styles.textBold}>{auth.user.currency}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Actions.countries()} style={[styles.halfBlockRounded,{justifyContent:'space-between'}]}>
                <Text style={styles.textBlue}>COUNTRY</Text>
                <Text style={styles.textBold}>{auth.user.country}</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.blockMargin,{flexDirection:'row',justifyContent:'space-between', marginTop:10}]}>
              <TouchableOpacity onPress={() => Actions.accounts()}  style={[styles.halfBlockRounded,{flexDirection:'column',justifyContent:'center', alignItems:'center',height:100}]}>
                <View style={{height:30,justifyContent:'flex-end', marginRight:1}}>
                  <Image source={require('../../../assets/icons/settings49.png')} style={{width:24, height:24/44*28,marginBottom:5}} />
                </View>
                <Text style={[styles.textBlue,{fontSize:16}]}>ACCOUNTS</Text>

              </TouchableOpacity>
              <TouchableOpacity onPress={() => Actions.identityverify()}  style={[styles.halfBlockRounded,{flexDirection:'column',justifyContent:'center', alignItems:'center',height:100}]}>
                <View style={{height:30,justifyContent:'flex-end', marginRight:1}}>
                  <Image source={require('../../../assets/icons/settings47.png')} style={{width:18, height:18/30*36,marginBottom:5}} />
                </View>
                <Text style={[styles.textBlue,{fontSize:16}]}>VERIFY</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.blockMargin,{flexDirection:'row',justifyContent:'space-between'}]}>
              <TouchableOpacity onPress={() => Actions.security()}  style={[styles.halfBlockRounded,{flexDirection:'column',justifyContent:'center', alignItems:'center',height:100}]}>
                <View style={{height:30,justifyContent:'flex-end', marginRight:1}}>
                  <Image source={require('../../../assets/icons/settings45.png')} style={{width:22, height:22/36*41,marginBottom:5}} />
                </View>
                <Text style={[styles.textBlue,{fontSize:16}]}>SECURITY</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Actions.alerts()}  style={[styles.halfBlockRounded,{flexDirection:'column',justifyContent:'center', alignItems:'center',height:100}]}>
                <View style={{height:30,justifyContent:'flex-end', marginRight:1}}>
                  <Image source={require('../../../assets/icons/settings43.png')} style={{width:26, height:26/53*41,marginBottom:5}} />
                </View>
                <Text style={[styles.textBlue,{fontSize:16}]}>ALERTS</Text>
              </TouchableOpacity>
            </View>
            {/*
            <TouchableOpacity onPress={() => Actions.registration()}>
              <View style={[styles.bigButtonBlue]}>
                <Text style={[styles.bigButtonBlueText]}>Sign Up</Text>
              </View>
            </TouchableOpacity>
            */}

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

<View style={{height:75}}></View>

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
)(Settings);
