import { StyleSheet, Dimensions } from "react-native";
const { height } = Dimensions.get("window");

export default styles = StyleSheet.create({
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
