import React from "react";
import { Image, View, TextInput, Button, Text, FlatList, TouchableOpacity } from "react-native";
import Card from "./Stylesheets/Card";
import IconStyles from "./Stylesheets/IconStyles";
import flatListStyles from "./Stylesheets/FlatList";
import IconButton from "./IconButton";
import Swiper from "react-native-deck-swiper";
import { SwipeListView } from "react-native-swipe-list-view";
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
					<View style={Card.container}>
						<Swiper
							cards={this.state.books}
							renderCard={(card) => {
								return (
									<React.Fragment>
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
									</React.Fragment>
								);
							}}
							disableTopSwipe={true}
							showSecondCard={false}
							onSwipedLeft={() => {
								this.handleOnSwipedLeft();
							}}
							onSwipedRight={() => {
								this.handleOnSwipedRight();
							}}
							backgroundColor="none"
							stackSize={this.state.books.length}
							cardIndex={this.state.currentBookValue}
							cardStyle={{
								marginBottom: 20,
								height: "100%",
							}}
							onTapCard={(i) => {}}
							useViewOverflow={false}></Swiper>
					</View>
					<View style={IconStyles.buttonsContainer}>
						<IconButton
							name="close"
							onPress={this.handleOnSwipedLeft}
							color="white"
							borderRadius={50}
							padding={30}
							backgroundColor="#E5566D"
						/>
						{/* <IconButton name="star" onPress={handleOnSwipedTop} color="white" backgroundColor="#3CA3FF" /> */}
						<IconButton
							name="heart"
							onPress={this.handleOnSwipedRight}
							color="white"
							borderRadius={50}
							padding={30}
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
		console.log("left pressed");
		this.setState({
			currentBookValue: this.state.currentBookValue + 1,
		});
		if (this.state.currentBookValue === this.state.books.length) {
			console.log("END " + this.state.currentBookValue + " " + this.state.books.length);

			this.setState({
				isMatched: true,
			});
		}
	};
	handleOnSwipedRight = () => {
		console.log("right pressed");

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
				<View style={flatListStyles.container}>
					<SwipeListView
						useFlatList
						data={this.state.liked}
						rightOpenValue={-75}
						previewOpenValue={-40}
						previewRowKey={"0"}
						previewOpenValue={-40}
						previewOpenDelay={3000}
						renderItem={({ item }) => (
							<View style={flatListStyles.itemContainer}>
								<Image
									style={flatListStyles.image}
									source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
								/>
								<Text style={flatListStyles.title}>{item.volumeInfo.title}</Text>
							</View>
						)}
						renderHiddenItem={(rowData, rowMap) => (
							<View style={flatListStyles.rowBack}>
								<TouchableOpacity
									style={[
										flatListStyles.backRightBtn,
										flatListStyles.backRightBtnRight,
									]}
									onPress={() => {
										var index = rowData.index;
										// if (rowMap[index]) {
										// 	rowMap[index].closeRow();
										// }
										const newData = [...this.state.liked];

										if (index !== -1) {
											newData.splice(index, 1);
											this.setState({ liked: newData });
										}
									}}>
									<Text style={flatListStyles.backTextWhite}>Delete</Text>
								</TouchableOpacity>
							</View>
						)}
						ItemSeparatorComponent={() => (
							<View
								style={{
									height: 1,
									width: "100%",
									backgroundColor: "#000",
								}}
							/>
						)}
						ListHeaderComponent={() => (
							<View style={flatListStyles.header}>
								<Text style={flatListStyles.headerText}>New Matches</Text>
								<View style={flatListStyles.badge}>
									<Text style={flatListStyles.badgeText}>
										{this.state.liked.length}
									</Text>
								</View>
							</View>
						)}
						keyExtractor={(item) => item.id}
					/>
				</View>
				<IconButton
					name="heart"
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
					borderRadius={20}
					padding={20}
					color="white"
					backgroundColor="#ff5050"
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
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<TextInput
						style={{
							height: 60,
							width: 200,
							borderColor: "black",
							borderWidth: 0.5,
							marginRight: 10,
							paddingLeft: 10,
						}}
						placeholder="Type text"
						onChangeText={(t) =>
							this.setState({
								text: t,
							})
						}
						value={this.state.text}
					/>

					<IconButton
						name="caretright"
						onPress={() => {
							this.getBooks(this.state.text);
						}}
						borderRadius={20}
						padding={20}
						color="white"
						backgroundColor="#0066cc"
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
