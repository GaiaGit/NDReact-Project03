
import { StyleSheet } from 'react-native';
import { pink, white, gray, lightGray, lightPurp, error, red, green } from '../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  adjustView: {
    flex: 1,
    width: '100%'
  },
  textInput: {
    padding: 15,
    borderRadius: 5,
    borderColor: lightGray,
    borderWidth: 1,
    borderStyle: 'solid',
    fontSize: 20,
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  textLabel: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  msgError: {
    backgroundColor: error,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 5,
    paddingLeft: 15
  },
  errorText: {
    color: white,
    margin: 5,
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '900'
  },
  submitBtn: {
    padding: 25
  },
  deckList: {
    padding: 20
  },
  deckCard: {
    padding: 10,
    borderWidth: 1,
    borderColor: lightGray,
    borderStyle: 'solid',
    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deckTitle: {
    fontSize: 20,
    color: gray,
    fontWeight: 'bold'
  },
  deckView: {
    margin: 20,
    borderWidth: 1,
    borderColor: lightGray,
    borderStyle: 'solid',
    borderRadius: 5,
    flex: 1,
    justifyContent: 'space-between'
  },
  deckViewHeader: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  deckViewTitle: {
    width: '100%',
    textAlign: 'center',
    paddingTop: 25,
    fontSize: 30,
    borderBottomColor: lightGray,
    borderBottomWidth: 1
  },
  deckViewCards: {
    fontSize: 20,
    color: gray
  },
  deckViewFooter: {
    width: '100%'
  },
  deckViewBtn: {
    padding: 20,
    borderRadius: 5
  },
  deckViewBtn1: {
    backgroundColor: lightGray,
    alignItems: 'center'
  },
  deckViewBtn2: {
    marginTop: 10,
    backgroundColor: pink,
    alignItems: 'center'
  },
  deckViewBtnTxt: {
    fontSize: 20,
  },
  deckViewBtn1Txt: {
  },
  deckViewBtn2Txt: {
    color: white
  },
  cardText: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  cardContent: {
    flex: 1,
    width: '100%'
  },
  flipCard: {
    flex: 1,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  flipCardFront: {
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  flipText: {
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    width: 80,
    height: 80,
  },
  flipCardBtn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25
  },
  cardBtn: {
    width: '100%',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    borderRadius: 5,
    textAlign: 'center',
    marginBottom: 10,
    height : 70,
    lineHeight: 70,
    justifyContent: 'center'
  },
  cardCorrectBtn: {
    backgroundColor: green
  },
  cardIncorrectBtn: {
    backgroundColor: red
  },
  cardBackBtn: {
    borderColor: 'gray',
    borderWidth: 2,
    borderStyle: 'solid',
    color: 'gray',
    height : 50,
    lineHeight: 50
  },
  cardRestartBtn: {
    backgroundColor: 'gray',
    height : 50,
    lineHeight: 50
  },
  cardFooter: {
    width: '100%',
    padding: 20
  },
  cardMainText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  cardCounterText: {
    fontSize: 26,
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 30
  },
  resultContainer: {
    width: '100%',
    alignItems: 'center'
  },
  resultMessage: {
    fontSize: 40,
    color: pink,
    marginBottom: 10,
    fontStyle: 'italic'
  },
  resultPercent: {
    width: '100%',
    textAlign: 'center',
    fontSize: 70,
    fontWeight: 'bold',
    borderColor: pink,
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 10,
    color: pink,
    padding: 0
  },
  scoreText: {
    padding: 20,
    width: '100%',
    alignItems: 'center'
  }
})
