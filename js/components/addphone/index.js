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

class AddPhone extends Component {
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
      verify:false

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
      <KeyboardAwareScrollView style={styles.global}
extraHeight={20}
        >
        <View style={styles.white}>
          <View style={styles.headerBigBlock}>
            <View style={styles.rows}>
              <TouchableOpacity onPress={Actions.pop}>
                <Image source={require('../../../assets/icons/arrow_left.png')} style={styles.topRightIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerBigBlockTitle}>
              <Text style={styles.headerBigBlockText}>ADD PHONE NUMBER</Text>
            </View>
            <View style={{width:50}}>
            </View>


          </View>
          <View style={styles.content}>
            <ScrollView>
              <View style={[styles.blockMargin, {flexDirection:'column',justifyContent:'center', alignItems:'center'}]}>
                <Image source={require('../../../assets/icons/settings21.png')} style={[styles.phoneBigIcon]} />
                <Text style={styles.titleBlue}>VERIFY YOUR PHONE NUMBER</Text>
                <Text style={styles.textBlue}>Increase account security by verifying a phone number.</Text>
              </View>
                  {!this.state.verify &&
                    <View style={[styles.blockRounded, {flexDirection:'column', marginTop:16, paddingLeft:0}]}>
                      <View style={{flexDirection:'row', justifyContent:'space-between', borderBottomWidth:1, borderBottomColor:'#929fbe', paddingBottom:20,paddingLeft:10}}>
                        <Text style={[styles.textBlue,{fontSize:18}]}>Austria</Text>
                        <Image source={require('../../../assets/icons/arrow.png')} style={[styles.topRightIcon,{width:8, height:8/14*30}]} />
                      </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:0, paddingBottom:0,paddingLeft:10}}>
                      <View style={{width:60,justifyContent:'center', alignItems:'center'}}><Text style={[styles.titleBlue,{width:50, justifyContent:'center', alignSelf:'center'}]}>+43</Text></View>
                      <TextInput
                        style={styles.phoneInput}
                        onChangeText={(email) => this.setState({email})}
                        value={this.state.email}
                        keyboardType="numeric"
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Your phone number"
                        autoFocus={true}
                      />
                  </View>
                  </View>
                }
                {this.state.verify &&
                  <View style={{flexDirection:'column', justifyContent:'space-between', }}>
                  <TextInput
                    style={styles.codeInput}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    keyboardType="numeric"
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Enter your CODE"
                    autoFocus={true}
                  />
                </View>
                }

            <TouchableOpacity onPress={() => this.setState({verify:true})}>
              <View style={[styles.bigButtonBlue, {marginTop:5}]}>
                <Text style={[styles.bigButtonBlueText]}>Next</Text>
              </View>
            </TouchableOpacity>

<View style={{height:50}}></View>

            </ScrollView>
          </View>

          <BottomMenu />
          <View style={styles.menuline}></View>
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
)(AddPhone);
