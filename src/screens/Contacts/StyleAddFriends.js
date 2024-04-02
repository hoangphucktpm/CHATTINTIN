import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    
    container:{
        flex:1,
   
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
    containerText:{
        flex:0.8,
        justifyContent:'flex-end',
    },  
    text:{
        width:'100%',
        fontSize:24,
        padding:10,
        paddingLeft:10,
        color:"white"
    }, 
    containerBody:{
        flex:1,
    },
    containerBody_SearchFriend:{
        flex:0.4,
    },
    containerBody_SearchFriend_Input:{
        display:'flex',
        flexDirection:'row',
        flex:0.3,
        marginRight:10,
        marginBottom:10,
    },
    bottom:{
        padding:15,
        backgroundColor:'#1C86EE',
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
        flex:0.1,
    },
    itemFriend_avatar:{
        marginRight:15,
        marginLeft:20,
    },
    itemFriend_avatar_avatar:{
        width:50,
        height:50,
        borderRadius: 50,
    },
    containerBody_AcpFriends:{
        flex:0.6,
    },
    buttonAcp:{
        backgroundColor:"#B9D3EE",
        paddingLeft:10,
        paddingRight:10,
        paddingTop:10,
        paddingBottom:10,
    },
    containerIcon:{
        justifyContent:'flex-end',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:10,
    },
});
export default styles;