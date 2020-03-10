import React from 'react';
import {
  StyleSheet,
  Image,
  FlatList,
  Text,
  View,
  TextInput,
  Button,
} from 'react-native';

export default class Starting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      books: [],
    };
  }
  getBooks(category) {
    var books = fetch(
      'https://www.googleapis.com/books/v1/volumes?q=' + category
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          books: responseJson.items,
        });
      });
  }
  returnIfFetched() {
    try {
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.books}
            renderItem={({ item }) => (
              <React.Fragment>
              <Image
              style={{width: 100, height: 100}}
              source={{uri: item.volumeInfo.imageLinks.thumbnail}}/>
              <Text style={styles.item}>{item.volumeInfo.title}</Text>
              </React.Fragment>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      );
    } catch (error) {
      console.log(error);
    }
    // <FlatList
    // data={}
    // renderItem= {({item}) =>{
    //     console.log(item.volumeInfo.title)
    //     {/* 
    //     {/* <Text>{item.volumeInfo.title}</Text> */}
    //     <Text style={{color: 'black', fontSize:30}}>{item.volumeInfo.title}</Text>
    //     console.log("------------")
    // }}
    // keyExtractor={({id}, index) => id}

    // />
  }
  render() {
    return (
      <React.Fragment>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TextInput
            style={{ height: 40, width: 100 }}
            placeholder="Type text"
            onChangeText={t => this.setState({ text: t })}
            value={this.state.text}
          />
          <Button
            title="Submit"
            onPress={() => {
              this.getBooks(this.state.text);
            }}
          />
        </View>
        {this.returnIfFetched()}
      </React.Fragment>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 3,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
