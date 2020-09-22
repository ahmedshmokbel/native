import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Badge,  } from "react-native-elements";
import { Container,SearchBar, Header, Left, Body, Right, Button, Title, Segment, Content, Text } from 'native-base';

import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
const HeaderCustom = (props) => {

    return (
        <Header androidStatusBarColor='#820000' style={{
            flexDirection: 'row',
            // height: 55,
            backgroundColor: '#b40000',
            shadowColor: "black",
            shadowRadius: 5,
            shadowOpacity: 0.1,
            borderBottomColor: "grey",
            paddingHorizontal: 14,
            width: '100%', justifyContent: 'space-evenly',
            shadowOffset: {
                height: 3,
                width: 0
            }
        }} >
            <Left>
                <TouchableOpacity underlayColor='rgba(73,182,77,0.9)'  >
                    <Ionicons
                        onPress={props.leftNavigation}
                        name={props.leftname}
                        size={props.leftsize}
                        style={{ color: "#ffffff", alignItems: 'center', paddingHorizontal: 10,   }}
                    />
                </TouchableOpacity>
            </Left>
            <Body>
                
           
                <Title style={{ fontWeight: 'bold', justifyContent: 'center', color: "#ffffff", fontSize: 18 }}>{props.title}</Title>


            </Body>
            <Right>
                {
                    props.isRight == false ?
                        <View></View>
                        : <View >
                            <TouchableOpacity underlayColor='rgba(73,182,77,0.9)' style={{}}>
                                <Ionicons
                                    onPress={props.rightNavigation}
                                    name={props.rightname}
                                    size={props.rightsize}
                                    style={{ color: "#ffffff", paddingVertical: 5 ,paddingHorizontal:3}}
                                />
                                {props.length > 0 &&
                                    <Badge

                                        badgeStyle={{ backgroundColor: '#cac6c6', borderWidth: 1, borderEndColor: '#fff' }}
                                        textStyle={{ color: "#b40000", fontWeight: "bold" }}
                                        containerStyle={{
                                            position: "absolute",
                                            top: 1,
                                            right: 0,

                                        }}
                                        value={props.length}
                                    />}
                            </TouchableOpacity>
                        </View>
                }
            </Right>
        </Header>



    )
}
export default HeaderCustom 
