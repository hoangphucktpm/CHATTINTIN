import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        padding: 10,
    },
    foorter_left:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
    },
    footer_Right:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        flex:1,
    },
    input_Message:{
        width:210,
        marginLeft:10,
        height:26,
    }
})

export default styles