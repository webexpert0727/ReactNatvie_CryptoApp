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

class AddAccount extends Component {
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
              <Text style={styles.headerBigBlockText}>ADD ACCOUNT</Text>
            </View>
            <View style={{width:50}}>
            </View>
          </View>
          <View style={styles.content}>
            <ScrollView>
              <TouchableOpacity onPress={() => Actions.addcard()} style={styles.blockRounded}>
                <View style={styles.accountLeft}>
                  <Image source={require('../../../assets/icons/wallet-icon.png')} style={[styles.accountLeftIcon,{width:16/22*35, height:16,marginTop:11}]} />
                  <View style={styles.accountCenter}>
                    <Text style={styles.accountCartTitle}>Credit/Debit Card</Text>
                    <Text style={styles.accountCartShort}>Invest small amounts</Text>
                    <Text style={styles.accountCartLong}>Use any Vise or Mastercard to make investments. Add a bank or wallet to sell.</Text>
                  </View>
                </View>
                <Image source={require('../../../assets/icons/arrow.png')} style={styles.accountRightIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Actions.addbank()} style={styles.blockRounded}>
                <View style={styles.accountLeft}>
                  <Image source={require('../../../assets/icons/settings10.png')} style={[styles.accountLeftIcon,{width:20/31*36, height:20,marginTop:7}]} />
                  <View style={styles.accountCenter}>
                    <Text style={styles.accountCartTitle}>Bank Account</Text>
                    <Text style={styles.accountCartShort}>Invest large amounts</Text>
                    <Text style={styles.accountCartLong}>Add any bank account that can make and accept SEPA payments. Once completed, you can instantly buy and sell.</Text>
                  </View>
                </View>
                <Image source={require('../../../assets/icons/arrow.png')} style={styles.accountRightIcon} />
              </TouchableOpacity>



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
)(AddAccount);
