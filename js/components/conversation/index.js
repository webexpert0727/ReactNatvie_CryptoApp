import React, { Component } from "react";
import { login } from '../../actions/auth';
import { Actions } from 'react-native-router-flux';
import {
  TouchableWithoutFeedback,
  Text,
  View,
  Image,
  TouchableHighlight,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Keyboard,
  Alert
} from "react-native";

import Modal from "react-native-modal";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import api from '../../util/api';
import functions from '../../util/functions';
import language from '../../util/language';
import styles from "../styles";

import BottomMenu from '../bottommenu'
import Slider from "react-native-slider";


import * as authActions from '../../actions/auth';

class Conversation extends Component {
  constructor(props) {
		super(props);

		this.state = {
			user:'',
      isReady:false,
      isOpen: false,
      isOpen2: false,
      selectedItem: 'About',
      top:'',
      bottom:'',
      open: false,
      connected: false,
      error:'',
      isModal: false,
      typemenu:false,
      sliderval:0,
      popup:0,
      message:'',
      amount:'11.063,53',
      amount2:'0,68767547',
      messages:[],
      avatar:'',
      wallets:[],
      coins:[],
      price:'0',
      user_email:'',
      sendMessage:{}
		};
    this.onSlidingComplete  = this.onSlidingComplete.bind(this)

	}

  _toggleModal = () =>
    this.setState({ isModal: !this.state.isModal });

    onSlidingComplete(val){

      const {auth,chat_id} = this.props
      const {user_email, amount2, user} = this.state

      if (val != 1){
        this.setState({'sliderval':0})
      } else {
        console.log({
          'token':auth.token,
          'symbol':'eth',
          'recipient':user_email,
          'amount':amount2.replace(',','.'),
        });
        api.send({
          'token':auth.token,
          'symbol':'eth',
          'recipient':user_email,
          'amount':amount2.replace(',','.'),
        }).then((res)=>{
          if (res.success == true){
            this.setState({'sliderval':0})
            this.typemenu(false)

            message = 'YOU SENT TO '+user+' '+amount2+' eth'
            api.chat_message_new({
              token:auth.token,
              "chat_id": chat_id,
              "message": message,
            }).then((res)=>{
              console.log(res);
              if (res.success == true){
                this.loadMessages()
              } else {
              }
            })
          } else {
            this.setState({'sliderval':0})
            this.typemenu(false)
            Alert.alert(
              'ERROR',
              res.message
            )
          }
        })
      }
    }

  componentDidMount(){
    StatusBar.setHidden(true, 'none');
  }

  sendMessage = () =>{
    const {auth, user_id, chat_id} = this.props
    api.chat_message_new({
      token:auth.token,
      "chat_id": chat_id,
      "message": this.state.message,
    }).then((res)=>{
      console.log(res);
      if (res.success == true){
        this.setState({message:''})
        this.loadMessages()
      } else {
      }
    })

  }

  typemenu(type){
    this.setState({ typemenu: type });
  }


  componentWillMount(){
    console.log(this.props);
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow',
    this.keyboardWillShow)

    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide',
    this.keyboardWillHide)

    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',
    this.keyboardWillShow)

    this.keyboarDidHideListener = Keyboard.addListener('keyboardWillHide',
    this.keyboardWillHide)


    const {auth, chat_id} = this.props
    api.chat({
      'token':auth.token,
      chat_id:chat_id
    }).then((res)=>{
      if (res.success == true){
          this.setState({messages:res.messages, user:res.user, avatar:res.avatar})

          let user_id = res.user
          api.contacts({
            'token':auth.token
          }).then((res)=>{
            if (res.success == true){
              let contacts = res.contacts
              console.log(contacts);
              console.log('user_id = '+user_id);
                for (let i=0; i<contacts.length; i++){
                  if (contacts[i].name == user_id) {
                    this.setState({user_email:contacts[i].email})
                    break;
                  }
                }
                this.setState({contacts:res.contacts})
            } else {
            }
          })


      } else {
      }
    })

    api.wallets({token:auth.token}).then((res)=>{
      if (res.success == true){
          wallets = res.wallets;
          this.setState({wallets:wallets, amount1:wallets[0].amount_eur, amount2:wallets[0].amount, price:wallets[0].price})
      } else {
      }
    })


    api.coins_my({token:auth.token}).then((res)=>{
      console.log(res);
      if (res.success == true){
          this.setState({coins:coins})
      } else {
      }
    })

	}

