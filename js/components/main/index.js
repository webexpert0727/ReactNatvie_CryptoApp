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



class Main extends Component {
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
    Actions.prices()
  }
  componentWillMount(){
	}

  componentWillReceiveProps (nextProps) {
	}

  _toggleModal = () =>
    this.setState({ isModal: !this.state.isModal });

  render() {
    return (
        <View style={styles.container}>
          <View style={{flex:2,alignItems:'center', justifyContent:'center'}}>
            <Image source={require('../../../assets/icons/cobra-logo.png')} style={styles.logo} />
          </View>
          <View style={{flex:1}}>
            <TouchableOpacity onPress={() => Actions.auth()}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>LOGIN</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Actions.registration()}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>REGISTER</Text>
              </View>
            </TouchableOpacity>
          </View>
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
)(Main);
