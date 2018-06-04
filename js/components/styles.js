const React = require("react-native");

const { StyleSheet,Dimensions,Image } = React;
var WINDOW_WIDTH = Dimensions.get('window').width;
var WINDOW_HEIGHT = Dimensions.get('window').height;
console.log(WINDOW_WIDTH);
export default StyleSheet.create({
  global:{
    backgroundColor:'#929fbe',
  },
  editRightIcon:{
    right:0,
    marginBottom:3,
    alignSelf:'flex-end',
    width:12/27*15,
    height:12,
  },
  white:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height:WINDOW_HEIGHT,
    width:WINDOW_WIDTH,
    backgroundColor:'#fff'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height:WINDOW_HEIGHT,
    width:WINDOW_WIDTH,
    backgroundColor:'#929fbe'
  },
  button:{
    width:Math.round(WINDOW_WIDTH*0.75),
    height:Math.round(WINDOW_HEIGHT*0.1),
    backgroundColor:'#E7EDFB',
    marginBottom:10,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText:{
    color:'#62758C',
    fontWeight:'bold',
    fontSize:18
  },

  bigButtonBlueText:{
    color:'#fff',
    fontWeight:'bold',
    fontSize:22
  },


});
