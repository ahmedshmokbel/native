import React from "react";
import { ActivityIndicator, StatusBar, View, I18nManager } from "react-native";
 import { connect } from "react-redux";
import String from "../translation/Translate";

class AuthLoadingScreen extends React.Component {
  
  constructor(props) {
    super(props);
    // this.props.dispatch(SignOut());



    //  Translate.setLanguage(this.props.lng)

    // console.log('rtl', this.props.rtl)

    //console.log('get', String.getLanguage())
    //I18nManager.forceRTL(this.props.rtl);
    // I18nManager.allowRTL(this.props.rtl);

    String.setLanguage(this.props.lng)

  }

  async componentDidMount() {
    //Translate.setLanguage('ar')


    // Translate.setLanguage()

    // console.log('rtl', I18nManager.isRTL)

    // console.log('get', Translate.getLanguage())


    let userToken = this.props.isLoggedIn;
    if (userToken === null) {
      userToken = false;
    }
    this.props.navigation.navigate('Menu');
    // this.props.navigation.navigate(
    //   userToken? "Menu" : "login"
    // );
    //  console.log('USerToken', userToken)
    // if (userToken === true) {
    //   //  this.props.navigation.navigate('Menu');

    //   this.props.navigation.navigate(
    //     this.props.userType == "sales" ? "Menu" : "Delivery"
    //   );

    // } else {
    //   this.props.navigation.navigate('login');
    // }

  }

  // Fetch the token from storage then navigate to our appropriate place

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  isLoggedIn: state.login.isLoggedIn,
  username: state.login.username,
  lng: state.settings.Lang,
  rtl: state.settings.RTL,
  userType: state.login.userType
});
export default connect(mapStateToProps)(AuthLoadingScreen);
  