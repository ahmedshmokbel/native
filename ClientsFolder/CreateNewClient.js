import React, { Component } from 'react';
 
import { StyleSheet, View, TextInput, Image } from 'react-native';
 import Icon from 'react-native-vector-icons/MaterialIcons';
 
export default class CreateNewClient extends React.PureComponent {

    render() {
        return (
          <View style={{alignItems:"center"}} >
            <Icon name={this.props.name} size={28}  />
            <TextInput // {...this.props}
              value={this.props.value}
             onChangeText={this.props.onChangeText}
           
              placeholder={this.props.placeholder}
              secureTextEntry={this.props.secureTextEntry}
              autoCorrect={this.props.autoCorrect}
              autoCapitalize={this.props.autoCapitalize}
              returnKeyType={this.props.returnKeyType}
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
            />

 
          </View>
        );
      }
    
}