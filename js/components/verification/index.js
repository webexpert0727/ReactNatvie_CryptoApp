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

class Verification extends Component {
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
        <View style={styles.white}>
          <View style={styles.headerBigBlock}>
            <View style={styles.rows}>
              <TouchableOpacity onPress={() => Actions.pop()}>
                <Image source={require('../../../assets/icons/settings6.png')} style={[styles.topRightIcon,{width:18, height:18, top:4}]} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerBigBlockTitle}>
              <Text style={styles.headerBigBlockText}>VERIFICATION</Text>
            </View>
            <View style={{width:50}}>
            </View>
          </View>
          <View style={styles.content}>
            <ScrollView>
                <View style={[styles.bigButtonBlue,{marginTop:0, marginBottom:0, flexDirection:'row', height:40, marginBottom:20}]}>
                  <Image source={require('../../../assets/icons/settings7.png')} style={[{width:20, height:20, alignSelf:'center', marginRight:8}]} />
                  <Text style={[styles.bigButtonBlueText,{fontSize:18, alignSelf:'center'}]}>VERIFIED</Text>
                </View>

              <View style={styles.verBlockAll}>
              <TouchableOpacity onPress={() => Actions.verifyaccountphoto()}>
                <View style={styles.verBlock}>
                    <View style={styles.verLeft}>
                      <Image source={require('../../../assets/icons/circle.png')} style={styles.verIcon} />
                      <Text style={styles.verText}>Identity card</Text>
                    </View>
                    <View style={styles.verStatus}>
                      <Text style={styles.verStatusText}>Pending</Text>
                      <View style={styles.verStatusIcon}></View>
                    </View>
                </View>
              </TouchableOpacity>
              <View style={styles.verLine}></View>
              <TouchableOpacity onPress={() => Actions.verifyaccountphoto()}>
                <View style={styles.verBlock}>
                  <View style={styles.verLeft}>
                    <Image source={require('../../../assets/icons/circle.png')} style={styles.verIcon} />
                    <Text style={styles.verText}>Driver license</Text>
                  </View>
                </View>
              </TouchableOpacity>
                <View style={styles.verLine}></View>
                  <TouchableOpacity onPress={() => Actions.verifyaccountphoto()}>
                    <View style={styles.verBlock}>
                      <View style={styles.verLeft}>
                        <Image source={require('../../../assets/icons/circle.png')} style={styles.verIcon} />
                        <Text style={styles.verText}>Passport</Text>
                        </View>
                    </View>
                  </TouchableOpacity>
                </View>
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
)(Verification);
