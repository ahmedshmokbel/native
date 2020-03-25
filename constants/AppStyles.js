import { StyleSheet, Platform, Dimensions, I18nManager } from "react-native";
import { rtlView } from "./Layout";
const { width, height } = Dimensions.get('window');

const SCREEN_WIDTH = width < height ? width : height;
const SCREEN_HEIGHT = width < height ? height : width;
const isSmallDevice = SCREEN_WIDTH;
const PRODUCT_ITEM_HEIGHT = 250;
const PRODUCT_ITEM_OFFSET = 5;
const PRODUCT_ITEM_MARGIN = PRODUCT_ITEM_OFFSET * 2;

export const CardFunStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#ecf0f1',
    },
    item: {
        flexDirection: 'row',
        textAlign: "center",
        margin: PRODUCT_ITEM_OFFSET,
        overflow: 'visible',
        borderRadius: 4,
        //borderColor: 'grey',
        width: (SCREEN_WIDTH - PRODUCT_ITEM_MARGIN) / 2 -
            PRODUCT_ITEM_MARGIN,
        padding: 10,
        flexDirection: 'column',
        backgroundColor: 'white',
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, .2)',
                shadowOffset: { height: 0, width: 0 },
                shadowOpacity: .3,
                shadowRadius: 10,
            },
            android: {
                elevation: 1,
            },
        }),
    },
    imgContainer: {
        alignItems: 'center'
    },
    img: {
        height: 180, width: 143
    },
    FavoView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingTop: 8
    },
    discountView: {
        //flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        marginBottom: 10,
        backgroundColor: "#b40000",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderBottomEndRadius: 12
    },
    NodiscountView: {
        //flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        marginBottom: 10,
        backgroundColor: "transparent",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderBottomEndRadius: 12
    },
    discountContainder: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        textAlign: "center"
    },
    discountText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: 'bold',
        lineHeight: 11
    },
    discountAmount: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
        lineHeight: 12,
        marginRight: 5
    },
    stockContainder: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stockText: {
        color: '#a5a5a5',
        fontSize: 15,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    nameCodeContainer: {
        flex: 1,
        paddingBottom: 10,
        alignItems: 'center',
        textAlign: "center",
        justifyContent: 'center'
    },
    nameText: {
        flex: 1,
        textAlign: "center",
        justifyContent: 'center',
        fontSize: 14,
        lineHeight: 16, 
        minHeight: 40,
    },
    stepperContain: {
        top: 5,
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepperLable: {
        alignItems: 'center',
        fontSize: 15
    },

    AddButtonIcon: { flexDirection: 'row', marginBottom: 5, justifyContent: 'center' }
})



export const StepperStyle = StyleSheet.create({

    stepperContain: {
        flex: 1,
        flexDirection: 'row',
        //width: '100%',
        alignItems: 'center',
        marginVertical: 5,
        justifyContent: "space-between",
        //paddingHorizontal: 5,
    },
    stepperLable: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontSize: 14,
        flex: 1
    },
    ButtonContain: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 2,
        justifyContent: "flex-end"
    },
    Button: {
        height: 35,
        width: 35,
        borderRadius: 20,

        alignItems: 'center',
        backgroundColor: '#eee',
        //paddingVertical: 2,

    }

});



export const ItemsGroupStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        alignItems: "center",
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
    listContainer: {
        flex: 1,
        padding: PRODUCT_ITEM_OFFSET
    },
    InputSearch: {
        textAlign: rtlView().textAlign,
        ...Platform.select({
            ios: {
               
                paddingVertical: 14

            },
            android: {
                paddingVertical: 11
            },
        }),
    }
});


