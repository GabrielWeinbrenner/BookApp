import React from "react";
import { Image, View, TextInput, Button, Text, FlatList } from "react-native";
import Card from "./Stylesheets/Card";
import IconStyles from "./Stylesheets/IconStyles";
import IconButton from "./IconButton";
import GestureRecognizer, { swipeDirections } from "react-native-swipe-gestures";

export default class Starting extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "",
			books: [],
			isSubmitted: false,
			currentBookValue: 0,
			liked: [],
			isMatched: false,
			gestureName: "none",
		};
	}
	getBooks(category) {
		var books = fetch("https://www.googleapis.com/books/v1/volumes?q=" + category)
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					books: responseJson.items,
					isSubmitted: true,
				});
			});
	}
	onSwipe = (gestureName, gestureState) => {
		const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
		this.setState({ gestureName: gestureName });
		switch (gestureName) {
			case SWIPE_LEFT:
				this.handleOnSwipedLeft();
				break;
			case SWIPE_RIGHT:
				this.handleOnSwipedRight();
				break;
		}
	};

	returnIfFetched() {
		// if (this.state.books.length == this.state.currentBookValue + 1) {
		// 	console.log("Limit Reached:  " + this.state.books.length);
		// 	this.setState({
		// 		currentBookValue: 0,
		// 	});
		// }
		var books = this.state.books;
		var title = "";
		var author = "";
		var imageURL = "";
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
		}
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
		} catch (error) {
			return error;
		}
	}
	handleOnSwipedLeft = () => {
		this.setState({
			currentBookValue: this.state.currentBookValue + 1,
			gestureName: "none",
		});
		if (this.state.currentBookValue === this.state.books.length) {
			console.log("END " + this.state.currentBookValue + " " + this.state.books.length);

			this.setState({
				isMatched: true,
			});
		}
	};
	handleOnSwipedRight = () => {
		var joined = this.state.liked.concat(this.state.books[this.state.currentBookValue]);
		this.setState({
			liked: joined,
			currentBookValue: this.state.currentBookValue + 1,
			gestureName: "none",
		});
		if (this.state.currentBookValue === this.state.books.length) {
			console.log("END " + this.state.currentBookValue + " " + this.state.books.length);
			this.setState({
				isMatched: true,
			});
		}
	};
	renderedMatch = () => {
		return (
			<React.Fragment>
				<FlatList
					data={this.state.liked}
					renderItem={({ item }) => (
						<React.Fragment>
							<Image
								style={{ width: 100, height: 100 }}
								source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
							/>
							<Text style={styles.item}>{item.volumeInfo.title}</Text>
						</React.Fragment>
					)}
					keyExtractor={(item) => item.id}
				/>
				<Button
					title="Again?"
					onPress={() => {
						this.setState({
							text: "",
							books: [],
							isSubmitted: false,
							currentBookValue: 0,
							liked: [],
							isMatched: false,
						});
					}}
				/>
			</React.Fragment>
		);
	};
	inputText = () => {
		return (
			<React.Fragment>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}>
					<TextInput
						style={{
							height: 40,
							width: 100,
						}}
						placeholder="Type text"
						onChangeText={(t) =>
							this.setState({
								text: t,
							})
						}
						value={this.state.text}
					/>
					<Button
						title="Submit"
						onPress={() => {
							this.getBooks(this.state.text);
						}}
					/>
				</View>
			</React.Fragment>
		);
	};
	render() {
		if (this.state.isSubmitted === false) {
			return this.inputText();
		} else {
			if (this.state.isMatched === true) {
				return this.renderedMatch();
			} else {
				return this.returnIfFetched();
			}
		}
	}
}
