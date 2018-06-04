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

class IdentityVerify extends Component {
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
              <TouchableOpacity onPress={Actions.pop}>
                <Image source={require('../../../assets/icons/arrow_left.png')} style={styles.topRightIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerBigBlockTitle}>
              <Text style={styles.headerBigBlockText}>IDENTITY VERIFY</Text>
            </View>
            <TouchableOpacity onPress={()=>Actions.verification()} style={styles.headerBigBlockTitleRight}>
              <Text  style={styles.headerBigBlockTitleRightText}>Continue</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <ScrollView>
              <View style={styles.blockMargin}>
                <Text style={[styles.textBlue, {paddingHorizontal:15}]}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat....</Text>
              </View>

              <View style={[styles.blockRounded, {flexDirection:'column', marginTop:20}]}>
                <TextInput
                  style={styles.verifyTextInput}
                  onChangeText={(name) => this.setState({name})}
                  value={this.state.name}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder="Firstame"
                />
                <View style={styles.verifyLine}></View>
                  <TextInput
                    style={styles.verifyTextInput}
                    onChangeText={(name) => this.setState({name})}
                    value={this.state.name}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Surname"
                  />
                  <View style={styles.verifyLine}></View>
                    <TextInput
                      style={styles.verifyTextInput}
                      onChangeText={(name) => this.setState({name})}
                      value={this.state.name}
                      underlineColorAndroid='rgba(0,0,0,0)'
                      placeholder="Date of Birth"
                    />
                    <View style={styles.verifyLine}></View>
                      <TextInput
                        style={styles.verifyTextInput}
                        onChangeText={(name) => this.setState({name})}
                        value={this.state.name}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Street"
                      />
                      <View style={styles.verifyLine}></View>
                        <TextInput
                          style={styles.verifyTextInput}
                          onChangeText={(name) => this.setState({name})}
                          value={this.state.name}
                          underlineColorAndroid='rgba(0,0,0,0)'
                          placeholder="Unit #"
                        />
                        <View style={styles.verifyLine}></View>
                            <TextInput
                              style={styles.verifyTextInput}
                              onChangeText={(name) => this.setState({name})}
                              value={this.state.name}
                              underlineColorAndroid='rgba(0,0,0,0)'
                              placeholder="City/Town"
                            />
                              <View style={styles.verifyLine}></View>
                              <View style={{flexDirection:'row'}}>
                                <TextInput
                                  style={styles.verifyShortTextInput}
                                  onChangeText={(name) => this.setState({name})}
                                  value={this.state.name}
                                  underlineColorAndroid='rgba(0,0,0,0)'
                                  placeholder="State (e.g CA)"
                                />
                                <TextInput
                                  style={styles.verifyShortTextInput}
                                  onChangeText={(name) => this.setState({name})}
                                  value={this.state.name}
                                  underlineColorAndroid='rgba(0,0,0,0)'
                                  placeholder="Zip"
                                />
                            </View>
                                <View style={styles.verifyLine}></View>
                                  <TextInput
                                    style={styles.verifyTextInput}
                                    onChangeText={(name) => this.setState({name})}
                                    value={this.state.name}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    placeholder="Last 4 digits of SSN"
                                  />
                                  <View style={styles.verifyLine}></View>
                                      <TextInput
                                        style={styles.verifyTextInput}
                                        onChangeText={(name) => this.setState({name})}
                                        value={this.state.name}
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                        placeholder="What do you use Coinbase for?"
                                      />
                                      <View style={styles.verifyLine}></View>
                                          <TextInput
                                            style={styles.verifyTextInput}
                                            onChangeText={(name) => this.setState({name})}
                                            value={this.state.name}
                                            underlineColorAndroid='rgba(0,0,0,0)'
                                            placeholder="What is your source of funds?"
                                          />
                                          <View style={styles.verifyLine}></View>
                                            <TextInput
                                              style={styles.verifyTextInput}
                                              onChangeText={(name) => this.setState({name})}
                                              value={this.state.name}
                                              underlineColorAndroid='rgba(0,0,0,0)'
                                              placeholder="Job title"
                                            />

              </View>

{/*
              <View style={styles.settingsBlock}>
                  <View style={styles.settingsTitle}>
                    <Text style={styles.settingsTitleText}>Account</Text>
                  </View>
                  <TouchableOpacity onPress={() => Actions.alerts()} style={[styles.settingsItem, styles.settingsItemLine]}>
                    <Text style={styles.settingsItemText}>Alerts</Text>
                    <Image source={require('../../../assets/icons/arrow.png')} style={styles.miniIcon} />
                  </TouchableOpacity>
                  <View style={[styles.settingsItem, styles.settingsItemLine]}>
                    <Text style={styles.settingsItemText}>Currency</Text>
                    <Image source={require('../../../assets/icons/arrow.png')} style={styles.miniIcon} />
                  </View>
                  <View style={[styles.settingsItem, styles.settingsItemLine]}>
                    <Text style={styles.settingsItemText}>Country</Text>
                    <Image source={require('../../../assets/icons/arrow.png')} style={styles.miniIcon} />
                  </View>
                  <View style={styles.settingsItem}>
                    <Text style={styles.settingsItemText}>Phone</Text>
                    <Image source={require('../../../assets/icons/arrow.png')} style={styles.miniIcon} />
                  </View>
              </View>
*/}
{/*              <View style={styles.settingsBlock}>
                  <View style={styles.settingsTitle}>
                    <Text style={styles.settingsTitleText}>Verification</Text>
                  </View>
                  <TouchableOpacity onPress={() => Actions.verification()} style={[styles.settingsItem, styles.settingsItemLine]}>
                    <Text style={styles.settingsItemText}>Security</Text>
                    <Image source={require('../../../assets/icons/arrow.png')} style={styles.miniIcon} />
                  </TouchableOpacity>
                  <View style={[styles.settingsItem, styles.settingsItemLine]}>
                    <Text style={styles.settingsItemText}>Security</Text>
                    <Image source={require('../../../assets/icons/arrow.png')} style={styles.miniIcon} />
                  </View>
                  <View style={[styles.settingsItem, styles.settingsItemLine]}>
                    <Text style={styles.settingsItemText}>Security</Text>
                    <Image source={require('../../../assets/icons/arrow.png')} style={styles.miniIcon} />
                  </View>
                  <View style={[styles.settingsItem, styles.settingsItemLine]}>
                    <Text style={styles.settingsItemText}>Security</Text>
                    <Image source={require('../../../assets/icons/arrow.png')} style={styles.miniIcon} />
                  </View>
                  <View style={[styles.settingsItem, styles.settingsItemLine]}>
                    <Text style={styles.settingsItemText}>Security</Text>
                    <Image source={require('../../../assets/icons/arrow.png')} style={styles.miniIcon} />
                  </View>
                  <View style={[styles.settingsItem, styles.settingsItemLine]}>
                    <Text style={styles.settingsItemText}>Security</Text>
                    <Image source={require('../../../assets/icons/arrow.png')} style={styles.miniIcon} />
                  </View>
              </View>
*/}

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
)(IdentityVerify);