export const BasketStyle = StyleSheet.create({
    container: {
        backgroundColor: "#f2f2f2",
        flexDirection: 'column',
        height: '100%',

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
    listContainer: {
        flex: 1,
        padding: PRODUCT_ITEM_OFFSET,
    }
});





export const BasketCardstyles = StyleSheet.create({

    item: {
        flex: 1,
        direction: I18nManager.isRTL ? 'rtl' : 'ltr',
        borderRadius: 3,
        borderColor: 'grey',
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        // alignItems: "flex-start",
        marginHorizontal: 15,
        width: "96%",
        left: "2%",
        padding: 10

    },
    BigContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: "space-between",
        //  padding: 15
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        flexBasis: "100%",
        paddingHorizontal: 5,
    },

    imgContainer: {
        marginRight: 5
    },
    img: {

        height: 130, width: 143
    },
    stepperContain: {
        flexBasis: '50%'
    },
    discountContainder: {
        // flexDirection: 'row-reverse',
        // padding: 3,
        // backgroundColor: 'red',

    },
    dicountView: {
        flexDirection: 'row',
        alignItems: "center",
        marginBottom: 10,
        width: 143,
        backgroundColor: "#b40000",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderBottomEndRadius: 12,
        textAlign: "center",
        justifyContent: "center"
    },
    NodicountView: {
        flexDirection: 'row',
        alignItems: "center",
        marginBottom: 10,
        width: 143,
        backgroundColor: "white",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderBottomEndRadius: 12,
        textAlign: "center",
        justifyContent: "center"
    },
    discountText: {
        flex: 1,
        justifyContent: "center",
        flexDirection: 'row',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 10,
        textAlign: "center"

    },
    stockContainder: {
        flexDirection: 'row-reverse',
        paddingHorizontal: 3,
        backgroundColor: '#5ab6d6',
        alignItems: 'flex-start',


    },
    stockText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
        textAlignVertical: 'center'

    },
    nameCodeContainer: {
        padding: 3,
        top: 5,
        alignItems: 'flex-start',
        flexShrink: 1,
        marginBottom: 10
    },
    PriceView: {
        flex: 1, 
       // flexDirection: 'row',
        textAlign: "center",
        justifyContent: "space-between",
     //   alignItems:'flex-end'

    }
    ,
    stepperLable: {
        alignItems: 'center',
        fontSize: 15
    }
});





export const  ComponentStyles = StyleSheet.create({
    drawerTransprent: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    drawer: {
        flex: 1,
        justifyContent: "space-between",
        backgroundColor: 'white',
        paddingBottom: 30
    },
    header: {
        width: '100%',
        height: 200,
        backgroundColor: '#6195ff',
        alignItems: 'center',
        justifyContent: 'center'

    },
    headerImage: {
        borderRadius: 100
    },

    row: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingLeft: 10
    },
    menu: {
        width: 10,
        height: 10,
        backgroundColor: 'red',
        alignSelf: 'center',
        borderRadius: 50
    },
    text: {
        fontSize: 20,
        marginTop: 5,
        marginLeft: 5,
        color: '#111'
    },
    line: {
        width: '90%',
        height: 1,
        backgroundColor: 'gray',
        alignSelf: 'center',
        margin: 15
    },






    container: {
        flex: 1,
        backgroundColor: 'lightgray'
    },




    link: {
        flex: 1,
        fontSize: 20,
        margin: 5,
        paddingLeft: 14,
        padding: 6,
        textAlign: 'left'
    },
    topLinks: {
        height: 150,
        backgroundColor: '#b40000',
        paddingHorizontal: 20

    },
    bottomLinks: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 10,
        paddingBottom: 450
    },
    profile: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#777777'
    },
    profileText: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    name: {
        fontSize: 17,
        paddingBottom: 5,
        color: 'white',
        textAlign: 'left'

    },
    tenant: {
        fontSize: 15,
        paddingBottom: 5,
        color: 'white',
        textAlign: 'left'

    },

    imgView: {
        flex: 1,
        marginRight: 30
    },
    img: {
        height: 75,
        width: 75,
        // borderRadius: 40
        padding: 1
    },
    footer: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
        borderBottomColor: 'yellow'

    },
    description: {
        flex: 1,
        marginLeft: 20,
        fontSize: 16
    },
    version: {
        flex: 1,
        textAlign: 'right',
        marginRight: 20,
        color: 'gray'
    },
    scroll: {
        flex: 1,
    }
})