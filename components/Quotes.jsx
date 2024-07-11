import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../utils/Colors';
import { MaterialIcons } from '@expo/vector-icons';

const quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Do not watch the clock. Do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Keep your eyes on the stars, and your feet on the ground.", author: "Theodore Roosevelt" },
  { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
];

export default function Quotes() {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <MaterialIcons name="format-quote" size={34} color={Colors.PRIMARY} />
      <Text style={styles.text}>{quote.text}</Text>
      <Text style={styles.author}>- {quote.author}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.PRIMARY,
    width: "100%",
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 18,
    color: Colors.PRIMARY,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
  author: {
    fontSize: 16,
    color: Colors.SECONDARY,
    textAlign: 'center',
    marginTop: 10,
  },
});
