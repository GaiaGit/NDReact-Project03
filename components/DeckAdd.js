import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, KeyboardAvoidingView, Keyboard, Button } from 'react-native';
import { Constants } from 'expo';
import { Entypo } from '@expo/vector-icons';
import { white } from '../utils/colors';
import { styles } from '../utils/styles';
import { addDeck } from '../actions';
import { apiAddDeck } from '../utils/api';
import DeckView from './DeckView';

class DeckAdd extends Component {

  state = {
    deckName: '',
    validData: 'init'
  }

  errors = {
    empty: 'Please, input a deck name',
    minimum: 'Minimum 3 characters required',
    duplicate: 'Deck name already exists'
  }

// Validate deck name and set error message to display
  validateData = (deckname) => {
    this.setState({deckName: deckname});

    if (deckname === '' || deckname == null || deckname == undefined){
      this.setState({validData: this.errors.empty});
    }
    else if(deckname.length < 3){
      this.setState({validData: this.errors.minimum});
    }
    else {
      this.setState({validData: null});
    }
  }

// Save new deck to localStorage
  saveDeck = () => {
    const { decks, dispatch } = this.props;
    const deck = this.state;

    if (decks[deck.deckName]) {
      this.setState({validData: this.errors.duplicate});
    } else {

      const newDeck = {
        [deck.deckName]: {
          title: deck.deckName, questions: []
        }
      };

      dispatch(addDeck(newDeck));
      apiAddDeck(newDeck);
      this.setState({deckName: ''});
      this.props.navigation.navigate('DeckList');
    }
  }

  render() {

    const { deckName, validData } = this.state;

    return (
        <View style={[styles.container, styles.center]}>

          <Text style={styles.textLabel}>
            Enter the name of your new DECK
          </Text>

          <KeyboardAvoidingView behavior="padding" enabled style={styles.adjustView}>

            <TextInput
              style={styles.textInput}
              autoCapitalize="words"
              selectTextOnFocus={true}
              maxLength={25}
              underlineColorAndroid="transparent"
              placeholder="Deck name"
              value={deckName}
              onChangeText={ deckName => this.validateData(deckName) } />

            <Button title="CREATE DECK" disabled={ validData != null } onPress={this.saveDeck} />

            {
              validData != null && validData !== 'init'

              ? <View style={styles.msgError}>
                  <Entypo name='emoji-sad' size={26} color={white} />
                  <Text style={styles.errorText}>{ validData }</Text>
                </View>

              : null
            }

          </KeyboardAvoidingView>
        </View>
      )
    }
  }

function mapStateToProps(state) {
  return { decks: state };
}

export default connect(mapStateToProps)(DeckAdd);
