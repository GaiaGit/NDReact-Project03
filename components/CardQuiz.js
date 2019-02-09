import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PieChart from 'react-native-pie-chart';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import { styles } from '../utils/styles';

// Reference:
// https://github.com/browniefed/examples/blob/animated_basic/flip/animatedbasic/index.android.js
// https://www.npmjs.com/package/react-native-pie-chart

class CardQuiz extends Component {

  state = {
    counter: 1,
    showResults: false,
    score: 0,
    side: 'front',
    totalCards: this.props.navigation.state.params.questions.length
  };

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    })
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    })
  }

  flipCard() {
    if (this.value >= 90) {
      this.setState({side: 'front'});
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      this.setState({side: 'back'});
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }
  }

  countCard = () => {
    let { counter, totalCards } = this.state;
    this.setState({
      counter: counter + 1,
      side: 'front'
    });
    Animated.spring(this.animatedValue,{
      toValue: 0,
      friction: 8,
      tension: 10
    }).start();
    if(counter === totalCards) {
      clearLocalNotification().then(setLocalNotification);
      this.setState({showResults: true});
    }
  }

  selectCorrect = () => {
    let { score, totalCards } = this.state;
    this.setState({ score: score + 1 });
    score <= totalCards && this.countCard();
  }

  selectIncorrect = () => {
    let { score, totalCards } = this.state;
    score <= totalCards && this.countCard();
  }

  backToDeck = () => {
    this.props.navigation.goBack();
  }

  restartQuiz = () => {
    this.setState({
      counter: 1,
      showResults: false,
      score: 0,
      side: 'front'
    });
    Animated.spring(this.animatedValue,{
      toValue: 0,
      friction: 8,
      tension: 10
    }).start();
  }

  render() {
    const { title, questions } = this.props.navigation.state.params;
    const { counter, showResults, score, side, totalCards } = this.state;
    const chartSize = 150;
    const chartColors = ['#02C39A','#EF5D60'];

    function scorePercentage() {
      const percentage = (score * 100) / totalCards;
      return Math.round(percentage);
    }

    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }

    return (
      <View style={styles.cardContainer}>
      { showResults === false
        ?  <View style={styles.cardContent}>
          { side === 'front' ?
            <Animated.View style={[styles.flipCardFront, styles.flipCard, frontAnimatedStyle, {opacity: this.frontOpacity}]}>

              <Text style={styles.cardCounterText}>
                { `${counter} / ${totalCards}` }
              </Text>

              <View style={styles.cardText}>
                <Text style={styles.cardMainText}>
                  { questions[counter - 1].question }
                </Text>
                <TouchableOpacity onPress={() => this.flipCard()} style={[styles.flipCardBtn,styles.flipText]}>
                    <Ionicons name="ios-eye" size={50} color='white' />
                </TouchableOpacity>
              </View>

              <View style={styles.cardFooter}>
                <TouchableOpacity onPress={() => this.selectCorrect()}>
                  <Text style={[styles.cardBtn, styles.cardCorrectBtn]}>
                    Correct
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.selectIncorrect()}>
                  <Text style={[styles.cardBtn, styles.cardIncorrectBtn]}>
                    Incorrect
                  </Text>
                </TouchableOpacity>
              </View>

            </Animated.View>

          :  <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, {opacity: this.backOpacity}]}>

              <Text style={styles.cardCounterText}>
                { `${counter} / ${totalCards}` }
              </Text>

                <View style={styles.cardText}>
                  <Text style={styles.cardMainText}>
                    { questions[counter - 1].answer }
                  </Text>
                  <TouchableOpacity onPress={() => this.flipCard()} style={[styles.flipCardBtn,styles.flipText]}>
                      <Ionicons name="ios-eye" size={50} color='white' />
                  </TouchableOpacity>
                </View>

              <View style={styles.cardFooter}>
                <TouchableOpacity onPress={() => this.selectCorrect()}>
                  <Text style={[styles.cardBtn, styles.cardCorrectBtn]}>
                    Correct
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.selectIncorrect()}>
                  <Text style={[styles.cardBtn, styles.cardIncorrectBtn]}>
                    Incorrect
                  </Text>
                </TouchableOpacity>
              </View>

            </Animated.View>
            }
          </View>
        : <View style={styles.resultContainer}>

            <Text style={styles.resultMessage}>
              {
                scorePercentage() > 70 ? 'Great Job!' : 'You can do it!'
              }
            </Text>

            <PieChart
              chart_wh={ chartSize }
              series={ [score, totalCards - score] }
              sliceColor={ chartColors }
              doughnut={ true }
              coverRadius={ 0.45 }
              coverFill={ '#fff' }
            />

            <View style={styles.scoreText}>
              <Text>YOUR SCORE: { score } / { totalCards }</Text>
              <Text style={styles.resultPercent}>{ scorePercentage() }%</Text>
            </View>

            <View style={styles.cardFooter}>
              <TouchableOpacity onPress={() => this.restartQuiz()}>
                <Text style={[styles.cardBtn, styles.cardRestartBtn]}>
                  Restart Quiz
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.backToDeck()}>
              <Text style={[styles.cardBtn, styles.cardBackBtn]}>
                  Back to Deck
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        }
      </View>
    );
  }
}

export default CardQuiz;
