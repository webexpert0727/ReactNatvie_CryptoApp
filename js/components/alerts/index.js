import React, { Component } from "react";
import { login } from '../../actions/auth';
import { Actions } from 'react-native-router-flux';
import {
  Dimensions, TouchableWithoutFeedback,Text, View, Image,TouchableHighlight,Platform,StyleSheet,TextInput,TouchableOpacity,StatusBar,ScrollView,Switch
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

import { SwipeListView,SwipeRow } from 'react-native-swipe-list-view';
import Swipeout from 'react-native-swipeout';

import BottomMenu from '../bottommenu'

import * as authActions from '../../actions/auth';

class Alerts extends Component {
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
      addalert:'',
      popup:0,
      opening:false,
      edit:false,
      val1:false,
      val2:false,
      val3:false,
      val4:false,
      val5:false,

		};

	}

  swipeable = null;

  handleUserBeganScrollingParentView() {
    this.swipeable.recenter();
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

  addalert(){
    var newvalue = '';
    var popup = '0';
    if (this.state.addalert == '') {
      newvalue = 'plus'
      popup = '1'
    }
    this.setState({ addalert: newvalue,popup:popup });
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
      <KeyboardAwareScrollView style={styles.global}>
        <View style={styles.white}>
          <View style={styles.headerBigBlock}>
            <View style={styles.rows} >
              <TouchableOpacity onPress={() => Actions.pop()}>
                <Image source={require('../../../assets/icons/arrow_left.png')} style={styles.topRightIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerBigBlockTitle}>
              <Text style={styles.headerBigBlockText}>ALERTS</Text>
            </View>
            <View style={styles.rows}>
              <TouchableOpacity onPress={() => this.setState({edit:!this.state.edit})} >
                <Image source={require('../../../assets/icons/edit.png')} style={[styles.topRightIcon, {width:14, height:14/15*27}]} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Actions.addalert()} >
                <Image source={require('../../../assets/icons/plus.png')} style={styles.topRightIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.content}>
            {this.state.edit &&
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

              <Text style={[styles.titleText,{alignSelf:'center', fontSize:20, marginBottom:20}]}>$ 10.986,45</Text>

              <View style={[styles.blockRounded,{flexDirection:'column', paddingTop:0}]}>
                <Swipeout right={[{text:'Delete'}]}
backgroundColor='#fff'
                  >
                  <View style={[styles.rows,{alignItems:'center', justifyContent:'center'}]}>
                    <View style={styles.accountLeft}>
                      <Image source={require('../../../assets/icons/settings1.png')} style={[styles.accountLeftIcon,{width:18, height:18,marginTop:11}]} />
                      <View style={styles.alertsCenter}>
                        <Text style={[styles.accountCartTitle,{fontSize:14}]}>Coin is above $ 12.000</Text>
                        <Text style={styles.accountCartShort}>Created on 02.03.18</Text>
                      </View>
                    </View>
                    <Switch
                      style={{marginRight:10, alignSelf:'center'}}
                         onValueChange = {(val1)=>this.setState({val1})}
                         value = {this.state.val1}
                       />
                 </View>
               </Swipeout>

                 <View style={[styles.alertsLine,{marginTop:0, marginBottom:0}]}></View>
                   <Swipeout right={[{text:'Delete'}]}
   backgroundColor='#fff'
                     >
           <View style={[styles.rows,styles.standaloneRowFront]}>
                   <View style={styles.accountLeft}>
                     <Image source={require('../../../assets/icons/settings3.png')} style={[styles.accountLeftIcon,{width:18, height:18,marginTop:11}]} />
                     <View style={styles.alertsCenter}>
                       <Text style={[styles.accountCartTitle,{fontSize:14}]}>Coin is below $ 12.000</Text>
                       <Text style={styles.accountCartShort}>Created on 01.03.18</Text>
                     </View>
                   </View>
                   <Switch
                     style={{marginRight:10}}
                        onValueChange = {(val2)=>this.setState({val2})}
                        value = {this.state.val2}
                      />
                  </View>
                </Swipeout>
                  <View style={styles.alertsLine}></View>
                    <Swipeout right={[{text:'Delete'}]}
    backgroundColor='#fff'
                      >
            <View style={[styles.rows,styles.standaloneRowFront]}>
                    <View style={styles.accountLeft}>
                      <Image source={require('../../../assets/icons/settings3.png')} style={[styles.accountLeftIcon,{width:18, height:18,marginTop:11}]} />
                      <View style={styles.alertsCenter}>
                        <Text style={[styles.accountCartTitle,{fontSize:14}]}>Coin is below $ 9.000</Text>
                        <Text style={styles.accountCartShort}>Created on 01.03.18</Text>
                      </View>
                    </View>
                    <Switch
                      style={{marginRight:10}}
                         onValueChange = {(val3)=>this.setState({val3})}
                         value = {this.state.val3}
                       />
                   </View>
                 </Swipeout>

                   <View style={styles.alertsLine}></View>
                     <Swipeout right={[{text:'Delete'}]}
     backgroundColor='#fff'
                       >
             <View style={[styles.rows,styles.standaloneRowFront]}>
                     <View style={styles.accountLeft}>
                       <Image source={require('../../../assets/icons/settings1.png')} style={[styles.accountLeftIcon,{width:18, height:18,marginTop:11}]} />
                       <View style={styles.alertsCenter}>
                         <Text style={[styles.accountCartTitle,{fontSize:14}]}>Coin is above $ 13.000</Text>
                         <Text style={styles.accountCartShort}>Created on 01.03.18</Text>
                       </View>
                     </View>
                     <Switch
                       style={{marginRight:10}}
                          onValueChange = {(val4)=>this.setState({val4})}
                          value = {this.state.val4}
                        />
                    </View>
                  </Swipeout>

                    <View style={styles.alertsLine}></View>
                      <Swipeout right={[{text:'Delete'}]}
      backgroundColor='#fff'
                        >
              <View style={[styles.rows,styles.standaloneRowFront]}>
                      <View style={styles.accountLeft}>
                        <Image source={require('../../../assets/icons/settings1.png')} style={[styles.accountLeftIcon,{width:18, height:18,marginTop:11}]} />
                        <View style={styles.alertsCenter}>
                          <Text style={[styles.accountCartTitle,{fontSize:14}]}>Coin is above $ 15.000</Text>
                          <Text style={styles.accountCartShort}>Created on 01.03.18</Text>
                        </View>
                      </View>
                      <Switch
                        style={{marginRight:10, alignSelf:'center'}}
                           onValueChange = {(val5)=>this.setState({val5})}
                           value = {this.state.val5}
                         />
                     </View>
                   </Swipeout>
                </View>
                <View style={{height:75}}></View>

            </ScrollView>
          }
          {!this.state.edit &&
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

              <Text style={[styles.titleText,{alignSelf:'center', fontSize:20, marginBottom:20}]}>$ 10.986,45</Text>

              <View style={[styles.blockRounded,{flexDirection:'column', paddingTop:0}]}>
        <View style={[styles.rows,styles.standaloneRowFront,{alignItems:'center'}]}>
                  <View style={styles.accountLeft}>
                    <Image source={require('../../../assets/icons/settings1.png')} style={[styles.accountLeftIcon,{width:18, height:18,marginTop:11}]} />
                    <View style={styles.alertsCenter}>
                      <Text style={[styles.accountCartTitle,{fontSize:14}]}>Coin is above $ 12.000</Text>
                      <Text style={styles.accountCartShort}>Created on 02.03.18</Text>
                    </View>
                  </View>
                  <Switch
                    style={{marginRight:10, alignSelf:'center'}}
                       onValueChange = {(val1)=>this.setState({val1})}
                       value = {this.state.val1}
                     />
                 </View>

                 <View style={[styles.alertsLine,{marginTop:0, marginBottom:0}]}></View>
                   <View style={[styles.rows,styles.standaloneRowFront,{alignItems:'center'}]}>
                   <View style={styles.accountLeft}>
                     <Image source={require('../../../assets/icons/settings3.png')} style={[styles.accountLeftIcon,{width:18, height:18,marginTop:11}]} />
                     <View style={styles.alertsCenter}>
                       <Text style={styles.accountCartShort}>Created on 01.03.18</Text>
                     </View>
                   </View>
                    <Switch
                     style={{marginRight:10, alignSelf:'center'}}
                     onValueChange = {(val2)=>this.setState({val2})}
                     value = {this.state.val2}
                    />
                  </View>
                  <View style={styles.alertsLine}></View>
                    <View style={[styles.rows,styles.standaloneRowFront,{alignItems:'center'}]}>
                    <View style={styles.accountLeft}>
                      <Image source={require('../../../assets/icons/settings3.png')} style={[styles.accountLeftIcon,{width:18, height:18,marginTop:11}]} />
                      <View style={styles.alertsCenter}>
                        <Text style={[styles.accountCartTitle,{fontSize:14}]}>Coin is below $ 9.000</Text>
                        <Text style={styles.accountCartShort}>Created on 01.03.18</Text>
                      </View>
                    </View>
                    <Switch
                      style={{marginRight:10, alignSelf:'center'}}
                         onValueChange = {(val3)=>this.setState({val3})}
                         value = {this.state.val3}
                       />
                   </View>
                   <View style={styles.alertsLine}></View>
                     <View style={[styles.rows,styles.standaloneRowFront,{alignItems:'center'}]}>
                     <View style={styles.accountLeft}>
                       <Image source={require('../../../assets/icons/settings1.png')} style={[styles.accountLeftIcon,{width:18, height:18,marginTop:11}]} />
                       <View style={styles.alertsCenter}>
                         <Text style={[styles.accountCartTitle,{fontSize:14}]}>Coin is above $ 13.000</Text>
                         <Text style={styles.accountCartShort}>Created on 01.03.18</Text>
                       </View>
                     </View>
                     <Switch
                       style={{marginRight:10, alignSelf:'center'}}
                          onValueChange = {(val4)=>this.setState({val4})}
                          value = {this.state.val4}
                        />
                    </View>

                    <View style={styles.alertsLine}></View>
                      <View style={[styles.rows,styles.standaloneRowFront,{alignItems:'center'}]}>
                      <View style={styles.accountLeft}>
                        <Image source={require('../../../assets/icons/settings1.png')} style={[styles.accountLeftIcon,{width:18, height:18,marginTop:11}]} />
                        <View style={styles.alertsCenter}>
                          <Text style={[styles.accountCartTitle,{fontSize:14}]}>Coin is above $ 15.000</Text>
                          <Text style={styles.accountCartShort}>Created on 01.03.18</Text>
                        </View>
                      </View>
                      <Switch
                        style={{marginRight:10, alignSelf:'center'}}
                        onValueChange = {(val5)=>this.setState({val5})}
                        value = {this.state.val5}
                        />
                     </View>
                </View>
                <View style={{height:75}}></View>
            </ScrollView>
          }
          </View>
          <BottomMenu type={this.state.addalert} popap={this.state.popap}/>
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
)(Alerts);
