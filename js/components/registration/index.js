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

import CheckBox from 'react-native-check-box'

import * as authActions from '../../actions/auth';

class Registration extends Component {
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
      name:'',
      checked:true

		};

	}

  _toggleModal = () =>
    this.setState({ isModal: !this.state.isModal });

  componentDidMount(){
    StatusBar.setHidden(true, 'none');
  }


registration(){
  console.log(
    {
        "firstname": this.state.name,
        "lastname": this.state.surname,
        "email": this.state.email,
        "password": this.state.pass
    }
  );
  api.auth_register(
    {
        "firstname": this.state.name,
        "lastname": this.state.surname,
        "email": this.state.email,
        "password": this.state.pass
    }
  ).then((res)=>{
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

	}

  componentWillReceiveProps (nextProps) {

	}
  onClick(checked) {
      checked = !checked;
      this.setState({'checked':checked})
}

  render() {

    const {auth} = this.props

    console.log(this.state.checked);

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
              <Text style={styles.title}>REGISTER</Text>
            </View>
          </View>

          <View style={styles.logoBlock}>
            <Image source={require('../../../assets/icons/cobra-logo.png')} style={styles.logo} />
          </View>
          <View style={{flex:1}}>
            <View style={styles.form}>
              <View style={styles.textInputBlock}>
                  <Image source={require('../../../assets/icons/man.png')} style={[{width:20, height:20/33*29}]} />
                  <TextInput
                    style={styles.textInput}
                    onChangeText={(name) => this.setState({name})}
                    value={this.state.name}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Firstname"
                  />
              </View>
              <View style={styles.textInputBlock}>
                <View style={[{width:20, height:20/33*29}]} ></View>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={(surname) => this.setState({surname})}
                    value={this.state.surname}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Lastname"
                  />
              </View>
              <View style={styles.textInputBlock}>
                <Image source={require('../../../assets/icons/letter.png')} style={[{width:20,height:20/43*30}]} />
                <TextInput
                  style={styles.textInput}
                  onChangeText={(email) => this.setState({email})}
                  value={this.state.email}
                  keyboardType="email-address"
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder="email@company.com"
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
              <View >
                <CheckBox
                  onClick={()=>this.onClick(this.state.checked)}
                  isChecked={this.state.checked}
                  rightTextView={<View style={styles.certifyBlock}><Text style={styles.certifyText}>I certify that I am 18 years of age or older, and I agree to the <Text style={styles.underlineText}>User Agreement</Text> or <Text style={styles.underlineText}>Privacy Policy.</Text></Text></View>}
                  checkedImage={<Image source={require('../../../assets/icons/checkbox2.png')} style={{width:20/34*32, height:20}}/>}
                  unCheckedImage={<Image source={require('../../../assets/icons/checkbox1.png')} style={{width:20, height:20}}/>}
                />
              </View>
            </View>
            <TouchableOpacity onPress={() => this.registration()}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>REGISTER</Text>
              </View>
            </TouchableOpacity>
          </View>
            <TouchableOpacity onPress={() => Actions.auth()}>
              <View style={styles.bottomTextBlock}>
                <Text style={styles.text}>Have an account?</Text>
                <Text style={[styles.text, styles.strong]}> Sign in</Text>
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
)(Registration);
