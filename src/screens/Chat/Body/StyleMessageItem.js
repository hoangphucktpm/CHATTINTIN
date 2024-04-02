import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        paddingLeft:10,
        marginTop:15,
        marginBottom: 5,
    },
    container_Left_Img:{
        width:50,
        height:50,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center'
    },
    container_Right:{
        marginLeft:10,
        backgroundColor:"#fff",
        padding:10,
        borderRadius:10,
    },
    container_RightName:{
        marginLeft:10,
        backgroundColor:"#fff",
        padding:3,
        borderRadius:10,
        marginBottom:5,
    },
    container_Right_Time:{
        color:'#C9D5D5',
        fontSize:10,
        textAlign:'right'
    }

})

export default styles