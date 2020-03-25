import React, { Component } from 'react';
 import { StyleSheet, View, Text, Image, ImageBackground, Animated, Keyboard, Platform } from 'react-native';
import { bold } from 'ansi-colors';
import { rtlView } from '../constants/Layout';
import String from '../translation/Translate'


export default class Logo extends Component {

  // componentWillMount() {
  //   this.props.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.props.keyboardWillShow);
  //   this.props.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.props.keyboardWillHide);
  // }

  // componentWillUnmount() {
  //   this.keyboardWillShowSub.remove();
  //   this.keyboardWillHideSub.remove();
  // }


  render() {
 //   console.log("fff", this.props.keyboardHeight)
    return (
      <ImageBackground source={require('../assets/bg.jpg')} style={[rtlView()], styles.container} >
        <View style={[styles.container]}>
          <Image source={require('../assets/logo.png')} />
          <Text style={styles.subTitle}>{String.Proceed}</Text>
          <Text style={styles.text}>{String.Login}</Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',


    ...Platform.select({
      ios: {
        paddingVertical: 30,
      },
      android: {
        paddingVertical: 30,
      },
    }),
  },
  image: {
    //width: "auto",
    height: 70
  },
  subTitle: {
    color: 'white',
    marginBottom: 15,

  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: 'transparent',
    //marginTop: 20,
  },


  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',

  }
});