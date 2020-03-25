import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Header, Button, Badge, } from "react-native-elements";
import { View } from "react-native";
const HeaderCustom = (props) => {

    return (
        <Header style={{ flexDirection: 'row' }}
            placement="center"
            leftComponent={
                <Ionicons
                    onPress={props.leftNavigation}
                    name={props.leftname}
                    size={props.leftsize}
                    style={{ color: "#ffffff"  }}
                />
            }


            rightComponent={
                props.isRight == false ?
                    <View></View>
                    :
                    <View>
                        <Ionicons
                            onPress={props.rightNavigation}
                            name={props.rightname}
                            size={props.rightsize}
                            style={{ color: "#ffffff" }}
                        />
                        {props.length > 0 &&
                            <Badge

                                badgeStyle={{ backgroundColor: '#cac6c6', borderWidth: 1, borderEndColor: '#fff' }}
                                textStyle={{ color: "#b40000", fontWeight: "bold" }}
                                containerStyle={{
                                    position: "absolute",
                                    top: -7,
                                    right: -5,

                                }}
                                value={props.length}
                            />}

                    </View>

            }
            centerComponent={{
                text: props.title,
                style: { fontWeight: 'bold', color: "#ffffff", fontSize: 18 }
            }}
            containerStyle={{
                height: 87,
                backgroundColor: '#b40000',
                shadowColor: "black",
                shadowRadius: 5,
                shadowOpacity: 0.1,
                borderBottomColor: "grey",
                paddingHorizontal: 20,
                shadowOffset: {
                    height: 3,
                    width: 0
                }
            }}
            leftContainerStyle={{ paddingLeft: 5 }}
            rightContainerStyle={{}}
            centerContainerStyle={{}}
        />)
}
export default HeaderCustom 
