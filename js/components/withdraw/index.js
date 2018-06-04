import React, { Component } from "react";
import { login } from '../../actions/auth';
import { Actions } from 'react-native-router-flux';
import {
  Text, View, Image,TouchableHighlight,Platform,StyleSheet,TextInput,TouchableOpacity,StatusBar,ScrollView,
  BackHandler
} from "react-native";

import Modal from "react-native-modal";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { KeyboardAccessoryView,KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory'

import api from '../../util/api';
import language from '../../util/language';
import styles from "../styles";

import BottomMenu from '../bottommenu'
import Slider from "react-native-slider";


import * as authActions from '../../actions/auth';

class Withdraw extends Component {
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
      firstEditing:true,
      amount:0,
      val1:'1234 5646 1567 1564 1575',
      val2:'email@company.com',
      val3:'1234 5646 1567 1564 1575',
      val4:'email2@company.com',
      showConfirm:false,
      sliderval:0


		};
    this.onSlidingComplete = this.onSlidingComplete.bind(this)

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
    BackHandler.addEventListener('hardwareBackPress', function() {
        Actions.walletssubpage();
        return true;
    });
	}
  componentWillUnmount(){
//    console.log(Actions.state);
    BackHandler.removeEventListener('hardwareBackPress', function() {
        Actions.walletssubpage();
        return true;
    });
	}
  componentWillReceiveProps (nextProps) {

	}
  setAmount(amount){

    amount = amount.replace('$ ','');
    amount = amount.replace('$','');

    this.setState({'amount':amount,firstEditing:false})
  }
  onSlidingComplete(val){
    if (val != 1){
      this.setState({'sliderval':0})
    } else {
      Actions.eurowallet()
    }
  }

  render() {

    const {auth} = this.props

    let dollar = "$ "
    let amount = this.state.firstEditing == true ? '0.00' : this.state.amount

    return (
      <View style={{flex:1}}>
      <KeyboardAwareScrollView style={styles.global}
        extraScrollHeight={40}
        enableOnAndroid={true}
        keyboardShouldPersistTaps='handled'>
        <View style={styles.white}>
          <View style={styles.headerBigBlock}>
            <View style={styles.rows}>
              <TouchableOpacity onPress={() => Actions.pop()}>
                <Image source={require('../../../assets/icons/arrow_left.png')} style={styles.topRightIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerBigBlockTitle}>
              <Text style={styles.headerBigBlockText}>WITHDRAW</Text>
            </View>
            <View style={{width:50}}>
            </View>
          </View>
          <View style={styles.content}>
            <ScrollView>
              <View style={styles.borderRadius}>
                <Text style={styles.withdrawTitle}>AMOUNT</Text>
                  <TextInput
                    style={[styles.BuySellValueAmount,{marginBottom:0, paddingBottom:0}]}
                    onChangeText={(amount) => this.setAmount(amount)}
                    value={dollar+amount}
                    keyboardType="numeric"
                    underlineColorAndroid='rgba(0,0,0,0)'
                  />
              </View>
              <View style={styles.borderRadius}>
                <Text style={styles.withdrawHeader}>ACCOUNTS</Text>
                <Text style={styles.withdrawTitle}>Bank Account 1</Text>
                  <TextInput
                    style={styles.withdrawValueText}
                    onChangeText={(val1) => this.setState({val1})}
                    value={this.state.val1}
                    underlineColorAndroid='rgba(0,0,0,0)'
                  />
              <View style={styles.withdrawline}></View>
              <Text style={styles.withdrawTitle}>PayPal Account 1</Text>
                <TextInput
                  style={styles.withdrawValueText}
                  onChangeText={(val2) => this.setState({val2})}
                  value={this.state.val2}
                  underlineColorAndroid='rgba(0,0,0,0)'
                />
                <View style={styles.withdrawline}></View>
              <Text style={styles.withdrawTitle}>Bank Account 2</Text>
                <TextInput
                  style={styles.withdrawValueText}
                  onChangeText={(val3) => this.setState({val3})}
                  value={this.state.val3}
                  keyboardType="numeric"
                  underlineColorAndroid='rgba(0,0,0,0)'
                />
                <View style={styles.withdrawline}></View>
              <Text style={styles.withdrawTitle}>PayPal Account 2</Text>
                <TextInput
                  style={styles.withdrawValueText}
                  onChangeText={(val4) => this.setState({val4})}
                  value={this.state.val4}
                  underlineColorAndroid='rgba(0,0,0,0)'
                />
              </View>
              <TouchableOpacity style={styles.bigButton} onPress={()=>this.setState({'showConfirm':true})}>
                <Text style={styles.title}>WITHDRAW</Text>
              </TouchableOpacity>
              <View style={{height:200}}></View>

            </ScrollView>
          </View>

          {this.state.showConfirm &&
          <View style={styles.sliderConfirm}>
            <View style={styles.slider}>
              <Text style={styles.sliderText}>SLIDE TO CONFIRM</Text>
              <Slider
                value={this.state.sliderval}
                thumbImage={require('../../../assets/icons/slide_button.png')}
                thumbStyle={styles.thumb}
                trackStyle={styles.track}
                minimumTrackTintColor='rgb(44,51,77)'
                maximumTrackTintColor='rgb(44,51,77)'
                onSlidingComplete={this.onSlidingComplete}
                onValueChange={value => this.setState({'sliderval':value})}
                />
            </View>
            <TouchableOpacity onPress={()=>this.setState({'showConfirm':false})}>
              <Text style={styles.sliderCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        }
          {!this.state.showConfirm &&
          <BottomMenu popup='0'/>
          }

        </View>
      </KeyboardAwareScrollView>
{/*      <KeyboardAccessoryNavigation
            nextHidden={true}
            previousHidden={true}
            tintColor="rgb(44,51,77)"
            />*/}
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
)(Withdraw);
