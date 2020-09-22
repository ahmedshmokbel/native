import React, { useEffect } from 'react';
import { StyleSheet, Alert, Text, TouchableOpacity, View, FlatList, Image, ActivityIndicator, Platform, AppState } from 'react-native';

import { SearchBar, } from 'react-native-elements';

import ClientCell from '../ClientsFolder/ClientCell';
import ImagePicker from 'react-native-image-picker';

import { connect } from 'react-redux'
import { GetPartiesAction, UpdatePartyImageAction, ViewParties } from '../Redux1/actions/PartiesActions';
import { rtlView } from '../constants/Layout';
import { getLocalizedJsonName, getLocalizedJsonInvoice } from '../constants/ConvertJsonName';
import { ItemsGroupStyle } from '../constants/AppStyles';
import { GetItemsGroupsAction, NewPartySelectionAction, PartyItemsAction } from '../Redux1/actions/ItemsGroupsActions';
import { getLocationAsync, requestPermission } from '../constants/LocationData';
import { DateTimeCustom } from '../constants/DateTime';
import { CreationDataAction, GetInvoiceNumberAction } from '../Redux1/actions/InvoicesActions';
import String from '../translation/Translate'
import NetInfo, { NetInfoSubscription, NetInfoState } from '@react-native-community/netinfo';
import HeaderCustom from '../constants/HeaderCustom';
import { CheckConnectivity } from '../constants/constantsData';

class ClientsPage extends React.PureComponent {
    _isMounted = false;
    constructor(props) {
        super(props)

        this.state = {
            seed: 1,
            page: 1,
            users: [],
            isLoading: false,
            isRefreshing: false,
            search: '',
            searchInput: '',
            usersHo: [],
            isLoadingH: false,
            selectedItem: null,
            selected: null,
            state: 'Java',
            image: "",
            dataSource:[],
            location: null,
            errorMessage: null,
            isLocationModalVisible: false,
            appState: AppState.currentState,
            isConnected: true

        };

        //  console.log(props.Parties)
    //    this.props.dispatch(ViewParties());
        //console.log("constr", this.props.Parties);

    }



    handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!')
            //  getLocationAsync()
        }
        if (this._isMounted) {
            this.setState({ appState: nextAppState });
        }
    }

    componentWillUnmount() {

        this._isMounted = false;
        //   console.log('WillUnmount', this._isMounted)

    }

 

    componentDidMount = async () => {

        this._isMounted = true;
        requestPermission()

        AppState.addEventListener('change', this.handleAppStateChange);

        getLocationAsync().then(locations => {
            //    console.log("Client", locations);

            if (this._isMounted) {

                this.setState({
                    location: locations.latitude + ',' + locations.longitude
                });
            }

        }).catch(e => {
            console.log('Carch', e);

        })


        
            if (this._isMounted) {
           //     console.log("Client", this.props.Parties);

                this.setState({
                    dataSource: this.props.Parties,

                })
            }
        
    }



    _TakeImage = async (dataFromChild) => {


        CheckConnectivity().then(connected => {

            if (connected.isConnected && connected.isInternetReachable) {

                var editedState = [...this.props.Parties]


                let filteredIndex = editedState.findIndex((obj => obj.PartyCode == dataFromChild));

                var selectedItem = editedState.filter(t => t.id == dataFromChild)

                let editedStateIndex = editedState[filteredIndex]

                //console.log('child', dataFromChild)

                const options = {
                    quality: 1.0,
                    maxWidth: 500,
                    maxHeight: 500,
                    storageOptions: {
                        skipBackup: true,
                        path: 'images',
                        base64: false,
                    },
                };
                ImagePicker.launchCamera(options, (result) => {
                    console.log('response', this.state.location);

                    if (result.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (result.error) {
                        console.log('ImagePicker Error: ', result.error);
                    } else if (result.customButton) {
                        console.log('User tapped custom button: ', result.customButton);
                        alert(result.customButton);
                    } else {
                        const source = { uri: result.uri };
                        console.log('response', source);
                        editedStateIndex.ImageUrl = result.uri
                        editedStateIndex.ImageGPSInfo = this.state.location


                        this.props.dispatch(UpdatePartyImageAction(editedState, this.props.userHeaderInfo.userId, this.props.userHeaderInfo.tenantId, this.props.Token, dataFromChild, this.state.location, result.uri))
                        if (this._isMounted) {
                            this.setState({ dataSource: editedState });
                        }
                    }
                });

            }
            else {
                alert(String.NoInternet)
            }

        })

    };



    _ViewItemsGroups = async (partyId, SectorId, PartyName) => {

        if (this.props.ItemsError == true) {


            //enterted the same party 
            if (this.props.PartyID == partyId) {

                //    console.log('PartyID=0')
                this.props.dispatch(CreationDataAction(DateTimeCustom(), this.state.location, partyId))

                this.props.navigation.navigate('Items', { PartyName: PartyName, PartyID: partyId, SectorID: SectorId })
            }
            else {
                if (this.props.PartyID !== 0) {  //selected new party 


                    Alert.alert(
                        String.OtherParty,
                        String.OtherPartyMsg,
                        [
                            { text: String.Cancel, onPress: () => { return null } },
                            {
                                text: String.Confirm, onPress: () => {
                                    this.props.dispatch(NewPartySelectionAction())

                                    this.props.dispatch(CreationDataAction(DateTimeCustom(), this.state.location, partyId))

                                    //   PartyName = this.props.Parties.find(x => x.PartyCode == partyId).DisplayName
                                    this.props.dispatch(PartyItemsAction(this.props.MainItems, partyId, SectorId))

                                    this.props.navigation.navigate('Items', { PartyName: PartyName, PartyID: partyId, SectorID: SectorId })



                                }
                            },
                        ],
                        { cancelable: false }
                    )
                }
                else { //first time selection or after invoice
                    this.props.dispatch(NewPartySelectionAction())


                    this.props.dispatch(CreationDataAction(DateTimeCustom(), this.state.location, partyId))

                    //   PartyName = this.props.Parties.find(x => x.PartyCode == partyId).DisplayName
                    this.props.dispatch(PartyItemsAction(this.props.MainItems, partyId, SectorId))

                    this.props.navigation.navigate('Items', { PartyName: PartyName, PartyID: partyId, SectorID: SectorId })


                }
            }
        } else {
            Alert.alert(String.Error, getLocalizedJsonName(this.props.StatusMessage), [

                {
                    text: 'ok', onPress: () => {

                        {
                            this.props.dispatch(GetItemsGroupsAction(this.props.Token, this.props.userHeaderInfo));

                        }


                    }
                },
            ])
        }
    }


    clear = () => {
        if (this._isMounted) {
        this.setState({ dataSource: this.props.Parties, search: '' })
        }
    };





    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "90%",
                    ///backgroundColor: "#e1e1e1",
                    left: "5%"
                }}
            />
        );
    };





    renderItem = ({ item, index }) => {
        return (
            <View key={item.id}>

                <ClientCell
                    navigation={this.props.navigation}
                    onTakePhoto={this._TakeImage}
                    viewItemsGroup={this._ViewItemsGroups}

                    index={index}
                    {...item} />
            </View>

        )
    }



    searchFilterFunction = text => {
        if (this._isMounted) {
            this.setState({
                search: text
            });
        }
        console.log('Fake Function')

        const newData = this.props.Parties.filter(item => {
            const DisplayName = `${item.DisplayName.toUpperCase()}`;
            const PartyCode = `${item.PartyCode}`
            const SectorName = `${item.SectorName}`
            const TypeName = `${item.TypeName}`
            const GISName = `${item.GISName}`

            const textData = text.toUpperCase();
            return DisplayName.includes(textData) || PartyCode.includes(textData) || SectorName.includes(textData) || TypeName.includes(textData) || GISName.includes(textData); // this will return true if our itemData contains the textData
        });
        if (this._isMounted) {
            this.setState({
                dataSource: newData
            });
        }
    };


    render() {
        const { search, } = this.state;
        ///  console.log('Customers', this.props.Parties);


        return (
            <View style={[rtlView()], {}} >
                <HeaderCustom
                    isRight={false}
                    leftNavigation={() => this.props.navigation.openDrawer()}
                    leftname="md-menu"
                    title={String.Parties}
                    leftsize={33}
                // onChangeText={this.searchFilterFunction}
                // onClear={(text) => this.searchFilterFunction('')}
                // search={search}
                />

                <SearchBar lightTheme
                    inputContainerStyle={{ backgroundColor: 'white', }}// textAlign: rtlView().textAlign }}
                    onChangeText={(text) => this.searchFilterFunction(text)}
                    onClear={(text) => this.clear()}
                    containerStyle={{ borderTopColor: '#b40000', backgroundColor: '#b40000', }}
                    placeholder={String.Search}
                    value={search}
                />

                <View style={styles.topContainer}>
                    {this.props.visible &&
                        <View style={[ItemsGroupStyle.container, ItemsGroupStyle.horizontal]}>
                            <ActivityIndicator size="large" color="#b40000" />
                        </View>

                    }
                    {!this.props.visible &&

                        <FlatList
                            data={this.state.dataSource}
                            maxToRenderPerBatch={10}
                            renderItem={this.renderItem}

                            keyExtractor={i => i.RowNum.toString()}
                            //  refreshing={isRefreshing}
                            //  onRefresh={this.handleRefresh}
                            //    onEndReached={this.handleLoadMore}
                            onEndThreshold={0}
                            ItemSeparatorComponent={this.renderSeparator}

                        />
                    }
                </View>
            </View>
        );
    }
}




