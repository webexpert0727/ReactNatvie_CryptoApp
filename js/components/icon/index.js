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

class Icon extends Component {
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
  api.AuthUser(this.state.email, this.state.pass).then((res)=>{
    let isLoggedIn = false
    if (typeof res.id !== 'undefined'){
        user_info = res.user_info;
        this.props.actions.login(user_info);
        isLoggedIn = true

        Actions.reset('drawer')
    } else {
      this.setState({'error':language.get(res.error),'isModal':true})
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
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={styles.form}>
            <View>
              <Icon name="email" />
              <TextInput
                style={styles.textInput}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
                keyboardType="email-address"
              />
            </View>
              <View>
                <Icon name="password" />
                <TextInput
                  style={styles.textInput}
                  onChangeText={(pass) => this.setState({pass})}
                  value={this.state.pass}
                  secureTextEntry={true}
                />
            </View>
          </View>

            <TouchableOpacity onPress={() => Actions.prices()}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>SIGN IN</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.registration()}>
                <Text style={styles.buttonText}>Forgot your password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.registration()}>
                <Text style={styles.buttonText}>Don't have an accoutn? Create one</Text>
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
)(Icon);
