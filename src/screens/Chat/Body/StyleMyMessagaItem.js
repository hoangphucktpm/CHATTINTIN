import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({
    containerC:{
        flex:1,
    },
    container:{
        display:'flex',
        flexDirection:'row',
        paddingRight:10,
        marginTop:20,
        justifyContent:'flex-end',
        flex:1,
    },
    container_Left_Img:{
        width:50,
        height:50,
        borderRadius:50,
        marginLeft:10,
    },
    container_Right:{
        marginLeft:10,
        backgroundColor:"#fff",
        padding:15,
        borderRadius:10,
        alignItems:'flex-end'
    },
    container_Right_Time:{
        color:'#C9D5D5',
        fontSize:10,
    }

})

export default styles