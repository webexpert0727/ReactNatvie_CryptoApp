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

class Contacts extends Component {
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
      searchText:'Search contact',
      currentItem:5

		};

	}

  componentDidMount(){
    StatusBar.setHidden(true, 'none');
  }


  componentWillMount(){

	}

  componentWillReceiveProps (nextProps) {

	}

  render() {

    const {auth} = this.props

    var items = [
      {title:'Contact 1', name:'John Smith', id:1},
      {title:'Contact 2', name:'John Smith', id:2},
      {title:'Contact 3', name:'John Smith', id:3},
      {title:'Contact 4', name:'John Smith', id:4},
      {title:'Contact 5', name:'John Smith', id:5},
      {title:'Contact 6', name:'John Smith', id:6},
    ]

    var last = {title:'Contact 7', name:'John Smith', id:7}

    return (
        <View style={styles.white}>
          <View style={styles.headerBigBlock}>
            <View style={styles.rows}>
              <TouchableOpacity onPress={Actions.pop}>
                <Image source={require('../../../assets/icons/arrow_left.png')} style={styles.topRightIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerBigBlockTitle}>
              <Text style={styles.headerBigBlockText}>CONTACTS</Text>
            </View>
            <View style={{width:50}}></View>
          </View>
          <View style={styles.searchBlock}>
            <View style={styles.searchInputBlock}>
              <Image source={require('../../../assets/icons/settings20.png')} style={styles.searchIcon} />
              <TextInput
                style={styles.searchTextInput}
                onChangeText={(searchText) => this.setState({searchText})}
                value={this.state.searchText}
                underlineColorAndroid='rgba(0,0,0,0)'
              />
            </View>
          </View>
          <View style={styles.content}>
            <ScrollView>
              <View style={[styles.blockRounded,{flexDirection:'column'}]}>
                {items.map(item => (
                  <TouchableWithoutFeedback  onPress={() => this.setState({'currentItem':item.id})} key={item.id}>
                    <View>
                      <View style={styles.currencyLine}>
                        <TouchableOpacity onPress={()=>Actions.conversation()} style={styles.currencyValues}>
                          <Text style={styles.currencyTitle}>{item.title}</Text>
                          <Text style={styles.currencyShort}>{item.name}</Text>
                        </TouchableOpacity>
                        {this.state.currentItem == 555 && (
                          <Image source={require('../../../assets/icons/settings19.png')} style={styles.currencyFlagIcon} />
                        )}
                      </View>
                      <View style={styles.currencyHorizontalLine}></View>
                      </View>
                  </TouchableWithoutFeedback>
                ))}
                <TouchableWithoutFeedback  onPress={() => this.setState({'currentItem':last.id})}>
                  <View style={styles.currencyLine}>
                    <View style={styles.currencyValues}>
                      <Text style={styles.currencyTitle}>{last.title}</Text>
                      <Text style={styles.currencyShort}>{last.name}</Text>
                    </View>
                    {this.state.currentItem == last.id && (
                      <Image source={require('../../../assets/icons/settings19.png')} style={styles.currencyFlagIcon} />
                    )}
                  </View>
                </TouchableWithoutFeedback>
              </View>
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
)(Contacts);
