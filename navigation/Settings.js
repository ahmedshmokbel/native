import React from 'react';
import { StyleSheet, I18nManager, Text, View } from 'react-native';
import { Header, Button, Card, List, ListItem, Badge, Icon, withBadge, ThemeProvider, SearchBar } from "react-native-elements";
  
import { ChangeLanguage } from '../Redux1/actions/SettingsActions';
import { connect } from 'react-redux'
import { getLocalizedJsonName } from '../constants/ConvertJsonName';
// import RNRestart from 'react-native-restart';
// import { Updates } from 'expo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import String from '../translation/Translate';
import { DateDay } from '../constants/DateTime';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import { rtlView } from '../constants/Layout';
import { RolePermission } from '../constants/constantsData';
import HeaderCustom from '../constants/HeaderCustom';

class Settings extends React.Component {



    ArabicLang = () => {
        this.props.dispatch(ChangeLanguage("ar", true))
        I18nManager.forceRTL(true);
        String.setLanguage('ar')
        I18nManager.allowRTL(true);
  //      Updates.reload()

        //  this.props.navigation.navigate("Auth")

    }

    EnglishLang = () => {
        this.props.dispatch(ChangeLanguage("en", false))
        I18nManager.forceRTL(false);
        I18nManager.allowRTL(false);

        String.setLanguage('en')
     //   Updates.reload()
        //  this.props.navigation.navigate("Auth")

    }


    GUID = () => {
        const uuidv4 = require('uuid/v4')
        const uniqueInsuranceId = uuidv4()

        console.log(DateDay())
    }
    render() {

        const preview = { uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" };
        const uri = "https://firebasestorage.googleapis.com/v0/b/react-native-e.appspot.com/o/b47b03a1e22e3f1fd884b5252de1e64a06a14126.png?alt=media&token=d636c423-3d94-440f-90c1-57c4de921641";
        return (

            <View style={styles.container}>

                <HeaderCustom
                    isRight={false}
                    leftNavigation={() => this.props.navigation.openDrawer()}
                    leftname='md-menu'
                    title={String.Settings}
                    leftsize={25}
                    
                />
 
                    
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button buttonStyle={{ backgroundColor: '#b40000' }} title='English' onPress={() => this.EnglishLang()} />

                    <Button title='العربيه' buttonStyle={{ backgroundColor: '#b40000' }} onPress={() => this.ArabicLang()} />

                    {/* <Button onPress={() => this.GUID()} />*/}


                    {/* <Text>{RolePermission("Pages.MobileSalesApp.invoices.delivery", this.props.userPermissions)}</Text> */}
                </View>
                {/* <Text>Open up App.js to start working on your app!</Text>
                <Image style={{ height: 100, width: 100 }} {...{ preview, uri }} /> */}
            </View>
        );
    }
}


const mapStateToProps = state => ({

    Tenent: state.login.tenant.id,
    Token: state.login.token,
    UserId: state.login.userHeaderInfo.userId,
    lng: state.settings.Lang,
    userPermissions: state.login.userPermissions
})

export default connect(mapStateToProps)(Settings);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
