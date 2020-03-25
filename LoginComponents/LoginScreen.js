import React, { Component } from 'react';
import {
  Text, TouchableOpacity, Animated,
  Easing, Alert, Dimensions, I18nManager, KeyboardAvoidingView, Keyboard, View, StyleSheet, ImageBackground, Platform
} from 'react-native';
import Logo from './Logo'
import Form from './Form';
import Navigation from '../navigation/NavigationService'

import ButtonSubmit from './ButtonSubmit';

import { connect } from 'react-redux'
import { LoginPress, LookUpsAction, GetProfilePicAction } from '../Redux1/actions/LoginActions';
import * as axios from "axios";

import { ChangeLanguage } from '../Redux1/actions/SettingsActions';

//import { Updates } from 'expo';
import String from '../translation/Translate';
import ZebraBTPrinter from "react-native-zebra-bt-printer";


import { Overlay, Button } from 'react-native-elements';
import RestingPassword from './RestingPassword';
import { LoginURL } from '../Redux1/Url';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;
const { width, height } = Dimensions.get('window');

const to_sec = 0;



class LoginScreen extends React.Component {



  TestPrinter = () => {
    ZebraBTPrinter.printLabel(
      "0C:61:CF:45:F6:40",
      1,
      `^XA^CWJ,E:TT0003M_.TTF^FS^XZ
      ^XA
      ^FO75,50^CI28^AJ,50,0
      ^F8^FD ايبكس سوليوشنز ^FS
      ^PQ1,0,1
      ^XZ`,
      'ddd',
      "sasa"
    )
      .then(result => {
        console.log(result);

        if (result === false) {
          Alert.alert("Print failed, please check printer connection");
        }
      })
      .catch(err => console.log(err.message));
  }



  constructor(props) {
    super(props);

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    // this._onPress = this._onPress;

    this.state = {
      isLoading: false,
      username: 'sales_011',
      password: 'Dream',
      tenantname: 'k001',
      EmpName: false,
      EmpPass: false,
      EmpTenant: false,


      userId: 0,
      PasswordResetCode: '',
      tenantId: 0,

      isRestLoading: false,
      check: false,
      Repassword: '',
      confirmPassword: '',
      isRest: false,
      EmpResPass: false,
      MatchPass: false,
      iconName: '',
      color: ''
    };



  }

  handleUnhandledTouches() {
    Keyboard.dismiss
    return false;
  }



  ArabicLang = () => {
    //   String.setLanguage('ar')
    //   this.props.dispatch(ChangeLanguage("ar", true))
    //   I18nManager.forceRTL(true);

    //   I18nManager.allowRTL(true);
    //  // Updates.reload()

    //  this.props.navigation.navigate("Auth")
    this.TestPrinter()
  }

  EnglishLang = () => {
    String.setLanguage('en')
    this.props.dispatch(ChangeLanguage("en", false))
    I18nManager.forceRTL(false);
    I18nManager.allowRTL(false);


    //   Updates.reload()
    //  this.props.navigation.navigate("Auth")

  }



