import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    
    containerTabBar:{
    height: "8%",
    padding:5,
    backgroundColor: '#1C86EE',
    display:'flex',
    flexDirection:'row',
    },
    containerBody:{
        display:'flex',
        flexDirection:'column',
        
    },
    containerBody_Top:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:'white',
        height:250,
        paddingTop:35,
    },
    containerBody_Top_Avt:{
      width: 200,
      height: 200,
      borderRadius: 100,
      display:'flex',
      backgroundColor: '#000',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      
    },
    containerBody_Top_Icon:{
        marginTop:30,
        display:'flex',
        flexDirection:'row',
        width:"80%",
        justifyContent:'space-around'

    },
    containerBody_Top_Icon_IconItem:{
        height:40,
        width:40,
        backgroundColor:'#DCDCDC',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:40,
    },
    containerBody_Top_Icon_IconText:{
        marginTop:5,
        justifyContent:'center',
        alignItems:'center',
    },
    containerBody_Top_Icon_Icon:{
        alignItems:'center',
    },
    containerBody_Mid_ChangeName:{
        display:'flex',
        flexDirection:'column',
        backgroundColor:'white',
        height:"60%",
    },
    containerBody_Mid_ChangeName_Item:{
        display:'flex',
        flexDirection:'row',
        height:60,
        padding:10,
    },
    containerBody_Mid_ChangeName_Item_Text:{
        display:'flex',
        flexDirection:'row',
        height:"100%",
        width:"85%",
        borderBottomWidth:1,
        borderColor:'grey',
        justifyContent:'space-between',
        alignItems:'center',
    },
    containerBody_Mid:{
        marginTop:10,
    },
    containerBody_Mid_File:{
        marginTop:10,
        display:'flex',
        flexDirection:'column',
        backgroundColor:'white',
        height:130,
    },
    containerBody_Mid_File_Item:{
        display:'flex',
        flexDirection:'row',
        height:50,
        padding:10,
    },
    containerBody_Mid_File_Item_Text:{
        display:'flex',
        flexDirection:'row',
        height:"100%",
        width:"85%",
        justifyContent:'space-between',
    },
    containerBody_Mid_File_Item_Img:{
        display:'flex',
        flexDirection:'row',
        height:"100%",
        width:"85%",
    },
    fileImg:{
        height:60,
        width:60,
        marginRight:5,
    },
    containerBottom:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        paddingRight:10,
        marginTop:30,
    },
    bottom:{
        flex:1,
        height:60,
        backgroundColor:'#1C86EE',
        marginBottom:100,
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
        marginRight:60,
        marginLeft:60,
    },
    
    
})
export default styles;