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

class Passcode extends Component {
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
      passcode:''

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

  setPasscode(pass){

    var p = new String(pass)
    if (p.length == 4) {
      Actions.pop()
    }  
    this.setState({passcode:pass})
  }

  render() {

    const {auth} = this.props

    return (
      <View style={{flex:1,backgroundColor:'rgb(44,51,77)'}}>
        <View style={{flex:1,backgroundColor:'rgb(44,51,77)', justifyContent:'center', alignItems:'center'}}>
          <Text style={{color:'#fff', fontSize:54}}>COBRA</Text>
          <Text style={{color:'#fff', fontSize:16}}>Enter a new PIN</Text>
          <Image source={require('../../../assets/icons/settings4.png')} style={{width:130, height:130/243*40, marginTop:15}} />
          <TextInput
            style={{height:0, width:0}}
            onChangeText={(pass) => this.setPasscode(pass)}
            value={this.state.passcode}
            underlineColorAndroid='rgba(0,0,0,0)'
            keyboardType="numeric"
            autoFocus={true}
          />
        </View>
        <View style={{flex:1}}></View>
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
)(Passcode);
