import React from "react";
import { TextInput, View } from "react-native";
import IconButton from "../IconButton";
export default class SubjectInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			category: "",
		};
	}
	getBooks(category) {
		fetch("https://www.googleapis.com/books/v1/volumes?q=" + category)
			.then((response) => response.json())
			.then((responseJson) => {
				this.props.setBooks(responseJson.items);
				this.props.setSubmitted(true);
			});
	}
	render() {
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
						onChangeText={(category) => {
							this.setState({
								category,
							});
						}}
						value={this.state.text}
					/>

					<IconButton
						name="caretright"
						onPress={() => {
							this.getBooks(this.state.category);
						}}
						borderRadius={20}
						padding={20}
						color="white"
						backgroundColor="#0066cc"
					/>
				</View>
			</React.Fragment>
		);
	}
}
