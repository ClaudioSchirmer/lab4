import React from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { Card, Rating } from "react-native-elements";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../repository/Firebase";

export function BookList({ navigation }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const itemListRef = collection(db, "books");

    const subscriber = onSnapshot(itemListRef, {
      next: (snapshot) => {
        const books = [];
        snapshot.docs.forEach((doc) => {
          books.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setBooks(books);
      },
    });

    return () => subscriber();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ paddingTop: 10, paddingBottom: 10 }}
        data={books.filter((book) => !book.borrowed)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              navigation.navigate("Details", {
                book: item,
                booksBorrowed: books.filter((book) => book.borrowed),
              })
            }
          >
            <Card containerStyle={styles.card}>
              <View style={styles.cardContent}>
                <Image source={{ uri: item.image }} style={styles.coverImage} />
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.author}>by {item.author}</Text>
                  <Rating
                    imageSize={20}
                    readonly
                    startingValue={item.rating}
                    style={styles.rating}
                  />
                  <Text numberOfLines={3} style={styles.summary}>
                    {item.summary}
                  </Text>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  card: {
    marginBottom: 15,
    borderRadius: 10,
    padding: 15,
  },
  cardContent: {
    flexDirection: "row",
  },
  coverImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  author: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
  },
  rating: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  summary: {
    fontSize: 14,
    color: "gray",
  },
});
