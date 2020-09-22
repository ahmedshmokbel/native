// import React from "react";
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import { Badge, SearchBar } from "react-native-elements";
// import { Container, Header, Left, Body, Right, Button, Title, Segment, Content, Text } from 'native-base';

// import { View } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import { ItemsGroupStyle } from "./AppStyles";
// import { rtlView } from "./Layout";
// const HeaderSearch = (props) => {

//     return (
//         <Header androidStatusBarColor='#820000' style={{
//             flexDirection: 'row',
//             // height: 55,
//             backgroundColor: '#b40000',
//             shadowColor: "black",
//             shadowRadius: 5,
//             shadowOpacity: 0.1,
//             borderBottomColor: "grey",
//             paddingHorizontal: 14,
//             width: '100%',
//             justifyContent:"space-between",
//             shadowOffset: {
//                 height: 3,
//                 width: 0
//             }
//         }} >
//             <Left style={{flex:1}}>
//                 <TouchableOpacity  >
//                     <Ionicons
//                         onPress={props.leftNavigation}
//                         name={props.leftname}
//                         size={props.leftsize}
//                         style={{ color: "#ffffff", alignItems: 'center', paddingHorizontal: 10, }}
//                     />
//                 </TouchableOpacity>
//             </Left>
        
        
//             <Body style={{ flexDirection: 'row', flexBasis:'65%', backgroundColor: 'blue', alignItems: 'center',flex:1 }}>
               

//                     {/* <Title style={{ fontWeight: 'bold', justifyContent: 'center', color: "#ffffff", fontSize: 18 }}>{props.title}</Title> */}

//                     <SearchBar
//                         lightTheme inputContainerStyle={{ backgroundColor: 'white' }}  
//                         containerStyle={{ backgroundColor: "#b40000", borderBottomWidth: 0, borderTopWidth: 0,  flexBasis:'100%' }}
//                         inputStyle={ItemsGroupStyle.InputSearch}
//                      onChangeText={(text)=>this.props.onChangeText(text)}
//                       onClear={this.props.onClear} 
//                       placeholder={String.Search}
//                     value={this.props.search}
//                     />
               
//             </Body>
       
       
//             <Right style={{flex:1 , }}>


//                 <TouchableOpacity style={{}}>
//                     <Ionicons
//                         onPress={props.rightNavigation}
//                         name='md-search'
//                         size={28}
//                         style={{ color: "#ffffff",  paddingVertical: 5, paddingHorizontal: 3 }}
//                     />

//                 </TouchableOpacity>


//             </Right>
//         </Header>



//     )
// }
// export default HeaderSearch
