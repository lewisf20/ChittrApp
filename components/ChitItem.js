import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Card from './Card';
import Colors from '../constants/Colors';

const ChitItem = props => {
  return (
    <Card style={{...styles.container, ...props.style}}>
      <View style={styles.contentInfo}>
        <Text style={styles.name}>{props.item.user.given_name} chittr'd:</Text>
      </View>
      <View style={styles.content}>
        <Text style={{...styles.text, ...props.text}}>
          {props.item.chit_content}
        </Text>
      </View>
      <Text>{new Date(props.item.timestamp).toString()}</Text>
    </Card>
  );
};
const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    elevation: 5,
  },
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
