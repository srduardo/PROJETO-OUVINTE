import { StyleSheet } from "react-native";

export const styles = StyleSheet.create ({
    img:{
    width:250,
    height:250,
    },

    container:{
        flex: 1,
        backgroundColor:'#E5E1E1',
        alignItems: 'center',
        justifyContent: 'center',
    },

    title:{
        fontSize:30,
        padding:10,
        fontWeight: 'bold',       
    },  
    formInput:{
        backgroundColor:'#A7E7BD',
        borderWidth:1,
        borderRadius: 14,
        fontSize:16,
        width:'80%',
        padding:10,
        margin:10,
    },

    formButton:{
        backgroundColor:'#A7E7BD',
        borderWidth:1,
        borderRadius: 14,
        width:'40%',
        padding: 10,
        margin: 10,
        alignItems: 'center',
    },

    textButton:{
        fontSize:24,
        color: 'black',
    },  

    subContainer:{
        flexDirection:'row',
        justifyContent: 'space-between',
        width:'80%',
        paddingBlockEnd: 10,
    },

    subText:{
        color:'green',
    },

})