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

class Accounts extends Component {
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
      accounts:[]
		};

	}

  _toggleModal = () =>
    this.setState({ isModal: !this.state.isModal });

  componentDidMount(){
    StatusBar.setHidden(true, 'none');
  }

  componentWillMount(){
    const {auth} = this.props
    api.payment_list({
      'token':auth.token
    }).then((res)=>{
      if (res.success == true){
          accounts = res.accounts;
          this.setState({accounts:accounts})
      } else {
      }
    })
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
              <Text style={styles.headerBigBlockText}>ACCOUNTS</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => Actions.push("addaccount")}>
                <Image source={require('../../../assets/icons/plus.png')} style={styles.topRightIcon} />
              </TouchableOpacity>
            </View>

          </View>
          <View style={styles.content}>
            <ScrollView>
              <Image source={require('../../../assets/icons/settings12.png')} style={styles.accountCardIcon} />
              <Image source={require('../../../assets/icons/settings15.png')} style={styles.accountCardIcon} />
              <Image source={require('../../../assets/icons/settings12.png')} style={styles.accountCardIcon} />
              <Image source={require('../../../assets/icons/settings15.png')} style={styles.accountCardIcon} />

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
)(Accounts);
