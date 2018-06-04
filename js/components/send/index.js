import React, { Component } from "react";
import { login } from '../../actions/auth';
import { Actions } from 'react-native-router-flux';
import {
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
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
  BackHandler,
  Animated
} from "react-native";

var WINDOW_WIDTH = Dimensions.get('window').width;
var WINDOW_HEIGHT = Dimensions.get('window').height;

import Modal from "react-native-modal";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { KeyboardAccessoryView,KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory'

import api from '../../util/api';
import functions from '../../util/functions';
import language from '../../util/language';
import styles from "../styles";

import BottomMenu from '../bottommenu'
import Slider from "react-native-slider";
import Carousel from 'react-native-snap-carousel';


import * as authActions from '../../actions/auth';

class Send extends Component {
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
      name:'email@company.com',
      surname:'',
      cpf:'',
      open: false,
      connected: false,
      error:'',
      isModal: false,
      coinActive:3,
      paymentActive:3,
      amount:0,
      amount2:0,
      firstEditing:true,
      showConfirm:false,
      isKeyboard:false,
      sliderval:0,

      activeInputRef: null,
      nextFocusDisabled: false,
      previousFocusDisabled: false,
      buttonsDisabled: false,
      buttonsHidden: false,

      opacityValue: new Animated.Value(1),
      heightValue: new Animated.Value(280),

      canEdited1:false,
      canEdited2:false,
      canEdited3:false,
		};
    this.onSlidingComplete = this.onSlidingComplete.bind(this)

	}
  handleFocus(ref) {
    this.setState({
      nextFocusDisabled: ref === 3,
      previousFocusDisabled: ref === 1,
      activeInputRef: ref,
    });
  }

  changeInputFocus(direction = 1) {
    if ((this.state.nextFocusDisabled && direction === 1) ||
        (this.state.previousFocusDisabled && direction === -1)) {
      return;
    }

    const focusingRef = this.state.activeInputRef + direction;
    this.refs[`${focusingRef}`].focus();
}

  _toggleModal = () =>
    this.setState({ isModal: !this.state.isModal });

  componentDidMount(){
    StatusBar.setHidden(true, 'none');
    if (Platform.OS === 'ios') {
      this.setState({canEdited1:true})
    }

  }

componentWillMount () {
  this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
  this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);

  this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this._keyboardDidShow);
  this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this._keyboardDidHide);

/*
  BackHandler.addEventListener('hardwareBackPress', function() {
      Actions.walletssubpage();
      return true;
  });
  */
}

componentWillUnmount () {
  this.keyboardDidShowListener.remove();
  this.keyboardDidHideListener.remove();

  this.keyboardWillShowListener.remove();
  this.keyboardWillHideListener.remove();
/*
  BackHandler.removeEventListener('hardwareBackPress', function() {
      Actions.walletssubpage();
      return true;
  });
  */
}

_keyboardDidShow = (event) => {
  if (Platform.OS === 'ios') {return}

  this.state.opacityValue.setValue(0)
  this.state.heightValue.setValue(0)

  console.log('isKeyboard true');
  if (!event.endCoordinates) {
    return;
  }
  this.setState({ isKeyboard: true });


}

