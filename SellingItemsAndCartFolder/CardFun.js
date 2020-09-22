import React from 'react';
import { Text, Dimensions, View, Image } from 'react-native';
import { Button, PricingCard, Avatar } from 'react-native-elements';
import { Card, } from 'native-base';


import { Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

import StepperComponant from './StepperComponant'
// screen sizing
const { width, height } = Dimensions.get('window');
import { CardFunStyle } from '../constants/AppStyles'
import { rtlView } from '../constants/Layout';
import { getLocalizedJsonName } from '../constants/ConvertJsonName';
import String from '../translation/Translate';
import { ImageUrl } from '../Redux1/Url';
// import {
//     CachedImage,
//     ImageCacheProvider,
//     ImageCacheManager,

// } from 'react-native-cached-image';

// import { Image } from 'react-native-expo-image-cache';
const SCREEN_WIDTH = width < height ? width : height;
const SCREEN_HEIGHT = width < height ? height : width;
const isSmallDevice = SCREEN_WIDTH;
const numColumns = isSmallDevice ? 2 : 3;
// item size
const PRODUCT_ITEM_HEIGHT = 250;
const PRODUCT_ITEM_OFFSET = 5;
const PRODUCT_ITEM_MARGIN = PRODUCT_ITEM_OFFSET * 2;

export default class CardFun extends React.PureComponent {
    // console('PAc',this.props.DisplayName)
    constructor(props) {
        super(props);
        this.state = {
            state: 'Java',
            //  image: this.props.picture.thumbnail
        }


        //console.log('URL', uri)


        // var rows = this.props.Packs.map((d, index) =>
        //     //  <StepperComponant clean={this.props.clean} onChange={(value) =>this.props.OnValueChange(d, value, index,this.props.id)} value={d.SelectedQuantity} key={index} name={d.packName} />
        //     <StepperComponant clean={this.props.clean} onIncrease={() => this.props.OnValueIncrease(d.Id, this.props.Id)}
        //         onDecrease={() => this.props.OnValueDecrease(d.Id, this.props.Id)} value={d.SelectedQuantity} key={index} name={getLocalizedJsonName(d.Title)} />

        // )
    }


    render() {
        //  let { image } = this.state;
        const preview = { uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" };
        const uri = ImageUrl + this.props.ImageUrl

        return (
            <Card style={[CardFunStyle.item, { backgroundColor: this.props.MissingPricingColor }]} pointerEvents={this.props.MissingPricingSelection} >


                <View >


                    <View style={CardFunStyle.imgContainer} >
                        {/* <Image style={CardFunStyle.img} uri={uri} /> */}
                        {this.props.ImageUrl == "" ?
                            <Avatar style={CardFunStyle.img} source={require('../assets/Project.png')} />
                            :
                             <Image style={CardFunStyle.img} source={{ uri: ImageUrl + this.props.ImageUrl }} />
                            // <ImageCacheProvider
                            //     //           urlsToPreload={images}
                            //     onPreloadComplete={() => console.log('hey there')}>
                            //     <CachedImage
                            //         style={CardFunStyle.img} source={{ uri: ImageUrl + this.props.ImageUrl }} />
                            // </ImageCacheProvider>
                            // <Image style={CardFunStyle.img} {...{  uri}} />
                        }
                    </View>

                    {this.props.Dicount != 0 &&

                        <View style={CardFunStyle.discountView}>

                            <View style={CardFunStyle.discountContainder}>
                                <Text style={CardFunStyle.discountAmount} >{this.props.Dicount}%</Text>
                                {/* <Text style={CardFunStyle.discountText}>{Translate.Offer}</Text> */}
                            </View>

                        </View>
                    }

                    {this.props.Dicount == 0 &&

                        <View style={CardFunStyle.NodiscountView}>
                            <View style={CardFunStyle.discountContainder}>
                                <Text style={CardFunStyle.discountAmount} />
                                {/* <Text style={CardFunStyle.discountText}>{Translate.Offer}</Text> */}
                            </View>

                        </View>}

                    {/* <Divider style={{ top: 5, height: 1.1, marginHorizontal: 2, backgroundColor: '#ebebe0' }} /> */}

                    <View style={CardFunStyle.nameCodeContainer}>
                        <Text style={{ fontWeight: "bold", paddingBottom: 5 }}>{this.props.ItemCode}</Text>
                        <Text style={CardFunStyle.nameText} numberOfLines={2}>{getLocalizedJsonName(this.props.DisplayName)}</Text>
                    </View>


                    {this.props.Dicount == 0

                        ?
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: "center" }}>
                            <Text style={{ fontSize: 15, paddingRight: 10, fontWeight: 'bold', color: 'green', }}>{this.props.itemprice}{String.LE} </Text>
                            {/* <View style={CardFunStyle.FavoView}>
                        <TouchableOpacity onPress={() => this.props.onFavorite(this.props.Id)} >
                            <Icon style={{ color: this.props.favoColor, flex: 1 }} name={this.props.favoName} size={22} />
                        </TouchableOpacity>
                    </View> */}
                        </View>

                        :
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: "center" }}>
                            <Text style={{ fontSize: 15, paddingRight: 10, fontWeight: 'bold', color: 'green', }}>{this.props.DicountPrice}{String.LE}   </Text>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#b40000', textDecorationLine: 'line-through' }}>{this.props.itemprice}{String.LE} </Text>
                            {/* <View style={CardFunStyle.FavoView}>
    <TouchableOpacity onPress={() => this.props.onFavorite(this.props.Id)} >
        <Icon style={{ color: this.props.favoColor, flex: 1 }} name={this.props.favoName} size={22} />
    </TouchableOpacity>
</View> */}
                        </View>
                    }

                    <Divider style={{ height: 1.1, marginHorizontal: 2, marginVertical: 10, backgroundColor: '#ebebe0' }} />

                    {this.props.isAddToCart &&
                        <View style={CardFunStyle.AddButtonIcon}>

                            <Button onPress={() => this.props.addCart(this.props.Id)} buttonStyle={{ flexDirection: 'row', backgroundColor: this.props.AddCartColor, width: "100%" }}

                                icon={
                                    <Icon
                                        name="shopping-cart"
                                        size={20}
                                        color="white"
                                    />
                                }
                                title={String.AddToCart}
                            />
                        </View>

                    }

                    <View style={{ flexDirection: 'row', justifyContent: 'center', color: 'gray' }}>


                        <View style={CardFunStyle.stockContainder}>
                            <Text style={CardFunStyle.stockText}>{String.Stock}: {this.props.RemainStock}</Text>
                        </View>
                        <View style={CardFunStyle.stockContainder}>
                            {/* {console.log("Lenth: ", getLocalizedJsonName(this.props.MainPack))} */}

                            <Text style={CardFunStyle.stockText} > {getLocalizedJsonName(this.props.MainPack)}</Text>
                        </View>

                    </View>
                    {this.props.isStepperView &&
                        <View style={CardFunStyle.stepperContain}>

                            {this.props.Packs.map((d, index) =>

                                <StepperComponant clean={this.props.clean} onIncrease={() => this.props.OnValueIncrease(d.Id, this.props.Id, d.SelectedQuantity)}
                                    onDecrease={() => this.props.OnValueDecrease(d.Id, this.props.Id)} value={d.SelectedQuantity} key={index} name={getLocalizedJsonName(d.Title)} />

                            )}
                        </View>

                    }

                </View>

            </Card>
        )
    }
}

