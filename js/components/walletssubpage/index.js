import React, { Component } from "react";
import { login } from '../../actions/auth';
import { Actions } from 'react-native-router-flux';
import {
  Text, View, Image,TouchableHighlight,Platform,StyleSheet,TextInput,TouchableOpacity,StatusBar,ScrollView,Alert
} from "react-native";

import Modal from "react-native-modal";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import api from '../../util/api';
import language from '../../util/language';
import functions from '../../util/functions';

import styles from "../styles";

import BottomMenu from '../bottommenu'

import * as authActions from '../../actions/auth';

class WalletsSubpage extends Component {
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

      coin:{symbol:''},
      transactions:[]

		};

	}

  _toggleModal = () =>
    this.setState({ isModal: !this.state.isModal });

  componentDidMount(){
    StatusBar.setHidden(true, 'none');
  }

  componentWillMount(){
    const {auth} = this.props

    api.coins_my({
      'token':auth.token,
    }).then((res)=>{
      if (res.success == true){
        console.log(res);
          coin = Object.assign({}, this.state.coin, res.coins[0]);
          this.setState({coin:coin})
      } else {
        Alert.alert(
          'ERROR',
          res.message
        )
      }
    })
console.log('api.wallet({');
      api.wallet({
        'token':auth.token,
        'symbol':'eth'
      }).then((res)=>{
        if (res.success == true){
          console.log(res);
            coin = Object.assign({}, this.state.coin, res);
            transactions = res.coin
            this.setState({coin:coin,transactions:transactions})
        } else {
          Alert.alert(
            'ERROR',
            res.message
          )
        }
      })
	}

  componentWillReceiveProps (nextProps) {

	}

  render() {

    const {auth} = this.props

    const {coin, transactions} = this.state

//console.log('console.log(coin);');
//    console.log(coin);

    return (
        <View style={styles.white}>
          <View style={styles.headerBigBlock}>
            <View style={styles.rows}>
              <TouchableOpacity onPress={() => Actions.pop()}>
                <Image source={require('../../../assets/icons/arrow_left.png')} style={styles.topRightIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerBigBlockTitle}>
              <Text style={styles.headerBigBlockText}>{coin.name}</Text>
            </View>
            <View style={styles.rows}>
              <TouchableOpacity onPress={() => Actions.deposit()}>
                <Image source={require('../../../assets/icons/right_icons2.png')} style={styles.topRightIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Actions.send()}>
                <Image source={require('../../../assets/icons/right_icons1.png')} style={styles.topRightIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.content}>
            <ScrollView>
              <View style={styles.coinSmallBlock}>
                  <View style={styles.coinSmallIconBlock}>
                    <Image source={{uri: coin.logo}} style={[styles.coinSmallIcon,{resizeMode: 'contain'}]} />
                  </View>
                  <View style={styles.coinSmallTitleBlock}>
                    <Text style={styles.coinHeaderTitleText}>{coin.name}</Text>
                    <View style={styles.rows}>
                      <Image source={require('../../../assets/icons/wallet-icon.png')} style={styles.coinSmallIconEmail} />
                      <Text style={styles.coinSmallTitleText}>{functions.number_format(coin.amount,8)}</Text>
                    </View>
                  </View>
                  <View style={styles.coinSmallRightBlock}>
                    <Text style={styles.coinHeaderTitleText}>€ {functions.number_format(coin.price)}</Text>
                    <Text style={styles.coinSmallRightTitleText}>€ {functions.number_format(coin.amount_eur)}</Text>
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
              <View style={styles.transactions}>
                {transactions.map(item => (
                  <View key={item.comment}>
                  <View style={styles.transaction}>
                    <Image source={require('../../../assets/icons/ebene_11.png')} style={styles.transactionIcon} />
                    <View style={styles.transactionIDDateBlock}>
                      <Text style={styles.transactionID}>Transferred {item.name}</Text>
                      <Text style={styles.transactionDate}>{item.comment}</Text>
                    </View>
                    <View style={[styles.transactionSum,{top:-8}]}>
                      <Text style={[styles.transactionSum2,{color:'rgb(44,51,77)'}]}>{item.amount} BTC</Text>
                      <Text style={[styles.transactionSum2,{alignSelf:'flex-end', color:'rgb(44,51,77)',opacity:0.7, right:0}]}>{item.status}</Text>
                    </View>
                  </View>
                  <View style={styles.transactionLine}></View>
                </View>
                ))}
                {/*
                <View style={styles.transactionLine}></View>
                  <View style={styles.transaction}>
                    <Image source={require('../../../assets/icons/ebene_11.png')} style={styles.transactionIcon} />
                    <View style={styles.transactionIDDateBlock}>
                      <Text style={styles.transactionID}>Recieved Bitcoin</Text>
                      <Text style={styles.transactionDate}>From Bitcoin address</Text>
                    </View>
                    <View style={[styles.transactionSum,{top:-8}]}>
                      <Text style={[styles.transactionSum2,{color:'rgb(44,51,77)'}]}>0,14672 BTC</Text>
                      <Text style={[styles.transactionSum2,{alignSelf:'flex-end', color:'rgb(44,51,77)',opacity:0.7, right:0}]}>Pending</Text>
                    </View>
                  </View>
                  <View style={styles.transactionLine}></View>
                    <View style={styles.transaction}>
                      <Image source={require('../../../assets/icons/ebene_11.png')} style={styles.transactionIcon} />
                      <View style={styles.transactionIDDateBlock}>
                        <Text style={styles.transactionID}>Sold Bitcoin</Text>
                        <Text style={styles.transactionDate}>Using EUR Wallet</Text>
                      </View>
                      <View style={[styles.transactionSum,{top:-8}]}>
                        <Text style={[styles.transactionSum2,{color:'rgb(44,51,77)'}]}>-0,4069268 BTC</Text>
                        <Text style={[styles.transactionSum2,{alignSelf:'flex-end', color:'rgb(44,51,77)',opacity:0.7, right:0}]}>-$ 4.560,16</Text>
                      </View>
                    </View>
                    <View style={styles.transactionLine}></View>
                      <View style={styles.transaction}>
                        <Image source={require('../../../assets/icons/ebene_11.png')} style={styles.transactionIcon} />
                        <View style={styles.transactionIDDateBlock}>
                          <Text style={styles.transactionID}>Transfer Bitcoin</Text>
                          <Text style={styles.transactionDate}>To GDAX</Text>
                        </View>
                        <View style={[styles.transactionSum,{top:-8}]}>
                          <Text style={[styles.transactionSum2,{color:'rgb(44,51,77)'}]}>-0,14672 BTC</Text>
                          <Text style={[styles.transactionSum2,{alignSelf:'flex-end', color:'rgb(44,51,77)',opacity:0.7, right:0}]}>-$1.363,58</Text>
                        </View>
                      </View>
                      <View style={styles.transactionLine}></View>
                        <View style={styles.transaction}>
                          <Image source={require('../../../assets/icons/ebene_11.png')} style={styles.transactionIcon} />
                          <View style={styles.transactionIDDateBlock}>
                            <Text style={styles.transactionID}>Sold Bitcoin</Text>
                            <Text style={styles.transactionDate}>Using EUR Wallet</Text>
                          </View>
                          <View style={[styles.transactionSum,{top:-8}]}>
                            <Text style={[styles.transactionSum2,{color:'rgb(44,51,77)'}]}>-0,14672 BTC</Text>
                            <Text style={[styles.transactionSum2,{alignSelf:'flex-end', color:'rgb(44,51,77)',opacity:0.7, right:0}]}>-$1.363,58</Text>
                          </View>
                        </View>
                        */}
              </View>
              <View style={{height:200}}></View>
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
)(WalletsSubpage);
