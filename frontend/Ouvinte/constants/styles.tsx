import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // img: {
  //   width: 200,
  //   height: 200
  // },

  listContainer: {
    flex: 1,
    backgroundColor: '#E5E1E1',
    padding: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',

  },

  fullImage: {
    width: '90%',
    height: '90%',
    borderRadius: 20
  },

  modalImage: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    flex: 1,
    backgroundColor: '#E5E1E1',
    alignItems: 'center',
    justifyContent: 'center'
  },

  title: {
    fontSize: 30,
    padding: 10,
    fontWeight: 'bold'
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#A7E7BD',
    borderRadius: 28,
    fontSize: 16,
    width: '100%',
    padding: 6,
    marginVertical: 10
  },

  formButton: {
    backgroundColor: '#56DD84',
    borderWidth: 1,
    borderRadius: 30,
    width: 210,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    marginTop: '10%'
  },
  formButtonRemoveVote: {
    backgroundColor: 'red',
    borderWidth: 1,
    borderRadius: 30,
    width: 'auto',
    padding: 10,
    margin: 10,
    alignItems: 'center',
    marginTop: '10%'
  },

  textButton: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold'
  },
  textButtonRemoveVote: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold'
  },

  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  subContainerr: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },

  linesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },

  line: {
    width: '45%',
    height: 1,
    backgroundColor: 'black',
    marginTop: 10
  },

  subText: {
    color: 'green'
  },

  optText: {
    color: 'green',
    margin: 6,
    fontSize: 16,
    padding: 16
  },
  infoText: {
    justifyContent: 'center',
    fontSize: 16,
    padding: 16,
    margin: 6
  },

  optContainer: {
    width: '80%',
    paddingBlockEnd: 10
  },

  betOption: {
    flexDirection: 'row',
    width: '80%',
    paddingBlockEnd: 10
  },

  map: {
    flex: 1,
    width: '100%'
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.0)'
  },

  button: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderRadius: 50,
    width: '30%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },

  navBar: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: '#56DD84',
    borderWidth: 1,
    borderRadius: 14,
    fontSize: 16,
    height: 50,
    width: '80%',
    padding: 10,
    margin: 10,
    justifyContent: 'space-between'
  },

  container1: {
    flex: 1,
    backgroundColor: '#F5EDED',
    padding: 20
  },

  title1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black'
  },

  // inputContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor: '#A8E6A1',
  //   borderRadius: 10,
  //   paddingHorizontal: 10,
  //   marginVertical: 10
  // },

  formInput: {
    flex: 1,
    marginLeft: 5
  },

  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#D0D0D0',
    borderRadius: 28,
    paddingHorizontal: 10,
    marginVertical: 8,
    justifyContent: 'space-between',
  },

  textAreaView: {
    height: 100,
    textAlignVertical: 'top',
    backgroundColor: '#D0D0D0',
    justifyContent: 'space-between'
  },

  typeComplaint: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#BFBEBE',
    borderRadius: 28,
    paddingHorizontal: 10,
    marginVertical: 10,
    height: 50
  },

  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: 'black'
  },

  text: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: 'black'
  },

  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },

  uploadButton: {
    backgroundColor: '#A7E7BD',
    borderRadius: 28,
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },

  uploadText: {
    marginTop: 10,
    fontSize: 16,
    color: 'black'
  },

  tipoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C4C4C4',
    borderRadius: 28,
    paddingHorizontal: 10,
    width: '100%',
    height: 50,
    marginVertical: 10
  },

  complainsTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#56DD84',
    borderRadius: 28,
    paddingHorizontal: 10,
    width: '100%',
    height: 50,
    marginVertical: 10
  },

  allComplaintsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 28,
    paddingHorizontal: 10,
    width: '100%',
    height: 50,
    marginVertical: 10
  },

  tipoText: {
    fontSize: 16,
    color: 'black'
  },

  typeText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold'
  },

  typeTextAll: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },

  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },

  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },

  modalItemText: {
    fontSize: 16,
    color: 'black'
  },

  modalCloseButton: {
    marginTop: 10,
    alignItems: 'center'
  },

  modalCloseText: {
    fontSize: 16,
    color: 'red'
  },

  submitButton: {
    backgroundColor: '#00C853',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },

  submitText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
})