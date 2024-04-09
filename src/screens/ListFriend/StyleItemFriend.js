import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        paddingBottom:10,
    },
    itemFriend_avatar:{
        marginRight:15,
    },
    itemFriend_name:{
        fontSize:16,
        fontWeight:'bold',
    },
    itemFriend_avatar_avatar:{
        width:50,
        height:50,
        borderRadius: 50,
    },
    itemFriend_info:{
        display:'flex',
        flexDirection:'row',
    },
    itemFriend_message:{
        justifyContent: 'center',

    },
    itemFriend_content:{
        fontSize:12,
        color:'grey',
    },
    itemFriend_time:{
        fontSize:12,
        color:'grey',
    },
    itemFriend_right:{
        borderBottomWidth:1,
        borderBottomColor:'#ccc',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        flex:1,
    },
    itemFriend_timeBlock:{
        justifyContent:'center',
    },
    rowBack:{
        height:"100%",
        display:'flex',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:10,
        margin:5,
        borderRadius:5,
    },
    touchHightLight:{
        backgroundColor:'#fff'
    },
    rowBackRight:{
        height:"100%",
        width:225,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    rowBackRight_Left:{
        height:"100%",
        width:75,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#808080',
    },
    rowBackRight_Mid:{
        height:"100%",
        width:75,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#ADDD1D',
    },
    rowBackRight_Right:{
        height:"100%",
        width:75,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FF0000',
    },
    txtItemRowBack:{
        color:'white',
    }
});

export default styles;