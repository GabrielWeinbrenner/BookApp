import React from "react";
import { View } from "react-native";
import { Swiper } from "react-native-deck-swiper";
import Card from "../Stylesheets/Card";
import { handleOnSwipedRight, handleOnSwipedLeft } from "../Functions/handleSwipes";

export default class Cards extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Swiper
					cards={this.props.books}
					renderCard={(card) => {
						return (
							<React.Fragment>
								<Image
									style={card.image}
									source={{
										uri: this.props.imageURL,
									}}
								/>

								<View style={card.photoDescriptionContainer}>
									<Text style={card.text}>{this.props.title}</Text>

									<Text style={card.text}>{this.props.author}</Text>
								</View>
							</React.Fragment>
						);
					}}
					onSwipedLeft={() => {
						this.props.handleOnSwipedLeft();
					}}
					onSwipedRight={() => {
						this.props.handleOnSwipedRight();
					}}
					cardIndex={this.props.currentBookValue}
					stackSize={this.props.books.length}></Swiper>
			</View>
		);
	}
}
