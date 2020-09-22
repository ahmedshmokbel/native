import React from 'react';
import { StyleSheet, Platform, Image, Text, TouchableOpacity, Dimensions, View } from 'react-native';
import { PricingCard, Button } from 'react-native-elements';
 

import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import { StepperStyle } from '../constants/AppStyles'
 

const WIDTH = Dimensions.get('window').width;
export default class StepperComponant extends React.Component {


    render() {
        return (
            <View style={StepperStyle.stepperContain}>
                <Text style={StepperStyle.stepperLable}>{this.props.name} </Text>
                <View style={StepperStyle.ButtonContain}>
                    <Button onPress={this.props.onDecrease}
                        icon={
                            <Icon2
                                name="minus"
                                size={18}
                                color="#b40000"
                            />
                        } buttonStyle={StepperStyle.Button} />

                    <Text style={{ marginHorizontal: 5, fontSize: 15 }} >{this.props.value}</Text>

                    <Button onPress={this.props.onIncrease}
                        icon={
                            <Icon
                                name="add"
                                size={18}
                                color="#b40000"
                            />
                        }

                        buttonStyle={StepperStyle.Button} />

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

