import React, { Component } from "react";
import { login } from '../../actions/auth';
import { Actions } from 'react-native-router-flux';
import {
  Text,
  Image,
  TouchableHighlight,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  BackHandler
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

class Coin extends Component {
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
      open: false,
      connected: false,
      error:'',
      isModal: false,
      coin:{}
		};

	}

  _toggleModal = () =>
    this.setState({ isModal: !this.state.isModal });

  componentDidMount(){
    StatusBar.setHidden(true, 'none');
  }

  componentWillMount(){
    const {auth} = this.props


    BackHandler.addEventListener('hardwareBackPress', function() {
        Actions.prices();
        return true;
    });

//      api.coin_history({
      api.coin({
        'token':auth.token,
        'coin':'eth',
        'history':'1d'
      }).then((res)=>{
        console.log(res);
        if (res.success == true){
            coin = res.coin[0];
            this.setState({coin:coin})
        } else {
        }
      })






	}
  componentWillUnmount(){
    BackHandler.removeEventListener('hardwareBackPress', function() {
        Actions.prices();
        return true;
    });
	}
  componentWillReceiveProps (nextProps) {

	}

  render() {

    const {auth} = this.props
    const {coin} = this.state

    return (
        <View style={[styles.white,{backgroundColor:'rgb(224, 227, 236)'}]}>
          <View style={[styles.headerBigBlock2, {alignItems:'center'}]}>
            <View style={styles.rows}>
              <TouchableOpacity onPress={() => Actions.prices()}>
                <Image source={require('../../../assets/icons/arrow_left.png')} style={styles.topRightIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerBigBlockTitle}>
              <Text style={styles.headerBigBlockText}>{coin.symbol}</Text>
            </View>
            <View style={styles.rows}>
              <TouchableOpacity onPress={() => Actions.alerts()}>
                <Image source={require('../../../assets/icons/alert_icon.png')} style={styles.topRightIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.content,{top:0}]}>
              <View style={styles.coinPage}>
              <View style={styles.chartBlock}>
                <View style={styles.chartFull}>
                  <Image source={require('../../../assets/icons/chart2.png')} style={[styles.chartImg,{}]} />
                </View>
                <View style={styles.periods}>
                  <Text style={styles.periodText}>1D</Text>
                  <Text style={styles.periodText}>1W</Text>
                  <Text style={styles.periodText}>1M</Text>
                  <Text style={styles.periodText}>3M</Text>
                  <Text style={styles.periodText}>1Y</Text>
                  <Text style={styles.periodText}>ALL</Text>
                </View>
              </View>
              <View style={styles.buttonBlock}>
                  <TouchableOpacity onPress={() => Actions.buy()}  style={styles.buttonBuySell}>
                    <Text style={styles.buttonBuySellText}>BUY</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Actions.sell()}  style={styles.buttonBuySell}>
                    <Text style={styles.buttonBuySellText}>SELL</Text>
                  </TouchableOpacity>
              </View>
              <View style={styles.pricesBlock}>
                <View style={styles.priceLine}>
                    <Image source={require('../../../assets/icons/arrowup.png')} style={styles.priceLineArrow} />
                    <Text style={styles.priceLineText}>€ {functions.number_format(coin.price)}</Text>
                </View>
                <View style={styles.pricesTable}>
                    <View style={styles.pricesColumn}>
                      <Text style={styles.pricesColumnValueText}>€ {functions.number_format(coin.open)}</Text>
                      <Text style={styles.pricesColumnTitleText}>OPEN</Text>
                    </View>
                    <View style={styles.pricesColumn}>
                      <Text style={styles.pricesColumnValueText}>€ {functions.number_format(coin.high24h)}</Text>
                      <Text style={styles.pricesColumnTitleText}>24H HIGH</Text>
                    </View>
                    <View style={styles.pricesColumn}>
                      <Text style={styles.pricesColumnValueText}>€ {functions.number_format(coin.low24h)}</Text>
                      <Text style={styles.pricesColumnTitleText}>24H LOW</Text>
                    </View>
                </View>
              </View>
              <View style={styles.otherValuesBlock}>
                <View style={styles.otherValuesLine}>
                  <Text style={styles.otherValuesTitle}>MARKET CAP</Text>
                  <Text style={styles.otherValuesValue}>€{functions.number_format(coin.market_cap,0)}</Text>
                </View>
                <View style={styles.otherValuesLine}>
                  <Text style={styles.otherValuesTitle}>24 VALUE</Text>
                  <Text style={styles.otherValuesValue}>€{functions.number_format(coin.volume24h,0)}</Text>
                </View>
                <View style={styles.otherValuesLine}>
                  <Text style={styles.otherValuesTitle}>MAX SUPPLY</Text>
                  <Text style={styles.otherValuesValue}>{functions.number_format(coin.total_supply,0)} BTC</Text>
                </View>
              </View>
            </View>
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
)(Coin);
