import React from 'react';
import { StyleSheet, Platform, Image, Text, TouchableOpacity, Dimensions, View } from 'react-native';
import { PricingCard, Button } from 'react-native-elements';
  
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
 

const WIDTH = Dimensions.get('window').width;
export default class BasketStepperComponant extends React.Component {


    render() {
        return (
            <View style={styles.stepperContain}>
                <Text style={styles.stepperLable}>{this.props.name} </Text>
                <View style={styles.ButtonContain}>
                    <Button onPress={this.props.onDecrease}
                        icon={
                            <Icon2
                                name="minus"
                                size={18}
                                color="#b40000"
                            />
                        } buttonStyle={styles.Button} />

                    <Text style={{ marginHorizontal: 5, fontSize: 18 }} >{this.props.value}</Text>

                    <Button onPress={this.props.onIncrease}
                        icon={
                            <Icon
                                name="add"
                                size={18}
                                color="#b40000"
                            />
                        }

                        buttonStyle={styles.Button} />

                </View>
                {/* <NumericInput

                    value={this.props.value}
                    onChange={this.props.onChange}
                    totalWidth={85} 
                    totalHeight={35}
                    iconSize={100}
                    step={1}
                    minValue={0}
                    valueType='real'
                    rounded
                    textColor='#B0228C'
                    iconStyle={{ color: 'black' }}
                    rightButtonBackgroundColor='#ebebe0'
                    leftButtonBackgroundColor='#ebebe0' /> */}
            </View>

        );
    }
}

const styles = StyleSheet.create({

    stepperContain: {
        flexDirection: 'row',

        alignItems: 'center',
        marginVertical: 5,
        justifyContent: "flex-end",
        paddingHorizontal: 5,


    },
    stepperLable: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontSize: 12
    },
    ButtonContain: {
        flexDirection: 'row',
        alignItems: 'center',



    },
    Button: {
        height: 35,
        width: 35,
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: '#eee',
        //      backgroundColor:'blue',
        // backgroundColor: 'rgba(0,0,0,0)',
     //   paddingVertical: 2,
        //color='black'

    }

});