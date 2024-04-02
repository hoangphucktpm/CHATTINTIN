import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    
    text:{
        width:'100%',
        fontSize:24,
        padding:10,
        paddingLeft:30,
        color:"white"
    }, 
    container:{
        flex:1,
    },
    containerText:{
        flex:0.8,
        justifyContent:'flex-end',
    },  
    containerHeader :{
        display:'flex',
        width: '100%',
        flex:0.08,
        borderColor:'#ccc',
        borderWidth:1,
        flexDirection:'row',
        backgroundColor:'#0091ff'
    },
    containerIcon:{
        width:"8%",
        marginBottom:9,
        justifyContent:'flex-end',
        alignItems:'center',
        marginRight:5,
    },
    iconSeach:{
        margin: 'auto',
    },
    containerIconRight:{
        flex:0.2,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:"center"
    },
    containerIconAdd:{
        justifyContent:'flex-end',
    },
    containerBody:{
        flex:1
    },
    containerBody_Row:{
        display:'flex',
        flexDirection:"row",
        flex:0.5,
        alignItems:'center',

    },
    containerItem:{
        display:'flex',
        flexDirection:'row',
        flex:1,
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#ccc',
        flex:1,
    },
    itemFriend_avatar:{
        marginLeft:15,
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
    itemFriend_right:{
        marginLeft:20,
    },
   
   
    touchHightLight:{
        backgroundColor:'#fff',
        flex:1,
    },
   
    
    
   
    
});
export default styles