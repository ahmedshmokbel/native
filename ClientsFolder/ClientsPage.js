import React, { useEffect } from 'react';
import { StyleSheet, Alert, Text, TouchableOpacity, View, FlatList, Image, ActivityIndicator, Platform, AppState } from 'react-native';

import { SearchBar, } from 'react-native-elements';

// import * as ImagePicker from 'expo-image-picker';
// import * as Permissions from 'expo-permissions';
import ClientCell from '../ClientsFolder/ClientCell';

import { connect } from 'react-redux'
import { GetPartiesAction, UpdatePartyImageAction } from '../Redux1/actions/PartiesActions';
import { rtlView } from '../constants/Layout';
import { getLocalizedJsonName, getLocalizedJsonInvoice } from '../constants/ConvertJsonName';
import { ItemsGroupStyle } from '../constants/AppStyles';
//import { GetItemsGroupsAction, NewPartySelectionAction, PartyItemsAction } from '../Redux1/actions/ItemsGroupsActions';
//import { getLocationAsync } from '../constants/LocationData';
import { DateTimeCustom } from '../constants/DateTime';
//import { CreationDataAction, GetInvoiceNumberAction } from '../Redux1/actions/InvoicesActions';
import String from '../translation/Translate'
 
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
            dataSource: [],
            location: null,
            errorMessage: null,
            isLocationModalVisible: false,
            appState: AppState.currentState
        };

        //  console.log(props.Parties)
    }


    // CheckLocationPermission = async () => {
    //     const permission = await Permissions.getAsync(Permissions.LOCATION);
    //     if (permission.status !== 'granted') {
    //         const newPermission = await Permissions.askAsync(Permissions.LOCATION);
    //         if (newPermission.status === 'granted') {
    //             //its granted.
    //         }
    //         if (status !== 'granted') {
    //             alert('Hey! You heve not enabled selected permissions');

    //         }
    //     }
    // };


    // CheckCamPermission = async () => {

    //     const permission = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);

    //     if (permission.status !== 'granted') {
    //         const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
    //         if (newPermission.status === 'granted') {
    //             //its granted.
    //         }
    //         if (status !== 'granted') {
    //             alert('Hey! You heve not enabled selected permissions');

    //         }
    //     }




    // };



    // componentWillUnmount() {
    //     AppState.removeEventListener('change', this.handleAppStateChange)
    // }
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
        console.log('WillUnmount', this._isMounted)
    }



    componentDidMount = async () => {
        this._isMounted = true;
        console.log('Didnmount', this._isMounted)

    //  t= await GetOrders(this.props.Token, this.props.userHeaderInfo)

        AppState.addEventListener('change', this.handleAppStateChange);

        // location = await getLocationAsync()
        // if (this._isMounted) {

        //     this.setState({
        //         location: location
        //     });
        // }
        this.props.dispatch(GetPartiesAction(this.props.Token, this.props.userHeaderInfo, this.props.navigation))
            .then((responseJson) => {
                if (this._isMounted) {
                    this.setState({
                        dataSource: this.props.Parties,

                    })
                }

            }).catch((error) => {
                console.error("Promise catch",error);
            });

        if (this._isMounted) {
            this.setState({
                dataSource: this.props.Parties,

            })
        }
        // this.CheckCamPermission()
        // this.CheckLocationPermission();
        // AppState.addEventListener('change', this.handleAppStateChange);
        this.props.dispatch(GetItemsGroupsAction(this.props.Token, this.props.userHeaderInfo));
    };




    // resize = async uri => {
    //     const manipResult = await ImageManipulator.manipulateAsync(
    //         uri,
    //         [{ resize: { width: 800 } }],
    //         {
    //             compress: 1,
    //             format: ImageManipulator.SaveFormat.JPEG
    //         }
    //     );
    //     return manipResult.uri;
    // };


    // _TakeImage = async (dataFromChild) => {
    //     var editedState = [...this.props.Parties]


    //     let filteredIndex = editedState.findIndex((obj => obj.PartyCode == dataFromChild));

    //     var selectedItem = editedState.filter(t => t.id == dataFromChild)

    //     let editedStateIndex = editedState[filteredIndex]



    //     //console.log('child', dataFromChild)

    //     await Permissions.askAsync(Permissions.CAMERA_ROLL);


    //     let result = await ImagePicker.launchCameraAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         aspect: [4, 3],
    //         allowsEditing: false,
    //     });

    //     editedStateIndex.ImageUrl = result.uri
    //     editedStateIndex.ImageGPSInfo = this.state.location
    //     //  this.props.picture.thumbnail
    //     //    console.log(result);

    //     if (!result.cancelled) {



    //         this.props.dispatch(UpdatePartyImageAction(editedState, this.props.userHeaderInfo.userId, this.props.userHeaderInfo.tenantId, this.props.Token, dataFromChild, this.state.location, result.uri))
    //         if (this._isMounted) {
    //             this.setState({ dataSource: editedState });
    //         }
    //     }
    // };



    _ViewItemsGroups = async (partyId, SectorId, PartyName) => {

        if (this.props.ItemsError == true) {


            //      location = await getLocationAsync()

            // console.log('PartyID', SectorId)
            if (this.props.PartyID == partyId) {

                this.props.dispatch(CreationDataAction(DateTimeCustom(), this.state.location, partyId))

                // if (this.props.PartyID == 0) {
                //   console.log('PartyID=0')

                //     this.props.dispatch(PartyItemsAction(this.props.MainItems, partyId, SectorId))
                // }


                this.props.navigation.navigate('Items', { PartyName: PartyName, PartyID: partyId, SectorID: SectorId })
            }
            else {
                if (this.props.PartyID !== 0) {


                    Alert.alert(
                        String.OtherParty,
                        String.OtherPartyMsg,
                        [
                            { text: String.Cancel, onPress: () => { return null } },
                            {
                                text: String.Confirm, onPress: () => {
                                    this.props.dispatch(NewPartySelectionAction())

                                    this.props.dispatch(CreationDataAction(DateTimeCustom(), location, partyId))

                                    //   PartyName = this.props.Parties.find(x => x.PartyCode == partyId).DisplayName
                                    this.props.dispatch(PartyItemsAction(this.props.MainItems, partyId, SectorId))

                                    this.props.navigation.navigate('Items', { PartyName: PartyName, PartyID: partyId, SectorID: SectorId })



                                }
                            },
                        ],
                        { cancelable: false }
                    )
                }
                else {
                    this.props.dispatch(NewPartySelectionAction())

                    this.props.dispatch(CreationDataAction(DateTimeCustom(), location, partyId))

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
        this.search.clear();
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


    fakefunction = () => {
        console.log('Fake Function')
        this.render()
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
        return (
            <View style={[rtlView()], {}} >
                <SearchBar lightTheme

                    inputStyle={{ textAlign: rtlView().textAlign }}
                    onChangeText={(text) => this.searchFilterFunction(text)}
                    onClear={(text) => this.searchFilterFunction('')}
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

                            renderItem={this.renderItem}

                            keyExtractor={i => i.RowNum.toString()}
                            //  refreshing={isRefreshing}
                            //  onRefresh={this.handleRefresh}
                            //    onEndReached={this.handleLoadMore}
                            onEndThreshold={0}
                            ItemSeparatorComponent={this.renderSeparator}

                        />}
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

    PartyID: 100,//state.itemGroups.PartyID,
    ItemsError:false,//state.itemGroups.Status,
    StatusMessage:"",// state.itemGroups.StatusMessage,
    userHeaderInfo: state.login.userHeaderInfo,
    tenantProfile: state.login.tenantProfile,


    MainItems:[]// state.itemGroups.mainItems,


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
        paddingBottom: 115
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
