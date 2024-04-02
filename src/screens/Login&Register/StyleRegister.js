import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    
    containerTabBar:{
    height: "8%",
    padding:5,
    backgroundColor: '#1E90FF',
    display:'flex',
    flexDirection:'row',
    },
    containerText:{
        height:"5%",
        backgroundColor:'#F5FFFA',
        justifyContent:'center',
        alignItems:'center',
    },
    containerInput:{
        marginTop:20,
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
    }
});

export default styles;