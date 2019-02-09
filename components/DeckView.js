import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../utils/styles';

class DeckView extends Component {

  render() {
    const {navigation, decks} = this.props;
    const {title} = navigation.state.params;
    const questions = decks[title] ? decks[title].questions : null;

    return (
      <View style={[styles.container, styles.deckView]}>

        <View style={styles.deckViewHeader}>
          <Text style={styles.deckViewTitle} >{title}</Text>
          <Text style={styles.deckViewCards} >{questions.length} cards</Text>
        </View>

        <View style={styles.deckViewFooter}>
          <TouchableOpacity style={[styles.deckViewBtn, styles.deckViewBtn1]} onPress={
            () => { navigation.navigate('CardAdd', {title,questions}); }
          }>
            <Text style={[styles.deckViewBtnTxt, styles.deckViewBtn1Txt]}>Add Card</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.deckViewBtn, styles.deckViewBtn2, { opacity: !(questions.length > 0) ? 0.4 : 1 } ]}
            onPress={() => { navigation.navigate('CardQuiz', {title,questions}); }}
            disabled={ !(questions.length > 0) }>
            <Text style={[styles.deckViewBtnTxt, styles.deckViewBtn2Txt]}>Start Quiz</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }
}

function mapStateToProps(state) {
  return { decks: state };
}

export default connect(mapStateToProps)(DeckView);
