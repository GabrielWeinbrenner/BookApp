import React from "react";
import { Text, Image, View } from "react-native";
import Card from "../Stylesheets/Card";

import IconButton from "../IconButton";
import Swiper from "react-native-deck-swiper";
import IconStyles from "../Stylesheets/IconStyles";

export default class MatchWindow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentBookValue: 0,
			liked: [],
		};
	}
	handleSwipedLeft = () => {
		this.setState({
			currentBookValue: this.state.currentBookValue + 1,
		});
		if (this.state.currentBookValue + 1 === this.props.books.length) {
			this.props.setIsMatched(true);
			this.props.setLiked(this.state.liked);
		}
	};
	handleSwipedRight = () => {
		var joined = this.state.liked.concat(this.props.books[this.state.currentBookValue]);
		this.setState({
			liked: joined,
			currentBookValue: this.state.currentBookValue + 1,
		});
		if (this.state.currentBookValue + 1 === this.props.books.length) {
			this.props.setIsMatched(true);
			this.props.setLiked(this.state.liked);
		}
	};
	renderCard = () => {
		var currentBookValue = this.state.currentBookValue;
		var image = this.props.books[currentBookValue].imageURL;
		var title = this.props.books[currentBookValue].title;
		var author = this.props.books[currentBookValue].author;

		return (
			<React.Fragment>
				<Image
					style={Card.image}
					source={{
						uri: image,
					}}
				/>

				<View style={Card.photoDescriptionContainer}>
					<Text style={Card.text}>{title}</Text>

					<Text style={Card.text}>{author}</Text>
				</View>
			</React.Fragment>
		);
	};
	renderMatching = () => {
		return (
			<View>
				<View style={Card.container}>
					<Swiper
						cards={this.props.books}
						renderCard={this.renderCard}
						disableTopSwipe={true}
						showSecondCard={false}
						onSwipedLeft={this.handleSwipedLeft}
						onSwipedRight={this.handleSwipedRight}
						backgroundColor="none"
						stackSize={this.props.books.length}
						cardIndex={this.state.currentBookValue}
						cardStyle={{
							marginBottom: 20,
							height: "100%",
						}}
						onTapCard={(i) => {}}
						useViewOverflow={false}
					/>
				</View>
				<View style={IconStyles.buttonsContainer}>
					<IconButton
						name="close"
						onPress={this.handleSwipedLeft}
						color="white"
						borderRadius={50}
						padding={30}
						backgroundColor="#E5566D"
					/>
					{/* <IconButton name="star" onPress={handleOnSwipedTop} color="white" backgroundColor="#3CA3FF" /> */}
					<IconButton
						name="heart"
						onPress={this.handleSwipedRight}
						color="white"
						borderRadius={50}
						padding={30}
						backgroundColor="#4CCC93"
					/>
				</View>
			</View>
		);
	};
	render() {
		return this.renderMatching();
	}
}