loadMessages = () =>{
  const {auth, chat_id} = this.props
  api.chat({
    'token':auth.token,
    chat_id:chat_id
  }).then((res)=>{
    if (res.success == true){
        this.setState({messages:res.messages, user:res.user, avatar:res.avatar})
    } else {
    }
  })
}
  keyboardWillShow = (event) => {
    console.log(event.endCoordinates.height);
  }

  keyboardWillHide = (event) => {

  }

  componentWillReceiveProps (nextProps) {

	}
  setAmount(amount){
    const {price} = this.state

    amount = amount.replace('€ ','');
    amount = amount.replace('€','');
//    amount = amount.replace('.','');
    amount = amount.replace(',','.');

    amount2 = functions.number_format(amount/price,8);
    this.setState({'amount':amount,'amount2':amount2})
  }

  setAmount2(amount2){
    const {price} = this.state

    amount2 = amount2.replace(' eth','');
    amount2 = amount2.replace('eth','');
    amount2 = amount2.replace(',','.');

    amount = functions.number_format(amount2*price,2);
    amount2 = amount2.replace('.',',');

    this.setState({'amount':amount,'amount2':amount2})
  }
  render() {

    const {auth} = this.props
    let dollar  = "€ "
    let amount  = this.state.amount
    let amount2 = this.state.amount2

    const {messages, user, avatar} = this.state

    const {user_name} = this.props

    return (
      <KeyboardAwareScrollView style={styles.global}
        extraHeight={0}
        >
        <View style={styles.white}>
          <View style={styles.convBlock}>
            <View style={styles.rows}>
              <TouchableOpacity onPress={() => Actions.pop()}>
                <Image source={require('../../../assets/icons/arrow_left.png')} style={styles.topRightIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.convBlockTitle}>
              <Image source={{uri: avatar}} style={styles.convIcon} />
              <Text style={styles.convText}>{user}</Text>
            </View>
            <View style={{width:0}}>
            </View>
          </View>
          <View style={[styles.content,{top:0}]}>
            <ScrollView>
              <View style={styles.messagesBlock}>
                {messages.map(item => (
                  <View style={styles.otherMessage} key={item.message_id}>
                    <Text style={styles.otherMessageText}>{item.message}</Text>
                  </View>
                ))}
              </View>
              {(this.state.typemenu >= 2) &&
                <View style={{height:140}}></View>
              }
            </ScrollView>
            {!this.state.typemenu &&
            <View style={styles.messageBlock}>
              <TouchableOpacity onPress={() => this.typemenu(1)} style={styles.buttonMoney}>
                <Image source={require('../../../assets/icons/plus.png')} style={[styles.convIconMoney,{}]} />
              </TouchableOpacity>
              <TextInput
                ref="MessageField"
                style={styles.messageTextInput}
                onChangeText={(message) => this.setState({message})}
                value={this.state.message}
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Your message here..."
                autoFocus={true}
              />
            <TouchableOpacity onPress={this.sendMessage} style={styles.convButtonSend}>
                <Image source={require('../../../assets/icons/send_white.png')} style={[styles.convIconMoney,{}]} />
              </TouchableOpacity>
            </View>
            }
            {(this.state.typemenu == 1) &&
              <TouchableWithoutFeedback style={styles.convImagesBlock} onPress={() => this.typemenu(2)}>
                  <Image source={require('../../../assets/icons/conv_icons.png')} style={[styles.convIcons,{}]} />
              </TouchableWithoutFeedback>
            }
            {(this.state.typemenu == 2) &&
              <View style={styles.convBigBlock}>
                <View style={styles.rows}>
                  <Image source={require('../../../assets/icons/arrow2.png')} style={styles.convBigBlockArrow} />
                <View style={styles.convCoinsRow}>
                    {wallets.map(item => (
                      <View style={[styles.convCoinsBlock,{paddingLeft:10}]}>
                        <View style={styles.rows}>
                          <View style={styles.convIconLogoView}></View>
                          <Text style={styles.convCoinsBlockTextTitle}>{item.name}</Text>
                        </View>
                        <View style={styles.rows}>
                          <Image source={require('../../../assets/icons/wallet-icon.png')} style={styles.convIconValueLogo} />
                          <Text style={styles.convCoinsBlockTextValue}>{item.amount}</Text>
                        </View>
                      </View>
                    ))}
                    {/*
                  <View style={[styles.convCoinsBlock,styles.leftBorderLightBlue,{paddingLeft:10}]}>
                    <View style={styles.rows}>
                      <View style={styles.convIconLogoView}></View>
                      <Text style={styles.convCoinsBlockTextTitle}>Coinname</Text>
                    </View>
                    <View style={styles.rows}>
                      <Image source={require('../../../assets/icons/wallet-icon.png')} style={styles.convIconValueLogo} />
                      <Text style={styles.convCoinsBlockTextValue}>0,68767547</Text>
                    </View>
                  </View>
                  <View style={[styles.convCoinsBlock,styles.leftBorderLightBlue,{paddingLeft:10}]}>
                    <View style={styles.rows}>
                      <View style={styles.convIconLogoView}></View>
                      <Text style={styles.convCoinsBlockTextTitle}>Coinname</Text>
                    </View>
                    <View style={styles.rows}>
                      <Image source={require('../../../assets/icons/wallet-icon.png')} style={styles.convIconValueLogo} />
                      <Text style={styles.convCoinsBlockTextValue}>0,68767547</Text>
                    </View>
                  </View>
                  */}
                </View>
                <Image source={require('../../../assets/icons/arrow.png')} style={styles.convBigBlockArrow} />
              </View>
              <View style={styles.convLine}></View>
                <View style={styles.convCoinsRow2}>
                  <View style={styles.convCoinsBlock2}>
                    <Text style={styles.convAmountText}>Amount</Text>
                    <TextInput
                        style={styles.convAmountTextInput}
                        onChangeText={(amount) => this.setAmount(amount)}
                        value={dollar+amount}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        autoFocus={true}
                    />
                  </View>
                  <View style={[styles.convCoinsBlock2,styles.leftBorderLightBlue]}>
                    <Text> </Text>
                    <View style={[{flexDirection:'row', alignItems:'center'}]}>
                      <TextInput
                        style={[styles.convAmountTextInput,{flex:1,textAlign:'right'}]}
                        onChangeText={(amount2) => this.setAmount2(amount2)}
                        value={amount2}
                        keyboardType="numeric"
                        underlineColorAndroid='rgba(0,0,0,0)'
                      />
                      <TextInput
                        style={[styles.convAmountTextInput,{width:32, marginRight:6}]}
                        onChangeText={(amount2) => this.setAmount2(amount2)}
                        value=" eth"
                        underlineColorAndroid='rgba(0,0,0,0)'
                        editable = {false}
                      />
                    </View>
                  </View>
                  <View style={{alignSelf:'center',borderLeftWidth:1, borderLeftColor:'#929fbe'}}>
                    <TouchableOpacity onPress={() => this.typemenu(3)}>
                        <Image source={require('../../../assets/icons/right_icons1.png')} style={[{width:30, height:30/45*44, marginLeft:16,alignSelf:'center'}]} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            }
            {(this.state.typemenu == 3) &&
              (
                <View style={styles.sliderConfirm}>
                  <View style={[styles.rows,{marginLeft:16,marginRight:16, marginTop:16}]}>
                    <View style={{flex:1}}>
                      <Text style={[styles.convAmountText,{marginBottom:5}]}>Amount</Text>
                      <Text style={styles.convAmountTextInput}>{dollar+amount}</Text>
                    </View>
                    <View style={[{flex:1}]}>
                      <Text style={[styles.convAmountText,{marginBottom:5}]}> </Text>
                      <Text style={[styles.leftBorderLightBlue,styles.convAmountTextInput,{textAlign:'right'}]}>{amount2} eth</Text>
                    </View>
                  </View>
                  <View style={styles.slider}>
                    <Text style={styles.sliderText}>SLIDE TO CONFIRM</Text>
                    <Slider
                      value={this.state.sliderval}
                      thumbImage={require('../../../assets/icons/slide_square.png')}
                      thumbStyle={styles.thumb}
                      trackStyle={styles.track}
                      minimumTrackTintColor='rgb(44,51,77)'
                      maximumTrackTintColor='rgb(44,51,77)'
                      onSlidingComplete={this.onSlidingComplete}
                      onValueChange={value => this.setState({'sliderval':value})}
                      />
                  </View>
                  <TouchableOpacity onPress={()=>this.typemenu(false)}>
                    <Text style={styles.sliderCancel}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              )
            }
          </View>
          {(this.state.typemenu) &&
            <TextInput
              style={[styles.messageTextInput,{position:'absolute', left:-10,bottom:0, width:0, height:0}]}
              onChangeText={(message) => this.setState({message})}
              value={this.state.message}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Your message here..."
              autoFocus={true}
            />
          }
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
/*
<View style={styles.myMessage}>
  <Text style={styles.myMessageText}>YOU SENT TO NAME SURNAME </Text>
  <Text style={styles.myMessageTextMoney}>0,01245669 COIN </Text>
</View>



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
)(Conversation);
