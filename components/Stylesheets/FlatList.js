import { StyleSheet, Dimensions } from "react-native";
const { height } = Dimensions.get("window");

export default styles = StyleSheet.create({
	container: {
		height: height - 300,
		// backgroundColor: "white",
		borderRadius: 5,
		shadowColor: "black",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		marginTop: 30,
		// marginTop: 0,
		shadowRadius: 6,
		shadowOpacity: 0.3,
		elevation: 2,
	},
	header: {
		marginLeft: 10,
		flexDirection: "row",
	},
	headerText: {
		color: "#ff5050",
		marginTop: 15,
		fontSize: 20,
	},
	itemContainer: {
		flexDirection: "row",
		padding: 20,
	},
	image: {
		height: 50,
		width: 50,
		borderRadius: 20,
	},
	title: {
		marginLeft: 10,
	},
	badge: {
		marginLeft: 5,
		marginTop: 10,
		backgroundColor: "#ff5050",
		justifyContent: "center",

		overflow: "hidden",
		borderRadius: 50,
		height: 35,
		width: 35,
		padding: 6,
	},
	badgeText: {
		textAlign: "center",
		justifyContent: "center",

		color: "#fff",
	},
});
