import React from "react";
import flatListStyles from "../Stylesheets/FlatList";
import { Image, View, TextInput, Button, Text, FlatList, TouchableOpacity } from "react-native";
import { SwipeListView } from "@nvthai/react-native-swipe-list-view";
import IconButton from "../IconButton";

import { connect } from "react-redux";
class Saved extends React.Component {
	render() {
		console.log(this.props.books);
		return (
			<React.Fragment>
				<View style={flatListStyles.container}>
					<FlatList
						data={this.props.books.books}
						renderItem={({ item }) => (
							<View style={flatListStyles.itemContainer}>
								<Image style={flatListStyles.image} source={{ uri: item.imageURL }} />
								<Text style={flatListStyles.title}>{item.title}</Text>
							</View>
						)}
						// renderHiddenItem={(rowData, rowMap) => (
						// <View style={flatListStyles.rowBack}>
						// 	<TouchableOpacity
						// 		style={[
						// 			flatListStyles.backRightBtn,
						// 			flatListStyles.backRightBtnRight,
						// 		]}
						// 		onPress={() => {
						// 			var index = rowData.index;
						// 			// if (rowMap[index]) {
						// 			// 	rowMap[index].closeRow();
						// 			// }
						// 			const newData = [...this.state.liked];

						// 			if (index !== -1) {
						// 				newData.splice(index, 1);
						// 				this.setState({ liked: newData });
						// 			}
						// 		}}>
						// 		<Text style={flatListStyles.backTextWhite}>Delete</Text>
						// 	</TouchableOpacity>
						// </View>
						// )}
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
								<Text style={flatListStyles.headerText}>Saved Books</Text>
								<View style={flatListStyles.badge}>
									<Text style={flatListStyles.badgeText}>
										{this.props.books.books.length}
									</Text>
								</View>
							</View>
						)}
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
