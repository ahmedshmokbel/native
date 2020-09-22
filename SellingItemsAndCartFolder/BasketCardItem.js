import React, { useState, useEffect } from "react";
import {  Image, Text,  View, Alert } from 'react-native';
  import { Card, } from 'native-base';
 
import BasketStepperComponant from './BasketStepperComponant'
import { rtlView } from '../constants/Layout';
import { BasketCardstyles } from '../constants/AppStyles';
import { getLocalizedJsonName } from '../constants/ConvertJsonName';
import String from '../translation/Translate';
import { ImageUrl } from '../Redux1/Url';
import { CalculatorInput } from 'react-native-calculator';

// screen sizing

const BasketCardItem = (props) => {

    const [value, setvalue] = useState(value);

    var rows = props.Packs.map((d, index) =>

        <BasketStepperComponant clean={props.clean} onIncrease={() => props.OnValueIncrease(d.Id, props.Id, d.SelectedQuantity)}
            onDecrease={() => props.OnValueDecrease(d.Id, props.Id)} value={d.SelectedQuantity} key={index} name={getLocalizedJsonName(d.Title)} />

    )

    return (
        <Card style={BasketCardstyles.item} >
            <View >
                <View style={BasketCardstyles.BigContainer} >
                    <View style={{ flexDirection: 'column', flexBasis: '50%' }}>
                        <View style={BasketCardstyles.imgContainer} >
                            {props.ImageUrl == "" ?
                                <Image style={BasketCardstyles.img} source={require('../assets/dreem.jpg')} />
                                :
                                <Image style={BasketCardstyles.img} source={{ uri: ImageUrl + props.ImageUrl }} />
                            }
                        </View>
                        {props.Dicount != 0 &&

                            <View style={BasketCardstyles.dicountView}>

                                <View style={BasketCardstyles.discountContainder}>
                                    <Text style={BasketCardstyles.discountText} >{props.Dicount}%</Text>
                                </View>

                                {/* <View style={BasketCardstyles.discountContainder}>
                                <Text style={BasketCardstyles.discountText}>+ Offer</Text>
                            </View> */}

                            </View>

                        }
                        <View style={BasketCardstyles.nameCodeContainer}>
                            {/* <Text>#:52552</Text> */}
                            <Text style={{ fontWeight: "bold" }}>{props.ItemCode}</Text>
                            <Text>{getLocalizedJsonName(props.DisplayName)}</Text>


                        </View>

                    </View>

                    <View style={BasketCardstyles.stepperContain}>

                        {rows}
                        <CalculatorInput
                            height={400}
                            modalAnimationType='fade'
                            fieldTextStyle={{ fontSize: 20 }}
                            fieldContainerStyle={{ height: 36 }}
                            value={props.OtherDis}//props.value
                            onTextChange={setvalue}
                            onChange={value => {
                                props.OnOtherDiscount(props.Id, value)

                            }}
                        />
                    </View>

                </View>

                <View style={BasketCardstyles.container}>


                    {props.Dicount == 0
                        ?
                        <View style={BasketCardstyles.PriceView}>

                            <Text style={{ fontSize: 16, marginRight: 10, fontWeight: 'bold', color: 'black', }}>{props.TotalPrice} {String.LE}</Text>
                            <Text style={{ fontSize: 16, marginRight: 10, fontWeight: 'bold', color: 'green', }}>{String.Net} : {props.NetPrice} {String.LE}</Text>

                        </View>
                        :

                        <View style={BasketCardstyles.PriceView}>
                            <View style={{ flexDirection: 'row' ,justifyContent:'space-between'}}>
                                <Text style={{ top: 1, fontSize: 14, marginRight: 10, fontWeight: 'bold', color: 'red', textDecorationLine: 'line-through' }}>{props.TotalPrice}{String.LE}</Text>
                                <Text style={{ fontSize: 16, paddingRight: 10, fontWeight: 'bold', color: 'black', }}>{props.TotalDiscount}{String.LE}</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 16, paddingRight: 10, fontWeight: 'bold', color: 'green', }}>{String.Net}: {props.NetPrice}{String.LE}</Text>
                            </View>
                        </View>
                    }
                </View>

            </View>




        </Card>
    )
}

export default BasketCardItem
