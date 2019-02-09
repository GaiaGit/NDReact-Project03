import React, { Component } from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Constants } from 'expo';
import { Entypo } from '@expo/vector-icons';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { pink, white } from './utils/colors';
import { setLocalNotification } from './utils/helpers';

import CardAdd from './components/CardAdd';
import CardQuiz from './components/CardQuiz';
import DeckAdd from './components/DeckAdd';
import DeckView from './components/DeckView';
import DeckList from './components/DeckList';

function TopStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'DECKS',
      tabBarIcon: ({ tintColor }) => <Entypo name='text-document' size={26} color={tintColor} />
    },
  },
  DeckAdd: {
    screen: DeckAdd,
    navigationOptions: {
      tabBarLabel: 'NEW DECK',
      tabBarIcon: ({ tintColor }) => <Entypo name='circle-with-plus' size={26} color={tintColor}  />
    },
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? pink : white,
    showIcon: true,
    style: {
      height: 70,
      backgroundColor: Platform.OS === 'ios' ? white : pink,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
});

const NavigationBar = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: pink,
      }
    }
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: pink,
      }
    }
  },
  DeckAdd: {
    screen: DeckAdd,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: pink,
      }
    }
  },
  CardAdd: {
    screen: CardAdd,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: pink,
      }
    }
  },
  CardQuiz: {
    screen: CardQuiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: pink,
      }
    }
  }
});

export default class App extends Component {

  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <TopStatusBar backgroundColor={pink} barStyle="light-content" />
          <NavigationBar />
        </View>
      </Provider>
    )
  }
}
