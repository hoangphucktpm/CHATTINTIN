import {Platform, StatusBar, StyleSheet} from 'react-native'
const styles = StyleSheet.create({
    container :{
        display:'flex',
        // width: '100%',
        height: "8%",
        borderColor:'#ccc',
        borderWidth:1,
        flexDirection:'row',
        backgroundColor:'#0091ff',
        justifyContent:'space-between',
        
    },
    container_left:{
        width:"70%",
        display: 'flex',
        flexDirection:'row',
        alignContent:'center',
    },
    containerIcon:{
        justifyContent:'flex-end',
        paddingTop:12 ,
        justifyContent:'center',
        width:"14%",
    },
    container_friend_Name:{
        paddingLeft:5,
        paddingTop:12,
        width:"88%",
        justifyContent:'flex-end',
        justifyContent:'center',


    },
    friend_Name:{
        color:'white',
        fontSize:24,

    },
    iconSeach:{
        margin: 'auto',
    },
    container_right:{
        display:'flex',
        flexDirection:'row',
        width:"30%",
        justifyContent:'space-around',
    },
    container_right_icon:{
        justifyContent:'flex-end',
        height:"100%",
        paddingBottom:8
    },
    button:{
        justifyContent:'center',
        alignItems:'center',
    },
    buttonMenu:{
        backgroundColor:'red',
    }
})

export default styles