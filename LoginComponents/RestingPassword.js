import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
 import { StyleSheet, View, TextInput, Dimensions, I18nManager, TouchableOpacity, Platform } from 'react-native';
 
import IconPass from 'react-native-vector-icons/MaterialCommunityIcons';

const WIDTH = Dimensions.get('window').width;
const RestingPassword = (props) => {
    const [showPass, setshowPass] = useState(true);
    const [press, setsPress] = useState(false);

    _showPass = () => {
        if (press == false) {
            setshowPass(false)
            setsPress(true)
        } else {
            setshowPass(true)
            setsPress(false)
        }

    }
    return (

        <View style={styles.container} >
            <View style={styles.inputWrapper}>
                <TextInput // {...props}
                    ref={props.ref}
                    value={props.value}
                    onChangeText={props.onChangeText}
                    style={styles.input}
                    placeholder={props.placeholder}
                    secureTextEntry={showPass}
                    //  autoFocus='true'
                    autoCorrect={props.autoCorrect}
                    autoCapitalize={props.autoCapitalize}
                    returnKeyType={props.returnKeyType}
                    placeholderTextColor="black"
                    underlineColorAndroid="transparent"
                />
            </View>
            <TouchableOpacity activeOpacity={0.7}
                onPress={this._showPass} style={styles.btnEye}>
                {props.check == false ?
                    <IconPass name={press == false ? 'eye-outline' : 'eye-off-outline'}
                        size={25} style={styles.inlineError} />
                    :
                    <IconPass name={props.iconName}
                        size={25} style={styles.inlineError, { color: props.color }} />}
            </TouchableOpacity>
        </View>

    );
}


RestingPassword.propTypes = {

    placeholder: PropTypes.string.isRequired,
    secureTextEntry: PropTypes.bool,
    autoCorrect: PropTypes.bool,
    autoCapitalize: PropTypes.string,
    returnKeyType: PropTypes.string,
};


const styles = StyleSheet.create({
    container: {
        position: "relative",

    },
    input: {
        backgroundColor: '#eee',
        width: '100%',
        height: 40,
        paddingLeft: 20,
        borderRadius: 5,
        marginBottom: 40,
        color: '#000',
        textAlign: I18nManager.isRTL ? 'right' : 'left'
    },
    inputWrapper: {
        flexDirection: 'row',
        position: "relative",
        width: '90%',
        height:40,
        marginBottom:20
    },
    btnEye: {
        position: 'absolute',
        right: 10,
        zIndex: 99,
        height: 40,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        top:2
    },
    inlineError: {
      
        color: 'black'
    },
});
export default RestingPassword