_keyboardDidHide = (event) => {
  if (Platform.OS === 'ios') {return}

  this.state.opacityValue.setValue(1)
  this.state.heightValue.setValue(280)

  console.log('isKeyboard false');
  this.setState({ isKeyboard: false, 'canEdited1':false, 'canEdited2':false, 'canEdited3':false });

}



  componentWillReceiveProps (nextProps) {

	}
  setAmount(amount){

    amount = amount.replace('$ ','');
    amount = amount.replace('$','');
    amount = amount.replace(',','.');

    amount2 = functions.number_format(amount/10986.45,8);
    this.setState({'amount':amount,'amount2':amount2,firstEditing:false})
  }

  setAmount2(amount2){

    amount2 = amount2.replace(' BTC','');
    amount2 = amount2.replace('BTC','');
    amount2 = amount2.replace(',','.');

    amount = functions.number_format(amount2*10986.45,2);
    amount2 = amount2.replace('.',',');

    this.setState({'amount':amount,'amount2':amount2,firstEditing:false})
  }
  onSlidingComplete(val){
    if (val != 1){
      this.setState({'sliderval':0})
    } else {
      Actions.pop()
    }
  }

  _renderItem = ({item, index}) => {
      return (
        <TouchableWithoutFeedback onPress={() => this._carousel.snapToItem(index)}>
          <View style={[styles.carouselItemNew, {width:WINDOW_WIDTH*0.18}]}>
            <Image source={require('../../../assets/icons/circle.png')} style={styles.carouselIcon} />
            <Text style={styles.carouselText}>Coinname</Text>
          </View>
        </TouchableWithoutFeedback>

      );
  }
  _renderItem2 = ({item, index}) => {
      return (
        <TouchableWithoutFeedback onPress={() => this._carousel2.snapToItem(index)}>
          <View style={[styles.carouselItemNew, {width:WINDOW_WIDTH*0.18}]}>
            <Image source={require('../../../assets/icons/circle.png')} style={styles.carouselIcon} />
            <Text style={styles.carouselText}>Payment</Text>
          </View>
        </TouchableWithoutFeedback>

      );
  }

  render() {

    const {auth} = this.props

    let dollar = "$ "

let amount = this.state.firstEditing == true ? '0.00' : this.state.amount
let amount2 = this.state.firstEditing == true ? '0.00000000' : this.state.amount2

var entries = [
  {title:'1'},
  {title:'2'},
  {title:'3'},
  {title:'4'},
  {title:'5'},
]
    return (
      <View style={{flex:1}}>
      <KeyboardAwareScrollView style={styles.global} >
        <View style={styles.white}>
          <View style={styles.headerBigBlock}>
            <View style={styles.rows}>
              <TouchableOpacity onPress={()=>Actions.pop()}>
                <Image source={require('../../../assets/icons/arrow_left.png')} style={styles.topRightIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerBigBlockTitle}>
              <Text style={styles.headerBigBlockText}>SEND</Text>
            </View>
            <View style={{width:50}}>
            </View>
          </View>
          <View style={styles.content}>
            <ScrollView
              ref={(c) => { this.scroll = c; }}
              >
              {!this.state.isKeyboard &&
                <Animated.View style={{height:this.state.heightValue, opacity:this.state.opacityValue}}>
              <Text style={styles.carouselTitle}>Recent Coin</Text>
                <View style={{marginLeft:16,marginBottom:20}}>
                  <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={entries}
                    renderItem={this._renderItem}
                    itemWidth={WINDOW_WIDTH*0.18}
                    sliderWidth={WINDOW_WIDTH-32}
                    inactiveSlideOpacity={1}
                    firstItem={2}
                  />
                </View>
              <Text style={styles.carouselTitle}>Select Contacts</Text>
                <View style={{marginLeft:16,marginBottom:20}}>
                  <Carousel
                    ref={(c) => { this._carousel2 = c; }}
                    data={entries}
                    renderItem={this._renderItem2}
                    itemWidth={WINDOW_WIDTH*0.18}
                    sliderWidth={WINDOW_WIDTH-32}
                    inactiveSlideOpacity={1}
                    firstItem={2}
                  />
                </View>
              </Animated.View>
              }
              <View style={[styles.BuySellBlock,{marginBottom:10}]}>
                  <Text style={styles.sendTitle}>USERNAME / ADDRESS / PHONE / EMAIL</Text>
                    {(!this.state.canEdited1 && !this.state.canEdited2 && !this.state.canEdited3) &&
                      <TouchableOpacity style={{flex:1, height:30}} onPress={()=>{
                          this.state.opacityValue.setValue(0)
                          this.state.heightValue.setValue(0)
                          this.setState({'canEdited3':true,'canEdited2':false,'canEdited1':false})
                        }}>
                        <TextInput
                          ref="1"
                          style={styles.sendValue}
                          onChangeText={(name) => this.setState({name})}
                          value={this.state.name}
                          underlineColorAndroid='rgba(0,0,0,0)'
                          onFocus={this.handleFocus.bind(this, 1)}
                          editable = {false}
                        />
                      </TouchableOpacity>
                    }
                    {(this.state.canEdited1 || this.state.canEdited2 || this.state.canEdited3) &&
                      <TextInput
                        ref="1"
                        style={styles.sendValue}
                        onChangeText={(name) => this.setState({name})}
                        value={this.state.name}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        onFocus={this.handleFocus.bind(this, 1)}
                        editable = {this.state.canEdited1 || this.state.canEdited2 || this.state.canEdited3}
                        autoFocus={this.state.canEdited3}
                      />
                    }

              </View>
              <View style={styles.BuySellBlock}>
                <View style={styles.BuySellRow}>
                  <View style={styles.BuySellColumn}>
                    <Text style={styles.BuySellTitle}>AMOUNT</Text>
                      {(!this.state.canEdited1 && !this.state.canEdited2 && !this.state.canEdited3) &&
                        <TouchableOpacity style={{flex:1, height:20}} onPress={()=>{
                            this.state.opacityValue.setValue(0)
                            this.state.heightValue.setValue(0)
                            this.setState({'canEdited1':true,'canEdited2':false,'canEdited3':false})
                          }}>
                          <TextInput
                            ref="2"
                            style={styles.BuySellValueAmount}
                            onChangeText={(amount) => this.setAmount(amount)}
                            value={dollar+amount}
                            keyboardType="numeric"
                            underlineColorAndroid='rgba(0,0,0,0)'
                            onFocus={this.handleFocus.bind(this, 2)}
                            editable = {false}
                          />
                        </TouchableOpacity>
                      }
                      {(this.state.canEdited1 || this.state.canEdited2 || this.state.canEdited3) &&
                        <TextInput
                          ref="2"
                          style={styles.BuySellValueAmount}
                          onChangeText={(amount) => this.setAmount(amount)}
                          value={dollar+amount}
                          keyboardType="numeric"
                          underlineColorAndroid='rgba(0,0,0,0)'
                          onFocus={this.handleFocus.bind(this, 2)}
                          editable = {this.state.canEdited1 || this.state.canEdited2 || this.state.canEdited3}
                          autoFocus={this.state.canEdited1}
                        />
                      }
                  </View>
                  <View style={[styles.BuySellColumn,styles.BuySellLeftBorder]}>
                    <Text style={styles.BuySellTitle}> </Text>
                    <View style={[{flexDirection:'row'}]}>

                      {(!this.state.canEdited1 && !this.state.canEdited2 && !this.state.canEdited3) &&
                        <TouchableOpacity style={{paddingRight:5}} onPress={()=>{
                            this.state.opacityValue.setValue(0)
                            this.state.heightValue.setValue(0)
                            this.setState({'canEdited2':true,'canEdited1':false,'canEdited3':false})
                          }}>
                          <TextInput
                          ref="3"
                          style={[styles.BuySellValueAmount,{flex:1}]}
                          onChangeText={(amount2) => this.setAmount2(amount2)}
                          value={amount2}
                          keyboardType="numeric"
                          underlineColorAndroid='rgba(0,0,0,0)'
                          onFocus={this.handleFocus.bind(this, 3)}
                          editable = {this.state.canEdited2}
                          />
                        </TouchableOpacity>
                      }
                      {(this.state.canEdited1 || this.state.canEdited2  || this.state.canEdited3) &&
                        <TextInput
                        ref="3"
                        style={[styles.BuySellValueAmount,{flex:1}]}
                        onChangeText={(amount2) => this.setAmount2(amount2)}
                        value={amount2}
                        keyboardType="numeric"
                        underlineColorAndroid='rgba(0,0,0,0)'
                        onFocus={this.handleFocus.bind(this, 3)}
                        editable = {this.state.canEdited1 || this.state.canEdited2 || this.state.canEdited3}
                        autoFocus={this.state.canEdited2}
                        />
                      }

                      {(Platform.OS === 'ios') &&
                        <Text style={[styles.BuySellValueAmount,{marginRight:6}]}>BTC</Text>
                      }
                      {(Platform.OS === 'android') &&
                        <TextInput style={[styles.BuySellValueAmount,{marginRight:6}]}
                          value="BTC"
                          editable = {false}
                          underlineColorAndroid='rgba(0,0,0,0)'
                          />
                      }
                      </View>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.bigButton} onPress={()=>this.setState({'showConfirm':true})}>
                <Text style={styles.title}>SEND</Text>
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
                thumbImage={require('../../../assets/icons/slide_square.png')}
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
      <KeyboardAccessoryNavigation
            nextDisabled={this.state.nextFocusDisabled}
            previousDisabled={this.state.previousFocusDisabled}
            nextHidden={this.state.buttonsHidden}
            previousHidden={this.state.buttonsHidden}
            onNext={this.changeInputFocus.bind(this, 1)}
            onPrevious={this.changeInputFocus.bind(this, -1)}
            tintColor="rgb(44,51,77)"
            />
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
)(Send);
