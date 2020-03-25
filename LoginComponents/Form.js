import React, { Component } from 'react';
 
 import {
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions, 
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';

import UserInput from './UserInput';
import String from '../translation/Translate';
const WIDTH = Dimensions.get('window').width;



import IconPass from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,

    };
    this.showPass = this.showPass
  }

  showPass = () => {
    this.state.press === false
      ? this.setState({ showPass: false, press: true })
      : this.setState({ showPass: true, press: false });
  }

  render() {
    return (
      <View style={styles.container} >

        <View style={{ flex: 1 }}>
          <UserInput
            name='bank'
            placeholder={String.TenantName}
            autoCapitalize="characters"
            
            //returnKeyType={'done'}
            autoCorrect={false}
            Error={this.props.TenantError}

            onChangeText={this.props.onChangeTextTenant}
            value={this.props.TenantName}
          />

        </View>
        <View style={{ flex: 1 }}>
          <UserInput
            name='account'
            placeholder={String.UserName}
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false}
            Error={this.props.NameError}

            onChangeText={this.props.onChangeTextUser}
            value={this.props.username}
          />

        </View>

        <View style={{ flexDirection: 'row', position: "relative", flex: 1 }}  >
          <UserInput
            name='lock'
            secureTextEntry={this.state.showPass}
            placeholder={String.Password}
            returnKeyType={'done'}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={this.props.onChangeTextPass}
            Error={this.props.PassError}
            value={this.props.password}
          />
          {!this.props.PassError &&
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnEye}
              onPress={this.showPass}>
              <IconPass name={this.state.press == false ? 'eye-outline' : 'eye-off-outline'} size={23}
                style={styles.inputIcon}
                color={'black'} />
            </TouchableOpacity>
          }
        </View>

      </View>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    //flexDirection: 'column',
    flex: 2,
    alignItems: 'center',
    justifyContent: "space-between",
  },

  btnEye: {
    justifyContent: 'center',
    position: 'absolute',
    right: 30,
    zIndex: 99,
    top: 8,
  },
  iconEye: {

    color: 'black'
    //tintColor: 'rgba(0,0,0,0.2)',
  },
});