  login = () => {
    //    Amplitude.logEvent('Login')

    const httpClient = axios.create();
    httpClient.defaults.timeout = 5000;
    httpClient.post(
      LoginURL + "TokenAuth/AuthenticateMobile",
      {
        "userNameOrEmailAddress": this.state.username,
        "password": this.state.password,
        "moduleCode": "MobileSalesApp",
        "tenancyName": this.state.tenantname,
      },
      {
        // responseType: "blob",
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/plain"
        }
      },

    )
      .then(resp => {
        //     console.log('ddd', resp);
        return resp.data.result;
      })
      .then(responseJson => {
        // console.log(resp.request.responseHeaders["Set-Cookie"]);
        console.log("responseJson", responseJson);


        if (responseJson.shouldResetPassword == false) {
          //   console.log('UserID', this.props.UserId);
          if (responseJson.success) {
            this.props.dispatch(LoginPress(responseJson.accessToken, responseJson.tenant, responseJson.userHeaderInfo, true, responseJson.userName, responseJson.tenantProfile, responseJson.userPermissions))
            this.props.dispatch(LookUpsAction(responseJson.accessToken, responseJson.userHeaderInfo))
            this.props.dispatch(GetProfilePicAction(responseJson.accessToken))

            Navigation.navigate('Auth')
          }
          else {
            alert("Login Failed", responseJson.errorMsg)
            // Toast.show({
            //   text: getLocalizedJsonName(obj.Status[0].StatusMessage),
            //   buttonText: 'Okay'
            // })
            console.log("Server Response", error);

          }
        } else {
          this.setState({ isRest: true, PasswordResetCode: responseJson.passwordResetCode, userId: responseJson.userId, tenantId: responseJson.tenant.Id })
        }




      }).catch((error) => {
        // handle error
        console.log("Login Catch error", error);
        alert("Login Failed !", error)

      })
      .finally(function () {
        // always executed
        //   console.log("error");

      });



  }




  reseting = async () => {

    console.log(this.state.userId, this.state.PasswordResetCode + '  ' + this.state.Repassword)
    await fetch(LoginURL + 'services/app/Account/ResetPassword',
      {

        headers: {
          "Content-Type": "application/json-patch+json",
          "accept": "text/plain",
          "Abp.TenantId": "87"

        },

        body: JSON.stringify({

          "userId": this.state.userId,
          "resetCode": this.state.PasswordResetCode,
          "password": this.state.Repassword,

        })
      })

      //  var obj = await ret.json();
      // axios.post(
      //   // "https://sago.mashreqgroup.com:5001/api/services/app/Account/ResetPassword",
      //   "https://sago.mashreqgroup.com:5001/api/services/app/Account/ResetPassword",
      //   {


      //     "userId": this.state.userId,
      //     "resetCode": this.state.PasswordResetCode,
      //     "password": this.state.Repassword,




      //   },
      //   {
      //     // responseType: "blob",
      //     headers: {
      //       "Content-Type": "application/json-patch+json",
      //       "accept": "text/plain",
      //       "Abp.TenantId":this.state.tenantId

      //     }
      //   },

      // )
      .then(resp => {
        console.log('ddd', resp);
        return resp.data.result;
      })
      .then(responseJson => {
        // console.log(resp.request.responseHeaders["Set-Cookie"]);
        console.log("responseJson", responseJson);

        if (responseJson.success) {

          this.setState({ isRest: false })

          // this.props.dispatch(LoginPress(responseJson.accessToken, responseJson.tenant, responseJson.userHeaderInfo, true, responseJson.userName, responseJson.tenantProfile, responseJson.userPermissions))
          // this.props.dispatch(LookUpsAction(responseJson.accessToken, responseJson.userHeaderInfo))
          // this.props.dispatch(GetProfilePicAction(responseJson.accessToken))

          // Navigation.navigate('Auth')

        }

        else {
          alert(responseJson.errorMsg)
          // Toast.show({
          //   text: getLocalizedJsonName(obj.Status[0].StatusMessage),
          //   buttonText: 'Okay'
          // })
        }


      }).catch(function (error) {
        // handle error
        console.log("Resting Catch error", error);


      })
      .finally(function () {
        // always executed
        //   console.log("error");

      });



  }



  GetValueFunction = () => {

    if (this.state.username === 'ahmed' && this.state.password === 'a') {


      this.props.dispatch(LoginPress(null, this.state.username))

      Navigation.navigate('Menu')

    } else {

      Alert.alert('Error login', `you enterd data are wrong`)
      // Alert.alert('Error login', `you enterd data are wrong : ${this.props.username}`)


    }


  }


  _onPress = () => {

    if (this.state.username != '' || this.state.password != '' || this.state.tenantname != '') {
      if (this.state.tenantname != '') {
        if (this.state.password != '') {
          if (this.state.isLoading) return;
          this.setState({ EmpName: false, isLoading: true });
          Animated.timing(this.buttonAnimated, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,
          }).start();

          setTimeout(() => {
            this._onGrow();
          }, 2000);

          setTimeout(() => {
            // Actions.secondScreen();
            this.login();
            this.setState({ isLoading: false, });
            this.buttonAnimated.setValue(0);
            this.growAnimated.setValue(0);

          }, 2300);
        }
        else {
          this.setState({ EmpPass: true })
        }
      }
      else {
        this.setState({ EmpTenant: true })
      }
    } else {

      this.setState({ EmpTenant: true, EmpPass: true, EmpName: true })
    }
  }



  _passwordValidation = (text) => {

    const { Repassword } = this.state;
    this.setState({ EmpPass: false, confirmPassword: text, check: true })

    if (text != Repassword) {
      this.setState({ MatchPass: false, iconName: 'close-circle-outline', color: 'red' })
    } else {
      if (text.length != 0) {
        this.setState({ MatchPass: true, iconName: 'check-circle-outline', color: 'green', confirmPassword: text })

      } else {
        this.setState({ check: false })

      }

    }
  }


  _onResetPass = () => {

    if (this.state.Repassword != '') {
      if (this.state.confirmPassword != '') {

        if (this.state.isRestLoading) return;
        this.reseting()


        this.setState({ EmpResPass: false, isRestLoading: true });

      }
      else {
        this.setState({ EmpResPass: true })
        // alert("ConPasswords don't match");

      }
    }
    else {
      this.setState({ EmpResPass: true })
    }

  }


  _onGrow = () => {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }

  render() {

    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });

    return (
      <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column' }} >

        <View style={styles.logo}>
          <Logo />
        </View>

        <View style={styles.form}>

          <Overlay
            isVisible={this.state.isRest}
            windowBackgroundColor="rgba(0, 0, 0, .8)"
            overlayBackgroundColor="#ffffff"
            width='90%'
            height='50%'
            overlayStyle={{ justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}
            onBackdropPress={() => this.setState({ isRest: false })}>
            <View style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 20, }}>
              <Text style={{ marginBottom: 60, fontSize: 25, fontWeight: "bold" }}>{String.ResetPassword}</Text>

              <RestingPassword placeholder={String.NewPassword} check={false} value={this.state.Repassword} onChangeText={(Repassword) => this.setState({ EmpPass: false, Repassword })} />

              <RestingPassword placeholder={String.ConfirmPass} check={this.state.check} color={this.state.color} iconName={this.state.iconName} MatchPass={this.state.MatchPass} value={this.state.confirmPassword} onChangeText={(confirmPassword) => this._passwordValidation(confirmPassword)} />

              <Button onPress={() => this._onResetPass()} buttonStyle={{ backgroundColor: '#b40000', paddingHorizontal: 40, paddingVertical: 9 }} title={String.Reset} />
            </View>
          </Overlay>

          <View style={{ flex: 2 }}>
            <Form NameError={this.state.EmpName} PassError={this.state.EmpPass} TenantError={this.state.EmpTenant}

              tenantname={this.state.tenantname} onChangeTextTenant={(tenantname) => this.setState({ EmpTenant: false, tenantname })}

              username={this.state.username} onChangeTextUser={(username) => this.setState({ EmpName: false, username })}

              password={this.state.password} onChangeTextPass={(password) => this.setState({ EmpPass: false, password })}
            />


            <ButtonSubmit onChangeScale={changeScale} onChangeWidth={changeWidth} isLoading={this.state.isLoading}
              onLogin={this._onPress} navigation={this.props.navigation} />
          </View>




          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', flex: 1 }}>
            <TouchableOpacity onPress={() => this.ArabicLang()}>
              <Text style={{ fontWeight: 'bold' }}  >العربيه</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.EnglishLang()}>
              <Text style={{ fontWeight: 'bold' }}> English</Text>



            </TouchableOpacity>
          </View>


          {/* <SignupSection /> */}
        </View>
      </KeyboardAvoidingView >
    );
  }
}

