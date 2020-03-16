import React from "react";
import SavedStyles from "../Stylesheets/Saved";
import { Image, View, TextInput, Button, Text, FlatList, TouchableOpacity } from "react-native";
import IconButton from "../IconButton";

import { connect } from "react-redux";
class Saved extends React.Component {
	header = () => {
		return (
			<View style={SavedStyles.header}>
				<Text style={SavedStyles.headerText}>Saved Books</Text>
				<View style={SavedStyles.badge}>
					<Text style={SavedStyles.badgeText}>{this.props.books.books.length}</Text>
				</View>
			</View>
		);
	};
	render() {
		console.log(this.props.books);
		return (
			<React.Fragment>
				<View style={SavedStyles.container}>
					<FlatList
						data={this.props.books.books}
						numColumns={3}
						renderItem={({ item }) => (
							<View style={SavedStyles.itemContainer}>
								<Image style={SavedStyles.image} source={{ uri: item.imageURL }} />
								<Text style={SavedStyles.title}>{item.title}</Text>
							</View>
						)}
						ListHeaderComponent={this.header}
						keyExtractor={(item) => item.id}
					/>
				</View>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	return {
		books: state.books,
	};
}
export default connect(mapStateToProps)(Saved);
