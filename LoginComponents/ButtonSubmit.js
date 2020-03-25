import React, { Component } from 'react';
import PropTypes from 'prop-types';
 
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image, alert,
  Alert,
  View, createAppContainer, createSwitchNavigator, ActivityIndicator, Dimensions
} from 'react-native';
 
import String from '../translation/Translate'

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;



export default class ButtonSubmit extends Component {


  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      // TextInputValueHolder: this.state.username
    };

    // this.buttonAnimated = new Animated.Value(0);
    // this.growAnimated = new Animated.Value(0);
    // this._onPress = this._onPress.bind(this);
  }





  render() {

    return (
      <View style={styles.buttonContainer}>
        <Animated.View style={{ width: this.props.onChangeWidth }}>
          <TouchableOpacity navigation={this.props.navigation}

            style={styles.button}
            onPress={this.props.onLogin}
            activeOpacity={1}>
            {this.props.isLoading ? (
              <ActivityIndicator size="small" color="white" />

              // <Image source={require('../assets/loading.gif')} style={{ width: 24, height: 24 }} />
            ) : (
                <Text style={styles.text}>{String.Login}</Text>
              )}
          </TouchableOpacity>
          <Animated.View
            style={[styles.circle, { transform: [{ scale: this.props.onChangeScale }] }]}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingHorizontal: 60

  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b40000',
    height: MARGIN,
    borderRadius: 5,
    zIndex: 100,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#b40000',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 1,
    backgroundColor: '#b40000',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  image: {
    width: 24,
    height: 24,
  },
});