const styles = StyleSheet.create({


  // container: {
  //   width: width,
  //   height: height,
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: "center"
  // },
  logo: {
    flex: 2,
  },
  form: {
    flex: 3,
    justifyContent: "space-around",
    // alignItems:,
    paddingTop: 60
  },
  button: {
    flex: 1,
  }


})



const mapStateToProps = state => ({

  Tenent: state.login.tenant.id,
  Token: state.login.token,
  UserId: state.login.userHeaderInfo.userId,

  userHeaderInfo: state.login.userHeaderInfo,

  sec_StoreCode: state.login.userHeaderInfo.sec_StoreCode,
  sec_SalesPersonCode: state.login.userHeaderInfo.sec_SalesPersonCode,

  roleId: state.login.userHeaderInfo.roleId,
  orgUnitId: state.login.userHeaderInfo.orgUnitId,
  businessRefId: state.login.userHeaderInfo.businessRefId,
  // MainGroups: state.groups.Groups
})

export default connect(mapStateToProps)(LoginScreen)




// function login() {
//   Amplitude.logEvent('Login')

//   Axios.post(
//     "http://api.tibbah.com/api/login/Login",
//     {
//       userName: username,
//       password: password
//     },
//     {
//       headers: {
//         "Content-Type": "application/json"
//       }
//     }
//   )
//     .then(resp => {
//       //    console.log(resp.data);
//       return resp.data;
//     })
//     .then(responseJson => {
//       // console.log(resp.request.responseHeaders["Set-Cookie"]);
//       // console.log('aaaaaaaaaaaaaa')
//       //  console.log(responseJson);
//       props.dispatch(
//         setToken(
//           "token123",
//           responseJson.ID,
//           responseJson.ID,
//           responseJson.UserType,
//           responseJson.Children,
//           responseJson.NameAR,
//           responseJson.NameEN
//         )
//       );

//       props.navigation.navigate("HomeMain");
//     });
// }