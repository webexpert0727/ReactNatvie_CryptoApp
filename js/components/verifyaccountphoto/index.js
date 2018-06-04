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

class VerifyAccountPhoto extends Component {
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
              <Text style={styles.headerBigBlockText}>VERIFY ACCOUNT</Text>
            </View>
            <View style={{width:50}}>
            </View>
          </View>
          <View style={styles.content}>
            <ScrollView>

              <View style={[styles.blockMargin30]}>
                <Text style={[styles.titleBlue,{fontSize:16}]}>Scan the front</Text>
                <Text style={styles.textBlue}>Take a photo of the front of your identity card</Text>
                <Image source={require('../../../assets/icons/settings50.png')} style={styles.verBigPhoto} />
              </View>

                  <TouchableOpacity onPress={() => Actions.verifyaccountphoto()}>
                    <View style={[styles.bigButtonBlue30, {flexDirection:'row'}]}>
                      <Image source={require('../../../assets/icons/settings5.png')} style={[{width:28, height:28/49*37, marginRight:10}]} />
                      <Text style={[styles.bigButtonBlueText]}>Take Photo</Text>
                    </View>
                  </TouchableOpacity>
                  <View >
                    <View style={[styles.bigButtonGrey30, {flexDirection:'row', marginTop:16}]}>
                      <Text style={[styles.bigButtonBlueText]}>Continue</Text>
                    </View>
                  </View>
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
)(VerifyAccountPhoto);
