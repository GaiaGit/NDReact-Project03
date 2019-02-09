import React, { Component } from 'react';
import { Text, TextInput, Button, View, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { addCard } from '../actions';
import { apiAddCard } from '../utils/api';
import { styles } from '../utils/styles';
import { Constants } from 'expo';
import { Entypo } from '@expo/vector-icons';
import { white } from '../utils/colors';

class CardAdd extends Component {

  state = {
    validData: 'init',
    question: '',
    answer: ''
  };

  saveCard = () => {
    const {navigation, dispatch} = this.props;
    const {question, answer} = this.state;
    const {title, questions} = navigation.state.params;
    const data = {title, questions, question, answer};

    dispatch(addCard(data));

    apiAddCard({
      deck: title,
      newCard: {question, answer}
    });

    this.props.navigation.goBack();
  }

  validateData = () => {
    if(this.state.question === '') {
      this.setState({validData: 'Please, enter your question'});
    } else if(this.state.answer === '') {
      this.setState({validData: 'Please, enter your answer'});
    } else {
      this.setState({validData: null}, this.saveCard);
    }
  }

  render() {

    const {question, answer, validData} = this.state;

    return (

      <View style={[styles.container, styles.center]}>
        <KeyboardAvoidingView behavior="padding" enabled style={styles.adjustView} >

          <Text style={styles.textLabel}>
            Add a new card to the deck
          </Text>

          <TextInput
            style={styles.textInput}
            maxLength={100}
            underlineColorAndroid="transparent"
            placeholder="Enter your question here"
            value={question}
            onChangeText={question => {
              this.setState({question});
          }}/>


          <TextInput
            style={styles.textInput}
            maxLength={100}
            underlineColorAndroid="transparent"
            placeholder="Enter the answer here"
            value={answer}
            onChangeText={answer => {
              this.setState({answer});
          }}/>

            <Button title="ADD CARD" style={styles.submitBtn} onPress={this.validateData} />

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
    );
  }
}

function mapStateToProps(state) {
  return { decks: state };
}

export default connect(mapStateToProps)(CardAdd);
