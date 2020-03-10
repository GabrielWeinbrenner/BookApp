import React from "react";
import { Image, View, TextInput, Button, Text, FlatList } from "react-native";
import IconStyles from "./Stylesheets/IconStyles";
import IconButton from "./IconButton";
import Card from "./Essentials/Cards";
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
					<Card
						books={books}
						title={title}
						author={author}
						imageURL={imageURL}
						handleOnSwipedLeft={this.handleOnSwipedLeft()}
						handleOnSwipedRight={this.handleOnSwipedRight()}
						currentBookValue={this.state.currentBookValue}
					/>
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
					<View style={IconStyles.buttonsContainer}>
						<IconButton
							name="arrow"
							onPress={this.handleOnSwipedLeft}
							color="white"
							backgroundColor="#E5566D"
						/>
					</View>
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
