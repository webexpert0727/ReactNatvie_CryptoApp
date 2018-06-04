import React, { Component } from "react";
import { login } from '../../actions/auth';
import { Actions } from 'react-native-router-flux';
import {
  TouchableWithoutFeedback, Dimensions, Text, View, Image,TouchableHighlight,Platform,StyleSheet,TextInput,TouchableOpacity,StatusBar,ScrollView
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

class Chat extends Component {
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
    var items = [1,2,3,4,5,6,7,8,9,10]
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
            <View style={styles.headerBigBlockTitle}>
              <Text style={styles.headerBigBlockText}>CHAT</Text>
            </View>
            <View style={styles.rows}>
              <Image source={require('../../../assets/icons/search.png')} style={styles.topRightIcon} />
              <TouchableOpacity onPress={()=>Actions.contacts()}>
                <Image source={require('../../../assets/icons/plus.png')} style={styles.topRightIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.content}>
            <ScrollView>
{/*
              <Text style={styles.carouselTitle}>Recent Contacts</Text>
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
                */}
              <TouchableOpacity onPress={() => Actions.conversation()}>
                <View style={styles.chatBlock}>
                    <View style={styles.chatIconBlock}>
                      <Image source={require('../../../assets/icons/profile.png')} style={styles.chatIcon} />
                    </View>
                    <View style={styles.chatMessageBlock}>
                      <Text style={styles.chatTitleText}>Chatbot</Text>
                      <Text style={styles.chatMessage}>Lorem ipsum dolor</Text>
                    </View>
                </View>
              </TouchableOpacity>
              {items.map(item => (
                <TouchableOpacity onPress={() => Actions.conversation()} key={item}>
                  <View style={styles.chatSmallBlock}>
                      <View style={styles.chatSmallIconBlock}>
                        <Image source={require('../../../assets/icons/profile.png')} style={styles.chatSmallIcon} />
                      </View>
                      <View style={styles.chatSmallMessageBlock}>
                        <Text style={styles.chatSmallTitleText}>Chat {item}</Text>
                        <Text style={styles.chatSmallMessage}>Lorem ipsum dolor sit amet Lorem</Text>
                      </View>
                  </View>
                </TouchableOpacity>
            ))}
            <View style={{height:100}}></View>
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
)(Chat);
