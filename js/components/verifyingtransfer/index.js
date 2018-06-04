import React, { Component } from "react";
import { login } from '../../actions/auth';
import { Actions } from 'react-native-router-flux';
import {
  TouchableWithoutFeedback,Text, View, Image,TouchableHighlight,Platform,StyleSheet,TextInput,TouchableOpacity,StatusBar,ScrollView
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

class VerifyingTransfer extends Component {
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

	}

  componentWillReceiveProps (nextProps) {

	}

  render() {

    const {auth} = this.props

    return (
        <View style={styles.white}>
          <View style={styles.headerBigBlock}>
            <View style={styles.rows}>
              <TouchableOpacity onPress={() => Actions.pop()}>
                <Image source={require('../../../assets/icons/settings6.png')} style={[styles.topRightIcon,{width:18, height:18, top:4}]} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerBigBlockTitle}>
              <Text style={styles.headerBigBlockText}>VERIFYING YOUR TRANSFER</Text>
            </View>
            <View style={{width:50}}>
            </View>
          </View>
          <View style={styles.content}>
            <ScrollView>
              <View style={[styles.blockMargin, {flexDirection:'column',justifyContent:'center', alignItems:'center'}]}>
                <Image source={require('../../../assets/icons/wallets3.png')} style={[styles.verIconClock]} />
                <Text style={styles.titleBlue}>We're waiting for funds to arrive</Text>
                <Text style={styles.textBlue}>SEPA tranfers generally take 2-3 business days.</Text>
                <Text style={[styles.textBlue,{alignSelf:'center'}]}>To avoid any delays, please double check that you </Text>
                <Text style={styles.textBlue}>included your reference number</Text>
              </View>
              <TouchableOpacity onPress={() => Actions.eurowallet()}>
                <View style={[styles.bigButtonBlue, {marginBottom:10, marginTop:20}]}>
                  <Text style={[styles.bigButtonBlueText]}>Okay</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Actions.pop()} style={[styles.blockMargin, {flexDirection:'column',justifyContent:'center', alignItems:'center'}]}>
                <Text style={styles.titleBlue}>See instructions</Text>
                </TouchableOpacity>
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
)(VerifyingTransfer);
