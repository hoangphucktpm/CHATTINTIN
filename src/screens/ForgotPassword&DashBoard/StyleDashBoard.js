import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center'
    },
    viewPager: {
        flex: 1,
        marginLeft:20,
        marginRight:20,
      },
      page: {
        alignItems: 'center',
      },
      containerBotton:{
        bottom:0,
        marginTop:30,
        height: 160,
    },
    bottonLogin:{
        paddingTop:20,
        paddingBottom:20,
        paddingRight:120,
        paddingLeft:120,
        backgroundColor:'#1E90FF',
        borderRadius:20,
        borderWidth:1,
        justifyContent:'center'
    },
    bottonRegister:{
        paddingTop:20,
        paddingBottom:20,
        paddingRight:120,
        paddingLeft:120,
        backgroundColor:'#EEE9E9',
        borderRadius:20,
        borderWidth:1,
        justifyContent:'center'
    }
});
export default styles;