import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    
    text:{
        width:'100%',
        fontSize:24,
        padding:10,
        paddingLeft:30,
        color:"white",
        fontWeight:'bold',
        textAlign:'center',
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
    
    containerInput:{
        flex:0.8,
        justifyContent:'center',
        alignItems:'center',
        marginLeft:10,
        shadowColor :'#000',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.25,
        shadowRadius:3.84,
        borderRadius:20,
        
    },
    input:{
        width:'90%',
        height:40,
        backgroundColor:'#0091ff',
        borderRadius:20,
        color:'#fff',
        paddingLeft:10,
    },


    iconSeach:{
        marginBottom:9,

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
        // khung bao ngoai hinh chu nhat
        borderColor:'#ccc',
        borderWidth:2,
        borderRadius:5,
        marginTop:5,
        // marginLeft:10,
        // marginRight:10,
        backgroundColor:'#fff',
        shadowColor :'#000',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.25,
        shadowRadius:3.84,

    },

    itemFriend_actions:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-end',
        flex:1,
        marginRight:10,
    },
    acceptButton:{
        borderRadius:5,
        padding:5,
        marginRight:5,
    },

    rejectButton:{
        borderRadius:5,
        padding:5,
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
        padding:10,
    },
    
   
    
});
export default styles;