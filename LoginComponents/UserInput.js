import React, { Component } from 'react';
import PropTypes from 'prop-types';
 import { StyleSheet, View, TextInput, I18nManager,Dimensions, Platform } from 'react-native';
import IconName from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icon,} from 'native-base';
const WIDTH = Dimensions.get('window').width;
const UserInput = (props) => {

  return (
    <View style={styles.inputWrapper}>
      <IconName name={props.name} size={25} style={styles.inlineImg} />



      <TextInput // {...props}
        ref={props.ref}
        value={props.value}
        onChangeText={props.onChangeText}
        style={styles.input}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}
      //  autoFocus='true'
        autoCorrect={props.autoCorrect}
        autoCapitalize={props.autoCapitalize}
        returnKeyType={props.returnKeyType}
        placeholderTextColor="black"
        underlineColorAndroid="transparent"
      />
      {props.Error &&
        <Icon name={Platform.OS === "ios" ? "ios-close-circle" : "md-close-circle"}
          size={20} style={styles.inlineError} />
      }
    </View>
  );
}


UserInput.propTypes = {

  placeholder: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  returnKeyType: PropTypes.string,
};


const styles = StyleSheet.create({

  input: {
    backgroundColor: '#eee',
    width: WIDTH - 60,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 45,
    borderRadius: 5,
    marginBottom: 40,
    color: '#000',
    textAlign: I18nManager.isRTL ? 'right' : 'left'
  },
  inputWrapper: {
    flexDirection: 'row',
    position: "relative"
  },
  inlineImg: {
    position: 'absolute',
    zIndex: 99,
    left: 35,
    top: 7,
    fontSize: 20
  },
  inlineError: {
    //  position: 'absolute',
    // zIndex: 99,

    right: 50,
    top: 6,
    color: 'red'
  },
});
export default UserInput