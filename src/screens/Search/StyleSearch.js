import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    input:{
        width:'100%',
        fontSize:18,
        padding:10,
    }, 
    containerInput:{
        width:"70%",
        justifyContent:'flex-end',
    },  
    container :{
        display:'flex',
        width: '100%',
        height:"10%",
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
        width:"22%",
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
    },
    containerIconAdd:{
        justifyContent:'flex-end',
        marginBottom:5,
    },
    containerIconQR:{
        justifyContent:'flex-end',
        marginBottom:10,
    },
});
export default styles