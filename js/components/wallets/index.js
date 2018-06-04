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

class Wallets extends Component {
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
//    console.log(Actions.state);

	}

  componentWillReceiveProps (nextProps) {

	}

  render() {

    const {auth} = this.props

    var items = [1,2,3,4,5,6,7,8,9,10]


    return (
        <View style={styles.white}>
          <View style={styles.headerBigBlock}>
            <View style={styles.headerBigBlockTitle}>
              <Text style={styles.headerBigBlockText}>WALLETS</Text>
            </View>
            <View style={styles.rows}>
              <Image source={require('../../../assets/icons/arrows.png')} style={[styles.topRightIcon,{width:25/40*31, height:25}]} />
              <Image source={require('../../../assets/icons/search.png')} style={[styles.topRightIcon,{}]} />
            </View>
          </View>
          <View style={styles.content}>
            <ScrollView >
              <View style={{flexDirection:'row'}} >
            <TouchableWithoutFeedback onPress={() => Actions.eurowallet()} >
              <View style={[styles.coinHalfBlock,{}]}>
                <View  style={[styles.rows,{paddingBottom:3}]}>
                  <Text style={styles.coinHalfTitleText}>EURO €</Text>
                  <Image source={require('../../../assets/icons/circle.png')} style={[styles.coinHalfIcon,{position:'absolute',right:0, top:1}]} />
                </View>
                <View style={[styles.rows,{paddingBottom:3}]}>
                  <Image source={require('../../../assets/icons/wallet-icon.png')} style={styles.coinSmallIconEmail} />
                  <Text style={styles.coinHalfTitleText0}>0,68767547</Text>
                </View>
                <Text style={[styles.coinHalfTitleText,{paddingBottom:3}]}>$ 11.063,53</Text>
                <Text style={[styles.coinHalfTitleText2,{paddingBottom:3}]}>$ 14.000,87</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => Actions.walletssubpage()}  >
              <View style={[styles.coinHalfBlock,{}]}>
                <View  style={[styles.rows,{paddingBottom:3}]}>
                  <Text style={styles.coinHalfTitleText}>Coinname</Text>
                  <Image source={require('../../../assets/icons/circle.png')} style={[styles.coinHalfIcon,{position:'absolute',right:0, top:1}]} />
                </View>
                <View style={[styles.rows,{paddingBottom:3}]}>
                  <Image source={require('../../../assets/icons/wallet-icon.png')} style={styles.coinSmallIconEmail} />
                  <Text style={styles.coinHalfTitleText0}>0,68767547</Text>
                </View>
                <Text style={[styles.coinHalfTitleText,{paddingBottom:3}]}>$ 11.063,53</Text>
                <Text style={[styles.coinHalfTitleText2,{paddingBottom:3}]}>$ 14.000,87</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
              {items.map(item => (
                <View style={{flexDirection:'row'}} key={item} >
                  <TouchableWithoutFeedback onPress={() => Actions.walletssubpage()}  >
                    <View style={[styles.coinHalfBlock,{}]}>
                      <View  style={[styles.rows,{paddingBottom:3}]}>
                        <Text style={styles.coinHalfTitleText}>Coinname</Text>
                        <Image source={require('../../../assets/icons/circle.png')} style={[styles.coinHalfIcon,{position:'absolute',right:0, top:1}]} />
                      </View>
                      <View style={[styles.rows,{paddingBottom:3}]}>
                        <Image source={require('../../../assets/icons/wallet-icon.png')} style={styles.coinSmallIconEmail} />
                        <Text style={styles.coinHalfTitleText0}>0,68767547</Text>
                      </View>
                      <Text style={[styles.coinHalfTitleText,{paddingBottom:3}]}>$ 11.063,53</Text>
                      <Text style={[styles.coinHalfTitleText2,{paddingBottom:3}]}>$ 14.000,87</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => Actions.walletssubpage()}  >
                    <View style={[styles.coinHalfBlock,{}]}>
                      <View style={[styles.rows,{paddingBottom:3}]}>
                        <Text style={styles.coinHalfTitleText}>Coinname</Text>
                        <Image source={require('../../../assets/icons/circle.png')} style={[styles.coinHalfIcon,{position:'absolute',right:0, top:1}]} />
                      </View>
                      <View style={[styles.rows,{paddingBottom:3}]}>
                        <Image source={require('../../../assets/icons/wallet-icon.png')} style={styles.coinSmallIconEmail} />
                        <Text style={styles.coinHalfTitleText0}>0,68767547</Text>
                      </View>
                      <Text style={[styles.coinHalfTitleText,{paddingBottom:3}]}>$ 11.063,53</Text>
                      <Text style={[styles.coinHalfTitleText2,{paddingBottom:3}]}>$ 14.000,87</Text>
                    </View>
                  </TouchableWithoutFeedback>
            </View>
            ))}

            <View style={{height:40}}></View>
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
)(Wallets);
