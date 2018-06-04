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

class Profile extends Component {
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
      showChart:false

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
            <View style={styles.headerBigBlockTitle}>
              <Text style={styles.headerBigBlockText}>PROFILE</Text>
            </View>
            <View style={{width:50}}>
            </View>
          </View>
          <View style={styles.content}>
            <ScrollView>
              <View style={styles.blockRounded}>
                  <View style={styles.chatIconBlock}>
                    <Image source={require('../../../assets/icons/profile.png')} style={styles.chatIcon} />
                  </View>
                  <View style={styles.chatMessageBlock}>
                    <Text style={styles.chatTitleText}>{auth.user.firstname} {auth.user.lastname}</Text>
                      <View style={[styles.rows]}>
                        <Image source={require('../../../assets/icons/profile_man.png')} style={[styles.settingsMiniIcon,styles.top1]} />
                        <Text style={styles.chatMessage}>{auth.user.username}</Text>
                      </View>
                    <View style={[styles.rows]}>
                      <Image source={require('../../../assets/icons/mail.png')} style={[styles.settingsMiniIcon,styles.top1]} />
                      <Text style={styles.chatMessage}>{auth.user.email}</Text>
                    </View>
                    <View style={[styles.rows, styles.settingsLine ]}>
                      <View style={{flexDirection:'row'}}>
                      <Image source={require('../../../assets/icons/phone.png')} style={[styles.settingsMiniIcon,styles.top1]} />
                      <Text style={styles.chatMessage}>{auth.user.phone}</Text>
                      </View>
                      <TouchableOpacity onPress={() => Actions.addphone()}>
                        <Image source={require('../../../assets/icons/edit.png')} style={[styles.editRightIcon,styles.top1]} />
                        </TouchableOpacity>
                    </View>
                  </View>
              </View>

              <View style={[styles.blockMargin,{flexDirection:'row',justifyContent:'space-between', marginTop:0}]}>
                <TouchableOpacity onPress={() => Actions.currencies()} style={[styles.halfBlockRounded,{justifyContent:'space-between'}]}>
                  <Text style={styles.textBlue}>CURRENCY</Text>
                  <Text style={styles.textBold}>EUR</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Actions.currencies()} style={[styles.halfBlockRounded,{justifyContent:'space-between'}]}>
                  <Text style={styles.textBlue}>COUNTRY</Text>
                  <Text style={styles.textBold}>AUT</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.blockMargin,{marginTop:10,marginBottom:20}]}>
                <View style={[styles.profileTitles,styles.rows]}>
                  <Text style={[styles.profileTitlesText,{fontWeight:'bold'}]}>MARKET</Text>
                  <Text style={styles.profileTitlesText}>TOP 5</Text>
                </View>
                  {this.state.showChart &&
                    <View style={[styles.profileContent,styles.rows, {marginLeft:-16}]}>
                      <Image source={require('../../../assets/icons/settings36.png')} style={[styles.profileChart]} />
                    </View>
                  }
                  {!this.state.showChart &&
                    <View style={[styles.profileContent,styles.rows]}>
                  <Image source={require('../../../assets/icons/circle5.png')} style={[styles.profileCircleIcon]} />
                  <View style={styles.topList}>
                    <View style={styles.topLine}>
                        <View style={[styles.topIcon,styles.topIcon1]}></View>
                        <Text style={styles.topLineText}>0,50304048 COIN</Text>
                    </View>
                    <View style={styles.topLine}>
                        <View style={[styles.topIcon,styles.topIcon2]}></View>
                        <Text style={styles.topLineText}>0,68235087 COIN</Text>
                    </View>
                    <View style={styles.topLine}>
                        <View style={[styles.topIcon,styles.topIcon3]}></View>
                        <Text style={styles.topLineText}>1,42644342 COIN</Text>
                    </View>
                  </View>
                </View>
                }
                  </View>
                <View style={[styles.blockRounded, styles.profilePeriods]}>
                  <Text style={styles.profilePeriodText}>1D</Text>
                  <TouchableOpacity onPress={()=>this.setState({'showChart':true})}>
                    <Text style={[styles.profilePeriodText,this.state.showChart ? styles.profilePeriodTextActive : styles.profilePeriodText0]}>1W</Text>
                  </TouchableOpacity>
                  <Text style={styles.profilePeriodText}>1M</Text>
                  <Text style={styles.profilePeriodText}>3M</Text>
                  <Text style={styles.profilePeriodText}>1Y</Text>
                  <Text style={styles.profilePeriodText}>ALL</Text>
                </View>

                <View style={[styles.blockMargin,{marginTop:-10}]}>
                  <View style={styles.profilePercents}>
                    <View style={styles.profilePercentColumn}>
                      <Text style={styles.profilePercentText}>+ 57,7<Text style={styles.profilePercentSymbol}>%</Text></Text>
                      <Text style={styles.profilePercentComment}>Wallet</Text>
                      <Image source={require('../../../assets/icons/line5_1.png')} style={[styles.profilePercentIcon]} />
                    </View>
                    <View style={[styles.profilePercentColumn,{borderLeftWidth:1, borderLeftColor:'#929fbe'}]}>
                      <Text style={styles.profilePercentText}>+ 24,3<Text style={styles.profilePercentSymbol}>%</Text></Text>
                      <Text style={styles.profilePercentComment}>Market</Text>
                      <Image source={require('../../../assets/icons/line5_2.png')} style={[styles.profilePercentIcon]} />
                    </View>
                  </View>
                </View>

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
)(Profile);
