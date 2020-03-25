import React, { Component } from 'react';
 
import {  StyleSheet, ImageBackground } from 'react-native';



export default class Wallpaper extends Component {
  render() {
    return (
      <ImageBackground source={require('../assets/loginbk.jpg')} style={styles.picture} >

        {this.props.children}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  picture: {
    flex: 1,
    width: '100%',
    height: null,
    //resizeMode: 'cover',
   },


  text: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 20,
  },
  logoContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    hight: 120,


  },
});