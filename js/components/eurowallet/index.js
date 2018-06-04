import React, { Component } from "react";
import { login } from '../../actions/auth';
import { Actions } from 'react-native-router-flux';
import {
  Text, View, Image,TouchableHighlight,Platform,StyleSheet,TextInput,TouchableOpacity,StatusBar,ScrollView
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

class EuroWallet extends Component {
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

      transactions:[],
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

    api.wallet_euro({
      'token':auth.token,
    }).then((res)=>{
      if (res.success == true){
          coin = {'amount':res.euro};
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

    const {transactions, coin} = this.state

    return (
        <View style={styles.white}>
          <View style={styles.headerBigBlock}>
            <View style={styles.rows}>
              <TouchableOpacity onPress={() => Actions.wallets()}>
                <Image source={require('../../../assets/icons/arrow_left.png')} style={styles.topRightIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.headerBigBlockTitle}>
              <Text style={styles.headerBigBlockText}>EURO WALLET</Text>
            </View>
            <View style={{width:50}}>
            </View>
          </View>
          <View style={styles.content}>
            <ScrollView>
              <View style={[styles.euBlock]}>
                  <Image source={require('../../../assets/icons/circle.png')} style={styles.euIcon} />
                  <Text style={styles.euTitle}>Wallet</Text>
                  <Text style={styles.euValue}>€ {functions.number_format(coin.amount)}</Text>
              </View>
              <View style={styles.buttonBlock}>
                <TouchableOpacity onPress={() => Actions.eurodeposit()}  style={styles.buttonBuySell}>
                  <Text style={styles.buttonBuySellText}>DEPOSIT</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Actions.withdraw()}  style={styles.buttonBuySell}>
                  <Text style={styles.buttonBuySellText}>WITHDRAW</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.transactions}>
                {transactions.map(item => (
                <View key={item.id}>
                  <View style={styles.transaction}>
                    <Image source={require('../../../assets/icons/ebene_11.png')} style={styles.transactionIcon} />
                    <View style={styles.transactionIDDateBlock}>
                      <Text style={styles.transactionID}>Transferred {item.name}</Text>
                      <Text style={styles.transactionDate}>{item.comment}</Text>
                    </View>
                    <View style={[styles.transactionSum,{top:-8}]}>
                      <Text style={[styles.transactionSum2,{color:'rgb(44,51,77)'}]}>{functions.number_format(item.amount)} eth</Text>
                      <Text style={[styles.transactionSum2,{alignSelf:'flex-end', color:'rgb(44,51,77)',opacity:0.7, right:0}]}>{item.status}</Text>
                    </View>
                  </View>
                  <View style={styles.transactionLine}></View>
                </View>
              ))}
              </View>
              <View style={{height:45}}></View>
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
)(EuroWallet);
