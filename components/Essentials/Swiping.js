import React, { Component } from "react";
import { Text, View } from "react-native";
var books = this.state.books;
    var title = "";
    var author = "";
    var imageURL = "";
export class Swiping extends Component {

    constructor(){
    try {
        title = books[this.state.currentBookValue].volumeInfo.title;
    } catch (error) {
        this.setState({
            isMatched: true,
        });
        console.log("No Title");
    }
    try {
        author = books[this.state.currentBookValue].volumeInfo.authors[0];
    } catch (error) {
        console.log("No Author");
    }
    try {
        imageURL = books[this.state.currentBookValue].volumeInfo.imageLinks.thumbnail;
    } catch (error) {
        console.log("No Image");
    }}
    
	render() {
            try {
                return (
                    <View>
                        <GestureRecognizer
                            onSwipe={this.onSwipe}
                            onSwipeLeft={this.onSwipeLeft}
                            onSwipeRight={this.onSwipeRight}
                            config={{
                                velocityThreshold: 0.3,
                                directionalOffsetThreshold: 80,
                            }}
                            style={Card.container}>
                            <Image
                                style={Card.image}
                                source={{
                                    uri: imageURL,
                                }}
                            />
    
                            <View style={Card.photoDescriptionContainer}>
                                <Text style={Card.text}>{title}</Text>
    
                                <Text style={Card.text}>{author}</Text>
                            </View>
                        </GestureRecognizer>
                        <View style={IconStyles.buttonsContainer}>
                            <IconButton
                                name="close"
                                onPress={this.handleOnSwipedLeft}
                                color="white"
                                backgroundColor="#E5566D"
                            />
                            {/* <IconButton name="star" onPress={handleOnSwipedTop} color="white" backgroundColor="#3CA3FF" /> */}
                            <IconButton
                                name="heart"
                                onPress={this.handleOnSwipedRight}
                                color="white"
                                backgroundColor="#4CCC93"
                            />
                        </View>
                    </View>
		);
	}
}

export default Swiping;
