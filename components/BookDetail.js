import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  Alert,
} from "react-native";
import { Rating } from "react-native-elements";
import { borrowBook } from "../repository/BooksRepository";

export function BookDetail({ route, navigation }) {
  const book = route.params.book;
  const borrowedBooks = route.params.booksBorrowed;

  const handleBorrowBook = async () => {
    if (borrowedBooks.length >= 3) {
      Alert.alert("Error", "You cannot borrow more than 3 books at a time.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } else {
      await borrowBook(book);
      navigation.goBack();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: book.image }} style={styles.coverImage} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>by {book.author}</Text>
        <Rating
          imageSize={20}
          readonly
          startingValue={book.rating}
          style={styles.rating}
        />
        <Text style={styles.summary}>{book.summary}</Text>
        <Button title="Borrow this book" onPress={handleBorrowBook} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: "center",
    backgroundColor: "#fff",
    display: "flex",
    flexGrow: 1,
  },
  coverImage: {
    width: 150,
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  textContainer: {
    width: "100%",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    color: "gray",
    marginBottom: 10,
    color: "#007AFF",
  },
  rating: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  summary: {
    fontSize: 16,
    marginBottom: 30,
  },
  details: {
    fontSize: 14,
    marginBottom: 5,
  },
});
