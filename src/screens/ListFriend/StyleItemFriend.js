import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        paddingBottom:10,
        flexShrink: 0,
    },
    itemFriend_avatar:{
        marginRight:15,
        flexShrink: 0,
    },
    itemFriend_name:{
        fontSize:16,
        fontWeight:'bold',
        flexShrink: 0,
    },
    itemFriend_avatar_avatar:{
        width:50,
        height:50,
        borderRadius: 50,
        flexShrink: 0,
    },
    itemFriend_info:{
        display:'flex',
        flexDirection:'row',
        flexShrink: 0,
    },
    itemFriend_message:{
        justifyContent: 'center',
        flexShrink: 0,
    },
    itemFriend_content:{
        fontSize:12,
        color:'grey',
        flexShrink: 0,
    },
    itemFriend_time:{
        fontSize:12,
        color:'grey',
        flexShrink: 0,
    },
    itemFriend_right:{
        borderBottomWidth:1,
        borderBottomColor:'#ccc',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        flex:1,
        flexShrink: 0,
    },
    itemFriend_timeBlock:{
        justifyContent:'center',
        flexShrink: 0,
    },
    rowBack:{
        height:"100%",
        display:'flex',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingLeft:10,
        paddingBottom:15,
        borderRadius:5,
        flexShrink: 0,
    },
    touchHightLight:{
        backgroundColor:'#fff',
        flexShrink: 0,
    },
    rowBackRight:{
        height:"100%",
        width:200,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        flexShrink: 0,
    },
    rowBackRight_Left:{
        height:"100%",
        width:75,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#808080',
        flexShrink: 0,
    },
    rowBackRight_Mid:{
        height:"100%",
        width:75,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#ADDD1D',
        flexShrink: 0,
    },
    rowBackRight_Right:{
        height:"100%",
        width:75,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FF0000',
        flexShrink: 0,
    },
    txtItemRowBack:{
        color:'white',
        flexShrink: 0,
    }
});

export default styles;