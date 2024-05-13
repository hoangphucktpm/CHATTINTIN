import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    container: {
        flex: 1,
        backgroundColor: "white",
     },
     containerIcon: {
        marginRight: 10,
        marginLeft: 10,
        justifyContent: "center",
        flexShrink: 0,
      },
      input: {
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
        color: "white",
        flexShrink: 0,
      },
      iconSeach: {
        margin: "auto",
        flexShrink: 0,
      },
      containerInput: {
        flex: 1,
        marginRight: 10,
        marginTop: 5,
        flexShrink: 0,
      },
    map: {
      ...StyleSheet.absoluteFillObject,
    }, 
    containerTabBar: {
        height: "8%",
        padding: 5,
        backgroundColor: "#0091ff",
        display: "flex",
        flexDirection: "row",
      },
});

export default styles;