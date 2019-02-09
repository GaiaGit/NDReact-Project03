import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { DeckView } from './DeckView';
import { getDecks } from '../actions';
import { apiGetDecks } from '../utils/api';
import { styles } from '../utils/styles';

class DeckList extends Component {

  _keyExtractor = (item, index) => 'i'+ index;

  componentDidMount() {
    const {dispatch} = this.props;
    apiGetDecks().then(decks => dispatch(getDecks(decks)));
  }

  // reference: https://facebook.github.io/react-native/docs/flatlist

  _renderItem = ({item}) => (
    <View>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('DeckView', item)}>
        <View style={styles.deckCard}>

          <Text style={styles.deckTitle}>
            {item.title}
          </Text>
          <Text>
            { `Cards: ${item.questions && item.questions.length}` }
          </Text>

        </View>
      </TouchableOpacity>
    </View>
  );

  render() {
    const {decks} = this.props;

    return (
      <View style={styles.deckList}>
        <FlatList
          data={Object.values(decks)}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}/>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { decks: state };
}

export default connect(mapStateToProps)(DeckList);
