import React, { Component } from "react";
import { login } from '../../actions/auth';
import { Actions } from 'react-native-router-flux';
import {
  TouchableWithoutFeedback, Dimensions,Text, View, Image,TouchableHighlight,Platform,StyleSheet,TextInput,TouchableOpacity,StatusBar,ScrollView
} from "react-native";

var WINDOW_WIDTH = Dimensions.get('window').width;
var WINDOW_HEIGHT = Dimensions.get('window').height; 
import Carousel from 'react-native-snap-carousel';

import Modal from "react-native-modal";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import api from '../../util/api';
import language from '../../util/language';
import styles from "../styles";

import BottomMenu from '../bottommenu'

import * as authActions from '../../actions/auth';

class AddAlert extends Component {
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
      amount:'$ 0,00'

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
  _renderItem2 ({item, index}) {
      return (
        <View style={[styles.carouselItemNew, {width:WINDOW_WIDTH*0.18}]}>
          <Image source={require('../../../assets/icons/circle.png')} style={styles.carouselIcon} />
          <Text style={styles.carouselText}>Payment</Text>
        </View>

      );
  }
  render() {

    const {auth} = this.props
    var entries = [
      {title:'1'},
      {title:'2'},
      {title:'3'},
      {title:'4'},
      {title:'5'},
    ]
    return (
        <View style={styles.white}>
          <View style={styles.headerBigBlock}>
            <View style={styles.rows}>
              <TouchableOpacity onPress={Actions.pop}>
                <Image source={require('../../../assets/icons/arrow_left.png')} style={styles.topRightIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerBigBlockTitle}>
              <Text style={styles.headerBigBlockText}>ADD ALERT</Text>
            </View>
            <View style={{width:50}}>
            </View>
          </View>
          <View style={styles.content}>
            <ScrollView>
              <Text style={styles.carouselTitle}>Select Coin</Text>
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


              <View style={[styles.blockRounded,{flexDirection:'column'}]}>
                <View style={styles.alertLine}>
                  <Image source={require('../../../assets/icons/arrowup.png')} style={[styles.carouselIcon, {width:20, height:20/35*54}]} />
                  <Text style={styles.alertTitleSumma}>$ 11.063,53</Text>
                </View>
                <View style={[styles.alertTable]}>
                  <View style={styles.alertColumn}>
                    <Text style={styles.alertTextValue}>$ 11.100,88</Text>
                    <Text style={styles.alertTextDescr}>OPEN</Text>
                  </View>
                  <View style={styles.alertColumn}>
                    <Text style={styles.alertTextValue}>$ 11.205,88</Text>
                    <Text style={styles.alertTextDescr}>24H HIGH</Text>
                  </View>
                  <View style={styles.alertColumn}>
                    <Text style={styles.alertTextValue}>$ 10.987,64</Text>
                    <Text style={styles.alertTextDescr}>24H LOW</Text>
                  </View>
                </View>
              </View>
              <View style={[styles.blockRounded, {flexDirection:'column'}]}>
                <Text style={styles.alertTitleAmount}>AMOUNT</Text>
                  <TextInput
                    style={styles.alertAddInput}
                    onChangeText={(amount) => this.setState({amount})}
                    value={this.state.amount}
                    keyboardType="numeric"
                    underlineColorAndroid='rgba(0,0,0,0)'
                  />
              </View>
              <TouchableOpacity onPress={() => Actions.pop}>
                <View style={[styles.bigButtonBlue, {backgroundColor:'#929FBF', marginTop:0}]}>
                  <Text style={[styles.bigButtonBlueText]}>ADD ALERT</Text>
                </View>
              </TouchableOpacity>

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
)(AddAlert);
