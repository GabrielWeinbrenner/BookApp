import React from "react";
import { Image, View, TextInput, Button, Text, FlatList, TouchableOpacity } from "react-native";
import flatListStyles from "./Stylesheets/FlatList";
import IconButton from "./IconButton";
import { SwipeListView } from "react-native-swipe-list-view";
import SubjectInput from "./essentials/SubjectInput";
import MatchWindow from "./essentials/MatchWindow";
export default class Starting extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			books: [],
			isSubmitted: false,
			isMatched: false,
			liked: [],
		};
	}

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
								<Image style={flatListStyles.image} source={{ uri: item.imageURL }} />
								<Text style={flatListStyles.title}>{item.title}</Text>
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
	parseBooks = (books) => {
		newBooks = [];
		for (var i = 0; i < books.length; i++) {
			newBooks.push({
				title: books[i].volumeInfo.title !== undefined ? books[i].volumeInfo.title : "",
				author: books[i].volumeInfo.authors[0] !== undefined ? books[i].volumeInfo.authors[0] : "",
				imageURL: books[i].volumeInfo.imageLinks.thumbnail !== undefined ? books[i].volumeInfo.imageLinks.thumbnail : "",
			});
		}
		console.log(newBooks);
		return newBooks;
	};
	setBooks = (books) => {
		books = this.parseBooks(books);
		this.setState({ books });
	};
	setSubmitted = (isSubmitted) => {
		this.setState({ isSubmitted });
	};
	setIsMatched = (isMatched) => {
		this.setState({ isMatched });
	};
	setLiked = (liked) => {
		this.setState({ liked });
	};

	render() {
		if (this.state.isSubmitted === false) {
			return <SubjectInput setBooks={this.setBooks} setSubmitted={this.setSubmitted} />;
		} else {
			if (this.state.isMatched === true) {
				return this.renderedMatch();
			} else {
				return <MatchWindow books={this.state.books} setIsMatched={this.setIsMatched} setLiked={this.setLiked} />;
			}
		}
	}
}
