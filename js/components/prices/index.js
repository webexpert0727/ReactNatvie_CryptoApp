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
import functions from '../../util/functions';
import language from '../../util/language';
import styles from "../styles";

import BottomMenu from '../bottommenu'

import * as authActions from '../../actions/auth';

class Prices extends Component {
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
      coins:[]

		};

	}

  _toggleModal = () =>
    this.setState({ isModal: !this.state.isModal });

  componentDidMount(){
    StatusBar.setHidden(true, 'none');
  }

  componentWillMount(){
    api.coins().then((res)=>{
      if (res.success == true){
          coins = res.coins;
          this.setState({coins:coins})
      } else {
      }
    })
	}

  componentWillReceiveProps (nextProps) {

	}
  nav(path){
    const {auth} = this.props

    if (!auth.isLoggedIn) {
      Actions.auth()
    } else {
      Actions.push(path)
    }

  }
  render() {

    const {auth} = this.props

    var items = this.state.coins
    return (
        <View style={styles.white}>
          <View style={styles.headerBigBlock}>
            <View style={styles.headerBigBlockTitle}>
              <Text style={styles.headerBigBlockText}>PRICES</Text>
            </View>
          </View>
          <View style={styles.content}>
            <ScrollView>
              {items.map(item => (
                <TouchableWithoutFeedback onPress={() => this.nav('coin')} key={item.name}>
                  <View style={styles.coinBigBlock}>
                    <View style={styles.coinHeader}>
                      <View style={styles.coinHeaderIconBlock}>
                        <Image source={{uri: item.logo}} style={styles.coinHeaderIcon} />
                      </View>
                      <View style={styles.coinHeaderTitleBlock}>
                        <Text style={styles.coinHeaderTitleText}>{item.name}</Text>
                        <Text style={styles.coinHeaderTitleText}>€ {functions.number_format(item.price)}</Text>
                      </View>
                      <View style={styles.coinHeaderProfitBlock}>
                        <Text style={styles.coinHeaderProfitText}>+{functions.number_format(item.change)} (+{functions.number_format(item.percent)}%)</Text>
                      </View>
                    </View>
                    <View style={styles.coinChartBlock}>
                      <Image source={require('../../../assets/icons/chart.png')} style={styles.coinChart} />
                    </View>
                    <View style={styles.coinVolume}>
                      <Text style={styles.coinVolumeTitleText}>Volume</Text>
                      <Text style={styles.coinVolumeValueText}>€{functions.number_format(item.volume)}</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
            ))}
            <View style={{height:50}}></View>

            </ScrollView>
          </View>


          <BottomMenu />
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
)(Prices);
