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

import * as authActions from '../../actions/auth';

class Forgot extends Component {
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
      name:''

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
      <KeyboardAwareScrollView style={styles.global}>
        <View style={styles.container}>
          <View style={styles.headerBlock}>
            <View style={styles.headerIconBlock}>
              <TouchableOpacity onPress={() => Actions.pop()}>
                <Image source={require('../../../assets/icons/arrow-left.png')} style={styles.arrow} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerTitleBlock}>
              <Text style={styles.title}>FORGOT PASSWORD</Text>
            </View>
          </View>

          <View style={{flex:1, marginTop:100}}>
            <View style={styles.form}>
              <Text style={[styles.title,{fontWeight:'bold', alignSelf:'center'}]}>FORGOT PASSWORD</Text>
              <Text style={[styles.title,{fontSize:12, alignSelf:'center', marginTop:10, marginBottom:15}]}>Enter your email address to reqest a password reset</Text>
              <View style={[styles.textInputBlock,{backgroundColor:'#fff', borderRadius:10, paddingTop:10, paddingBottom:10, height:50}]}>
                <Image source={require('../../../assets/icons/mail.png')} style={[{width:20,height:20/43*30, marginLeft:15}]} />
                <TextInput
                  style={[styles.textInput,{color:'rgb(44,51,77)', marginLeft:-15}]}
                  onChangeText={(email) => this.setState({email})}
                  value={this.state.email}
                  keyboardType="email-address"
                  underlineColorAndroid='rgba(0,0,0,0)'
                />
              </View>
            </View>
            <TouchableOpacity onPress={() => Actions.prices()}>
              <View style={[styles.button,{backgroundColor:'rgb(44,51,77)'}]}>
                <Text style={[styles.buttonText,{color:'#fff'}]}>RESET PASSWORD</Text>
              </View>
            </TouchableOpacity>
          </View>
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
)(Forgot);
