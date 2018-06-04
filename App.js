import React from "react";
import App from "./js/App";
import { AppLoading, Asset, Font } from 'expo';

import {Image} from "react-native"
import {Dimensions} from 'react-native';
const window = Dimensions.get('window');

const splashImage = require("./assets/images/splash.png");

console.disableYellowBox = true;

function cacheImages(images) {
  return images.map(image => {
//    console.log(image);
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}



export default class App1 extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
      assetsAreLoaded:false
    };
  }
  async componentDidMount() {
    this._loadAssetsAsync();
  }

  async _loadAssetsAsync() {
  }

  render() {

    if (!this.state.isReady) {
      console.log('not ready');
          return (
            <AppLoading
              startAsync={this._loadAssetsAsync}
              onFinish={() => this.setState({ isReady: true })}
            />
          );
        }
        console.log('ready');
        return <App  />;
      }
}
