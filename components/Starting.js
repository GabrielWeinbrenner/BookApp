import React from "react";
import { StyleSheet, Image, Dimensions, View, TextInput, Button, Text } from "react-native";
const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
	container: {
		/* Setting the height according to the screen height, it also could be fixed value or based on percentage. In this example, this worked well on Android and iOS. */
		height: height - 300,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: 5,
		shadowColor: "black",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		marginTop: 40,
		shadowRadius: 6,
		shadowOpacity: 0.3,
		elevation: 2,
	},
	image: {
		borderRadius: 5,
		flex: 1,
		width: "100%",
	},

	photoDescriptionContainer: {
		justifyContent: "flex-end",
		alignItems: "flex-start",
		flexDirection: "column",
		height: "100%",
		position: "absolute",
		left: 10,
		bottom: 10,
	},
	text: {
		textAlign: "center",
		fontSize: 30,
		color: "white",
		fontFamily: "Avenir",
		textShadowColor: "black",
		textShadowRadius: 10,
	},
});

export default class Starting extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "",
			books: [],
			isSubmitted: false,
			currentBookValue: 0,
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
	returnIfFetched() {
		if (this.state.books.length == this.state.currentBookValue + 1) {
			console.log("Limit Reached:  " + this.state.books.length);
			this.setState({
				currentBookValue: 0,
			});
		}
		var books = this.state.books;
		var author = "";
		var imageURL = null;

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
					<View style={styles.container}>
						<Image
							style={styles.image}
							source={{
								uri: imageURL,
							}}
						/>
						<View style={styles.photoDescriptionContainer}>
							<Text style={styles.text}>{books[this.state.currentBookValue].volumeInfo.title}</Text>

							<Text style={styles.text}>{author}</Text>
						</View>
					</View>
					<View>
						<Button
							title="Next"
							onPress={() =>
								this.setState({
									currentBookValue: this.state.currentBookValue + 1,
								})
							}></Button>
					</View>
				</View>
			);
		} catch (error) {
			return error;
		}
	}
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
			return this.returnIfFetched();
		}
	}
}
