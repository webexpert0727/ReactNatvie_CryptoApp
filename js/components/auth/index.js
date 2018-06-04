import React, { Component } from "react";

import { Actions } from 'react-native-router-flux';

import { login } from '../../actions/auth';

import Modal from "react-native-modal";

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
  StatusBar
} from "react-native";

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


const window = Dimensions.get('window');
import api from '../../util/api';
import language from '../../util/language';

import styles from "../styles";

import * as authActions from '../../actions/auth';

class Auth extends Component {
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
      isModal: false,
		};

	}
  componentDidMount(){
    StatusBar.setHidden(true, 'none');
  }
  login(){
    console.log('login');
    api.auth_login({email:this.state.email, password:this.state.pass}).then((res)=>{
      console.log(res);
      if (res.success == true){
          user_info = res.user[0];
          token = res.token;
          this.props.actions.login(user_info, token);
          Actions.prices()
      } else {
      }
    })
  }

  componentWillMount(){
//    this.update()
	}

  componentWillReceiveProps (nextProps) {
	}

  _toggleModal = () =>
    this.setState({ isModal: !this.state.isModal });

  render() {
    return (
      <KeyboardAwareScrollView style={styles.global}>
        <View style={styles.container}>
          <View style={styles.headerBlock}>
            <View style={styles.headerIconBlock}>
              <TouchableOpacity onPress={() => Actions.pop()}>
                <Image source={require('../../../assets/icons/arrow-left.png')} style={styles.arrow} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerTitleBlock}>
              <Text style={styles.title}>LOGIN</Text>
            </View>
          </View>
          <View style={styles.logoBlock}>
            <Image source={require('../../../assets/icons/cobra-logo.png')} style={styles.logo} />
          </View>
          <View style={{flex:1}}>
            <View style={styles.form}>
              <View style={styles.textInputBlock}>
                <Image source={require('../../../assets/icons/letter.png')} style={[{width:20,height:20/43*30}]} />
                <TextInput
                  style={styles.textInput}
                  onChangeText={(email) => this.setState({email})}
                  value={this.state.email}
                  keyboardType="email-address"
                  underlineColorAndroid='rgba(0,0,0,0)'
                />
              </View>
              <View style={styles.textInputBlock}>
                  <Image source={require('../../../assets/icons/lock.png')} style={[{width:20/37*32,height:20}]} />
                  <TextInput
                    style={styles.textInput}
                    onChangeText={(pass) => this.setState({pass})}
                    value={this.state.pass}
                    secureTextEntry={true}
                    underlineColorAndroid='rgba(0,0,0,0)'
                  />
              </View>
            </View>

            <TouchableOpacity onPress={() => this.login()}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>SIGN IN</Text>
              </View>
            </TouchableOpacity>
          <View style={styles.center}>
            <TouchableOpacity onPress={() => Actions.forgot()}>
                <Text style={styles.text}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>
        </View>
          <TouchableOpacity onPress={() => Actions.registration()}>
            <View style={styles.bottomTextBlock}>
              <Text style={styles.text}>Don't have an account?</Text>
              <Text style={[styles.text, styles.strong]}> Create one</Text>
            </View>
          </TouchableOpacity>
        </View>

      </KeyboardAwareScrollView>
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
)(Auth);
