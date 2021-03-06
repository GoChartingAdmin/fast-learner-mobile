import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  AppLoading, Asset, Font, Icon,
} from 'expo';

import store from './store';
import AppNavigator from './config/AppNavigator';
import NavigationService from './config/NavigationService';
import { AlertProvider } from './components/Alert';

EStyleSheet.build({
  $white: '#FFFFFF',
  $border: '#E2E2E2',
  $successGreen: '#28a745',
  $inputText: '#797979',
  $lightGray: '#F0F0F0',
  $darkText: '#343434',
  $primaryPurple: '#a65aff',
  // $outline: 1,
});

class App extends Component {
  state = {
    isLoadingComplete: false,
  }

  _loadResourcesAsync = async () => Promise.all([
    Asset.loadAsync([
      require('../assets/images/robot-dev.png'),
      require('../assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Icon.Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free
      // to remove this if you are not using it in your app
      // 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      'open-sans-regular': require('../assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
      'open-sans-semi-bold': require('../assets/fonts/OpenSans-SemiBold.ttf'),
    }),
  ]);

  _handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
    return (
      <Provider store={store}>
        <AlertProvider>
          <View style={{ flex: 1 }}>
            <AppNavigator
              ref={(navigatorRef) => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
          </View>
        </AlertProvider>
      </Provider>
    );
  }
}

export default App;