const mapStateToProps = state => ({
    Parties: state.parties.Parties,
    visible: state.parties.spinnerVisible,

    BpSectors: state.login.BpSectors,
    BpTypes: state.login.BpTypes,
    Tenent: state.login.tenant.id,
    Token: state.login.token,

    PartyID: state.itemGroups.PartyID,
    ItemsError: state.itemGroups.Status,
    StatusMessage: state.itemGroups.StatusMessage,
    userHeaderInfo: state.login.userHeaderInfo,
    tenantProfile: state.login.tenantProfile,


    MainItems: state.itemGroups.mainItems,


})


export default connect(mapStateToProps)(ClientsPage);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    topContainer: {
        paddingTop: 15,
        paddingBottom: 250
    },
    imgView: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20
    },
    img: {
        height: 80,
        width: 80,
        borderRadius: 50
    },
});











  // componentDidMount =  () => {
    //     // this.props.dispatch(GetPartiesAction(this.props.Token, this.props.userHeaderInfo, this.props.navigation));
    //     //this.props.dispatch({ type: GET_PARTIES_PENDING });
    //  //   console.log(this.props.Parties)
    //   //  var t =  GetParties(this.props.Token, this.props.userHeaderInfo)
    //     this.setState({ dataSource: this.props.Parties })
    //     //.then((response) => response.json())
    //     //     .then((responseJson) => {

    //     //         if (responseJson.unAuthorizedRequest == false && responseJson.success == true) {
    //     //             respArr = JSON.parse(responseJson.result)

    //     //             this.props.dispatch({ type: GET_PARTIES_SUCCESS, Payload: respArr });

    //     //             console.log(respArr)
    //     //             this.setState({

    //     //                 dataSource: respArr,
    //     //             });
    //     //         } else {

    //     //             this.props.dispatch({ type: SIGNOUT_REQUEST });
    //     //             this.props.navigation.navigate('Auth')
    //     //         }
    //     //     })
    //     //     .catch((error) => {
    //     //         console.error(error);
    //     //     });

    //     this.CheckCamPermission()
    //     this.CheckLocationPermission();
    //     AppState.addEventListener('change', this.handleAppStateChange);
    //     this.props.dispatch(GetItemsGroupsAction(this.props.Token, this.props.userHeaderInfo, this.props.navigation));
    // };
