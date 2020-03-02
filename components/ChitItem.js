import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Card from './Card';
import Colors from '../constants/Colors';

const ChitItem = props => {
  return (
    <Card style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.contentInfo}>
          <Text style={styles.name}>
            {props.item.user.given_name} chittr'd:
          </Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.text}>{props.item.chit_content}</Text>
        </View>
        <Text>{new Date(props.item.timestamp).toString()}</Text>
      </View>
    </Card>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 25,
    elevation: 5,
  },
  contentContainer: {},
  contentInfo: {},
  content: {
    paddingVertical: 20,
  },
  text: {
    fontSize: 16,
    backgroundColor: Colors.primary,
    color: Colors.compliment,
    borderRadius: 10,
    padding: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
});

export default ChitItem;
