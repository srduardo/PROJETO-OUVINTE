import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    img: {
        width: 200,
        height: 200,
    },

    container: {
        flex: 1,
        backgroundColor: '#E5E1E1',
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 30,
        padding: 10,
        fontWeight: 'bold',
    },
    formInput: {
        backgroundColor: '#A7E7BD',
        borderWidth: 1,
        borderRadius: 14,
        fontSize: 16,
        width: '80%',
        padding: 10,
        margin: 10,
    },

    formButton: {
        backgroundColor: '#A7E7BD',
        borderWidth: 1,
        borderRadius: 14,
        width: '40%',
        padding: 10,
        margin: 10,
        alignItems: 'center',
    },

    textButton: {
        fontSize: 24,
        color: 'black',
    },

    subContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        paddingBlockEnd: 10,
    },

    subText: {
        color: 'green',
    },

    optText: {
        color: 'green',
        margin: 6,
        fontSize: 16,
        padding: 16,
    },
    infoText: {
        justifyContent: 'center',
        fontSize: 16,
        padding: 16,
        margin: 6,

    },

    optContainer: {
        width: '80%',
        paddingBlockEnd: 10,

    },

    betOption: {
        flexDirection: 'row',
        width: '80%',
        paddingBlockEnd: 10,
    },
    map: {
        flex: 1,
        width: '100%',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
    },
    button: {
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },

})