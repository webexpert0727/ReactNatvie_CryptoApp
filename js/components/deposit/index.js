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

class Deposit extends Component {
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
      address:'',
      qr:''
		};

	}

  _toggleModal = () =>
    this.setState({ isModal: !this.state.isModal });

  componentDidMount(){
    StatusBar.setHidden(true, 'none');
  }

  componentWillMount(){
    const {auth} = this.props

    api.wallet_deposit({
      'token':auth.token,
      "symbol": "eth"
    }).then((res)=>{
      if (res.success == true){
          this.setState({address:res.address, qr:res.qr})
      }
    })

	}

  componentWillReceiveProps (nextProps) {

	}

  render() {

    const {auth} = this.props

    const coinname = 'ETH'

    const {qr, address} = this.state

    return (
        <View style={styles.white}>
          <View style={styles.headerBigBlock}>
            <View style={styles.rows}>
              <TouchableOpacity onPress={() => Actions.pop()}>
                <Image source={require('../../../assets/icons/arrow_left.png')} style={[styles.topRightIcon,{resizeMode:'contain'}]} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerBigBlockTitle}>
              <Text style={styles.headerBigBlockText}>DEPOSIT</Text>
            </View>
            <View style={{width:50}}>
            </View>
          </View>
          <View style={[styles.content,{marginTop:1}]}>
              <View style={styles.depositBlock}>
                  <Image source={{uri: qr}} style={[styles.qrCodeIcon]} />
                  <Text style={styles.depositName}>{coinname}</Text>
                  <Text style={styles.depositAddressTitle}>ADDRESS</Text>
                  <Text style={styles.depositAddress}>{address}</Text>
                  <View style={styles.depositLine}></View>
              </View>
              <View style={styles.buttonBlock}>
                  <TouchableOpacity onPress={() => Actions.prices()}  style={styles.buttonBuySell}>
                    <Text style={styles.buttonBuySellText}>SHARE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Actions.prices()}  style={styles.buttonBuySell}>
                    <Text style={styles.buttonBuySellText}>COPY</Text>
                  </TouchableOpacity>
              </View>
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
)(Deposit);
